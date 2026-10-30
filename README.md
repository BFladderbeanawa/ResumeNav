# ResumeNav

For College Application

## Resume PDF

`public/bryan-fan-resume.pdf` is exported from Figma, which writes text frames
without hyperlink annotations (`/Annots []`). Every URL in the export is dead
text, and the three Google Drive URLs wrap onto a second line, so copying them
by hand yields an invalid link too.

`scripts/pdf_links.py` attaches a `/URI` action to the glyph box of every URL
listed in `scripts/pdf-links.json` — one annotation per wrapped line — using an
incremental save, so the Figma bytes and the page rendering stay untouched.

```sh
pip install pymupdf
pnpm pdf:links          # annotate; no-op once the file already has links
pnpm pdf:links:check    # exit 1 when a re-export lost its links
```

Re-run it after replacing the PDF with a new Figma export, and update
`scripts/pdf-links.json` when the URLs change. `src/app/resume-pdf.test.ts`
fails if the committed PDF and that list drift apart.
