#!/usr/bin/env python3
"""Rebuild the resume PDF's link layer.

`public/bryan-fan-resume.pdf` is a Figma export: text frames only, `/Annots []`,
so every URL in it is dead text -- and the three Google Drive URLs are wrapped
onto a second line, which also breaks copy/paste. Rewriting the visible text
would mean re-exporting the design, so instead this script attaches real
`/URI` annotations to the exact glyph boxes of each URL, one annotation per
wrapped line. Nothing on the page is redrawn.

The save is incremental: the original Figma bytes stay untouched and only the
annotation objects plus the page's `/Annots` array are appended. Re-running on
an already annotated file is a no-op, so a fresh Figma export is the only thing
this ever modifies (`--force` rebuilds anyway).

Targets live in `scripts/pdf-links.json`. The visible text is matched with
whitespace removed, so line breaks inside a URL do not matter, and long URLs
take priority so a bare profile URL never steals the prefix of a longer one.

    python scripts/pdf_links.py           # annotate public/bryan-fan-resume.pdf
    python scripts/pdf_links.py --check   # verify only; exit 1 if links are missing

Requires PyMuPDF (`pip install pymupdf`).
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import re
import sys

import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONFIG = pathlib.Path(__file__).resolve().parent / "pdf-links.json"
PAD = 0.75  # points of vertical slack so the cursor does not have to be pixel-perfect


def load_targets() -> tuple[pathlib.Path, list[str]]:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    return ROOT / config["pdf"], list(config["links"])


def glyphs(page: pymupdf.Page) -> list[tuple[str, pymupdf.Rect, int]]:
    """Non-whitespace glyphs in reading order, with the page line they sit on."""
    cells = []
    line_id = 0
    for block in page.get_text("rawdict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                for char in span["chars"]:
                    if char["c"].isspace():
                        continue
                    cells.append((char["c"], pymupdf.Rect(char["bbox"]), line_id))
            line_id += 1
    return cells


def needles(uri: str) -> list[str]:
    """Visible forms of a target, most specific first."""
    if uri.startswith("mailto:"):
        return [uri[len("mailto:") :]]
    bare = re.sub(r"^https?://", "", uri)
    return [bare[4:], bare] if bare.startswith("www.") else [bare]


def unused_index(text: str, needle: str, used: list[bool]) -> int | None:
    start = text.find(needle)
    while start != -1:
        if not any(used[start : start + len(needle)]):
            return start
        start = text.find(needle, start + 1)
    return None


def link_rects(cells, start: int, end: int) -> list[pymupdf.Rect]:
    """One rect per page line covered by cells[start:end], padded vertically."""
    rects: list[pymupdf.Rect] = []
    line_id = None
    for _, box, cell_line in cells[start:end]:
        if cell_line != line_id:
            rects.append(pymupdf.Rect(box))
            line_id = cell_line
        else:
            rects[-1] = pymupdf.Rect(
                min(rects[-1].x0, box.x0),
                min(rects[-1].y0, box.y0),
                max(rects[-1].x1, box.x1),
                max(rects[-1].y1, box.y1),
            )
    return [
        pymupdf.Rect(rect.x0 - PAD, rect.y0 - PAD, rect.x1 + PAD, rect.y1 + PAD) for rect in rects
    ]


def uri_links(document: pymupdf.Document) -> list[tuple[pymupdf.Page, dict]]:
    """Every /URI annotation as (owning page, link dict)."""
    return [
        (page, link)
        for page in document
        for link in page.get_links()
        if link["kind"] == pymupdf.LINK_URI
    ]


def place(page: pymupdf.Page, targets: list[str]) -> list[tuple[str, int]]:
    cells = glyphs(page)
    text = "".join(cell[0] for cell in cells)
    used = [False] * len(cells)
    placed = []

    for uri in sorted(targets, key=len, reverse=True):
        spans = []
        for needle in needles(uri):
            while (start := unused_index(text, needle, used)) is not None:
                spans += link_rects(cells, start, start + len(needle))
                used[start : start + len(needle)] = [True] * len(needle)
            if spans:
                break
        if not spans:
            raise SystemExit(f"cannot find {uri!r} in the page text; update scripts/pdf-links.json")

        for rect in spans:
            page.insert_link({"kind": pymupdf.LINK_URI, "from": rect, "uri": uri})
        placed.append((uri, len(spans)))

    return placed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="verify the PDF, do not rewrite it")
    parser.add_argument(
        "--force", action="store_true", help="rebuild a file that already carries links"
    )
    args = parser.parse_args()

    pdf, targets = load_targets()
    document = pymupdf.open(pdf)

    existing = uri_links(document)

    if args.check:
        present = {link["uri"] for _, link in existing}
        missing = [uri for uri in targets if uri not in present]
        if missing:
            print(f"{pdf}: missing {len(missing)} link(s)", file=sys.stderr)
            for uri in missing:
                print(f"  {uri}", file=sys.stderr)
            return 1
        print(f"{pdf}: all {len(targets)} URLs are clickable ({len(existing)} annotations)")
        return 0

    if existing and not args.force:
        print(f"{pdf}: already annotated ({len(existing)} links); pass --force to rebuild")
        return 0

    # Replacing a foreign link layer leaves its annotations unreachable, and an
    # incremental save would keep them as orphans; rewrite so nothing stale ships.
    repair = bool(existing)
    for page, link in existing:
        page.delete_link(link)

    placed = []
    for page in document:
        placed.extend(place(page, targets))

    if repair:
        tmp = pdf.with_suffix(".tmp.pdf")
        document.save(tmp, garbage=4, deflate=1, use_objstms=0)
        document.close()
        os.replace(tmp, pdf)
    else:
        document.saveIncr()
        document.close()

    for uri, count in placed:
        print(f"{uri} -> {count} rect(s)")


if __name__ == "__main__":
    raise SystemExit(main())
