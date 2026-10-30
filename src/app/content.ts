// Facts come from "Bryan Fan Resume.pdf" and the CA activities sheet; see AGENTS.md for boundaries.

export type LinkRef = { label: string; href: string };

export type Entry = {
  title: string;
  period: string;
  status?: string;
  summary: string;
  details?: string[];
  keywords?: string[];
  links: LinkRef[];
};

export type Section = { id: string; label: string; entries: Entry[] };

export const profile = {
  name: "Bryan Fan",
  handle: "@BFladderbean",
  location: "Guangzhou, GD",
  statement:
    "A student, developer, and independent designer exploring the intersections of mathematics, computation, and visual design, driven by curiosity about how complex systems work—and what they overlook.",
  purpose:
    "Supplementary materials for the Additional Information section of my application: research documents, projects, websites, and honors, with links to the originals.",
  contacts: [
    { label: "fannbryan@gmail.com", href: "mailto:fannbryan@gmail.com" },
    { label: "github.com/BFladderbeanawa", href: "https://github.com/BFladderbeanawa" },
    { label: "kaggle.com/BFladderbean", href: "https://www.kaggle.com/BFladderbean" },
  ] satisfies LinkRef[],
};

export const sections: Section[] = [
  {
    id: "research",
    label: "Research",
    entries: [
      {
        title: "PolyProphet — Polymer Property Prediction",
        period: "2025—present",
        status: "Accepted · Scientific Reports",
        summary:
          "Machine learning approaches to predicting polymer properties through feature engineering, molecular representations, and ensemble models.",
        details: [
          "Co-first author on a three-author paper; engineered the features and molecular embeddings.",
          "Related Kaggle work: Kaggle Expert with three competition bronze medals.",
        ],
        keywords: ["Materials Informatics", "XGBoost", "Molecular Embeddings"],
        links: [
          {
            label: "Paper",
            href: "https://drive.google.com/file/d/1I7LqRQnMde9TiYMphCRxn_UjwTn0EVIn/view?usp=sharing",
          },
        ],
      },
      {
        title: "Popularity Bias in Music Recommendation",
        period: "2026—present",
        status: "Unpublished manuscript",
        summary:
          "Investigating how recommendation algorithms influence long-tail music exposure using 48 million user-song interactions.",
        details: [
          "Prepared recommendation data during a NetEase Cloud Music internship (Feb 2026).",
          "Mentor-guided study comparing three models on 48M public records for accuracy and long-tail exposure.",
        ],
        keywords: ["Recommender Systems", "Fairness", "Collaborative Filtering"],
        links: [
          {
            label: "Manuscript",
            href: "https://drive.google.com/file/d/12ryWohrJmsaYzXs7aJrCtETol4K6LJKn/view?usp=sharing",
          },
        ],
      },
      {
        title: "Prophet — Proof Strategy Selection in Lean",
        period: "2026—present",
        status: "Research proposal",
        summary:
          "Exploring sample-efficient proof strategy selection in Lean through decision-making and training transfer.",
        details: [
          "Mentor-guided proposal; chose Lean and sample efficiency as the focus and designed the planned experiments.",
          "Proposal stage: the model experiments have not been run yet.",
        ],
        keywords: ["Formal Verification", "Lean", "Machine Learning"],
        links: [
          {
            label: "Proposal",
            href: "https://drive.google.com/file/d/13B4GiSegvMfw5BQ-wNGcaRP1Qtezc8MY/view?usp=sharing",
          },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    entries: [
      {
        title: "Pic-pred — Sugar Particle Analysis",
        period: "2023—2024",
        summary:
          "Developed an image-based sugar crystal particle-size analysis tool for the Guangdong Sugarcane Research Institute, supporting quantitative analysis of particle granularity from images.",
        links: [{ label: "Repository", href: "https://github.com/BFladderbeanawa/Pic-pred" }],
      },
    ],
  },
  {
    id: "websites",
    label: "Websites",
    entries: [
      {
        title: "Blog @ bfladderbean.me",
        period: "2024—present",
        summary:
          "A self-developed website exploring minimal interfaces, experimental typography, and the intersection of technology and design.",
        details: [
          "Coded a pastel neo-brutalist blog with an editorial grid and oversized type; cursor-following visuals shift in real time.",
          "Same design practice: two recruitment posters and 15–20 staff IDs.",
        ],
        links: [{ label: "bfladderbean.me", href: "https://bfladderbean.me" }],
      },
      {
        title: "HFI Utility Center @ hfiuc.org",
        period: "2023—present",
        summary:
          "A campus classroom reservation platform featuring availability tracking, booking timelines, and conflict detection, since expanded into student services.",
        details: [
          "Founder. Used by all students and teachers, about 2,000 bookings a year.",
          "My code: sole front-end author of booking system v1 and v5, turning booking rules into conflict checks; others led v2 and v3.",
          "My code: the booking-display UI for UtiLink (complete, awaiting school approval).",
          "Product lead: led the launches of the resale marketplace and lost-and-found.",
          "Also in the suite: UtiCloud (awaiting approval, already used by some students); a campus Wi-Fi survey is complete and a router-relocation proposal is pending.",
        ],
        links: [{ label: "hfiuc.org", href: "https://hfiuc.org" }],
      },
      {
        title: "Graduate Texts in Minecraft @ techmc.wiki",
        period: "2023—present",
        summary:
          "A collaborative technical knowledge project documenting Minecraft mechanics, engineering, and source-code behavior.",
        details: [
          "Founder and lead editor: organized the content by domain and coordinated 25 editors.",
          "Wrote the piston source-code analysis; about 400k Chinese characters written, including drafts.",
          "My technical Minecraft video channel has 365k+ total views.",
        ],
        links: [{ label: "techmc.wiki", href: "https://techmc.wiki" }],
      },
    ],
  },
];

export type Honor = {
  title: string;
  note?: string;
  rows: { award: string; year: string }[];
  link?: LinkRef;
};

export const honors: Honor[] = [
  {
    title: "High School Mathematical Contest in Modeling",
    rows: [
      { award: "Honorable Mention", year: "2023" },
      { award: "Honorable Mention", year: "2024" },
      { award: "Meritorious", year: "2025" },
    ],
  },
  {
    title: "FIRST Robotics Competition",
    note: "Team awards, FRC Team 8214 Cyber Unicorn; I worked in scouting and strategy.",
    rows: [
      { award: "Industrial Design Award, Shanghai Regional", year: "2025" },
      { award: "Autonomous Award, Istanbul Regional", year: "2025" },
      { award: "Galileo Division Finalist, World Championship", year: "2025" },
    ],
    link: {
      label: "Galileo playoffs",
      href: "https://frc-events.firstinspires.org/2025/GALILEO/playoffs",
    },
  },
  {
    title: "Hero Legends — Sanda Kickboxing",
    note: "2026 Hero Legends Guangdong Division Points Ranking Tournament and Guangzhou Youth Martial Arts Sanda Kickboxing Open. Issued 2026-05-02.",
    rows: [{ award: "Certificate of Honor", year: "2026" }],
  },
  {
    title: "Other Honors",
    rows: [
      { award: "Conrad Challenge — Pete Conrad Scholar in Cyber Tech & Security", year: "2024" },
      { award: "USACO — Platinum Division", year: "2025" },
      { award: "PicoCTF — Team ranked 132 / 10,460 (top 1.3%)", year: "2025" },
    ],
  },
];

export const resume: LinkRef = { label: "Resume (PDF)", href: "/bryan-fan-resume.pdf" };
