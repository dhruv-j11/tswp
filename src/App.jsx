import { useState, useEffect, useRef } from "react";

const ACCENT = "#0ea5e9";
const ACCENT_LIGHT = "#e0f2fe";
const ACCENT_MID = "#7dd3fc";
const OFF_WHITE = "#f8fafc";
const DARK = "#0a0a0f";
const GREY = "#64748b";
const LIGHT_GREY = "#e2e8f0";
const WARM_BG = "#faf9f7";
const WARM_BORDER = "#eee9e2";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "donate", label: "Donate" },
  { id: "impact", label: "Impact" },
  { id: "updates", label: "Updates" },
  { id: "contact", label: "Contact" },
];

const IMPACT_STATS = [
  { label: "Funds Raised", value: "\u2014", suffix: "" },
  { label: "Students Involved", value: "4", suffix: "" },
  { label: "People Impacted", value: "363+", suffix: "" },
  { label: "Active Projects", value: "1", suffix: "" },
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Rianyabayo Memorial Academy",
    location: "Nyamesocho, Kenya",
    status: "completed",
    description: "In partnership with Clear Inc. and A Drop of Hope, a UV-LED water purification system was installed to serve 363+ students and staff \u2014 eliminating waterborne pathogens and saving students 2 hours of daily water collection.",
    partner: "Clear Inc. \u00d7 A Drop of Hope \u00d7 UBC",
  },
  {
    id: 2,
    title: "Phase 2 \u2014 Coming Soon",
    location: "TBD",
    status: "upcoming",
    description: "Our next project site is being evaluated. Stay tuned for announcements as we expand to additional communities.",
    partner: "Partner TBD",
  },
];

const VALUES = [
  {
    title: "Real Results First",
    desc: "We care about the water that actually reaches people, not the way it looks on a poster. If it doesn\u2019t work on the ground, it doesn\u2019t count.",
  },
  {
    title: "Student-Led, Expert-Backed",
    desc: "Students run the show. We make the decisions, organize the fundraising, and drive the mission. Experts advise, but we lead.",
  },
  {
    title: "Built to Last",
    desc: "We don\u2019t do band-aid fixes. Every system we fund is designed to serve a community for years, not just long enough for a photo.",
  },
  {
    title: "Open Books",
    desc: "Every dollar is tracked and every report is published. You can see exactly where your money went. No fine print, no surprises.",
  },
];

