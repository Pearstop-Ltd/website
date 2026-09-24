import Image from "next/image";

interface PearstopLogoProps {
  height?: number;
  className?: string;
}

const ASPECT_RATIO = 800 / 178;

/** White Pearstop wordmark (with the pear outline) from /brand/, for use on
 * dark or blue backgrounds — e.g. SourceDiagram's process box and
 * ClosingCTA's footer line. Never a redrawn pear or plain text. */
export function PearstopLogo({ height = 20, className }: PearstopLogoProps) {
  return (
    <Image
      src="/brand/logo-light.webp"
      alt="Pearstop"
      width={Math.round(height * ASPECT_RATIO)}
      height={height}
      className={className}
    />
  );
}
