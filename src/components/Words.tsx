import { Fragment } from "react";

// Splits text into words that rise in one by one when an ancestor <Reveal> is
// scrolled into view (CSS in globals.css). `start` offsets the stagger so a
// paragraph can continue after a heading.
export default function Words({ text, start = 0 }: { text: string; start?: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className="word" style={{ "--w": start + i } as React.CSSProperties}>
        {word}
      </span>{" "}
    </Fragment>
  ));
}
