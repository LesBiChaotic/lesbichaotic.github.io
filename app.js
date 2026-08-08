const pages = [
  ["home", "index.html", "⌂", "Home"],
  ["about", "about.html", "♡", "About"],
  ["scenarios", "scenarios.html", "✦", "Scenarios"],
  ["tutorials", "tutorials.html", "✎", "Creation Tutorials"],
  ["diary", "diary.html", "☾", "Development Diary"],
  ["gallery", "gallery.html", "◉", "Flash! Camera! Gay!"],
];

const page = document.body.dataset.page || "home";
const savedMenu = localStorage.getItem("lb-menu-open");
const defaultOpen = window.matchMedia("(min-width: 980px)").matches;
const isOpen = savedMenu === null ? defaultOpen : savedMenu === "true";

document.body.insertAdjacentHTML("afterbegin", `
  <aside class="sidebar" id="site-menu" aria-label="Site menu">
    <div class="side-head">
      <a class="side-brand" href="index.html" aria-label="LesBiChaotic home">
        <img src="assets/lesbichaotic-emblem.webp?v=draft6" alt="">
        <span><b>LesBiChaotic</b><small>Soft hearts. Sharp teeth.</small></span>
      </a>
      <button class="menu-close" type="button" aria-label="Collapse menu">×</button>
    </div>
    <nav class="side-nav" aria-label="Primary navigation">
      ${pages.map(([id, href, icon, label]) => `<a href="${href}" ${id === page ? 'aria-current="page"' : ""}><span aria-hidden="true">${icon}</span><b>${label}</b></a>`).join("")}
    </nav>
    <div class="platform-shortcuts" aria-label="Find LesBiChaotic elsewhere">
      <a class="fictionlab-shortcut" href="https://fictionlab.ai/user/019fdc53-fc9c-7481-b6f7-abb26f642a36" target="_blank" rel="noopener noreferrer"><span>✦</span><b>Visit FictionLab</b><small>Opens in a new tab ↗</small></a>
      <div class="herehaven-shortcut"><span>◌</span><b>HereHaven</b><small>Coming Soon</small></div>
    </div>
  </aside>
  <button class="menu-open" type="button" aria-controls="site-menu" aria-expanded="false"><span aria-hidden="true">♥</span><b>Menu</b></button>
  <div class="menu-scrim" aria-hidden="true"></div>
`);

const sidebar = document.querySelector(".sidebar");
const openButton = document.querySelector(".menu-open");
const closeButton = document.querySelector(".menu-close");
const scrim = document.querySelector(".menu-scrim");

function setMenu(open, remember = true) {
  document.body.classList.toggle("menu-is-open", open);
  openButton.setAttribute("aria-expanded", String(open));
  if (remember) localStorage.setItem("lb-menu-open", String(open));
}

setMenu(isOpen, false);
openButton.addEventListener("click", () => setMenu(true));
closeButton.addEventListener("click", () => setMenu(false));
scrim.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("menu-is-open")) {
    setMenu(false);
    openButton.focus();
  }
});

const filterParams = new URLSearchParams(window.location.search);
const allowedPlatforms = ["all", "fictionlab", "herehaven", "both"];
const allowedStories = ["all", "romance", "horror", "sapphic", "multi", "universe"];
const requestedPlatform = filterParams.get("platform") || "all";
const requestedStory = filterParams.get("label") || "all";
const activeFilters = {
  platform: allowedPlatforms.includes(requestedPlatform) ? requestedPlatform : "all",
  story: allowedStories.includes(requestedStory) ? requestedStory : "all",
};

function applyProjectFilters() {
  document.querySelectorAll("[data-entry]").forEach(card => {
    const labels = card.dataset.entry.split(" ");
    const platformMatch = activeFilters.platform === "all" || labels.includes(activeFilters.platform);
    const storyMatch = activeFilters.story === "all" || labels.includes(activeFilters.story);
    card.hidden = !(platformMatch && storyMatch);
  });
  document.querySelectorAll("[data-filter][data-filter-group]").forEach(button => {
    button.setAttribute("aria-pressed", String(activeFilters[button.dataset.filterGroup] === button.dataset.filter));
  });
  const summary = document.querySelector("[data-filter-summary]");
  if (summary) {
    const platformNames = { all: "all platforms", fictionlab: "FictionLab", herehaven: "HereHaven", both: "both platforms" };
    const storyNames = { all: "all story types", romance: "romance", horror: "horror", sapphic: "sapphic", multi: "multiple love interests", universe: "series or universe" };
    summary.textContent = `Showing ${platformNames[activeFilters.platform]} · ${storyNames[activeFilters.story]}`;
  }
}

document.querySelectorAll("[data-filter][data-filter-group]").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.dataset.filterGroup;
    activeFilters[group] = button.dataset.filter;
    const nextParams = new URLSearchParams(window.location.search);
    if (activeFilters.platform === "all") nextParams.delete("platform");
    else nextParams.set("platform", activeFilters.platform);
    if (activeFilters.story === "all") nextParams.delete("label");
    else nextParams.set("label", activeFilters.story);
    const query = nextParams.toString();
    history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    applyProjectFilters();
  });
});

applyProjectFilters();

document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
