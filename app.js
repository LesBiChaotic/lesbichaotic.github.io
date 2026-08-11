const mainPages = [
  ["home", "index.html", "⌂", "Home"],
  ["about", "about.html", "♡", "About"],
  ["scenarios", "scenarios.html", "✦", "Scenarios"],
  ["tutorials", "tutorials.html", "✎", "Creation Tutorials"],
  ["diary", "diary.html", "☾", "Development Diary"],
  ["gallery", "gallery.html", "◉", "Flash! Camera! Gay!"],
];
const hobbyPages = [
  ["hobby", "hobby.html", "Hobby Hub"],
  ["playlist", "playlist.html", "Playlist"],
  ["books", "books.html", "Books"],
  ["games", "games.html", "Games"],
  ["youtube", "youtube.html", "YouTube"],
  ["inspiration", "inspiration.html", "Inspiration Cabinet"],
  ["screening", "screening-room.html", "The Screening Room", "youtube"],
  ["illustrated", "illustrated-shelf.html", "The Illustrated Shelf", "books"],
  ["creators", "recommended-creators.html", "Recommended Creators", "about"],
];
const visitorPages = [
  ["help", "play-help.html", "?", "Play Help & FAQ"],
  ["updates", "updates.html", "✧", "Update Log"],
  ["resources", "resources.html", "▤", "Creator Resources"],
  ["requests", "requests.html", "✉", "Requests & Suggestions"],
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
      ${mainPages.map(([id, href, icon, label]) => `<a href="${href}" ${id === page ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true"><picture><source srcset="assets/menu-icons/${id}.webp" type="image/webp"><img src="assets/menu-icons/${id}.png" alt=""></picture></span><b>${label}</b></a>`).join("")}
      <div class="visitor-divider hobby-divider" aria-hidden="true"><span>Personal Cabinet</span></div>
      <div class="hobby-nav ${hobbyPages.some(([id]) => id === page) ? "is-expanded" : ""}">
        <button class="hobby-nav-toggle" type="button" aria-controls="hobby-submenu" aria-expanded="${hobbyPages.some(([id]) => id === page)}">
          <span class="nav-icon" aria-hidden="true"><picture><source srcset="assets/hobby-icons/hobby.webp" type="image/webp"><img src="assets/hobby-icons/hobby.png" alt=""></picture></span><b>Hobby Hub</b><i aria-hidden="true">⌄</i>
        </button>
        <div class="hobby-submenu" id="hobby-submenu">
          ${hobbyPages.map(([id, href, label, icon = id]) => `<a href="${href}" ${id === page ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true"><picture><source srcset="assets/${id === "creators" ? "menu-icons" : "hobby-icons"}/${icon}.webp" type="image/webp"><img src="assets/${id === "creators" ? "menu-icons" : "hobby-icons"}/${icon}.png" alt=""></picture></span><b>${label}</b></a>`).join("")}
        </div>
      </div>
      <div class="visitor-divider" aria-hidden="true"><span>Visitor Tools</span></div>
      ${visitorPages.map(([id, href, icon, label]) => `<a href="${href}" ${id === page ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true"><picture><source srcset="assets/menu-icons/${id}.webp" type="image/webp"><img src="assets/menu-icons/${id}.png" alt=""></picture></span><b>${label}</b></a>`).join("")}
    </nav>
    <div class="platform-shortcuts" aria-label="Find LesBiChaotic elsewhere">
      <a class="fictionlab-shortcut" href="https://fictionlab.ai/user/019fdc53-fc9c-7481-b6f7-abb26f642a36" target="_blank" rel="noopener noreferrer"><span>✦</span><b>Find me on FictionLab</b><small>I am new—come watch the chaos grow ↗</small></a>
      <div class="herehaven-shortcut"><span>◌</span><b>HereHaven</b><small>I am still building this portal</small></div>
    </div>
  </aside>
  <div class="floating-controls">
    <button class="menu-open" type="button" aria-controls="site-menu" aria-expanded="false"><span aria-hidden="true">♥</span><b>Menu</b></button>
    <button class="theme-toggle" type="button"><span aria-hidden="true">☀</span></button>
  </div>
  <div class="menu-scrim" aria-hidden="true"></div>
`);

const decorativeObjects = {
  home: ["assets/objects/jeweled-key.webp", "Home key"],
  about: ["assets/objects/hand-mirror.webp", "Hand mirror"],
  scenarios: ["assets/objects/half-open-door.webp", "Half-open door"],
  tutorials: ["assets/objects/fountain-pen-ribbon.webp", "Fountain pen and ribbon"],
  diary: ["assets/objects/locked-diary.webp", "Locked diary"],
  gallery: ["assets/objects/vintage-camera.webp", "Vintage camera"],
  help: ["assets/objects/question-cards.webp", "Question cards"],
  updates: ["assets/objects/datebook.webp", "Datebook"],
  resources: ["assets/objects/ribbon-folder.webp", "Ribbon-tied folder"],
  requests: ["assets/objects/sealed-envelope.webp", "Sealed envelope"],
  playlist: ["assets/hobby-objects/playlist.webp", "Cassette player and headphones"],
  books: ["assets/hobby-objects/books.webp", "Open book on a crescent stand"],
  games: ["assets/hobby-objects/games.webp", "Arcade joystick"],
  youtube: ["assets/hobby-objects/youtube.webp", "Gothic video screen"],
  inspiration: ["assets/hobby-objects/inspiration.webp", "Inspiration drawer cabinet"],
  screening: ["assets/hobby-objects/youtube.webp", "Gothic viewing screen"],
  illustrated: ["assets/hobby-objects/books.webp", "Jeweled open book"],
  creators: ["assets/objects/secret-heart-locket.webp", "Jeweled recommendation locket"],
};
const pageHero = document.querySelector(".hero-home, .page-hero");
if (pageHero && decorativeObjects[page]) {
  const [filename, label] = decorativeObjects[page];
  pageHero.insertAdjacentHTML("afterend", `<div class="object-ribbon-divider" aria-hidden="true"><span></span><img src="${filename}" alt="" title="${label}"><span></span></div>`);
}

const sidebar = document.querySelector(".sidebar");
const openButton = document.querySelector(".menu-open");
const closeButton = document.querySelector(".menu-close");
const scrim = document.querySelector(".menu-scrim");
const themeButton = document.querySelector(".theme-toggle");
const hobbyNav = document.querySelector(".hobby-nav");
const hobbyToggle = document.querySelector(".hobby-nav-toggle");

const hobbyRoomCounts = {
  playlist: "3 songs currently filed",
  books: "0 books currently filed",
  games: "0 games currently filed",
  youtube: "0 videos currently filed",
  inspiration: "0 fragments currently filed",
  screening: "0 films or series currently filed",
  illustrated: "0 illustrated stories currently filed",
  creators: "0 creators currently featured",
};

const hobbyChoicePool = [
  { title: "oh well — Ariana Grande", room: "playlist", rating: 5, url: "playlist.html#oh-well" },
  { title: "DADDY — Victoria De Angelis feat. Ashnikko", room: "playlist", rating: 5, url: "playlist.html#daddy" },
];

const hobbyHeroCopy = document.querySelector(".hobby-room-hero > div");
if (hobbyHeroCopy && hobbyRoomCounts[page]) {
  hobbyHeroCopy.insertAdjacentHTML("beforeend", `<span class="room-inventory-count">${hobbyRoomCounts[page]}</span>`);
  if (page !== "creators") {
    hobbyHeroCopy.insertAdjacentHTML("beforeend", `
      <div class="room-demon-picker">
        <button class="button demon-choice-button" type="button" data-demon-pick="${page}">Let the demon cat choose</button>
        <span class="demon-choice-result" role="status" aria-live="polite"></span>
      </div>
    `);
  }
}

document.querySelectorAll("[data-demon-pick]").forEach(button => {
  button.addEventListener("click", () => {
    const requestedRoom = button.dataset.demonPick;
    const eligible = hobbyChoicePool.filter(item => item.rating >= 4 && (requestedRoom === "all" || item.room === requestedRoom));
    const result = button.parentElement.querySelector(".demon-choice-result");
    if (!eligible.length) {
      result.textContent = "The cat inspected the cabinet. Nothing eligible lives here yet.";
      button.classList.add("cat-declined");
      window.setTimeout(() => button.classList.remove("cat-declined"), 650);
      return;
    }
    const choice = eligible[Math.floor(Math.random() * eligible.length)];
    result.innerHTML = `Chosen: <a href="${choice.url}">${choice.title}</a>`;
    button.classList.add("cat-approved");
    window.setTimeout(() => button.classList.remove("cat-approved"), 650);
  });
});

const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
let temporaryTheme = null;

function applyTheme() {
  const theme = temporaryTheme || (systemTheme.matches ? "light" : "dark");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const nextTheme = theme === "light" ? "dark" : "light";
  themeButton.setAttribute("aria-label", `Switch to ${nextTheme} mode for this visit`);
  themeButton.setAttribute("title", `Switch to ${nextTheme} mode for this visit`);
  themeButton.querySelector("span").textContent = theme === "light" ? "☾" : "☀";
  let themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) {
    themeMeta = document.createElement("meta");
    themeMeta.name = "theme-color";
    document.head.append(themeMeta);
  }
  themeMeta.content = theme === "light" ? "#f8eee8" : "#10050f";
}

themeButton.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  temporaryTheme = current === "light" ? "dark" : "light";
  applyTheme();
});
systemTheme.addEventListener("change", () => {
  if (temporaryTheme === null) applyTheme();
});
applyTheme();

function setMenu(open, remember = true) {
  document.body.classList.toggle("menu-is-open", open);
  openButton.setAttribute("aria-expanded", String(open));
  if (remember) localStorage.setItem("lb-menu-open", String(open));
}

setMenu(isOpen, false);
openButton.addEventListener("click", () => setMenu(true));
closeButton.addEventListener("click", () => setMenu(false));
scrim.addEventListener("click", () => setMenu(false));
if (hobbyNav && hobbyToggle) {
  const hobbyActive = hobbyPages.some(([id]) => id === page);
  const rememberedHobby = localStorage.getItem("lb-hobby-menu-open");
  const hobbyDesktop = window.matchMedia("(min-width: 980px)");
  const startExpanded = rememberedHobby === null ? hobbyDesktop.matches || hobbyActive : rememberedHobby === "true";
  hobbyNav.classList.toggle("is-expanded", startExpanded);
  hobbyToggle.setAttribute("aria-expanded", String(startExpanded));
  hobbyToggle.addEventListener("click", () => {
    const expanded = !hobbyNav.classList.contains("is-expanded");
    hobbyNav.classList.toggle("is-expanded", expanded);
    hobbyToggle.setAttribute("aria-expanded", String(expanded));
    localStorage.setItem("lb-hobby-menu-open", String(expanded));
  });
  hobbyDesktop.addEventListener("change", event => {
    const remembered = localStorage.getItem("lb-hobby-menu-open");
    const expanded = remembered === null ? event.matches || hobbyActive : remembered === "true";
    hobbyNav.classList.toggle("is-expanded", expanded);
    hobbyToggle.setAttribute("aria-expanded", String(expanded));
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("menu-is-open")) {
    setMenu(false);
    openButton.focus();
  }
});

const filterParams = new URLSearchParams(window.location.search);
const filterGroups = [...new Set([...document.querySelectorAll("[data-filter-group]")].map(button => button.dataset.filterGroup))];
const activeFilters = Object.fromEntries(filterGroups.map(group => {
  const requested = filterParams.get(group) || (group === "story" ? filterParams.get("label") : null) || "all";
  const allowed = [...document.querySelectorAll(`[data-filter-group="${group}"]`)].map(button => button.dataset.filter);
  return [group, allowed.includes(requested) ? requested : "all"];
}));

function applyProjectFilters() {
  document.querySelectorAll("[data-entry]").forEach(card => {
    const labels = card.dataset.entry.split(" ");
    card.hidden = !filterGroups.every(group => activeFilters[group] === "all" || labels.includes(activeFilters[group]));
  });
  document.querySelectorAll("[data-filter][data-filter-group]").forEach(button => {
    button.setAttribute("aria-pressed", String(activeFilters[button.dataset.filterGroup] === button.dataset.filter));
  });
  const summary = document.querySelector("[data-filter-summary]");
  if (summary) {
    const chosen = filterGroups.filter(group => activeFilters[group] !== "all").map(group => activeFilters[group].replaceAll("-", " "));
    summary.textContent = chosen.length ? `Showing ${chosen.join(" · ")}` : "Showing every available project";
  }
}

document.querySelectorAll("[data-filter][data-filter-group]").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.dataset.filterGroup;
    activeFilters[group] = button.dataset.filter;
    const nextParams = new URLSearchParams(window.location.search);
    if (activeFilters[group] === "all") nextParams.delete(group);
    else nextParams.set(group, activeFilters[group]);
    if (group === "story") nextParams.delete("label");
    const query = nextParams.toString();
    history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    applyProjectFilters();
  });
});

applyProjectFilters();

const finder = document.querySelector("[data-scenario-finder]");
if (finder) {
  const steps = [...finder.querySelectorAll("[data-finder-step]")];
  const result = finder.querySelector("[data-finder-result]");
  const form = finder.querySelector("form");
  let currentStep = 0;

  const showStep = index => {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, i) => step.hidden = i !== currentStep);
    finder.querySelector("[data-step-count]").textContent = `Question ${currentStep + 1} of ${steps.length}`;
    finder.querySelector("[data-finder-back]").hidden = currentStep === 0;
    finder.querySelector("[data-finder-next]").textContent = currentStep === steps.length - 1 ? "Find my scenarios" : "Next question";
  };

  finder.querySelector("[data-finder-next]").addEventListener("click", () => {
    const field = steps[currentStep].querySelector("select, input:checked");
    if (!field) {
      steps[currentStep].querySelector(".finder-warning").hidden = false;
      return;
    }
    steps[currentStep].querySelector(".finder-warning").hidden = true;
    if (currentStep < steps.length - 1) return showStep(currentStep + 1);
    const data = new FormData(form);
    const values = [...data.values()].filter(Boolean);
    const cards = [...document.querySelectorAll("[data-entry]")];
    const scored = cards.map(card => ({card, score: values.filter(value => card.dataset.entry.includes(value)).length})).sort((a,b) => b.score - a.score);
    const best = scored[0]?.score || 0;
    const matches = scored.filter(item => item.score === best && best > 0);
    result.hidden = false;
    result.innerHTML = matches.length
      ? `<p class="kicker">Closest matches</p><h3>${matches.map(item => item.card.querySelector("h2")?.textContent || "Project").join(" · ")}</h3><p>These match the largest number of your choices. If none feels quite right, remove one preference with the filters or snoop through what I am building behind The Closet Door.</p><a class="button" href="#published">Inspect the closest matches</a>`
      : `<p class="kicker">No perfect match yet</p><h3>I need to create another victim.</h3><p>My archive cannot satisfy this particular appetite yet. Relax one preference, browse the closest available options, or check The Closet Door for unfinished possibilities.</p><a class="button" href="#closet">Snoop on upcoming projects</a>`;
    result.focus();
  });
  finder.querySelector("[data-finder-back]").addEventListener("click", () => showStep(currentStep - 1));
  finder.querySelector("[data-finder-reset]").addEventListener("click", () => { form.reset(); result.hidden = true; showStep(0); });
  showStep(0);
}

const requestType = document.querySelector("[data-request-type]");
if (requestType) {
  const panels = [...document.querySelectorAll("[data-request-fields]")];
  const syncRequestFields = () => panels.forEach(panel => {
    const active = panel.dataset.requestFields === requestType.value;
    panel.hidden = !active;
    panel.querySelectorAll("input, textarea, select").forEach(field => field.disabled = !active);
  });
  requestType.addEventListener("change", syncRequestFields);
  syncRequestFields();
  document.querySelector("[data-request-form]").addEventListener("submit", event => {
    if (event.currentTarget.dataset.endpointReady !== "true") {
      event.preventDefault();
      document.querySelector("[data-form-preview-note]").hidden = false;
      document.querySelector("[data-form-preview-note]").focus();
    }
  });
}

const secretDialog = document.querySelector("#secret-note-dialog");
const secretOpen = document.querySelector("[data-secret-open]");
const secretClose = document.querySelector("[data-secret-close]");
if (secretDialog && secretOpen && secretClose) {
  secretOpen.addEventListener("click", () => secretDialog.showModal());
  secretClose.addEventListener("click", () => secretDialog.close());
  secretDialog.addEventListener("click", event => {
    if (event.target === secretDialog) secretDialog.close();
  });
  secretDialog.addEventListener("close", () => secretOpen.focus());
}

document.querySelectorAll("[data-spotify-embed]").forEach(button => {
  button.addEventListener("click", () => {
    const slot = button.closest(".music-copy")?.querySelector(".spotify-player-slot");
    if (!slot) return;
    const alreadyLoaded = slot.querySelector("iframe");
    if (alreadyLoaded) {
      alreadyLoaded.remove();
      button.textContent = "Load player";
      button.setAttribute("aria-expanded", "false");
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = button.dataset.spotifyEmbed;
    iframe.title = `Spotify player: ${button.dataset.spotifyTitle}`;
    iframe.width = "100%";
    iframe.height = "152";
    iframe.loading = "lazy";
    iframe.allow = "encrypted-media; fullscreen; picture-in-picture";
    iframe.setAttribute("allowfullscreen", "");
    slot.append(iframe);
    button.textContent = "Hide player";
    button.setAttribute("aria-expanded", "true");
  });
  button.setAttribute("aria-expanded", "false");
});

document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
