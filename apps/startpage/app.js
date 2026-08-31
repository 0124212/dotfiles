/*****************/
/* EDITABLE INFO */
/*****************/

/* -------------------------------------------------------- */

const KAOMOJI = [
  { face: "(,,>﹏<,,)", color: "#ef4444" },
  { face: "(◕‿◕)", color: "#f97316" },
  { face: "(•ω•)", color: "#f59e0b" },
  { face: "( ˘▽˘ )", color: "#eab308" },
  { face: "(╯°□°)╯", color: "#84cc16" },
  { face: "(=^･ω･^=)", color: "#22c55e" },
  { face: "(ง •̀_•́)ง", color: "#10b981" },
  { face: "ᕦ(ò_óˇ)ᕤ", color: "#14b8a6" },
  { face: "( •_•)>⌐■-■", color: "#06b6d4" },
  { face: "(⌐■_■)", color: "#0ea5e9" },
  { face: "ʕ•ᴥ•ʔ", color: "#3b82f6" },
  { face: "(๑•̀ㅂ•́)و✧", color: "#6366f1" },
  { face: "(─‿─)", color: "#8b5cf6" },
  { face: "(*￣︶￣)", color: "#a855f7" },
  { face: "(¬‿¬)", color: "#d946ef" },
  { face: "₍ᐢ.ˬ.ᐢ₎", color: "#ec4899" },
  { face: "╚(ಠ_ಠ)=┐", color: "#f43f5e" },
  { face: "(づ￣ ³￣)づ", color: "#e11d48" },
  { face: "(◕ᴗ◕✿)", color: "#be123c" },
  { face: "(o^▽^o)", color: "#f472b6" },
  { face: "(^._.^)ﾉ", color: "#c084fc" },
  { face: "｡◕‿◕｡", color: "#818cf8" },
  { face: "(ˣ^ˍ^ˣ)", color: "#38bdf8" },
  { face: "(≥o≤)", color: "#2dd4bf" },
  { face: "(♡°▽°♡)", color: "#fb7185" },
  { face: "(✧ω✧)", color: "#a3e635" },
  { face: "(◠‿◠)", color: "#4ade80" },
  { face: "(ᵔᴥᵔ)", color: "#34d399" },
  { face: "(ﾟヮﾟ)", color: "#22d3ee" },
  { face: "(⌒_⌒;)", color: "#60a5fa" },
  { face: "(＾＾)ゞ", color: "#a78bfa" },
  { face: "(≧◡≦)", color: "#e879f9" },
  { face: "(¬_¬)", color: "#fdba74" },
  { face: "(；ω；)", color: "#fcd34d" },
  { face: "(◠‿◠✿)", color: "#86efac" },
  { face: "(≧∇≦)", color: "#fca5a5" },
  { face: "(o^ー^o)", color: "#fed7aa" },
  { face: "(☆▽☆)", color: "#fde047" },
  { face: "(✿◠‿◠)", color: "#67e8f9" },
  { face: "(◕ᴗ◕✿)", color: "#a5b4fc" },
  { face: "(≧ω≦)", color: "#d8b4fe" },
  { face: "(✿◡‿◡)", color: "#f0abfc" },
  { face: "(◠ω◠)", color: "#f9a8d4" },
  { face: "(◕‿◕✿)", color: "#f472b6" },
];

let kaomojiIdx = Math.floor(Math.random() * KAOMOJI.length);
let PICK = KAOMOJI[kaomojiIdx];
const NAME = PICK.face;

function cycleKaomoji() {
  kaomojiIdx = (kaomojiIdx + 1) % KAOMOJI.length;
  PICK = KAOMOJI[kaomojiIdx];
  const el = document.getElementById('userName');
  el.innerHTML = PICK.face;
  el.style.color = PICK.color;
  document.getElementById('currentDate').style.color = PICK.color;
  const si = document.getElementById('searchInput');
  si.style.borderColor = PICK.color + '40';
  si.style.boxShadow = '0 0 0 1px ' + PICK.color + '30';
}