const TEAM = [
  {
    name: "Valerie Mao", role: "Founder, CEO", img: "team1",
    bio: "Valerie, an Architectural Engineering student at the University of Waterloo founded The Student Water Project\u2122 to bridge the gap between student energy and real world impact.",
    link: "https://www.linkedin.com/in/valerie-mao-903167319/",
  },
  {
    name: "Dhruv Joshi", role: "Co-Founder, CTO", img: "team2",
    bio: "Dhruv, a CS/Math student at the University of Waterloo joined the team as CTO, overseeing technical operations, and leading digital strategy for The Student Water Project.",
    link: "https://www.linkedin.com/in/dhruvjjoshi/",
  },
  {
    name: "Sophia Yenson", role: "Co-Founder, COO", img: "team3",
    bio: "Sophia manages day-to-day operations, coordinates between partners, and keeps the organization running smoothly behind the scenes.",
    link: "",
  },
  {
    name: "Grace Churney", role: "Co-Founder, CMO", img: "team4",
    bio: "Grace leads outreach, communications, and student engagement campaigns that drive awareness and fundraising.",
    link: "",
  },
  {
    name: "Ron Blutrich", role: "Senior Partner", img: "team5",
    bio: "CEO of Clear Inc., Ron brings experience in UV water purification and industry leadership to the project.",
    link: "https://www.linkedin.com/in/ron-blutrich-50262b2a3/",
  },
  {
    name: "Dr. Denise Rebello, PhD", role: "Senior Partner", img: "team6",
    bio: "Dr. Rebello, a Senior Scientist at Clear Inc, provides strategic guidance on future water initiatives.",
    link: "https://www.linkedin.com/in/denise-rebello/",
  },
  {
    name: "Dr. Sara Beck, PhD", role: "Senior Partner", img: "team7",
    bio: "A researcher at UBC, Dr. Beck leads the UV-LED research program and oversees the technical side of field deployments.",
    link: "https://www.linkedin.com/in/sara-beck/",
  },
  {
    name: "Dr. Paul O. Nyangaresi, PhD", role: "Senior Partner", img: "team8",
    bio: "A UBC postdoctoral fellow and researcher, Dr. Nyangaresi leads the deployment of projects alongside Dr. Beck.",
    link: "https://www.linkedin.com/in/paul-onkundi-nyangaresi-b6074341/",
  },
];


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --accent: #0ea5e9; --accent-light: #e0f2fe; --accent-mid: #7dd3fc;
    --dark: #0a0a0f; --grey: #64748b; --off-white: #f8fafc;
    --warm-bg: #faf9f7; --warm-border: #eee9e2;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: var(--dark); background: #fff;
    overflow-x: hidden; -webkit-font-smoothing: antialiased;
  }
  .img-bw { filter: grayscale(100%); transition: filter 0.5s ease; }
  .img-bw:hover, .img-bw-parent:hover .img-bw { filter: grayscale(0%); }

  /* Cursor */
  .cursor-dot {
    position: fixed; width: 20px; height: 20px; border-radius: 50%;
    background: radial-gradient(circle, var(--accent-mid) 0%, transparent 70%);
    pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
    transition: width 0.35s, height 0.35s, opacity 0.35s; opacity: 0.5; mix-blend-mode: multiply;
  }
  .cursor-dot.hovering { width: 56px; height: 56px; opacity: 0.2; }
  .cursor-ring {
    position: fixed; width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid var(--accent); pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%); transition: width 0.5s ease, height 0.5s ease, opacity 0.35s; opacity: 0.2;
  }
  .cursor-ring.hovering { width: 72px; height: 72px; opacity: 0.08; }

  ::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background:rgb(0, 0, 0);
}
::-webkit-scrollbar-thumb {
  background: #7dd3fc;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background:rgb(187, 187, 187);
}

  /* Navbar */
  .nav-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 48px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    backdrop-filter: blur(24px) saturate(1.3);
    -webkit-backdrop-filter: blur(24px) saturate(1.3);
    background: rgba(255,255,255,0.75);
    border-bottom: 1px solid rgba(0,0,0,0.04);
    transition: all 0.4s ease;
  }
  .nav-bar.scrolled {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(32px) saturate(1.5);
    box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  }
  .nav-logo {
    font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
    color: var(--dark); cursor: pointer; display: flex; align-items: center; gap: 10px;
  }
  .nav-logo img { width: 40px; height: 40px; object-fit: contain; }
  .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .nav-links li {
    font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
    color: var(--grey); cursor: pointer; transition: color 0.25s; position: relative;
  }
  .nav-links li:hover, .nav-links li.active { color: var(--dark); }
  .nav-links li.active::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1.5px; background: var(--accent); border-radius: 1px;
  }
  .nav-cta {
    padding: 11px 28px; background: var(--dark); color: #fff !important;
    border-radius: 100px; font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
    transition: all 0.3s; border: none; cursor: pointer; font-family: 'Inter', sans-serif;
  }
  .nav-cta:hover { background: var(--accent); transform: translateY(-1px); }

  /* Mobile */
  .mobile-toggle {
    display: none; background: none; border: none; cursor: pointer;
    width: 28px; height: 20px; position: relative; z-index: 1001;
  }
  .mobile-toggle span {
    display: block; width: 100%; height: 1.5px; background: var(--dark);
    position: absolute; left: 0; transition: all 0.3s;
  }
  .mobile-toggle span:nth-child(1) { top: 0; }
  .mobile-toggle span:nth-child(2) { top: 50%; transform: translateY(-50%); }
  .mobile-toggle span:nth-child(3) { bottom: 0; }
  .mobile-toggle.open span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
  .mobile-toggle.open span:nth-child(2) { opacity: 0; }
  .mobile-toggle.open span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }
  .mobile-menu {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(255,255,255,0.98); backdrop-filter: blur(40px); z-index: 999;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
    opacity: 0; pointer-events: none; transition: opacity 0.4s;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-size: 26px; font-weight: 700; color: var(--dark);
    text-decoration: none; cursor: pointer; transition: color 0.2s; letter-spacing: -0.02em;
  }
  .mobile-menu a:hover { color: var(--accent); }

  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Hero — BIGGER fonts */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    padding: 0 48px; position: relative; overflow: hidden;
  }
  .hero-video-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden;}
  .hero-video-bg video {
    width: 100%; height: 100%; object-fit: cover;
    filter: blur(16px) brightness(0.3); opacity: 0.85; transform: scale(1.08);
  }
  .hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to bottom,
      rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 35%, rgba(10,10,15,0.4) 100%);
  }
  .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
  .hero-overline {
    font-size: 16px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.9); margin-bottom: 32px;
    display: flex; align-items: center; gap: 16px;
  }
  .hero-overline::before, .hero-overline::after {
    content: ''; width: 44px; height: 1.5px; background: rgba(255,255,255,0.4);
  }
  .hero h1 {
    font-size: clamp(56px, 10vw, 120px); font-weight: 900;
    line-height: 0.92; letter-spacing: -0.045em; color: #fff;
    max-width: 1100px; margin-bottom: 30px; margin-top: 10px;
  }
  .hero h1 .accent-word { color: var(--accent-mid); }
  .hero-sub {
    font-size: clamp(17px, 2.2vw, 22px); color: rgba(255,255,255,0.72);
    max-width: 580px; line-height: 1.7; margin-bottom: 56px; font-weight: 400;
  }
  .hero-buttons { display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; }
  .btn-primary {
    padding: 20px 52px; background: #fff; color: #0a0a0f;
    border: none; border-radius: 100px; font-size: 15px; font-weight: 700;
    letter-spacing: 0.04em; cursor: pointer; font-family: 'Inter', sans-serif;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); text-transform: uppercase;
  }
  .btn-primary:hover {
    background: var(--accent); color: #fff;
    transform: translateY(-2px); box-shadow: 0 12px 40px -8px rgba(14,165,233,0.4);
  }
  .btn-secondary {
    padding: 20px 52px; background: transparent; color: #fff;
    border: 1.5px solid rgba(255,255,255,0.45); border-radius: 100px;
    font-size: 15px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }
  .btn-secondary:hover { background: #fff; color: #0a0a0f; transform: translateY(-2px); }
  .btn-dark {
    padding: 18px 48px; background: #0a0a0f; color: #fff;
    border: none; border-radius: 100px; font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em; cursor: pointer; font-family: 'Inter', sans-serif;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); text-transform: uppercase;
  }
  .btn-dark:hover {
    background: var(--accent); transform: translateY(-2px);
    box-shadow: 0 12px 40px -8px rgba(14,165,233,0.35);
  }
  .btn-outline {
    padding: 18px 48px; background: transparent; color: var(--dark);
    border: 1.5px solid var(--dark); border-radius: 100px;
    font-size: 14px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer;
    transition: all 0.35s; text-transform: uppercase; font-family: 'Inter', sans-serif;
  }
  .btn-outline:hover { background: var(--dark); color: #fff; transform: translateY(-2px); }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: scrollFloat 2.5s ease-in-out infinite;
  }
  .hero-scroll span { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); font-weight: 500; }
  .hero-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent); }
  @keyframes scrollFloat {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(10px); }
  }

  /* Mascot */
  .mascot { pointer-events: none; position: absolute; z-index: 10; }
  .mascot img { width: 100%; height: 100%; object-fit: contain; }
  .mascot-float { animation: mascotBob 4s ease-in-out infinite; }
  @keyframes mascotBob {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-14px) rotate(3deg); }
  }
  .mascot-wander { animation: mascotWander 12s ease-in-out infinite; opacity: 0.12; }
  @keyframes mascotWander {
    0% { transform: translate(0, 0) rotate(-5deg); }
    25% { transform: translate(80px, -40px) rotate(5deg); }
    50% { transform: translate(-60px, -80px) rotate(-3deg); }
    75% { transform: translate(40px, 20px) rotate(8deg); }
    100% { transform: translate(0, 0) rotate(-5deg); }
  }

  /* Big Nerd background character */
  .big-nerd {
    position: absolute; pointer-events: none; z-index: 0;
    opacity: 0.18; filter: blur(8px);
  }
  .big-nerd img { width: 100%; height: 100%; object-fit: contain; }
  .big-nerd-drift {
    animation: nerdDrift 20s ease-in-out infinite;
  }
  @keyframes nerdDrift {
    0% { transform: translate(0, 0) rotate(-35deg); }
    25% { transform: translate(-15px, 20px) rotate(-33deg); }
    50% { transform: translate(10px, -15px) rotate(-37deg); }
    75% { transform: translate(-10px, 10px) rotate(-34deg); }
    100% { transform: translate(0, 0) rotate(-35deg); }
  }

  /* Nerd peeking from card */
  .nerd-peek {
    position: absolute; z-index: 20; pointer-events: none;
    width: 60px; height: 60px;
    top: -20px; left: 75%;
  }
  .nerd-peek img { width: 100%; height: 100%; object-fit: contain; }

  /* Sections */
  .section { padding: 160px 48px; max-width: 1200px; margin: 0 auto; position: relative; }
  .section-wide { padding: 160px 48px; position: relative; }
  .section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 20px;
  }
  .section-title {
    font-size: clamp(38px, 5.5vw, 68px); font-weight: 800;
    letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 24px; color: var(--dark);
  }
  .section-subtitle {
    font-size: 17px; color: var(--grey); max-width: 560px;
    line-height: 1.75; margin-bottom: 72px; font-weight: 400;
  }

  /* Stats */
  .stats-bar { background: var(--warm-bg); border-top: 1px solid var(--warm-border); border-bottom: 1px solid var(--warm-border); position: relative; }
  .stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    max-width: 1200px; margin: 0 auto; padding: 80px 48px; text-align: center; gap: 24px;
  }
  .stat-item h3 { font-size: clamp(40px, 5vw, 60px); font-weight: 800; color: var(--dark); margin-bottom: 10px; letter-spacing: -0.03em; }
  .stat-item h3 span { color: var(--accent); }
  .stat-item p { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey); }

  /* Steps */
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; position: relative; }
  .steps-grid::before {
    content: ''; position: absolute; top: 48px;
    left: calc(16.67% + 32px); right: calc(16.67% + 32px); height: 1px;
    background: linear-gradient(to right, transparent, var(--warm-border), var(--warm-border), transparent);
  }
  .step-card { text-align: center; position: relative; }
  .step-number {
    width: 96px; height: 96px; border-radius: 50%; background: var(--warm-bg);
    border: 1.5px solid var(--warm-border); display: flex; align-items: center; justify-content: center;
    font-size: 36px; font-weight: 800; color: var(--accent);
    margin: 0 auto 32px; position: relative; z-index: 1; transition: all 0.35s;
  }
  .step-card:hover .step-number { border-color: var(--accent); background: var(--accent-light); transform: scale(1.06); }
  .step-card h4 { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: var(--dark); letter-spacing: -0.02em; }
  .step-card p { font-size: 15px; color: var(--grey); line-height: 1.7; max-width: 280px; margin: 0 auto; }


  /* Featured Project */
  .featured-project {
    background: var(--warm-bg); border-radius: 28px; padding: 72px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
    border: 1px solid var(--warm-border); overflow: visible; position: relative;
  }
  .fp-visual {
    aspect-ratio: 4/3; border-radius: 20px; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    position: relative; background: linear-gradient(135deg, #dbeafe 0%, var(--accent-light) 100%);
  }
  .fp-visual img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .fp-details h3 { font-size: 36px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.03em; }
  .fp-location { font-size: 14px; color: var(--accent); font-weight: 600; margin-bottom: 24px; }
  .fp-desc { font-size: 16px; color: var(--grey); line-height: 1.75; margin-bottom: 36px; }
  .fp-status-badge {
    display: inline-block; padding: 7px 18px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    background: rgba(16,185,129,0.1); color: #10b981; margin-bottom: 24px;
  }
  .fp-partner { font-size: 13px; color: var(--grey); margin-top: 24px; font-weight: 500; border-top: 1px solid var(--warm-border); padding-top: 20px; }
  .fp-links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .fp-links a { text-decoration: none; }

  /* About */
  .about-bg { background: var(--warm-bg); border-top: 1px solid var(--warm-border); border-bottom: 1px solid var(--warm-border); position: relative; overflow: hidden; }
  .about-content { max-width: 1200px; margin: 0 auto; padding: 160px 48px; position: relative; z-index: 1; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-bottom: 120px; }
  .about-text p { font-size: 17px; color: var(--grey); line-height: 1.8; margin-bottom: 24px; }
  .about-text p strong { color: var(--dark); }
  .about-uv { background: #fff; border: 1px solid var(--warm-border); border-radius: 24px; padding: 48px; }
  .about-uv h4 { font-size: 22px; font-weight: 800; margin-bottom: 20px; color: var(--dark); letter-spacing: -0.02em; }
  .about-uv p { font-size: 15px; color: var(--grey); line-height: 1.75; margin-bottom: 14px; }
  .about-uv .highlight-box {
    background: var(--accent-light); border-left: 3px solid var(--accent);
    padding: 20px 24px; border-radius: 0 12px 12px 0;
    margin-top: 20px; font-size: 15px; color: var(--dark); line-height: 1.65;
  }

  /* Team — Flip Cards */
  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; margin-bottom: 120px; }
  .flip-card { perspective: 800px; cursor: pointer; }
  .flip-card-inner {
    position: relative; width: 100%; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  .flip-card-inner.flipped { transform: rotateY(180deg); }
  .flip-card-front, .flip-card-back {
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
  }
  .flip-card-back {
    position: absolute; top: 0; left: 0; right: 0;
    transform: rotateY(180deg);
    background: #fff; border: 1px solid var(--warm-border); border-radius: 20px;
    padding: 28px 24px; display: flex; flex-direction: column; justify-content: center;
    min-height: 100%; overflow: hidden;
  }
  .flip-card-back h4 { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
  .flip-card-back p { font-size: 13px; color: var(--grey); line-height: 1.6; margin-bottom: 14px; }
  .flip-card-back .flip-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700; color: var(--accent);
    text-decoration: none; letter-spacing: 0.03em;
  }
  .flip-card-back .flip-link:hover { text-decoration: underline; }
  .flip-timer {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--accent-light); overflow: hidden; border-radius: 0 0 20px 20px;
  }
  .flip-timer-bar {
    height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-mid));
    transition: width 0.1s linear;
  }
  .team-card-img {
    width: 100%; aspect-ratio: 1;
    background: linear-gradient(135deg, #e8e4df 0%, #f3f1ee 100%);
    border-radius: 20px; margin-bottom: 18px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative; transition: all 0.4s ease; border: 1px solid var(--warm-border);
  }
  .flip-card:hover .team-card-img {
    transform: translateY(-6px); box-shadow: 0 20px 56px -16px rgba(0,0,0,0.1); border-color: var(--accent-mid);
  }
  .team-card-img span { font-size: 11px; font-weight: 600; color: var(--grey); letter-spacing: 0.04em; text-transform: uppercase; }
  .team-card-img img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .team-card-text { text-align: center; }
  .team-card-text h4 { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 5px; }
  .team-card-text p { font-size: 13px; color: var(--accent); font-weight: 600; }

  /* Values */
  .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
  .value-card {
    padding: 40px 32px; background: #fff; border: 1px solid var(--warm-border);
    border-radius: 20px; transition: all 0.35s ease; position: relative; overflow: hidden;
  }
  .value-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-mid));
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .value-card:hover::before { transform: scaleX(1); }
  .value-card:hover { border-color: var(--accent-mid); transform: translateY(-4px); box-shadow: 0 20px 56px -16px rgba(14,165,233,0.1); }
  .value-card h4 { font-size: 18px; font-weight: 800; margin-bottom: 12px; color: var(--dark); }
  .value-card p { font-size: 15px; color: var(--grey); line-height: 1.65; }

  /* Projects */
  .projects-bg-img { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .projects-bg-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) blur(3px); opacity: 0.3; transform: scale(1.1); }
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
  .project-card { border: 1px solid var(--warm-border); border-radius: 24px; overflow: hidden; transition: all 0.35s ease; background: #fff; }
  .project-card:hover { transform: translateY(-6px); box-shadow: 0 24px 64px -16px rgba(0,0,0,0.1); border-color: var(--accent-mid); }
  .project-card-img { height: 240px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .project-card-img img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .project-card-img.completed-bg { background: linear-gradient(135deg, #dbeafe 0%, var(--accent-light) 100%); }
  .project-card-img.upcoming-bg { background: linear-gradient(135deg, #f3f1ee 0%, #e8e4df 100%); }
  .card-placeholder { font-size: 12px; font-weight: 600; color: var(--accent); letter-spacing: 0.04em; text-transform: uppercase; background: rgba(255,255,255,0.6); padding: 8px 18px; border-radius: 6px; z-index: 1; }
  .status-badge { position: absolute; top: 18px; right: 18px; padding: 6px 16px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; z-index: 2; }
  .status-badge.completed { background: rgba(16,185,129,0.12); color: #10b981; }
  .status-badge.upcoming { background: rgba(100,116,139,0.08); color: var(--grey); }
  .project-card-body { padding: 36px; }
  .project-card-body h4 { font-size: 24px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
  .project-card-body .loc { font-size: 13px; color: var(--accent); font-weight: 600; margin-bottom: 14px; }
  .project-card-body .desc { font-size: 15px; color: var(--grey); line-height: 1.7; margin-bottom: 24px; }
  .project-card-body .project-links { display: flex; gap: 10px; flex-wrap: wrap; }
  .project-card-body .project-links a { text-decoration: none; flex: 1; min-width: 0; }
  .project-card-body .project-links button { width: 100%; font-size: 13px; padding: 14px 20px; }

  /* Donate */
  .donate-bg-img { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .donate-bg-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) blur(6px); opacity: 0.2; transform: scale(1.1); }
  .donate-section {
    background: linear-gradient(160deg, var(--warm-bg) 0%, #f0f4f8 50%, var(--accent-light) 100%);
    position: relative; overflow: hidden;
    border-top: 1px solid var(--warm-border); border-bottom: 1px solid var(--warm-border);
  }
  .donate-section::before {
    content: ''; position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%);
  }
  .donate-inner {
    max-width: 1200px; margin: 0 auto; padding: 160px 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; position: relative; z-index: 1;
  }
  .donate-text .section-label { color: var(--accent); }
  .donate-text .section-title { color: var(--dark); }
  .donate-text p { font-size: 17px; color: var(--grey); line-height: 1.75; margin-bottom: 24px; }
  .donate-impact-note {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 22px 26px; background: #fff;
    border: 1px solid var(--warm-border); border-radius: 18px;
    font-size: 15px; color: var(--grey); line-height: 1.6;
  }
  .donate-impact-note img { width: 28px; height: 28px; flex-shrink: 0; margin-top: 2px; }
  .donate-card {
    background: #fff; border: 1px solid var(--warm-border);
    border-radius: 28px; padding: 48px;
    box-shadow: 0 8px 40px -12px rgba(0,0,0,0.06);
  }
  .donate-toggle { display: flex; background: var(--warm-bg); border-radius: 100px; padding: 5px; margin-bottom: 32px; }
  .donate-toggle button {
    flex: 1; padding: 12px; border: none; border-radius: 100px;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s;
    color: var(--grey); background: transparent; font-family: 'Inter', sans-serif;
  }
  .donate-toggle button.active { background: var(--accent); color: #fff; box-shadow: 0 4px 16px -4px rgba(14,165,233,0.3); }
  .amount-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 16px; }
  .amount-btn {
    padding: 20px; border: 1.5px solid var(--warm-border);
    border-radius: 16px; background: var(--warm-bg); color: var(--dark);
    font-size: 22px; font-weight: 700; cursor: pointer;
    transition: all 0.25s; font-family: 'Inter', sans-serif;
  }
  .amount-btn:hover, .amount-btn.selected { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
  .custom-amount {
    width: 100%; padding: 18px 20px; border: 1.5px solid var(--warm-border);
    border-radius: 16px; background: var(--warm-bg); color: var(--dark);
    font-size: 16px; font-family: 'Inter', sans-serif;
    margin-bottom: 20px; outline: none; transition: border-color 0.3s;
  }
  .custom-amount::placeholder { color: #b8b0a8; }
  .custom-amount:focus { border-color: var(--accent); }
  .donate-submit {
    width: 100%; padding: 20px; background: var(--accent); color: #fff;
    border: none; border-radius: 100px; font-size: 15px; font-weight: 800;
    letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer;
    transition: all 0.35s; font-family: 'Inter', sans-serif;
  }
  .donate-submit:hover { background: #0284c7; transform: translateY(-2px); box-shadow: 0 12px 36px -6px rgba(14,165,233,0.4); }
  .donate-trust { text-align: center; font-size: 12px; color: var(--grey); margin-top: 18px; opacity: 0.7; }
  .donate-disclaimer { text-align: center; font-size: 11px; color: var(--grey); margin-top: 10px; opacity: 0.6; font-style: italic; }

  /* Placeholder */
  .placeholder-page {
    min-height: 70vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 180px 48px 140px; position: relative; overflow: hidden;
  }
  .placeholder-page h2 { font-size: 44px; font-weight: 800; margin-bottom: 16px; color: var(--dark); letter-spacing: -0.03em; }
  .placeholder-page p { font-size: 16px; color: var(--grey); max-width: 440px; line-height: 1.7; }
  .placeholder-mascot {
    position: absolute; width: 180px; height: 180px;
    top: 50%; left: 50%; margin-left: -90px; margin-top: -90px;
    pointer-events: none; z-index: 0;
  }
  .placeholder-mascot img { width: 100%; height: 100%; object-fit: contain; }

  /* Contact */
  .contact-bg-img { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .contact-bg-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) blur(3px); opacity: 0.1; transform: scale(1.1); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .contact-form { display: flex; flex-direction: column; gap: 24px; }
  .form-group label { display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey); margin-bottom: 10px; }
  .form-group input, .form-group textarea, .form-group select {
    width: 100%; padding: 16px 20px; border: 1.5px solid var(--warm-border);
    border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--dark); background: var(--warm-bg); outline: none; transition: border-color 0.3s;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--accent); background: #fff; }
  .form-group textarea { min-height: 150px; resize: vertical; }
  .contact-right h3 { font-size: 32px; font-weight: 800; margin-bottom: 20px; letter-spacing: -0.03em; }
  .contact-right p { font-size: 16px; color: var(--grey); line-height: 1.75; margin-bottom: 36px; }
  .contact-detail { display: flex; align-items: center; gap: 16px; font-size: 15px; color: var(--grey); margin-bottom: 20px; }
  .contact-detail .cd-icon {
    width: 44px; height: 44px; background: var(--accent-light); border-radius: 14px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .contact-detail .cd-icon img { width: 20px; height: 20px; object-fit: contain; }
  .form-success { padding: 20px 24px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 14px; color: #10b981; font-weight: 600; font-size: 15px; text-align: center; }

  /* Chatbot */
  .chatbot-bubble {
    position: fixed; bottom: 28px; right: 28px; z-index: 900;
    width: 52px; height: 52px; border-radius: 50%;
    background: #fff; border: 1px solid var(--warm-border);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px -4px rgba(0,0,0,0.08); transition: all 0.35s; overflow: hidden;
  }
  .chatbot-bubble img { width: 30px; height: 30px; object-fit: contain; }
  .chatbot-bubble .close-x { font-size: 18px; color: var(--grey); font-weight: 600; }
  .chatbot-bubble:hover { transform: translateY(-2px); box-shadow: 0 8px 32px -4px rgba(0,0,0,0.12); border-color: var(--accent-mid); }
  .chatbot-panel {
    position: fixed; bottom: 92px; right: 28px; z-index: 901;
    width: 280px; max-height: 580px; background: #fff;
    border: 1px solid var(--warm-border); border-radius: 28px;
    box-shadow: 0 20px 60px -16px rgba(0,0,0,0.12);
    overflow: hidden; opacity: 0; transform: translateY(12px) scale(0.97);
    pointer-events: none; transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .chatbot-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
  .chatbot-header { padding: 24px 28px; background: var(--warm-bg); border-bottom: 1px solid var(--warm-border); display: flex; align-items: center; gap: 14px; }
  .chatbot-header img { width: 32px; height: 32px; object-fit: contain; }
  .chatbot-header-text h4 { font-size: 14px; font-weight: 700; color: var(--dark); }
  .chatbot-header-text p { font-size: 12px; color: var(--grey); }
  .chatbot-body { padding: 28px; }
  .chat-msg { padding: 18px 22px; border-radius: 20px 20px 20px 6px; background: var(--warm-bg); font-size: 14px; line-height: 1.65; color: var(--dark); }
  .chatbot-input-area { padding: 18px; border-top: 1px solid var(--warm-border); display: flex; gap: 10px; }
  .chatbot-input-area input { flex: 1; padding: 12px 18px; border: 1.5px solid var(--warm-border); border-radius: 100px; font-size: 13px; font-family: 'Inter', sans-serif; outline: none; background: var(--warm-bg); }
  .chatbot-input-area button { width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--accent-light); color: var(--accent); cursor: not-allowed; display: flex; align-items: center; justify-content: center; font-size: 16px; opacity: 0.5; }

  /* Footer */
  .footer { background: var(--dark); color: rgba(255,255,255,0.45); padding: 96px 48px 48px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .footer-brand h3 { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .footer-brand h3 img { width: 26px; height: 26px; object-fit: contain; }
  .footer-brand p { font-size: 14px; line-height: 1.7; max-width: 280px; }
  .footer-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 20px; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .footer-col li { font-size: 14px; cursor: pointer; transition: color 0.2s; }
  .footer-col li:hover { color: #fff; }
  .footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }

  /* ── Mobile Responsive ── */
  @media (max-width: 1024px) {
    .nav-links { gap: 20px; }
    .nav-links li { font-size: 12px; }
    .featured-project { padding: 48px; gap: 48px; }
    .donate-inner { gap: 56px; }
  }
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .mobile-toggle { display: block; }
    .nav-bar { padding: 0 24px; }
    .hero { padding: 0 28px; }
    .hero h1 { font-size: clamp(40px, 10vw, 72px); }
    .hero-overline { font-size: 13px; letter-spacing: 0.18em; }
    .hero-sub { font-size: 16px; max-width: 440px; margin-bottom: 40px; }
    .btn-primary, .btn-secondary { padding: 16px 36px; font-size: 13px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); padding: 56px 28px; gap: 32px; }
    .stat-item h3 { font-size: 36px; }
    .section { padding: 100px 28px; }
    .section-wide { padding: 100px 28px; }
    .section-title { font-size: clamp(30px, 6vw, 48px); }
    .steps-grid { grid-template-columns: 1fr; gap: 40px; }
    .steps-grid::before { display: none; }
    .featured-project { grid-template-columns: 1fr; padding: 32px; gap: 32px; }
    .fp-details h3 { font-size: 28px; }
    .about-content { padding: 100px 28px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .team-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .flip-card-back { padding: 20px 16px; }
    .flip-card-back h4 { font-size: 13px; }
    .flip-card-back p { font-size: 12px; }
    .values-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .value-card { padding: 28px 20px; }
    .value-card h4 { font-size: 16px; }
    .value-card p { font-size: 14px; }
    .projects-grid { grid-template-columns: 1fr; }
    .donate-inner { grid-template-columns: 1fr; gap: 48px; padding: 100px 28px; }
    .donate-card { padding: 32px; }
    .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
    .footer { padding: 64px 28px 36px; }
    .cursor-dot, .cursor-ring { display: none; }
    .mascot, .big-nerd { display: none; }
    .nerd-peek { display: none; }
    .chatbot-panel { width: calc(100% - 32px); right: 16px; bottom: 80px; }
  }
  @media (max-width: 600px) {
    .nav-bar { padding: 0 16px; height: 64px; }
    .nav-logo { font-size: 13px; gap: 8px; }
    .nav-logo img { width: 28px; height: 28px; }
    .hero h1 { font-size: 36px; margin-bottom: 24px; }
    .hero-overline { font-size: 11px; margin-bottom: 20px; }
    .hero-sub { font-size: 15px; margin-bottom: 32px; }
    .hero-buttons { flex-direction: column; width: 100%; max-width: 320px; }
    .btn-primary, .btn-secondary { width: 100%; text-align: center; padding: 16px 24px; }
    .hero-scroll { bottom: 24px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); padding: 40px 20px; gap: 24px; }
    .stat-item h3 { font-size: 28px; }
    .stat-item p { font-size: 10px; }
    .section { padding: 80px 20px; }
    .section-wide { padding: 80px 20px; }
    .section-title { font-size: 28px; }
    .section-subtitle { font-size: 15px; margin-bottom: 48px; }
    .step-number { width: 72px; height: 72px; font-size: 28px; }
    .step-card h4 { font-size: 17px; }
    .step-card p { font-size: 14px; }
    .featured-project { padding: 24px; gap: 24px; border-radius: 20px; }
    .fp-details h3 { font-size: 24px; }
    .fp-desc { font-size: 14px; }
    .btn-dark { padding: 16px 32px; font-size: 13px; }
    .about-content { padding: 80px 20px; }
    .about-text p { font-size: 15px; }
    .about-uv { padding: 28px; border-radius: 16px; }
    .about-uv h4 { font-size: 18px; }
    .about-uv p { font-size: 14px; }
    .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .team-card-img { border-radius: 14px; }
    .team-card-text h4 { font-size: 14px; }
    .team-card-text p { font-size: 11px; }
    .values-grid { grid-template-columns: 1fr; }
    .project-card { border-radius: 16px; }
    .project-card-img { height: 180px; }
    .project-card-body { padding: 24px; }
    .project-card-body h4 { font-size: 20px; }
    .project-card-body .desc { font-size: 14px; }
    .donate-inner { padding: 80px 20px; }
    .donate-card { padding: 24px; border-radius: 20px; }
    .amount-btn { padding: 16px; font-size: 18px; }
    .donate-text .section-title { font-size: 28px; }
    .placeholder-page { padding: 140px 20px 100px; }
    .placeholder-page h2 { font-size: 32px; }
    .contact-right h3 { font-size: 24px; }
    .footer-inner { grid-template-columns: 1fr; gap: 24px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; font-size: 11px; }
    .chatbot-bubble { width: 46px; height: 46px; bottom: 20px; right: 20px; }
    .chatbot-bubble img { width: 24px; height: 24px; }
    .mobile-menu a { font-size: 22px; }
  }
`;


// ─── Utility Components ──────────────────────────────────────────

function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    const handleMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      setHovering(!!e.target.closest('button, a, .nav-links li, .project-card, .value-card, .amount-btn, .flip-card'));
    };
    const animate = () => {
      dotX += (mouseX - dotX) * 0.18; dotY += (mouseY - dotY) * 0.18;
      ringX += (mouseX - ringX) * 0.07; ringY += (mouseY - ringY) * 0.07;
      if (dotRef.current) { dotRef.current.style.left = dotX + 'px'; dotRef.current.style.top = dotY + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = ringX + 'px'; ringRef.current.style.top = ringY + 'px'; }
      requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', handleMove);
    animate();
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Mascot({ size = 80, top, bottom, left, right, style = {} }) {
  return (
    <div className="mascot mascot-float" style={{ width: size, height: size, top, bottom, left, right, ...style }}>
      <img src="/Water_Droplet_Waving.png" alt="" />
    </div>
  );
}

function CustomMascot({ src, size=56, top, bottom, left, right, style={} }) {
  return(<div className="mascot mascot-float" style={{width:size,height:size,top,bottom,left,right,...style}}><img src={src} alt=""/></div>);
}


function BigNerd({ width = 500, top, bottom, left, right, rotate = -45, opacity = 0.18, drift = false, style = {} }) {
  return (
    <div
      className={`big-nerd ${drift ? 'big-nerd-drift' : ''}`}
      style={{
        width, height: width, top, bottom, left, right,
        opacity,
        transform: drift ? undefined : `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <img src="/nerd-water.png" alt="" />
    </div>
  );
}

function FlipTeamCard({ member, delay = 0 }) {
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef(null);
  const handleClick = () => {
    if (!flipped) {
      setFlipped(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setFlipped(false), 7000);
    }
  };
  useEffect(() => { return () => { if (timerRef.current) clearTimeout(timerRef.current); }; }, []);
  return (
    <Reveal delay={delay}>
      <div className="flip-card img-bw-parent" onClick={handleClick}>
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front">
            <div className="team-card-img">
              <img className="img-bw" src={`/team/${member.img}.png`} alt={member.name} />
              <span>{member.img}</span>
            </div>
            <div className="team-card-text"><h4>{member.name}</h4><p>{member.role}</p></div>
          </div>
          <div className="flip-card-back">
            <h4>{member.name}</h4>
            <p>{member.bio}</p>
            <a className="flip-link" href={member.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>LinkedIn / Portfolio &rarr;</a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page Components ─────────────────────────────────────────────

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const go = (id) => { setPage(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <>
      <nav className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => go('home')}>
          <img src="/nerd-water.png" alt="TSWP" />
          <span>The Student Water Project&#8482;</span>
        </div>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className={page === item.id ? 'active' : ''} onClick={() => go(item.id)}>{item.label}</li>
          ))}
          <li><button className="nav-cta" onClick={() => go('donate')}>Donate</button></li>
        </ul>
        <button className={`mobile-toggle ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a key={item.id} onClick={() => go(item.id)}>{item.label}</a>
        ))}
      </div>
    </>
  );
}

function HeroSection({ setPage }) {
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = 0.9 ; }, []);
  return (
    <section className="hero">
      <div className="hero-video-bg">
      <video ref={videoRef} autoPlay muted loop playsInline>
          <source src="/waterfootage.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <Reveal><div className="hero-overline">Students for Students</div></Reveal>
        <Reveal delay={120}><h1>The Student<br /><span className="accent-word">Water</span> Project</h1></Reveal>
        <Reveal delay={240}>
          <p className="hero-sub">We fundraise, partner with engineers, and bring UV water purification to communities that need it most.</p>
        </Reveal>
        <Reveal delay={360}>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setPage('donate')}>Donate Now</button>
            <button className="btn-secondary" onClick={() => setPage('projects')}>Our Projects</button>
          </div>
        </Reveal>
      </div>
      <div className="hero-scroll"><span>Scroll</span><div className="hero-scroll-line" /></div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-grid">
        {IMPACT_STATS.map((stat, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="stat-item">
              <h3>{stat.value}<span>{stat.suffix}</span></h3>
              <p>{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", title: "Students Fundraise", desc: "Student teams organize campaigns at their schools and communities to raise funds for a listed project." },
    { num: "2", title: "Funds Are Allocated", desc: "100% of donations go to said listed projects. Full transparency is provided for every dollar raised." },
    { num: "3", title: "Partner Engineers Build", desc: "Engineering partners and teams handle the installation of UV purification systems on project sites." },
  ];
  return (
    <div className="section" style={{ overflow: 'hidden' }}>
      <Reveal><div className="section-label">How It Works</div></Reveal>
      <Reveal delay={50}><h2 className="section-title">Three steps to<br />cleaner, accessible water.</h2></Reveal>
      <Reveal delay={100}><p className="section-subtitle">We raise awareness and funding. Our partners handle the engineering. Communities benefit with clean water.</p></Reveal>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="step-card">
              <div className="step-number">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject() {
  const p = PROJECTS_DATA[0];
  return (
    <div className="section">
      <Reveal><div className="section-label">Featured Project</div></Reveal>
      <Reveal delay={50}><h2 className="section-title" style={{ marginBottom: 64 }}>Our first partnership.</h2></Reveal>
      <Reveal delay={100}>
        <div className="featured-project">
          <div className="fp-visual img-bw-parent">
            <img className="img-bw" src="/kenya1.png" alt="Rianyabayo Memorial Academy" />
          </div>
          <div className="fp-details">
            <div className="fp-status-badge">Completed</div>
            <h3>{p.title}</h3>
            <div className="fp-location">Nyamesocho, Kenya</div>
            <p className="fp-desc">{p.description}</p>
            <div className="fp-links">
              <a href="https://www.clear.inc/case-studies/uv-led-water-purification-system-in-remote-kenyan-community" target="_blank" rel="noopener noreferrer">
                <button className="btn-dark" style={{ fontSize: 12, padding: '14px 28px' }}>Clear Inc. Report</button>
              </a>
              <a href="https://news.ubc.ca/2024/11/ubc-researcher-brings-clean-water-home-to-kenyan-school/" target="_blank" rel="noopener noreferrer">
                <button className="btn-outline" style={{ fontSize: 12, padding: '14px 28px' }}>UBC Report</button>
              </a>
            </div>
            <p className="fp-partner">In partnership with {p.partner}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <StatsBar />
      <HowItWorks />
      <div style={{position:'relative',height:0}}><CustomMascot src="/nerd-water.png" size={276} top={-80} right={160} style={{opacity:0.2}}/></div>
      <FeaturedProject />
      <div style={{position:'relative',height:0}}><CustomMascot src="/fundsallocated.png" size={180} top={-80} left="45%" style={{opacity:0.3}}/></div>
      <div className="section" style={{ textAlign: 'center', paddingBottom: 100, position: 'relative' }}>
        <Reveal><h2 className="section-title" style={{ marginBottom: 20 }}>Ready to make a difference?</h2></Reveal>
        <Reveal delay={80}><p className="section-subtitle" style={{ margin: '0 auto 52px' }}>
          Support and join The Student Water Project&#8482; today.
        </p></Reveal>
        <Reveal delay={160}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-dark" onClick={() => setPage('donate')}>Donate Now</button>
            <button className="btn-outline" onClick={() => setPage('contact')}>Get Involved</button>
          </div>
        </Reveal>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <div className="about-bg">
      <BigNerd width={700} top={200} right={-250} rotate={-35} opacity={0.08} drift={true} />
      <div className="about-content">
      <CustomMascot src="/studentsfundraise.png" size={252} top={180} right={-50} style={{opacity:0.25}}/>
        <Reveal><div className="section-label">About</div></Reveal>
        <Reveal delay={50}><h2 className="section-title">Students building solutions,<br />not just awareness</h2></Reveal>
        <Reveal delay={100}><p className="section-subtitle">We fund and build real infrastructure, in partnership with world-class engineers.</p></Reveal>
        <div className="about-grid">
          <Reveal>
            <div className="about-text">
              <p><strong>The Student Water Project&#8482;</strong> is a student-led initiative that partners with professional engineers to deploy UV water purification systems in schools and communities that lack access to clean drinking water.</p>
              <p>Students lead fundraising efforts at their schools and communities. Every dollar raised goes directly toward a specific, verified project. Partner engineers, currently <strong>Clear Inc.</strong>, a Canadian UV purification company, handle the technical implementation.</p>
              <p>We work alongside <strong>A Drop of Hope</strong>, led by Dr. Paul Nyangaresi, and the research team at <strong>UBC</strong> led by Dr. Sara Beck, to identify communities with the greatest need and coordinate on-the-ground deployment.</p>
              <p>Students receive impact reports, track project progress, and see exactly where their effort goes. Education through action.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="about-uv">
              <h4>Why UV Water Treatment?</h4>
              <p>Ultraviolet purification destroys 99.99% of harmful pathogens without chemicals, filters, or complex maintenance.</p>
              <p>Unlike chlorine, UV leaves no taste or odor. Unlike boiling, it requires minimal energy. A single UV-LED system can serve an entire school for years with very little upkeep.</p>
              <div className="highlight-box">
                <strong>Proven in the field:</strong> A UV-LED system installed at Rianyabayo Memorial Academy in Kenya, in partnership with Clear Inc. and UBC, eliminated E. coli from the water supply, with 95% of respondents rating water quality as excellent after installation.
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal><div className="section-label" style={{ marginTop: 20 }}>Our Team</div></Reveal>
        <Reveal delay={50}><h3 className="section-title" style={{ fontSize: 'clamp(30px, 4vw, 48px)', marginBottom: 56 }}>The people behind the project</h3></Reveal>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <FlipTeamCard key={i} member={member} delay={i * 60} />
          ))}
        </div>
        <Reveal><div className="section-label" style={{ marginTop: 20 }}>Our Values</div></Reveal>
        <Reveal delay={50}><h3 className="section-title" style={{ fontSize: 'clamp(30px, 4vw, 48px)', marginBottom: 48 }}>What we stand for</h3></Reveal>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="value-card"><h4>{v.title}</h4><p>{v.desc}</p></div>
            </Reveal>
          ))}
        </div>
        <Mascot size={160} bottom={-30} right={-100} style={{ opacity: 0.35 }} />
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="projects-bg-img"><img src="/projects.png" alt="" /></div>
      <div className="section" style={{ paddingTop: 160, position: 'relative', zIndex: 1 }}>
        <Reveal><div className="section-label">Projects</div></Reveal>
        <Reveal delay={50}><h2 className="section-title">Where we're working</h2></Reveal>
        <Reveal delay={100}><p className="section-subtitle">Every project is vetted, executed in partnership, and tracked from start to finish.</p></Reveal>
        
        <CustomMascot src="/nerd-water.png" size={248} top={120} right={110} style={{opacity:0.3}}/>
        
        <div className="projects-grid">
          {PROJECTS_DATA.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className="project-card img-bw-parent">
                <div className={`project-card-img ${p.status === 'completed' ? 'completed-bg' : 'upcoming-bg'}`}>
                  {p.status === 'completed' && <img className="img-bw" src="/kenya1.png" alt={p.title} />}
                  {p.status !== 'completed' && <span className="card-placeholder">Coming Soon</span>}
                  <span className={`status-badge ${p.status}`}>{p.status === 'completed' ? 'Completed' : 'Coming Soon'}</span>
                </div>
                <div className="project-card-body">
                  <h4>{p.title}</h4>
                  <div className="loc">{p.location}</div>
                  <p className="desc">{p.description}</p>
                  {p.status === 'completed' && (
                    <div className="project-links">
                      <a href="https://www.clear.inc/case-studies/uv-led-water-purification-system-in-remote-kenyan-community" target="_blank" rel="noopener noreferrer">
                        <button className="btn-dark">Clear Inc.</button>
                      </a>
                      <a href="https://news.ubc.ca/2024/11/ubc-researcher-brings-clean-water-home-to-kenyan-school/" target="_blank" rel="noopener noreferrer">
                        <button className="btn-outline">UBC</button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonatePage() {
  const [freq, setFreq] = useState('once');
  const [amount, setAmount] = useState(25);
  const amounts = [10, 25, 50, 100];
  return (
    <div className="donate-section section-wide">
      <div className="donate-bg-img"><img src="/donations.png" alt="" /></div>
      <div className="donate-inner">
        <div className="donate-text">
          <Reveal><div className="section-label">Donate</div></Reveal>
          <Reveal delay={50}><h2 className="section-title">Fund clean water<br />directly</h2></Reveal>
          <Reveal delay={100}><p>Every dollar goes to a verified project. No admin fees skimmed. Full transparency on where your contribution goes.</p></Reveal>
          <Reveal delay={150}><p>Recurring donations help us plan ahead and commit to larger projects with confidence.</p></Reveal>
          <Reveal delay={200}>
            <div className="donate-impact-note">
              <img src="/Water_Droplet_Waving.png" alt="" />
              <span>Your contribution directly funds UV purification systems for communities in need.</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div className="donate-card">
            <div className="donate-toggle">
              <button className={freq === 'once' ? 'active' : ''} onClick={() => setFreq('once')}>One-Time</button>
              <button className={freq === 'monthly' ? 'active' : ''} onClick={() => setFreq('monthly')}>Monthly</button>
            </div>
            <div className="amount-grid">
              {amounts.map((a) => (
                <button key={a} className={`amount-btn ${amount === a ? 'selected' : ''}`} onClick={() => setAmount(a)}>${a}</button>
              ))}
            </div>
            <input className="custom-amount" type="text" placeholder="Custom amount ($)" />
            <button className="donate-submit">Donate ${amount} {freq === 'monthly' ? '/ month' : ''}</button>
            <p className="donate-trust">Secure payment via Stripe. Tax receipts available upon charity status.</p>
            <p className="donate-disclaimer">At the moment, donations are not tax deductible.</p>
          </div>
        </Reveal>
      
      </div>
    </div>
  );
}

function PlaceholderPage({ title, desc }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-mascot mascot-wander">
        <img src="/Water_Droplet_Waving.png" alt="" />
      </div>
      <Reveal style={{ position: 'relative', zIndex: 1 }}>
        <h2>{title}</h2>
        <p>{desc}</p>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.target);
    try {
      const res = await fetch('https://formspree.io/f/mwvngbgg', {
        method: 'POST', body: formData, headers: { 'Accept': 'application/json' },
      });
      if (res.ok) setSubmitted(true);
    } catch (err) { console.error(err); }
    setSending(false);
  };
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="contact-bg-img"><img src="/toronto.png" alt="" /></div>

      <CustomMascot src="/mailguy.png" size={252} top={130} right={430} style={{opacity:0.3,zIndex:2}}/>

      <div className="section" style={{ paddingTop: 160, position: 'relative', zIndex: 1 }}>
        <Reveal><div className="section-label">Contact</div></Reveal>
        <Reveal delay={50}><h2 className="section-title">Get in touch</h2></Reveal>
        <Reveal delay={100}><p className="section-subtitle">Questions, partnerships, media inquiries. We'd love to hear from you.</p></Reveal>
        <div className="contact-grid">
          <Reveal delay={150}>
            {submitted ? (
              <div className="form-success">Thank you! Your message has been sent. We'll get back to you soon.</div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group"><label>Name</label><input type="text" name="name" placeholder="Your full name" required /></div>
                <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@school.edu" required /></div>
                <div className="form-group"><label>Subject</label>
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>Select a topic</option>
                    <option>General Inquiry</option><option>Partnership</option>
                    <option>Media / Press</option><option>Volunteer / Get Involved</option>
                  </select>
                </div>
                <div className="form-group"><label>Message</label><textarea name="message" placeholder="Tell us what's on your mind..." required /></div>
                <button className="btn-dark" type="submit" style={{ alignSelf: 'flex-start', opacity: sending ? 0.6 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>
          <Reveal delay={200}>
            <div className="contact-right">
              <h3>Let's connect</h3>
              <p>We're based in Toronto, Ontario, but our work reaches across borders. Reach out however works best for you.</p>
              <div className="contact-detail">
                <div className="cd-icon"><img src="/mailguy.png" alt="" /></div>
                <div>studentwaterproject@gmail.com</div>
              </div>
              <div className="contact-detail">
                <div className="cd-icon"><img src="/locationguy.png" alt="" /></div>
                <div>Toronto, Ontario, Canada</div>
              </div>
              <div className="contact-detail">
                <div className="cd-icon"><img src="/photoguy.png" alt="" /></div>
                <div>@studentwaterproject</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="chatbot-bubble" onClick={() => setOpen(!open)} title="Chat with us">
        {open ? <span className="close-x">{'\u2715'}</span> : <img src="/Water_Droplet_Waving.png" alt="Chat" />}
      </button>
      <div className={`chatbot-panel ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <img src="/Water_Droplet_Waving.png" alt="" />
          <div className="chatbot-header-text"><h4>Droplet</h4><p>AI Assistant — Coming soon</p></div>
        </div>
        <div className="chatbot-body">
          <div className="chat-msg">Hey! I'm Droplet, The Student Water Project's AI assistant. I'm not fully online yet, but soon I'll help answer questions about our projects, donations, and team. Stay tuned!</div>
        </div>
        <div className="chatbot-input-area">
          <input type="text" placeholder="Coming soon..." disabled />
          <button disabled>{'\u2192'}</button>
        </div>
      </div>
    </>
  );
}

function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3><img src="/Water_Droplet_Waving.png" alt="" />The Student Water Project&#8482;</h3>
          <p>A student-led initiative funding UV water purification for communities in need, in partnership with engineering firms.</p>
        </div>
        <div className="footer-col"><h4>Navigate</h4>
          <ul><li onClick={() => go('home')}>Home</li><li onClick={() => go('about')}>About</li><li onClick={() => go('projects')}>Projects</li><li onClick={() => go('donate')}>Donate</li></ul>
        </div>
        <div className="footer-col"><h4>More</h4>
          <ul><li onClick={() => go('impact')}>Impact</li><li onClick={() => go('updates')}>Updates</li><li onClick={() => go('contact')}>Contact</li></ul>
        </div>
        <div className="footer-col"><h4>Legal</h4>
          <ul><li>Privacy Policy</li><li>Terms of Use</li><li>Transparency</li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{'\u00A9'} 2025 The Student Water Project&#8482;. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'donate': return <DonatePage />;
      case 'impact': return <PlaceholderPage title="Impact Dashboard" desc="Live metrics, geographic mapping, and allocation breakdowns. Launching with data from our first completed project." />;
      case 'updates': return <PlaceholderPage title="Updates & Blog" desc="Field reports, student stories, and education articles. Content being prepared by our student writers." />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };
  return (
    <>
      <style>{styles}</style>
      <CursorFollower />
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <ChatBot />
    </>
  );
}
