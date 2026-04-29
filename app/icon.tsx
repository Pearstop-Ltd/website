import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Pearstop">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2a68" />
            <stop offset="60%" stopColor="#353fff" />
            <stop offset="100%" stopColor="#a383ff" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="128" fill="url(#g)" />
        <circle cx="256" cy="256" r="154" fill="rgba(255,255,255,0.08)" />
        <path
          d="M196 356V156h92c48 0 78 29 78 73 0 40-27 68-68 72l76 55h-76l-64-52h-21v52h-17zm17-120h69c30 0 48-16 48-41 0-27-19-42-49-42h-68v83z"
          fill="#fff"
        />
      </svg>
    ),
    {
      width: 512,
      height: 512
    }
  );
}
