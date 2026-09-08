#!/usr/bin/env python3
"""
Download every stock photo the site uses and write self-hosted, resized WebP
copies into public/images/, plus src/data/imageManifest.json describing which
widths exist.

Why: the site used to hotlink images.unsplash.com. That put every visitor's
page load behind a third party that throttles hotlinked traffic, which showed
up as photos intermittently failing to appear. Self-hosted files are served
from the same CDN as the rest of the site, cache normally, and cannot be
rate-limited.

Re-run after changing SOURCES (needs network + Pillow):
    python3 scripts/vendor_images.py

Photos come from Unsplash under the Unsplash License, which permits
self-hosting. Replace them with the studio's own photography when you have it:
drop files in public/images/ and re-run, or point SOURCES at local paths.
"""

import io
import json
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "data" / "imageManifest.json"

# Standard width ladder. Each image is only rendered up to `max_width`, so
# nothing bigger than it needs gets generated.
LADDER = [320, 480, 720, 1080, 1600, 1920]

UNSPLASH = "https://images.unsplash.com/{id}?auto=format&fit=crop&w=2400&q=85"

# slug -> (unsplash photo id, max width actually needed on screen)
SOURCES = {
    # Full-bleed backdrops
    "hero-backdrop":       ("photo-1604654894610-df63bc536371", 1920),
    # was ...-26e80aa4576b, which now 404s: Unsplash rotated the URL hash
    "banner-nail-art":     ("photo-1607779097040-26e80aa78e66", 1920),
    # Studio + before/after
    "studio-interior":     ("photo-1522337660859-02fbefca4702", 1080),
    # was ...-2fe93b0a1e4d (404)
    "transformation-before": ("photo-1604654894611-6973b376cbde", 1080),
    "transformation-after":  ("photo-1633681926035-ec1ac984418a", 1080),
    # Gallery tiles
    "quiet-ivory":         ("photo-1604654894610-df63bc536371", 1080),
    "soft-edge-french":    ("photo-1519014816548-bf5fe059798b", 1080),
    "liquid-chrome":       ("photo-1610992015732-2449b76344bc", 1080),
    # was ...-7d63bce53d4e (404)
    "something-borrowed":  ("photo-1736434518489-0eb84070017f", 1080),
    # was ...-26e80aa4576b (404)
    "wine-and-gold":       ("photo-1754799670312-8e7da8e40ad7", 1080),
    "hand-painted-bloom":  ("photo-1633681926035-ec1ac984418a", 1080),
    "bare-essentials":     ("photo-1519415510236-718bdfcd89c8", 1080),
    "mirror-finish":       ("photo-1604902396830-aca29e19b067", 1080),
    "editorial-red":       ("photo-1600965962361-9035dbfd1c50", 1080),
}


def fetch(url, attempts=4):
    """GET with backoff on throttling only.

    A 404 means the photo was deleted from Unsplash — retrying cannot fix it,
    so fail loudly and immediately with the URL to replace. Only 429/5xx and
    connection errors are worth waiting out."""
    last = None
    for i in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "blush-nail-studio/vendor-images"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (408, 429, 500, 502, 503, 504):
                raise RuntimeError(
                    f"{url} returned HTTP {e.code} — the photo is gone. "
                    f"Pick a replacement and update SOURCES."
                ) from e
            last = e
        except Exception as e:  # noqa: BLE001 - transient network trouble
            last = e
        wait = 2 ** i
        print(f"    throttled, retry {i + 1}/{attempts} in {wait}s ({last})")
        time.sleep(wait)
    raise RuntimeError(f"could not download {url}: {last}")


def main():
    from PIL import Image

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    cache = {}
    manifest = {}
    total = 0

    for slug, (photo_id, max_width) in SOURCES.items():
        if photo_id not in cache:
            print(f"  downloading {photo_id}")
            cache[photo_id] = fetch(UNSPLASH.format(id=photo_id))
            time.sleep(0.7)  # stay well under any burst limit

        src = Image.open(io.BytesIO(cache[photo_id])).convert("RGB")
        widths = [w for w in LADDER if w <= max_width]
        if not widths:
            widths = [LADDER[0]]

        written = []
        for w in widths:
            h = round(src.height * w / src.width)
            resized = src.resize((w, h), Image.LANCZOS)
            path = OUT_DIR / f"{slug}-{w}.webp"
            resized.save(path, "WEBP", quality=80, method=6)
            total += path.stat().st_size
            written.append(w)

        manifest[slug] = {
            "widths": written,
            "aspect": round(src.width / src.height, 4),
        }
        print(f"  {slug}: {written}")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(f"\n{len(SOURCES)} images, {sum(len(m['widths']) for m in manifest.values())} files, "
          f"{total / 1024 / 1024:.2f} MB total")


if __name__ == "__main__":
    main()