const CARDS = [
  {
    name: "Memos",
    icon: "ri-sticky-note-fill",
    link: "https://memos.junilab.xyz/",
    color: "#f472b6",
  },
  {
    name: "Vikunja",
    icon: "ri-checkbox-circle-fill",
    link: "https://vikunja.junilab.xyz/",
    color: "#3b82f6",
  },
  {
    name: "Radicale",
    icon: "ri-calendar-fill",
    link: "https://radicale.junilab.xyz/",
    color: "#fb923c",
  },
  {
    name: "Gotify",
    icon: "ri-notification-3-fill",
    link: "https://gotify.junilab.xyz/",
    color: "#f59e0b",
  },
  {
    name: "n8n",
    icon: "ri-workflow-fill",
    link: "https://n8n.junilab.xyz/",
    color: "#ef4444",
  },
  {
    name: "Blog",
    icon: "ri-article-fill",
    link: "https://blog-8y0.pages.dev/",
    color: "#a3e635",
  },
  {
    name: "Music",
    icon: "ri-music-fill",
    link: "https://music.jooniverse.workers.dev/",
    color: "#818cf8",
  },
  {
    name: "GitHub",
    icon: "ri-github-fill",
    link: "https://github.com",
    color: "#94a3b8",
  },
  {
    name: "Proton",
    icon: "ri-mail-fill",
    link: "https://mail.proton.me",
    color: "#06b6d4",
  },
  {
    name: "Gmail",
    icon: "ri-google-fill",
    link: "https://mail.google.com",
    color: "#ef4444",
  },
  {
    name: "X",
    icon: "ri-twitter-fill",
    link: "https://x.com",
    color: "#14b8a6",
  },
  {
    name: "Perplexity",
    icon: "ri-search-eye-fill",
    link: "https://perplexity.ai",
    color: "#20b8cd",
  },
  {
    name: "ChatGPT",
    icon: "ri-robot-fill",
    link: "https://chatgpt.com",
    color: "#a78bfa",
  },
  {
    name: "Gemini",
    icon: "ri-sparkling-fill",
    link: "https://gemini.google.com/",
    color: "#4285F4",
  },
  {
    name: "Oracle",
    icon: "ri-cloud-fill",
    link: "https://cloud.oracle.com/?region=us-sanjose-1",
    color: "#e06050",
  },
  {
    name: "Schwab",
    icon: "ri-bank-fill",
    link: "https://www.schwab.com/",
    color: "#00A1DF",
  },
  {
    name: "LinkedIn",
    icon: "ri-linkedin-box-fill",
    link: "https://www.linkedin.com/",
    color: "#0077B5",
  },
  {
    name: "Handshake",
    icon: "ri-handshake-line",
    link: "https://app.joinhandshake.com/",
    color: "#D93F21",
  },
  {
    name: "12Twenty",
    icon: "ri-dashboard-line",
    link: "https://www.12twenty.com/",
    color: "#5B6EF8",
  },
  {
    name: "Movies",
    icon: "ri-movie-2-fill",
    link: "https://a.111477.xyz/movies/",
    color: "#e879f9",
  },
  {
    name: "Free",
    icon: "ri-gift-fill",
    link: "https://fmhy.net/",
    color: "#34d399",
  },
];

/* -------------------------------------------------------- */

/******************/
/* CLOCK FUNCTION */
/******************/

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TZ = 'America/Los_Angeles';

