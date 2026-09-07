import AnimatedText from "./AnimatedText";

/**
 * A consistent editorial heading block used to open each section:
 * a small label, a large serif heading, and optional supporting copy.
 */
export default function SectionHeading({
  label,
  heading,
  description,
  align = "left",
  light = false,
}) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} max-w-xl`}>
      {label && (
        <span
          className={`text-sm tracking-[0.2em] font-medium mb-4 ${
            light ? "text-blush-deep" : "text-rose-dark"
          }`}
        >
          {label}
        </span>
      )}
      <AnimatedText
        text={heading}
        as="h2"
        className={`font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] ${
          light ? "text-ivory" : "text-charcoal"
        }`}
      />
      {description && (
        <p
          className={`mt-6 text-base sm:text-lg leading-relaxed ${
            light ? "text-blush" : "text-charcoal-soft"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
