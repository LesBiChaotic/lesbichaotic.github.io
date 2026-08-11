(() => {
  const app = document.querySelector("[data-worksheet-app]");
  if (!app) return;

  const field = (key, label, type = "textarea", hint = "", options = []) => ({ key, label, type, hint, options });
  const statusOptions = ["Idea", "Planning", "Testing", "Playable", "Major revision", "Paused", "Retired"];
  const ratingOptions = ["1 — Not for me", "2 — Interesting", "3 — Recommended", "4 — Beloved", "5 — Brain possession"];
  const waxOptions = ["None", "Would Neglect Duties For This", "Five-Cat Favorite", "Devoured or Completed", "On Hold", "Escaped Unfinished", "Currently Possessed"];

  const rooms = [
    {
      id: "maintenance", title: "Site-wide Maintenance", page: "Shared site files", description: "For corrections, links, accessibility fixes, visual changes, or anything that affects more than one page.",
      fields: [
        field("change", "What are we changing?", "text", "Name the page, menu item, section, or shared feature."),
        field("kind", "What kind of change is this?", "select", "", ["New content", "Correction", "Visual change", "Link update", "Accessibility fix", "Platform change", "Removal"]),
        field("reason", "Why does it need changing?"), field("wording", "Exact wording to preserve", "textarea", "Optional. Messy notes are welcome if you want me to rewrite it."),
        field("link", "Official destination link", "url"), field("link_label", "Link label visitors should see", "text"),
        field("date_checked", "Date checked", "date"), field("image", "Image or object needed"), field("alt", "Image description for screen readers"), field("pages", "Every page affected")
      ]
    },
    {
      id: "home", title: "Homepage & Latest Updates", page: "index.html", description: "Prepare one homepage update or room preview without making the front page grow its own municipal government.",
      fields: [
        field("entry_type", "What are you adding?", "select", "", ["Latest Update", "Room or feature preview", "Homepage copy change"]),
        field("date", "Public date", "date"), field("title", "Short title", "text"),
        field("category", "Update type", "select", "", ["Scenario release", "Scenario revision", "Resource or tutorial", "Website feature", "Platform or model advice", "Visual redesign"]),
        field("summary", "What changed or why should visitors enter?"), field("destination", "Destination link", "url"),
        field("button", "Button text", "text"), field("status", "Status", "select", "", ["Live", "Coming Soon", "Updated", "New"]),
        field("unfinished", "Anything still unfinished?"), field("finishing_line", "Personal finishing line")
      ]
    },
    {
      id: "about", title: "About & Currently Haunting Me", page: "about.html", description: "Update your creator story, current favorites, and whatever has custody of your brain this week.",
      fields: [
        field("date", "Public update date", "date"), field("song", "Current song and artist", "text"), field("song_link", "Official music link", "url"),
        field("song_reason", "Why is it haunting you?"), field("book", "Current book, author, or horror fixation", "text"), field("book_link", "Official book or author link", "url"),
        field("other", "Current game, film, series, video, place, or strange object"), field("work", "Why does it matter to your work right now?"),
        field("fact", "Creator fact to add, revise, or remove"), field("private", "Anything now too private or outdated?")
      ]
    },
    {
      id: "scenarios", title: "Scenario Archive & Finder", page: "scenarios.html", description: "Build a scenario card, its matching data, and an optional Closet Door teaser in one pass.",
      fields: [
        field("title", "Scenario title", "text"), field("status", "Development status", "select", "", statusOptions), field("platform", "Platform and availability", "text"),
        field("links", "Official scenario link for each platform"), field("premise", "Spoiler-light premise"), field("origin", "Why did this idea escape your brain?"),
        field("visual", "Cover or banner filename and alt text"), field("date", "Release or last-revision date", "date"), field("series", "Series or shared universe", "text"),
        field("relationship", "Relationship structure"), field("player", "Player role, customization, and pronouns"), field("genre", "Genre labels", "text"),
        field("tone", "Tone and mood labels", "text"), field("intensity", "Intensity and comfort tags", "text"), field("finder", "Who is this especially good for?"),
        field("alternatives", "Nearby alternatives if nothing matches perfectly"), field("closet", "Optional Closet Door teaser"), field("may_change", "What may still change?")
      ]
    },
    {
      id: "project", title: "Full Project Hub", page: "project-template.html", description: "The complete home for one scenario: premise, cast, platform editions, model advice, warnings, art, and process.",
      fields: [
        field("title", "Final title and subtitle", "text"), field("hook", "One-sentence hook"), field("premise", "Spoiler-light full premise"),
        field("obsession", "What made you obsessed enough to build it?"), field("fuel", "Long-game fuel", "textarea", "Recurring conflicts, events, mysteries, routes, relationships, and consequences."),
        field("status_dates", "Project status and public dates"), field("characters", "Character previews", "textarea", "For each: name, pronouns, role, player dynamic, personality, difficulty, appeal, portrait, and alt text."),
        field("editions", "Platform editions", "textarea", "For each: platform, official link, availability, date, setup, and edition differences."),
        field("models", "Model recommendations", "textarea", "Exact model, platform, date tested, strengths, struggles, settings, and best use."),
        field("warnings", "Content guide and expandable warnings"), field("choices", "Player opt-outs or safer routes"), field("not_included", "Anything specifically not included"),
        field("connected", "Connected gallery, diary, tutorial, or resource links"), field("testing", "Testing notes visitors should know")
      ]
    },
    {
      id: "tutorials", title: "Creation Tutorials", page: "tutorials.html", description: "Turn one experiment into clear, phone-friendly steps with examples, mistakes, and honest limits.",
      fields: [
        field("title", "Tutorial title", "text"), field("problem", "What problem does it solve?"), field("audience", "Who is it for?"), field("before", "What should they have before starting?"),
        field("intro", "Short introduction in your voice"), field("steps", "Steps", "textarea", "Number them in the order someone should follow them."),
        field("example", "Concrete example"), field("mistake", "Mistake or failed attempt"), field("lesson", "What changed or what did you learn?"),
        field("download", "Download or worksheet title and filename"), field("limits", "Method limits"), field("date", "Last tested or updated", "date")
      ]
    },
    {
      id: "diary", title: "Development Diary", page: "diary.html", description: "Preserve how the work happened, including the suspicious detours and beautiful failures.",
      fields: [
        field("title", "Entry title", "text"), field("date", "Entry date", "date"), field("project", "Project or site area", "text"),
        field("type", "Entry type", "select", "", ["Scenario milestone", "Character or plot change", "Testing or model behavior", "Art experiment", "Website work", "Tiny discovery"]),
        field("goal", "What were you trying to do?"), field("happened", "What actually happened?"), field("problem", "Why was something not working?"),
        field("changed", "What changed?"), field("learned", "What did you learn?"), field("links", "Related links"), field("images", "Images, captions, and alt text")
      ]
    },
    {
      id: "gallery", title: "Gallery & Visual Process", page: "gallery.html", description: "Give finished art, alternates, moodboards, and AI crimes enough context to be useful.",
      fields: [
        field("title", "Item title", "text"), field("room", "Gallery room", "select", "", ["Cover or banner", "Character art", "Moodboard", "Concept art", "Beautiful failure or AI fail", "Unused or alternate"]),
        field("project", "Connected project", "text"), field("source", "Image filename or official source link"), field("permission", "Creator and permission"),
        field("alt", "Readable image description"), field("stage", "What stage of the process is this?"), field("decision", "Why did you choose or reject it?"),
        field("after", "What changed afterward?"), field("spoiler", "Spoiler note")
      ]
    },
    {
      id: "help", title: "Play Help & FAQ", page: "play-help.html", description: "Answer one real visitor question plainly. A joke may knock; the answer still has to open the door.",
      fields: [
        field("question", "Visitor's question", "text"), field("joke", "One small introductory joke"), field("fast", "Fast answer"),
        field("steps", "Step-by-step answer"), field("platform", "Platform-specific differences"), field("fallback", "What should they try if it still fails?"),
        field("link", "Related page or official help link", "url"), field("date", "Date checked", "date")
      ]
    },
    {
      id: "updates", title: "Update Log", page: "updates.html", description: "Record what changed and why visitors should care; save the full archaeological dig for the Diary.",
      fields: [
        field("date", "Public date", "date"), field("title", "Clear title", "text"), field("category", "Category", "select", "", ["New scenario", "Major scenario revision", "Resource or tutorial", "Website feature", "Platform or model advice", "Visual redesign"]),
        field("changed", "What changed?"), field("matter", "Why does it matter to visitors?"), field("links", "Official or internal links"),
        field("unfinished", "What remains unfinished?"), field("detail", "One personal or ridiculous detail"), field("home", "Three-line homepage version")
      ]
    },
    {
      id: "resources", title: "Creator Resources", page: "resources.html", description: "Prepare one useful download without making it sound like a corporate certification portal.",
      fields: [
        field("title", "Resource title", "text"), field("purpose", "What does it help someone do?"), field("audience", "Who is it for?"), field("inside", "What is inside?"),
        field("formats", "Available formats", "text"), field("file", "Download filename and site link"), field("version", "Version and revision date"),
        field("mobile", "Phone-friendly features"), field("accessibility", "Accessibility notes"), field("adapt", "How may people adapt it?"),
        field("limits", "What can it not guarantee?"), field("future", "What might you revise later?")
      ]
    },
    {
      id: "requests", title: "Requests & Suggestions", page: "requests.html", description: "Plan the public anonymous form without placing private delivery details or credentials in site files.",
      fields: [
        field("categories", "Which categories are open?", "text"), field("boundaries", "Public boundary wording"), field("delivery", "Where should submissions be delivered?", "text", "Name the service only—never paste passwords, tokens, or private endpoints."),
        field("success", "Public success message"), field("error", "Public error message"), field("never", "What data must never be collected?"),
        field("retention", "Retention or deletion plan"), field("accessibility", "Accessibility and spam-protection needs"), field("test", "Last test date and result")
      ]
    },
    {
      id: "hobby", title: "Hobby Hub & Current Fixations", page: "hobby.html", description: "Update the dashboard, crown one main obsession, name the runners-up, or stock a newest-recommendation slot.",
      fields: [
        field("entry_type", "What are you updating?", "select", "", ["Current Fixation", "Runner-up fixation", "Past Fixation", "Dashboard status", "Newest recommendation slot"]),
        field("date", "Update date", "date"), field("title", "Title or item", "text"), field("room", "Which Hobby room contains it?", "select", "", ["Playlist", "Books", "Games", "YouTube", "Inspiration", "Screening Room", "Illustrated Shelf", "Recommended Creators"]),
        field("official", "Official link", "url"), field("art", "Cover or official artwork and alt text"), field("verdict", "One-line verdict"),
        field("brain", "Why does it own your brain now?"), field("rating", "Demon-cat rating", "select", "", ratingOptions),
        field("seal_one", "First wax-seal status", "select", "", waxOptions), field("seal_two", "Second wax-seal status", "select", "", waxOptions),
        field("archive", "If replacing the main fixation, what should enter Past Fixations?")
      ]
    },
    {
      id: "playlist", title: "Playlist", page: "playlist.html", description: "Add a song, album, or artist with official links, personal context, and scene fuel—never autoplay, never lyric theft.",
      fields: [
        field("type", "Entry type", "select", "", ["Song", "Album", "Artist"]), field("title", "Title or artist name", "text"), field("artist", "Exact credited artist(s)", "text"),
        field("link", "Official streaming link", "url"), field("embed", "Official click-to-load player wanted?", "select", "", ["No", "Yes"]), field("favorite", "Favorite song from the album", "text"),
        field("status", "Listening status", "text"), field("date", "Date added or updated", "date"), field("genre", "Genre and mood labels", "text"),
        field("grab", "Why did it grab you?"), field("inspire", "What scene, character, or atmosphere does it inspire?"), field("project", "Project it influenced"),
        field("notes", "Content notes"), field("rating", "Demon-cat rating", "select", "", ratingOptions), field("verdict", "Written verdict"), field("start", "Best starting point for a new listener")
      ]
    },
    {
      id: "books", title: "Books", page: "books.html", description: "Recommend, criticize, abandon, or adore one book without pretending personal taste is courtroom evidence.",
      fields: [
        field("title", "Book title and edition", "text"), field("author", "Author", "text"), field("links", "Official author, publisher, library, or store links"),
        field("status", "Reading status", "select", "", ["Currently reading", "Finished", "Paused", "Abandoned", "Favorite", "Recommended"]),
        field("progress", "Start date, finish date, and progress"), field("labels", "Genre, mood, and intensity labels"), field("opinion", "Why do you recommend—or not recommend—it?"),
        field("stop", "Why did you stop?"), field("influence", "How did it influence your storytelling?"), field("project", "Project it influenced"),
        field("warnings", "Core content warnings and intensity"), field("spoilers", "Spoiler-marked warning details"), field("rating", "Demon-cat rating", "select", "", ratingOptions), field("verdict", "Written verdict")
      ]
    },
    {
      id: "games", title: "Games", page: "games.html", description: "Keep story, gameplay, atmosphere, accessibility, and official availability usefully separate.",
      fields: [
        field("title", "Game title and edition", "text"), field("studio", "Developer and publisher", "text"), field("official", "Official developer or publisher link", "url"),
        field("stores", "Authorized store links"), field("trailer", "Official trailer or channel link", "url"), field("platforms", "Platform availability", "text"),
        field("status", "Playing status", "select", "", ["Playing now", "Completed", "Paused", "Abandoned", "Favorite", "Recommended"]),
        field("progress", "Progress and play dates"), field("labels", "Genre, mood, and atmosphere labels"), field("story", "Story thoughts"), field("gameplay", "Gameplay thoughts"),
        field("atmosphere", "Atmosphere thoughts"), field("opinion", "Why did you like or dislike it?"), field("difficulty", "Difficulty notes"),
        field("accessibility", "Accessibility notes"), field("technical", "Technical warnings"), field("warnings", "Content warnings and spoiler details"),
        field("influence", "Project it influenced and how"), field("rating", "Demon-cat rating", "select", "", ratingOptions), field("verdict", "Written verdict")
      ]
    },
    {
      id: "youtube", title: "YouTube", page: "youtube.html", description: "Recommend an original upload with a verified channel, availability record, and click-to-load playback choice.",
      fields: [
        field("title", "Video title", "text"), field("channel", "Channel name", "text"), field("video", "Original video link", "url"), field("channel_link", "Official channel link", "url"),
        field("runtime", "Runtime and upload date"), field("category", "Category", "text"), field("labels", "Mood and subject labels"), field("reason", "Why do you recommend it?"),
        field("moment", "Best moment without spoilers"), field("warnings", "Content warnings"), field("rating", "Demon-cat rating", "select", "", ratingOptions),
        field("verdict", "Written verdict"), field("embed", "Official click-to-load player wanted?", "select", "", ["No", "Yes"]),
        field("checked", "Availability check date", "date"), field("availability", "Current availability and visible note"), field("alternative", "Official alternative upload")
      ]
    },
    {
      id: "inspiration", title: "Inspiration Cabinet", page: "inspiration.html", description: "Credit the verified source, explain the spark, and choose a safe display method when preview rights are unclear.",
      fields: [
        field("type", "Inspiration type", "text"), field("title", "Entry title", "text"), field("creator", "Original creator or source", "text"), field("link", "Verified original-source link", "url"),
        field("display", "Safe display method", "select", "", ["Official embed", "Permitted credited preview", "Text description plus own symbol", "Link only", "Personal material"]),
        field("permission", "Permission or license evidence"), field("description", "Text description"), field("spark", "Exact mood, idea, or question it sparked"),
        field("project", "Project it influenced"), field("connection", "Spoiler-free project connection"), field("choice", "Why this source over nearby alternatives?"), field("correction", "Removal or correction note")
      ]
    },
    {
      id: "screening", title: "The Screening Room", page: "screening-room.html", description: "File a film, series, or limited series with official viewing routes and an appropriately dramatic damage report.",
      fields: [
        field("format", "Format", "select", "", ["Film", "Series", "Limited series"]), field("title", "Title and release year", "text"), field("creator", "Director, creator, or studio", "text"),
        field("link", "Official studio, distributor, or legal viewing link", "url"), field("status", "Watching status", "select", "", ["Watching now", "Completed", "On hold", "Escaped unfinished", "Favorite"]),
        field("dates", "Watch dates or progress"), field("labels", "Genre, mood, and intensity labels"), field("verdict", "One-line verdict"),
        field("thoughts", "Why did it delight, damage, or disappoint you?"), field("influence", "Project or creative idea it influenced"),
        field("warnings", "Core content warnings"), field("spoilers", "Spoiler-marked warning details"), field("rating", "Demon-cat rating", "select", "", ratingOptions),
        field("seal_one", "First wax-seal status", "select", "", waxOptions), field("seal_two", "Second wax-seal status", "select", "", waxOptions), field("art", "Official artwork source and alt text")
      ]
    },
    {
      id: "illustrated", title: "The Illustrated Shelf", page: "illustrated-shelf.html", description: "File manga, manhwa, webcomics, graphic novels, or Western comics without flattening the art into an afterthought.",
      fields: [
        field("format", "Format", "select", "", ["Manga", "Manhwa", "Webcomic", "Graphic novel", "Western comic"]), field("title", "Title and edition", "text"),
        field("creator", "Writer, artist, and publisher or platform", "text"), field("link", "Official creator, publisher, library, or legal reading link", "url"),
        field("status", "Reading status", "select", "", ["Reading now", "Completed", "On hold", "Escaped unfinished", "Favorite"]), field("progress", "Reading dates or progress"),
        field("labels", "Genre, mood, art style, and intensity labels"), field("verdict", "One-line verdict"), field("story", "Story and character thoughts"),
        field("art_thoughts", "What makes the artwork or paneling powerful?"), field("influence", "Project or creative idea it influenced"),
        field("warnings", "Core content warnings"), field("spoilers", "Spoiler-marked warning details"), field("rating", "Demon-cat rating", "select", "", ratingOptions),
        field("seal_one", "First wax-seal status", "select", "", waxOptions), field("seal_two", "Second wax-seal status", "select", "", waxOptions), field("art", "Official cover source and alt text")
      ]
    },
    {
      id: "creators", title: "Recommended Creators", page: "recommended-creators.html", description: "A permission-first showcase. No scores, tiers, or ranking humans like competitive furniture.",
      fields: [
        field("entry_type", "What are you preparing?", "select", "", ["Permission record", "Creator feature", "Scenario feature", "Correction or removal"]),
        field("creator", "Creator's public name", "text"), field("platform", "Platform", "text"), field("profile", "Official profile link", "url"),
        field("permission_scope", "What exactly may be featured?"), field("permission_status", "Permission status", "select", "", ["Not asked", "Waiting", "Approved", "Approved with limits", "Declined", "Withdrawn"]),
        field("permission_date", "Permission date and where the record is kept"), field("limits", "Approved limits"), field("recommendation", "Your personal recommendation in your own words"),
        field("stories", "What kinds of stories do they make?"), field("starting_point", "Good starting point and official scenario link"),
        field("warnings", "Creator-provided content information source"), field("visual", "Approved visual, credit, and alt text"), field("checked", "Date checked", "date"),
        field("correction", "Correction, update, or removal request and action taken")
      ]
    },
    {
      id: "publishing", title: "Final Publishing Check", page: "Every changed page", description: "The tiny-crime detector: links, permissions, accessibility, mobile behavior, and the final live check.",
      fields: [
        field("name", "Update name or version", "text"), field("pages", "Pages changed"), field("files", "Files or downloads added"), field("date", "Date tested", "date"),
        field("content", "Content, warnings, spoilers, dates, and identity check"), field("links", "Official-link and permission check"),
        field("desktop", "Desktop result"), field("mobile", "Mobile result"), field("accessibility", "Accessibility result"),
        field("live", "Live links checked after deployment"), field("later", "Anything to revisit later")
      ]
    }
  ];

  const roomSelect = app.querySelector("[data-worksheet-room]");
  const form = app.querySelector("[data-worksheet-form]");
  const intro = app.querySelector("[data-worksheet-intro]");
  const saveStatus = app.querySelector("[data-save-status]");
  const outputSection = app.querySelector("[data-output-section]");
  const output = app.querySelector("[data-submission-output]");
  const copyStatus = app.querySelector("[data-copy-status]");
  const importFile = app.querySelector("[data-import-file]");
  const prefix = "lb-worksheet-v1-";
  let activeRoom;

  const loadDraft = id => {
    try { return JSON.parse(localStorage.getItem(`${prefix}${id}`)) || { values: {} }; }
    catch { return { values: {} }; }
  };
  const hasDraft = id => Object.values(loadDraft(id).values || {}).some(value => String(value).trim());
  const refreshOptions = selected => {
    roomSelect.replaceChildren(...rooms.map(room => {
      const option = document.createElement("option");
      option.value = room.id;
      option.textContent = `${room.title}${hasDraft(room.id) ? " • saved" : ""}`;
      option.selected = room.id === selected;
      return option;
    }));
  };
  const serialize = () => Object.fromEntries(new FormData(form).entries());
  const save = () => {
    if (!activeRoom) return;
    const draft = { room: activeRoom.id, updated: new Date().toISOString(), values: serialize() };
    try {
      localStorage.setItem(`${prefix}${activeRoom.id}`, JSON.stringify(draft));
      saveStatus.textContent = `Saved on this device at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`;
      refreshOptions(activeRoom.id);
    } catch {
      saveStatus.textContent = "This browser blocked local saving. Export your draft before leaving.";
    }
  };
  const makeControl = spec => {
    let control;
    if (spec.type === "select") {
      control = document.createElement("select");
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "Choose one";
      control.append(blank, ...spec.options.map(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        return option;
      }));
    } else if (spec.type === "textarea") {
      control = document.createElement("textarea");
      control.rows = 5;
    } else {
      control = document.createElement("input");
      control.type = spec.type;
    }
    control.name = spec.key;
    control.id = `worksheet-${activeRoom.id}-${spec.key}`;
    return control;
  };
  const renderRoom = id => {
    activeRoom = rooms.find(room => room.id === id) || rooms[0];
    const draft = loadDraft(activeRoom.id);
    refreshOptions(activeRoom.id);
    intro.innerHTML = `<p class="kicker">${activeRoom.page}</p><h2>${activeRoom.title}</h2><p>${activeRoom.description}</p>`;
    form.replaceChildren();
    activeRoom.fields.forEach(spec => {
      const label = document.createElement("label");
      label.htmlFor = `worksheet-${activeRoom.id}-${spec.key}`;
      const title = document.createElement("strong");
      title.textContent = spec.label;
      const control = makeControl(spec);
      control.value = draft.values?.[spec.key] || "";
      label.append(title);
      if (spec.hint) {
        const hint = document.createElement("span");
        hint.textContent = spec.hint;
        label.append(hint);
      }
      label.append(control);
      form.append(label);
    });
    outputSection.hidden = true;
    const filled = Object.values(draft.values || {}).filter(value => String(value).trim()).length;
    saveStatus.textContent = filled ? `${filled} answer${filled === 1 ? "" : "s"} restored from this device.` : "Blank worksheet. Start anywhere; every answer is optional.";
    const url = new URL(window.location.href);
    url.searchParams.set("room", activeRoom.id);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };
  const download = (name, contents, type) => {
    const blob = new Blob([contents], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };
  const submissionText = () => {
    const values = serialize();
    const answered = activeRoom.fields.filter(spec => String(values[spec.key] || "").trim());
    if (!answered.length) return "";
    return [
      "LESBICHAOTIC SITE UPDATE SUBMISSION",
      `Worksheet: ${activeRoom.title}`,
      `Target page: ${activeRoom.page}`,
      "",
      ...answered.flatMap(spec => [spec.label.toUpperCase(), String(values[spec.key]).trim(), ""]),
      "Please turn these notes into polished site copy in the established LesBiChaotic voice. Preserve exact titles, credits, dates, warnings, and official links. Ask me before guessing any missing fact."
    ].join("\n");
  };

  roomSelect.addEventListener("change", () => renderRoom(roomSelect.value));
  form.addEventListener("input", save);
  form.addEventListener("change", save);
  app.querySelector("[data-generate-submission]").addEventListener("click", () => {
    const text = submissionText();
    if (!text) {
      saveStatus.textContent = "Add at least one answer before summoning a submission.";
      form.querySelector("input, textarea, select")?.focus();
      return;
    }
    output.value = text;
    outputSection.hidden = false;
    outputSection.focus();
    outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  app.querySelector("[data-copy-submission]").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyStatus.textContent = "Copied. Bring the evidence to me. ♡";
    } catch {
      output.focus();
      output.select();
      copyStatus.textContent = "Your browser blocked automatic copying. The text is selected for manual copy.";
    }
  });
  app.querySelector("[data-download-submission]").addEventListener("click", () => download(`lesbichaotic-${activeRoom.id}-submission.txt`, output.value, "text/plain"));
  app.querySelector("[data-export-backup]").addEventListener("click", () => {
    const drafts = Object.fromEntries(rooms.map(room => [room.id, loadDraft(room.id)]).filter(([, draft]) => Object.values(draft.values || {}).some(value => String(value).trim())));
    download(`lesbichaotic-worksheet-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ version: 1, exported: new Date().toISOString(), drafts }, null, 2), "application/json");
    saveStatus.textContent = `${Object.keys(drafts).length} worksheet draft${Object.keys(drafts).length === 1 ? "" : "s"} exported.`;
  });
  app.querySelector("[data-import-backup]").addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", async () => {
    const file = importFile.files?.[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      if (backup.version !== 1 || !backup.drafts || typeof backup.drafts !== "object") throw new Error("Invalid backup");
      let count = 0;
      rooms.forEach(room => {
        const draft = backup.drafts[room.id];
        if (draft?.values && typeof draft.values === "object") {
          localStorage.setItem(`${prefix}${room.id}`, JSON.stringify({ room: room.id, updated: draft.updated || new Date().toISOString(), values: draft.values }));
          count += 1;
        }
      });
      renderRoom(activeRoom.id);
      saveStatus.textContent = `${count} worksheet draft${count === 1 ? "" : "s"} restored from the backup.`;
    } catch {
      saveStatus.textContent = "That file is not a valid Worksheet Cabinet backup.";
    }
    importFile.value = "";
  });
  app.querySelector("[data-clear-worksheet]").addEventListener("click", () => {
    if (!confirm(`Clear every answer in ${activeRoom.title}? Export a backup first if you may want it later.`)) return;
    localStorage.removeItem(`${prefix}${activeRoom.id}`);
    renderRoom(activeRoom.id);
    saveStatus.textContent = "This worksheet is empty again.";
  });

  const requested = new URLSearchParams(window.location.search).get("room");
  renderRoom(rooms.some(room => room.id === requested) ? requested : rooms[0].id);
})();