const updateDate = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  currentTime.innerHTML = timeStr;
  const dateStr = now.toLocaleDateString('en-US', {
    timeZone: TZ,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  currentDate.innerHTML = dateStr;
  setTimeout(updateDate, 1000);
};

const addCustomColorListener = (htmlNode, card) => {
  if (!card?.color) return;

  htmlNode.style.setProperty("--card-color", card.color);
};

const formatDigit = (digit) => {
  return digit > 9 ? `${digit}` : `0${digit}`;
};

/******************/
/* CARDS FUNCTION */
/******************/

const CUSTOM_SVGS = {
  "https://memos.junilab.xyz/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" /><path d="M13 8l2 0" /><path d="M13 12l2 0" /></svg>`,
  "https://blog-8y0.pages.dev/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h-2l-3 10" /><path d="M16 4h2l3 10" /><path d="M10 16l4 0" /><path d="M21 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5" /><path d="M10 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5" /></svg>`,
  "https://github.com": `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  "https://mail.google.com": `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>`,
  "https://mail.proton.me": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M3 7l9 6l9 -6" /></svg>`,
  "https://x.com": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>`,
  "https://perplexity.ai": `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/></svg>`,
  "https://chatgpt.com": `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,
  "https://gemini.google.com/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" /></svg>`,
  "https://music.jooniverse.workers.dev/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M9 17v-13h10v13" /><path d="M9 8h10" /></svg>`,
  "https://fmhy.net/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" /></svg>`,
  "https://cloud.oracle.com/?region=us-sanjose-1": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" /><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" /></svg>`,
  "https://vikunja.junilab.xyz/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>`,
  "https://gotify.junilab.xyz/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>`,
  "https://n8n.junilab.xyz/": `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/></svg>`,
  "https://baikal.junilab.xyz/card.php": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  "https://super.junilab.xyz/": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>`,
  "https://status.junilab.xyz/": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>`,
  "https://baikal.junilab.xyz/": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M9 17h6"/></svg>`,
  "https://calendar.junilab.xyz/": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor"/><rect x="14" y="12" width="3" height="3" rx="0.5" fill="currentColor"/></svg>`,
  "https://a.111477.xyz/movies/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" /><path d="M8 4l0 16" /><path d="M16 4l0 16" /><path d="M4 8l4 0" /><path d="M4 16l4 0" /><path d="M4 12l16 0" /><path d="M16 8l4 0" /><path d="M16 16l4 0" /></svg>`,
  "https://www.linkedin.com/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>`,
  "https://www.schwab.com/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19l16 0" /><path d="M4 15l4 -6l4 2l4 -5l4 4" /></svg>`,
  "https://radicale.junilab.xyz/": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 10H8C5.81214 10 4.30164 11.4146 4.06463 13.282C3.7396 15.8428 4.59366 17.3866 7.69879 18.4102C9.09338 18.8699 10.2777 19.8744 10.7096 21.2778L10.9318 22L11.0272 21.9181C11.6762 21.3609 12.4103 20.9114 13.2016 20.5867L15.1231 19.7982C18.4086 18.45 20.3438 16.3901 19.9493 13.282C19.7123 11.4146 18.1879 10 16 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9638 6.96986C11.9638 6.96986 8.88872 7.27638 7.27853 5.93455C5.66835 4.59273 6.03618 2.03015 6.03618 2.03015C6.03618 2.03015 9.11128 1.72362 10.7215 3.06545C12.3317 4.40727 11.9638 6.96986 11.9638 6.96986Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0362 6.96986C12.0362 6.96986 15.1113 7.27638 16.7215 5.93455C18.3317 4.59273 17.9638 2.03015 17.9638 2.03015C17.9638 2.03015 14.8887 1.72362 13.2785 3.06545C11.6683 4.40727 12.0362 6.96986 12.0362 6.96986Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 11.5C18.5 12.5 15.866 13 12 13C8.13401 13 5.5 12.5 5 11.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  "https://app.joinhandshake.com/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /><path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" /><path d="M12.5 15.5l2 2" /><path d="M15 13l2 2" /></svg>`,
  "https://www.12twenty.com/": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /><path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /><path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /></svg>`,
};

const printCards = () => {
  for (const [i, card] of CARDS.entries()) {
    let currentCard = document.createElement("a");
    currentCard.classList.add("card");
    currentCard.href = card.link;
    currentCard.target = "_blank";
    currentCard.style.animationDelay = `${i * 0.05}s`;

    let currentCardIcon;
    if (CUSTOM_SVGS[card.link]) {
      currentCardIcon = document.createElement("span");
      currentCardIcon.classList.add("card__icon");
      currentCardIcon.innerHTML = CUSTOM_SVGS[card.link];
    } else {
      currentCardIcon = document.createElement("i");
      currentCardIcon.classList.add(card.icon);
      currentCardIcon.classList.add("card__icon");
    }

    let currentCardText = document.createElement("p");
    currentCardText.appendChild(document.createTextNode(card.name));
    currentCardText.classList.add("card__name");

    currentCard.append(currentCardIcon);
    currentCard.append(currentCardText);

    currentCard.setAttribute("isHovered", false);
    currentCard.setAttribute("isFocused", false);

    currentCard.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        window.location.href = card.link;
      }
    });

    cardContainer.appendChild(currentCard);
    addCustomColorListener(currentCard, card);
  }
};

/****************/
/* STARTER CODE */
/****************/

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userName").innerHTML = NAME;
  document.getElementById("userName").style.color = PICK.color;
  document.getElementById("currentDate").style.color = PICK.color;
  document.getElementById("searchInput").style.borderColor = PICK.color + "40";
  document.getElementById("searchInput").style.boxShadow = `0 0 0 1px ${PICK.color}30`;
  printCards();
  document.getElementById('userName').style.cursor = 'pointer';
  document.getElementById('userName').addEventListener('click', cycleKaomoji);
  updateDate();
  fetchWeather();
  initSearch();
  initTimezones();
  initKeyboardShortcuts();
  initSearchSuggestions();
  initTabTitle();
});

/**************/
/* WEATHER     */
/**************/

const WMO_CODES = {
  0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Fog", 48: "Fog",
  51: "Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Snow", 73: "Snow", 75: "Heavy Snow",
  80: "Showers", 81: "Showers", 82: "Heavy Showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
};

async function fetchWeather() {
  const el = document.getElementById("weather");
  try {
    const latitude = 34.15;
    const longitude = -118.82;
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=America/Los_Angeles&temperature_unit=fahrenheit`
    );
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const condition = WMO_CODES[data.current.weather_code] || "";
    el.textContent = condition ? `${condition} ${temp}°` : `${temp}°`;
  } catch {
    el.textContent = "";
  }
}

