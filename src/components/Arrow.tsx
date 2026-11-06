// Drawn as SVG instead of ↗ / → characters, which iOS renders as emoji.
const paths = {
  "up-right": "M7 17 17 7M8 7h9v9",
  right: "M5 12h14M13 6l6 6-6 6",
  left: "M19 12H5M11 6l-6 6 6 6",
};

type Props = { direction: keyof typeof paths; className?: string };

export default function Arrow({ direction, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block h-[0.9em] w-[0.9em] shrink-0 ${className}`}
    >
      <path d={paths[direction]} />
    </svg>
  );
}
