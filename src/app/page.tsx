import { honors, profile, resume, sections, type Entry, type LinkRef } from "./content";

// Continuous numbering across sections, matching the resume's 01, 02, ... sequence.
const numbered = sections.map((section, s) => {
  const offset = sections.slice(0, s).reduce((n, prev) => n + prev.entries.length, 0);
  return {
    ...section,
    entries: section.entries.map((entry, i) => ({ entry, no: offset + i + 1 })),
  };
});
const honorsOffset = sections.reduce((n, section) => n + section.entries.length, 0);

const nav = [
  ...sections.map(({ id, label }) => ({ id, label })),
  { id: "honors", label: "Honors" },
  { id: "resume", label: "Resume" },
];

const pad = (n: number) => String(n).padStart(2, "0");

// `stretch` extends the link's hit area over the nearest positioned ancestor (the whole entry).
function ExternalLink({ link, stretch = false }: { link: LinkRef; stretch?: boolean }) {
  const external = /^https?:/.test(link.href);
  return (
    <a
      href={link.href}
      className={stretch ? "after:absolute after:inset-0 group-hover:decoration-current" : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
      {external ? <span aria-hidden="true"> ↗</span> : null}
    </a>
  );
}

function SectionHead({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="col-span-12 border-t border-ink pt-3 text-sm font-semibold uppercase tracking-[0.12em] md:col-span-3"
    >
      {label}
    </h2>
  );
}

function EntryBlock({ entry, no }: { entry: Entry; no: number }) {
  return (
    <article className="group relative grid grid-cols-12 gap-x-6 border-t border-rule pt-3 pb-8">
      <p className="col-span-2 text-sm tabular-nums text-body md:col-span-1">{pad(no)}</p>
      <div className="col-span-10 md:col-span-8">
        <h3 className="text-xl leading-snug font-semibold">{entry.title}</h3>
        {entry.status ? (
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em]">{entry.status}</p>
        ) : null}
        <p className="mt-3 leading-relaxed text-body">{entry.summary}</p>
        {entry.details ? (
          <ul className="mt-3 space-y-1.5 leading-relaxed text-body">
            {entry.details.map((d) => (
              <li
                key={d}
                className="relative pl-4 before:absolute before:left-0 before:content-['–']"
              >
                {d}
              </li>
            ))}
          </ul>
        ) : null}
        {entry.keywords ? (
          <p className="mt-3 text-sm text-body">
            <span className="font-semibold text-ink">Keywords</span> {entry.keywords.join(", ")}
          </p>
        ) : null}
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
          {entry.links.map((link, i) => (
            <li key={link.href} className={i > 0 ? "relative z-[1]" : undefined}>
              <ExternalLink link={link} stretch={i === 0} />
            </li>
          ))}
        </ul>
      </div>
      <p className="col-span-10 col-start-3 mt-2 text-sm tabular-nums text-body md:col-span-3 md:col-start-auto md:mt-0 md:text-right">
        {entry.period}
      </p>
    </article>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
      <header className="grid grid-cols-12 gap-x-6 pt-10 pb-14 md:pt-16">
        <div className="col-span-12 md:col-span-7">
          <h1 className="text-5xl leading-none font-semibold tracking-tight md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-body">
            {profile.handle} · {profile.location}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed">{profile.statement}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-body">{profile.purpose}</p>
        </div>
        <ul className="col-span-12 mt-8 space-y-1 text-sm md:col-span-4 md:col-start-9 md:mt-2 md:text-right">
          {profile.contacts.map((link) => (
            <li key={link.href}>
              <ExternalLink link={link} />
            </li>
          ))}
        </ul>
      </header>

      <nav
        aria-label="Sections"
        className="sticky top-0 z-10 -mx-5 mb-12 border-y border-ink bg-paper px-5 md:-mx-10 md:px-10"
      >
        <ol className="flex gap-x-6 overflow-x-auto py-3 text-sm font-semibold whitespace-nowrap">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="no-underline hover:underline">
                <span className="mr-1.5 font-normal text-body tabular-nums">{pad(i + 1)}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main className="space-y-16">
        {numbered.map((section) => (
          <section
            key={section.id}
            aria-labelledby={section.id}
            className="grid grid-cols-12 gap-x-6"
          >
            <SectionHead id={section.id} label={section.label} />
            <div className="col-span-12 mt-4 md:col-span-9 md:mt-0">
              {section.entries.map(({ entry, no }) => (
                <EntryBlock key={entry.title} entry={entry} no={no} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="honors" className="grid grid-cols-12 gap-x-6">
          <SectionHead id="honors" label="Honors" />
          <div className="col-span-12 mt-4 md:col-span-9 md:mt-0">
            {honors.map((honor, i) => (
              <article
                key={honor.title}
                className={`grid grid-cols-12 gap-x-6 border-t border-rule pt-3 pb-8${honor.link ? " group relative" : ""}`}
              >
                <p className="col-span-2 text-sm tabular-nums text-body md:col-span-1">
                  {pad(honorsOffset + i + 1)}
                </p>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="text-xl leading-snug font-semibold">{honor.title}</h3>
                  {honor.note ? (
                    <p className="mt-2 max-w-2xl leading-relaxed text-body">{honor.note}</p>
                  ) : null}
                  <ul className="mt-3">
                    {honor.rows.map((row) => (
                      <li
                        key={row.award + row.year}
                        className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-rule py-1.5 last:border-b-0"
                      >
                        <span>{row.award}</span>
                        <span className="text-sm tabular-nums text-body">{row.year}</span>
                      </li>
                    ))}
                  </ul>
                  {honor.link ? (
                    <p className="mt-3 text-sm font-semibold">
                      <ExternalLink link={honor.link} stretch />
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume" className="grid grid-cols-12 gap-x-6">
          <SectionHead id="resume" label="Resume" />
          <div className="group relative col-span-12 mt-4 border-t border-rule pt-3 md:col-span-9 md:mt-0">
            <p className="max-w-2xl leading-relaxed text-body">
              The one-page resume this page expands on, with the same research and project links.
            </p>
            <p className="mt-3 text-sm font-semibold">
              <ExternalLink link={resume} stretch />
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
