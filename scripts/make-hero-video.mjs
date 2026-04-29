import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

if (!ffmpegPath) {
  throw new Error("ffmpeg-static did not provide a binary path");
}

const args = [
  "-y",
  "-loop",
  "1",
  "-t",
  "3",
  "-i",
  "public/images/home/spend-control.webp",
  "-loop",
  "1",
  "-t",
  "3",
  "-i",
  "public/images/home/asset-management.webp",
  "-loop",
  "1",
  "-t",
  "3",
  "-i",
  "public/images/home/scale-confidence.webp",
  "-loop",
  "1",
  "-t",
  "3",
  "-i",
  "public/images/home/demo.webp",
  "-filter_complex",
  [
    "[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[v0]",
    "[1:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[v1]",
    "[2:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[v2]",
    "[3:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[v3]",
    "[v0][v1]xfade=transition=fade:duration=0.8:offset=2.2[x1]",
    "[x1][v2]xfade=transition=fade:duration=0.8:offset=4.4[x2]",
    "[x2][v3]xfade=transition=fade:duration=0.8:offset=6.6,format=yuv420p[v]"
  ].join(";"),
  "-map",
  "[v]",
  "-c:v",
  "libx264",
  "-crf",
  "24",
  "-preset",
  "veryfast",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "public/video/hero.mp4"
];

const result = spawnSync(ffmpegPath, args, {
  stdio: "inherit"
});

if (result.status !== 0) {
  throw new Error(`ffmpeg exited with status ${result.status}`);
}
