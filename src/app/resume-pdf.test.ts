import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";
import links from "../../scripts/pdf-links.json";

// The resume is a Figma export: text frames with `/Annots []`, so every URL in
// it is dead until `scripts/pdf_links.py` adds /URI actions. This guards the
// shipped asset, so a re-export that silently drops the links fails here.
const pdf = readFileSync(resolve(process.cwd(), "public/bryan-fan-resume.pdf"), "latin1");

const uriActions = [...pdf.matchAll(/\/URI\s*\(([^)]*)\)/g)].map((match) => match[1]);
const rects = [
  ...pdf.matchAll(/\/Rect\s*\[\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*\]/g),
].map((match) => match.slice(1, 5).map(Number));

describe("public/bryan-fan-resume.pdf", () => {
  it("links exactly the URLs listed in scripts/pdf-links.json", () => {
    expect([...new Set(uriActions)].sort()).toEqual([...links.links].sort());
  });

  it("covers each link with a rect inside the A4 page", () => {
    expect(rects.length).toBeGreaterThanOrEqual(links.links.length);
    expect(rects).toHaveLength(uriActions.length);
    for (const [x0, y0, x1, y1] of rects) {
      expect(x0).toBeGreaterThanOrEqual(0);
      expect(y0).toBeGreaterThanOrEqual(0);
      expect(x1).toBeLessThanOrEqual(595);
      expect(y1).toBeLessThanOrEqual(842);
      expect(x1).toBeGreaterThan(x0);
      expect(y1).toBeGreaterThan(y0);
    }
  });
});