/******************/
/* TIMEZONES      */
/******************/

const TZ_LOCATIONS = [
  { label: "NYC", tz: "America/New_York" },
  { label: "LA", tz: "America/Los_Angeles" },
  { label: "London", tz: "Europe/London" },
  { label: "Berlin", tz: "Europe/Berlin" },
  { label: "Dubai", tz: "Asia/Dubai" },
  { label: "Cairo", tz: "Africa/Cairo" },
  { label: "Bangkok", tz: "Asia/Bangkok" },
  { label: "Singapore", tz: "Asia/Singapore" },
  { label: "Philippines", tz: "Asia/Manila" },
  { label: "Indonesia", tz: "Asia/Jakarta" },
  { label: "Korea", tz: "Asia/Seoul" },
  { label: "Hong Kong", tz: "Asia/Hong_Kong" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

function initTimezones() {
  const strip = document.getElementById("tzStrip");
  const items = TZ_LOCATIONS.map((loc) => {
    const el = document.createElement("div");
    el.classList.add("tz-item");
    el.innerHTML = `<span class="tz-label">${loc.label}</span><span class="tz-time" data-tz="${loc.tz}"></span>`;
    return el;
  });
  items.forEach((el) => strip.appendChild(el));
  items.forEach((el) => strip.appendChild(el.cloneNode(true)));
  updateTzTimes();
  setInterval(updateTzTimes, 10000);
}

function updateTzTimes() {
  document.querySelectorAll("[data-tz]").forEach((el) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      timeZone: el.dataset.tz,
      weekday: "short",
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      timeZone: el.dataset.tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const today = now.toLocaleDateString("en-US", { timeZone: "America/New_York", weekday: "short" });
    const diff = dateStr !== today ? `<span class="tz-day">${dateStr}</span>` : "";
    el.innerHTML = `${timeStr} ${diff}`;
  });
}

/******************/
/* SEARCH BAR     */
/******************/

function initSearch() {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = searchInput.value.trim();
    if (!query) return;

    if (/^https?:\/\//.test(query) || /^[\w-]+(\.[\w-]+)+/.test(query)) {
      if (!/^https?:\/\//.test(query)) query = "https://" + query;
      window.location.href = query;
      return;
    }

    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  });
}

/******************/
/* SEARCH SUGGESTIONS */
/******************/

const BANGS = [
  { bang: "!g", site: "Google", url: "https://google.com/search?q=" },
  { bang: "!yt", site: "YouTube", url: "https://youtube.com/results?search_query=" },
  { bang: "!gh", site: "GitHub", url: "https://github.com/search?q=" },
  { bang: "!w", site: "Wikipedia", url: "https://en.wikipedia.org/wiki/Special:Search?search=" },
  { bang: "!r", site: "Reddit", url: "https://reddit.com/search?q=" },
  { bang: "!h", site: "Hacker News", url: "https://hn.algolia.com/?q=" },
  { bang: "!sp", site: "Spotify", url: "https://open.spotify.com/search/" },
  { bang: "!mdn", site: "MDN", url: "https://developer.mozilla.org/search?q=" },
  { bang: "!so", site: "Stack Overflow", url: "https://stackoverflow.com/search?q=" },
  { bang: "!p", site: "Pinterest", url: "https://pinterest.com/search/pins/?q=" },
  { bang: "!t", site: "TPB", url: "https://tpir.party/search/" },
  { bang: "!imdb", site: "IMDb", url: "https://www.imdb.com/find?q=" },
  { bang: "!dict", site: "Dictionary", url: "https://dictionary.com/browse/" },
  { bang: "!repo", site: "GitHub Repos", url: "https://github.com/search?type=repositories&q=" },
  { bang: "!chatgpt", site: "ChatGPT", url: "https://chatgpt.com/?q=" },
  { bang: "!x", site: "X / Twitter", url: "https://x.com/search?q=" },
  { bang: "!proton", site: "Proton Mail", url: "https://mail.proton.me/search/" },
  { bang: "!lyrics", site: "Genius Lyrics", url: "https://genius.com/search?q=" },
  { bang: "!pplx", site: "Perplexity", url: "https://perplexity.ai/search?q=" },
  { bang: "!lemmy", site: "Lemmy", url: "https://search.linkat.be/search?q=" },
  { bang: "!py", site: "Python Docs", url: "https://docs.python.org/3/search.html?q=" },
  { bang: "!docker", site: "Docker Hub", url: "https://hub.docker.com/search?q=" },
  { bang: "!cf", site: "Cloudflare", url: "https://developers.cloudflare.com/search/?q=" },
  { bang: "!hf", site: "HuggingFace", url: "https://huggingface.co/models?search=" },
  { bang: "!npm", site: "NPM", url: "https://www.npmjs.com/search?q=" },
  { bang: "!zlib", site: "Z-Library", url: "https://z-lib.org/s/" },
];

