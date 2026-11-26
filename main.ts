import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Apologies. I heard 'order more toilet paper' as 'order more toddlers.' Three arrive Thursday.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE + "\n", "utf8");
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE + "\n") {
  throw new Error("entry.txt read-back mismatch");
}
