const items = [
  "NAIL ART",
  "GEL EXTENSIONS",
  "MANICURE",
  "CUSTOM DESIGNS",
  "LUXURY CARE",
];

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="glass relative z-10 border-x-0 py-5 overflow-hidden">
      <div className="marquee-track">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center font-display text-2xl md:text-3xl italic text-rose-dark whitespace-nowrap"
          >
            {item}
            <span className="ml-6 text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
