# ResumeNav

For College Application

## Resume PDF

`public/bryan-fan-resume.pdf` is exported from Figma, which writes text frames
without hyperlink annotations (`/Annots []`). Every URL in the export is dead
text, and the three Google Drive URLs wrap onto a second line, so copying them
by hand yields an invalid link too.

`scripts/pdf_links.py` attaches a `/URI` action to the glyph box of every URL
listed in `scripts/pdf-links.json` — one annotation per wrapped line. A fresh
export without links is annotated with an incremental save, so the original
bytes and the rendering stay untouched. An export that already carries a foreign
link layer (some tools add paragraph-sized, duplicated, or missing links) is
repaired instead: its annotations are dropped and the file is rewritten, so no
stale link survives.

```sh
pip install pymupdf
pnpm pdf:links                  # annotate a fresh export; no-op once it has links
pnpm pdf:links -- --force       # replace an export's existing link layer
pnpm pdf:links:check            # exit 1 when a re-export lost its links
```

Re-run it after replacing the PDF with a new Figma export, and update
`scripts/pdf-links.json` when the URLs change. `src/app/resume-pdf.test.ts`
fails if the committed PDF and that list drift apart.
