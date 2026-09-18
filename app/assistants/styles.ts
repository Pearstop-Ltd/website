export const ASSISTANTS_CSS = `
:root {
  --ink: #1a1c2e;
  --navy: #2A3990;
  --blue: #353FFF;
  --muted: #5a5f72;
  --line: #DCE1F8;
  --panel: #F8F9FA;
  --bg: #ffffff;
  --panel-ink: #1a1c2e;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ink: #eef0f8;
    --navy: #a9b4ff;
    --blue: #8b95ff;
    --muted: #a4abc2;
    --line: #2c3150;
    --panel: #181b2c;
    --bg: #101223;
    --panel-ink: #eef0f8;
  }
}
:root[data-theme="dark"] {
  --ink: #eef0f8;
  --navy: #a9b4ff;
  --blue: #8b95ff;
  --muted: #a4abc2;
  --line: #2c3150;
  --panel: #181b2c;
  --bg: #101223;
  --panel-ink: #eef0f8;
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-weight: 300;
  line-height: 1.55;
  font-size: 17px;
}
img { max-width: 100%; }
.wrap { max-width: 640px; margin: 0 auto; padding: 0 22px; }
a { color: var(--blue); }

nav.site {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding: 22px 0 0;
}
nav.site .brand {
  font-size: 13px; font-weight: 600; letter-spacing: 1.4px;
  text-transform: uppercase; color: var(--blue);
  margin-right: auto; text-decoration: none;
}
nav.site a.link {
  font-size: 15px; font-weight: 500; color: var(--muted); text-decoration: none;
  padding: 6px 0; min-height: 30px;
}
nav.site a.link:hover { color: var(--blue); }
nav.site a.link.on { color: var(--navy); font-weight: 600; }

h1 {
  font-size: clamp(30px, 7.5vw, 42px);
  line-height: 1.12; font-weight: 700; letter-spacing: -0.8px;
  color: var(--navy); margin: 22px 0 0; text-wrap: balance;
}
.lede { font-size: 18px; margin: 16px 0 0; color: var(--ink); text-wrap: pretty; }

h2 {
  font-size: 13px; font-weight: 600; letter-spacing: 1.3px;
  text-transform: uppercase; color: var(--navy); margin: 0 0 14px;
}
h3 { font-size: 20px; font-weight: 600; color: var(--navy); margin: 0; }

section { padding: 40px 0; border-top: 1px solid var(--line); }
section.first { border-top: 0; padding-top: 30px; }
p { margin: 0 0 14px; text-wrap: pretty; }
p:last-child { margin-bottom: 0; }

ul.plain { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
ul.plain li { display: flex; gap: 12px; align-items: flex-start; }
.dot { width: 7px; height: 7px; border-radius: 4px; background: var(--blue); margin-top: 9px; flex-shrink: 0; }

.cards { display: flex; flex-direction: column; gap: 14px; }
.card { background: var(--panel); color: var(--panel-ink); border-radius: 10px; padding: 18px; }
.card .t { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 5px; }
.card .d { font-size: 15.5px; color: var(--muted); }
.card.bonus { border: 1px solid var(--blue); }

.bio { border-top: 1px solid var(--line); padding-top: 26px; margin-top: 26px; }
.bio:first-of-type { border-top: 0; padding-top: 0; margin-top: 0; }
.bio .role { font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
.bio h3 { margin-bottom: 12px; }
.bio .headshot { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.bio .headshot img {
  width: 56px; height: 56px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
}
.bio .headshot-meta { display: flex; flex-direction: column; gap: 2px; }
.bio .headshot-meta h3 { margin-bottom: 0; }
.bio .linkedin { font-size: 13.5px; font-weight: 600; color: var(--blue); text-decoration: none; }
.bio .linkedin:hover { color: var(--navy); }

.week { display: flex; gap: 16px; align-items: flex-start; padding: 16px 0; border-top: 1px solid var(--line); }
.week:first-of-type { border-top: 0; padding-top: 0; }
.week .no {
  font-size: 13px; font-weight: 700; color: var(--blue);
  min-width: 62px; flex-shrink: 0; padding-top: 3px; letter-spacing: 0.4px;
}
.week .t { font-size: 17px; font-weight: 600; color: var(--navy); margin-bottom: 3px; }
.week .d { font-size: 15.5px; color: var(--muted); }

.price { border: 1px solid var(--line); border-radius: 12px; padding: 22px; margin-bottom: 16px; }
.price.lead { border-color: var(--blue); border-width: 2px; }
.tag { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--blue); margin-bottom: 8px; }
.tag.grey { color: var(--muted); }
.amount { font-size: 30px; font-weight: 700; color: var(--navy); margin: 14px 0 2px; letter-spacing: -0.5px; }
.fineprint { font-size: 14px; color: var(--muted); }
.price p { font-size: 16px; color: var(--ink); margin: 10px 0 0; }

.anchor { background: var(--panel); border-radius: 10px; padding: 16px 18px; font-size: 16px; color: var(--panel-ink); margin-top: 6px; }

.cta {
  display: inline-block; background: var(--blue); color: #ffffff;
  font-size: 17px; font-weight: 600; padding: 15px 28px;
  border-radius: 8px; text-decoration: none; min-height: 44px; margin-top: 22px;
}
.cta:hover { background: var(--navy); color: #ffffff; }

footer { padding: 34px 0 48px; border-top: 1px solid var(--line); font-size: 14px; color: var(--muted); }
footer a { font-weight: 500; }
`;

export const CALENDLY_URL =
  "https://calendly.com/stephanie-pearstop/free-strategy-session-is-an-ai-assistant-right-for-you";