function initSearchSuggestions() {
  const searchInput = document.getElementById("searchInput");
  let debounceTimer;

  const dropdown = document.createElement("div");
  dropdown.className = "search-suggestions";
  dropdown.style.cssText = "display:none;position:absolute;top:100%;left:0;right:0;background:var(--background-light);border:1px solid rgba(255,255,255,0.1);border-radius:10px;margin-top:4px;overflow:hidden;z-index:10;";
  searchInput.parentNode.style.position = "relative";
  searchInput.parentNode.appendChild(dropdown);

  function showBangs(filter) {
    const matches = BANGS.filter(b =>
      !filter || b.bang.includes(filter) || b.site.toLowerCase().includes(filter.toLowerCase())
    );
    if (!matches.length) { dropdown.style.display = "none"; return; }
    dropdown.innerHTML = matches.map(b =>
      `<div class="suggestion-item" style="padding:8px 14px;cursor:pointer;font-size:0.9rem;color:var(--text-light);transition:background 0.1s;display:flex;justify-content:space-between;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'"><span>${b.bang}</span><span style="opacity:0.4">${b.site}</span></div>`
    ).join("");
    dropdown.style.display = "block";
    dropdown.querySelectorAll(".suggestion-item").forEach((el, i) => {
      el.addEventListener("click", () => {
        searchInput.value = matches[i].bang + " ";
        dropdown.style.display = "none";
        searchInput.focus();
      });
    });
  }

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const q = searchInput.value.trim();
    if (!q) { dropdown.style.display = "none"; return; }

    if (q.startsWith("!")) {
      showBangs(q);
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}&type=list`);
        const data = await res.json();
        const suggestions = data[1] || [];
        if (!suggestions.length) { dropdown.style.display = "none"; return; }
        dropdown.innerHTML = suggestions.slice(0, 5).map(s =>
          `<div class="suggestion-item" style="padding:8px 14px;cursor:pointer;font-size:0.9rem;color:var(--text-light);transition:background 0.1s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">${s}</div>`
        ).join("");
        dropdown.style.display = "block";
        dropdown.querySelectorAll(".suggestion-item").forEach(el => {
          el.addEventListener("click", () => {
            searchInput.value = el.textContent;
            dropdown.style.display = "none";
            searchInput.closest("form").dispatchEvent(new Event("submit"));
          });
        });
      } catch { dropdown.style.display = "none"; }
    }, 200);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && dropdown.style.display === "block") {
      const first = dropdown.querySelector(".suggestion-item");
      if (first) { first.click(); e.preventDefault(); }
    }
  });

  searchInput.addEventListener("blur", () => setTimeout(() => dropdown.style.display = "none", 150));
}

/************************/
/* KEYBOARD SHORTCUTS   */
/************************/

function initKeyboardShortcuts() {
  let gPending = false;
  let gTimer;

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      if (e.key === "Escape") e.target.blur();
      return;
    }

    if (e.key === "/") {
      e.preventDefault();
      document.getElementById("searchInput").focus();
      return;
    }

    if (e.key === "g") {
      if (gPending) return;
      gPending = true;
      gTimer = setTimeout(() => { gPending = false; }, 600);
      return;
    }

    if (gPending) {
      clearTimeout(gTimer);
      gPending = false;
      const num = parseInt(e.key);
      if (num >= 1 && num <= CARDS.length) {
        const card = CARDS[num - 1];
        if (e.ctrlKey || e.metaKey) {
          window.location.href = card.link;
        } else {
          window.open(card.link, "_blank");
        }
      }
    }
  });
}

/************************/
/* TAB TITLE CLOCK      */
/************************/

function initTabTitle() {
  const update = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      timeZone: TZ,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    document.title = timeStr;
  };
  update();
  setInterval(update, 10000);
}
