// Simple hash-router + renderer for ModularManuals.

const TYPE_LABEL = {
  knob: "Knob",
  button: "Button",
  "jack-in": "Input",
  "jack-out": "Output",
  switch: "Switch",
  mode: "Mode",
  model: "Model"
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Hotspot coordinates: localStorage override from the editor wins over data.js.
// Cache per module id so editing one module never serves another's stale data.
const _hsCache = {};
function moduleHotspots(m) {
  if (!m) return null;
  if (m.id in _hsCache) return _hsCache[m.id];
  let v = m.hotspots;
  try {
    const s = localStorage.getItem("hotspots:" + m.id);
    if (s) v = JSON.parse(s);
  } catch (e) { /* ignore */ }
  _hsCache[m.id] = v;
  return v;
}

// Wrap mentions of a module's mapped controls in hoverable spans.
// `text` must already be HTML-escaped (no tags). Matches whole words, plural tolerant.
function hot(text, m) {
  const HS = moduleHotspots(m);
  if (!HS) return text;
  const keys = Object.keys(HS).sort((a, b) => b.length - a.length);
  const re = new RegExp(`\\b(${keys.map(escapeRe).join("|")})(s?)\\b`, "gi");
  return text.replace(
    re,
    (_full, word, plural) =>
      `<span class="hot" data-hot="${word.toLowerCase()}">${word}${plural}</span>`
  );
}

/* ---------- Sidebar ---------- */
function setActiveNav(route) {
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-route") === route);
  });
}

/* ---------- Views ---------- */
// Home filter state (persists while navigating).
let homeQuery = "";
let homeMfr = "all";

const MANUFACTURERS = [...new Set(MODULES.map((m) => m.manufacturer))];

function filteredModules() {
  const q = homeQuery.trim().toLowerCase();
  return MODULES.filter((m) => {
    const mfrOk = homeMfr === "all" || m.manufacturer === homeMfr;
    const qOk = !q || `${m.name} ${m.manufacturer} ${m.tagline}`.toLowerCase().includes(q);
    return mfrOk && qOk;
  });
}

function cardsHTML() {
  const list = filteredModules();
  if (!list.length) {
    return `<p class="empty">No module matches “${esc(homeQuery)}”${homeMfr !== "all" ? ` in ${esc(homeMfr)}` : ""}.</p>`;
  }
  return list
    .map(
      (m) => `<div class="mod-card" data-route="#/module/${m.id}">
      <div class="thumb"><img src="${esc(m.image)}" alt="${esc(m.name)}" loading="lazy"></div>
      <div class="mfr">${esc(m.manufacturer)}</div>
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.tagline)}</p>
    </div>`
    )
    .join("");
}

function chipsHTML() {
  const chip = (val, label) =>
    `<button class="chip ${homeMfr === val ? "active" : ""}" data-mfr="${esc(val)}">${esc(label)}</button>`;
  return [chip("all", `All (${MODULES.length})`)]
    .concat(MANUFACTURERS.map((mfr) => chip(mfr, mfr)))
    .join("");
}

function viewHome() {
  return `<div class="home-hero">
      <h2>Modular Manuals</h2>
      <p>A pocket reference for a small rack of Eurorack modules. Pick a module to walk through every control, jack and mode — or dip into <a data-route="#/did-you-know" class="route-link">Did You Know</a> for trivia.</p>
    </div>
    <div class="filter-bar">
      <input type="search" id="search" class="search-input" placeholder="Search modules…" value="${esc(homeQuery)}" autocomplete="off">
      <div class="chips" id="mfr-chips">${chipsHTML()}</div>
    </div>
    <div class="card-grid" id="card-grid">${cardsHTML()}</div>`;
}

// Refresh only the grid + chip states, without re-rendering the whole view
// (keeps the search box focused while typing).
function refreshHome() {
  const grid = document.getElementById("card-grid");
  if (grid) grid.innerHTML = cardsHTML();
  document.querySelectorAll("#mfr-chips .chip").forEach((c) => {
    c.classList.toggle("active", c.getAttribute("data-mfr") === homeMfr);
  });
}

function mountHome() {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      homeQuery = e.target.value;
      refreshHome();
    });
  }
  const chips = document.getElementById("mfr-chips");
  if (chips) {
    chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      homeMfr = btn.getAttribute("data-mfr");
      refreshHome();
    });
  }
}

// Controls are inline objects {name,type,desc,tip} in every section.
function resolveControl(c) {
  return typeof c === "object" && c ? c : null;
}

// LED bank colour inferred from a section title (Plaits model banks).
function bankColor(title) {
  if (/bank a|green led/i.test(title)) return "green";
  if (/bank b|red led/i.test(title)) return "red";
  if (/firmware 1\.2|orange|yellow bank/i.test(title)) return "amber";
  return null;
}

// One light control-reference row (no bordered card). `led` optionally prepends
// a numbered colour LED badge (used for Plaits' model banks).
function ctrlItem(c, m, anchorId, led) {
  const o = resolveControl(c);
  if (!o) return "";
  const badge = led ? `<span class="led led-${led.color}" title="LED ${led.n}, ${led.color}">${led.n}</span>` : "";
  return `<div class="ctrl"${anchorId ? ` id="${anchorId}"` : ""}>
    <dt>${badge}<span class="ctrl-name">${esc(o.name)}</span><span class="ctrl-type type-${o.type}">${esc(TYPE_LABEL[o.type] || o.type)}</span></dt>
    <dd>${esc(o.desc)}${o.tip ? ` <span class="ctrl-tip">${esc(o.tip)}</span>` : ""}</dd>
  </div>`;
}

// All controls of a module, in document order, with the anchor id their row carries.
function moduleControls(m) {
  const out = [];
  (m.sections || []).forEach((sec, si) =>
    (sec.controls || []).forEach((c, ci) => {
      const o = resolveControl(c);
      if (o) out.push({ name: o.name, type: o.type, id: `ctrl-${si}-${ci}` });
    })
  );
  return out;
}

// Parse a "…HARMO: x; TIMBRE: y; MORPH: z. notes" model description into columns.
function parseModelDesc(desc) {
  const mm = String(desc).match(
    /^(.*?)\bHARMO(?:NICS)?:\s*(.+?);\s*TIMBRE:\s*(.+?);\s*MORPH:\s*(.+?)(?:\.\s*(.*))?$/i
  );
  if (!mm) return null;
  return {
    harmonics: mm[2].trim(),
    timbre: mm[3].trim(),
    morph: mm[4].trim(),
    notes: (mm[5] || "").trim()
  };
}
function modelShortName(name) {
  const i = name.indexOf("—");
  return i >= 0 ? name.slice(i + 1).trim() : name;
}
// Color-coded model table for a Plaits LED bank.
function modelTableHTML(controls, color, label = "Models · LED number & colour") {
  let n = 0;
  const rows = controls
    .map((c) => {
      if (!(typeof c === "object" && c.type === "model")) return "";
      n += 1;
      const led = `<span class="led led-${color}">${n}</span>`;
      const nm = esc(modelShortName(c.name));
      const p = parseModelDesc(c.desc || "");
      if (!p) return `<tr><td>${led}</td><td class="m-name">${nm}</td><td colspan="4">${esc(c.desc || "")}</td></tr>`;
      return `<tr><td>${led}</td><td class="m-name">${nm}</td><td>${esc(p.harmonics)}</td><td>${esc(p.timbre)}</td><td>${esc(p.morph)}</td><td>${esc(p.notes)}</td></tr>`;
    })
    .join("");
  if (!rows) return "";
  return `${label ? `<div class="block-label">${esc(label)}</div>` : ""}
    <div class="model-table-wrap">
      <table class="model-table bank-${color}">
        <thead><tr><th>LED</th><th>Model</th><th>Harmonics</th><th>Timbre</th><th>Morph</th><th>Notes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// All LED-bank model tables stacked (used at the top of the Plaits overview).
function allModelTablesHTML(m) {
  const banks = m.sections
    .map((s) => ({ s, bc: bankColor(s.title) }))
    .filter((x) => x.bc);
  if (!banks.length) return "";
  const tables = banks
    .map(({ s, bc }) => `<h3 class="models-bank-title">${esc(s.title)}</h3>${modelTableHTML(s.controls || [], bc, "")}`)
    .join("");
  return `<div class="section-title">All models — by LED number &amp; colour</div>${tables}`;
}

// A 2-rows-of-4 LED indicator with the program's position lit (FX Aid panel).
// FX Aid LED indicator: top row of 4 = bank (1-4, one lit); bottom row of 4 =
// program — programs 1-4 light a single LED (position = n), programs 5-8 light
// every LED except one (the dark one = n-4). Matches the panel selection scheme.
function ledMatrix(n, bank, color) {
  let dots = "";
  for (let i = 1; i <= 4; i++) dots += `<i class="${i === bank ? "on" : ""}"></i>`;
  for (let j = 1; j <= 4; j++) {
    const on = n <= 4 ? j === n : j !== n - 4;
    dots += `<i class="${on ? "on" : ""}"></i>`;
  }
  return `<span class="led-mx led-mx-${color}" role="img" aria-label="Bank ${bank}, program ${n}">${dots}</span>`;
}

// Effect banks (FX Aid XL) laid out as the hardware does: two rows of four LEDs.
function allEffectBanksHTML(m) {
  if (!m.effectBanks) return "";
  const kl = m.knobLabels || ["Knob 1", "Knob 2", "Knob 3"];
  const banks = m.effectBanks
    .map((b, bi) => {
      const cells = b.programs
        .map(
          (p, pi) => `<div class="fx-prog">
            <div class="fx-prog-top">${ledMatrix(pi + 1, bi + 1, b.color)}<span class="fx-prog-num">${p.n}</span><span class="fx-prog-name">${esc(p.name)}</span></div>
            <dl class="fx-knobs">
              <div><dt>K1</dt><dd>${esc(p.k1)}</dd></div>
              <div><dt>K2</dt><dd>${esc(p.k2)}</dd></div>
              <div><dt>K3</dt><dd>${esc(p.k3)}</dd></div>
            </dl>
            ${p.notes ? `<p class="fx-prog-notes">${esc(p.notes)}</p>` : ""}
          </div>`
        )
        .join("");
      return `<div class="fx-bank bank-${b.color}">
        <h3 class="models-bank-title">${esc(b.bank)}</h3>
        <div class="fx-grid-wrap"><div class="fx-grid">${cells}</div></div>
      </div>`;
    })
    .join("");
  const legend = `<p class="knob-legend">${kl.map(esc).join(" &nbsp;·&nbsp; ")}</p>`;
  return `<div class="section-title">Effects bank — laid out as you select it (two rows of four)</div>${legend}${banks}`;
}

// Panel thumbnail with every control mentioned in `text` circled — the
// per-step contextual visual. Returns "" when no mapped control is mentioned.
function stepVisual(text, m) {
  const HS = moduleHotspots(m);
  if (!HS) return "";
  const keys = Object.keys(HS).filter((k) =>
    new RegExp(`\\b${escapeRe(k)}s?\\b`, "i").test(text)
  );
  if (!keys.length) return "";
  const rings = keys
    .map((k) => {
      const h = HS[k];
      const rx = h.rx != null ? h.rx : h.r;
      const ry = h.ry != null ? h.ry : h.r;
      return `<span class="hot-ring" style="left:${h.x * 100}%;top:${h.y * 100}%;width:${rx * 200}%;height:${ry * 200}%"></span>`;
    })
    .join("");
  return `<span class="step-vis" aria-hidden="true"><img src="${esc(m.image)}" alt="" loading="lazy">${rings}</span>`;
}

// Result-first entry points: each outcome opens one task, already expanded.
function outcomeCardsHTML(m) {
  if (!m.outcomes || !m.outcomes.length) return "";
  const cards = m.outcomes
    .map((o) => {
      const sec = m.sections[o.si];
      const h = sec && sec.howtos && sec.howtos[o.hi];
      if (!h) return "";
      return `<a class="oc-card" data-route="#/module/${m.id}/${o.si}" data-target="task-${o.si}-${o.hi}">
        <h3>${esc(o.title)}</h3>
        <span class="oc-meta">${h.steps.length} steps →</span>
      </a>`;
    })
    .join("");
  return `<div class="block-label oc-label">What do you want to do?</div><div class="oc-grid">${cards}</div>`;
}

// Full detail for ONE section: tasks first (action), then diagram, prose, controls.
function renderSection(m, si) {
  const sec = m.sections[si];
  if (!sec) return "";
  const tasks = (sec.howtos || [])
    .map(
      (h, hi) => `<details class="task" id="task-${si}-${hi}">
        <summary>${hot(esc(h.goal), m)}</summary>
        <ol class="howto-steps">${h.steps
          .map((s) => `<li><span class="step-text">${hot(esc(s), m)}</span>${stepVisual(s, m)}</li>`)
          .join("")}</ol>
      </details>`
    )
    .join("");
  const taskBlock = tasks
    ? `<div class="block-label">What do you want to do?</div><div class="tasks">${tasks}</div>`
    : "";
  const fig = sec.image
    ? `<figure class="section-fig">
        <img src="${esc(sec.image)}" alt="${esc(sec.title)} diagram" loading="lazy">
        ${sec.imageCaption ? `<figcaption>${esc(sec.imageCaption)}</figcaption>` : ""}
      </figure>`
    : "";
  const bc = bankColor(sec.title);
  const allControls = sec.controls || [];
  // In a Plaits LED bank, models render as a colour-coded table; other controls
  // (and all controls in non-bank sections) render as the usual light list.
  const modelTable = bc ? modelTableHTML(allControls, bc) : "";
  const listControls = bc ? allControls.filter((c) => !(typeof c === "object" && c.type === "model")) : allControls;
  const ctrls = listControls
    .map((c, ci) => ctrlItem(c, m, `ctrl-${si}-${ci}`))
    .filter(Boolean)
    .join("");
  const ctrlList = ctrls
    ? `<details class="explain"><summary>Controls (${listControls.length})</summary>
        <div class="explain-body"><dl class="ctrl-list">${ctrls}</dl></div>
      </details>`
    : "";
  const paras = (sec.body || (sec.intro ? [sec.intro] : []))
    .map((p) => `<p class="section-body">${hot(esc(p), m)}</p>`)
    .join("");
  return `${paras}${taskBlock}${fig}${modelTable}${ctrlList}`;
}

// Overview hub: a clickable card per function (section), image-forward.
function sectionCardsHTML(m) {
  const cards = m.sections
    .map((sec, si) => {
      const nT = (sec.howtos || []).length;
      const nC = (sec.controls || []).length;
      const thumb = sec.image
        ? `<div class="fn-thumb"><img src="${esc(sec.image)}" alt="" loading="lazy"></div>`
        : `<div class="fn-thumb fn-thumb--none"><span>${si + 1}</span></div>`;
      const meta = [nT ? `${nT} how-to${nT > 1 ? "s" : ""}` : "", nC ? `${nC} control${nC > 1 ? "s" : ""}` : ""]
        .filter(Boolean)
        .join(" · ");
      return `<a class="fn-card" data-route="#/module/${m.id}/${si}">
        ${thumb}
        <div class="fn-card-body"><h3>${esc(sec.title)}</h3><p class="fn-meta">${meta}</p></div>
      </a>`;
    })
    .join("");
  return `<div class="fn-grid">${cards}</div>`;
}

let activeModule = null;

// Unique controls of a module (deduped by name), grouped for the panel guide.
function uniqueControls(m) {
  const seen = new Set();
  const out = [];
  (m.sections || []).forEach((sec) =>
    (sec.controls || []).forEach((c) => {
      const o = resolveControl(c);
      if (!o) return;
      const key = o.name.trim().toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      out.push(o);
    })
  );
  return out;
}

// Annotated panel view: numbered markers on the panel image + a legend that
// lists every control with its function. Markers come from the hotspot map.
function viewPanel(m) {
  activeModule = m;
  const HS = moduleHotspots(m) || {};
  const hsKeys = Object.keys(HS);
  const ctrls = uniqueControls(m);

  // Assign each hotspot a number and try to attach it to a control entry.
  const markers = hsKeys.map((k, i) => {
    const ctrl = ctrls.find((c) => c.name.toLowerCase().includes(k.toLowerCase()));
    return { n: i + 1, key: k, h: HS[k], ctrl };
  });
  const markerFor = (c) => markers.find((mk) => mk.ctrl === c);

  const rings = markers
    .map((mk) => {
      const rx = mk.h.rx != null ? mk.h.rx : mk.h.r;
      const ry = mk.h.ry != null ? mk.h.ry : mk.h.r;
      return `<span class="pg-ring" id="pgm-${mk.n}" style="left:${mk.h.x * 100}%;top:${mk.h.y * 100}%;width:${rx * 200}%;height:${ry * 200}%"></span>
        <a class="pg-dot" data-scroll="pg-${mk.n}" style="left:${(mk.h.x + (mk.h.rx != null ? mk.h.rx : mk.h.r)) * 100}%;top:${mk.h.y * 100}%" title="${esc(mk.ctrl ? mk.ctrl.name : mk.key)}">${mk.n}</a>`;
    })
    .join("");

  const GROUPS = [
    ["knob", "Knobs"], ["button", "Buttons"], ["switch", "Switches"],
    ["jack-in", "Inputs"], ["jack-out", "Outputs"], ["mode", "Modes & menus"], ["model", "Models"]
  ];
  const legend = GROUPS.map(([type, label]) => {
    const rows = ctrls
      .filter((c) => c.type === type)
      .map((c) => {
        const mk = markerFor(c);
        return `<div class="ctrl pg-row" ${mk ? `id="pg-${mk.n}" data-mark="${mk.n}"` : ""}>
          <dt>${mk ? `<span class="pg-num">${mk.n}</span>` : `<span class="pg-num pg-num--none"></span>`}<span class="ctrl-name">${esc(c.name)}</span><span class="ctrl-type type-${c.type}">${esc(TYPE_LABEL[c.type] || c.type)}</span></dt>
          <dd>${esc(c.desc)}</dd>
        </div>`;
      })
      .join("");
    return rows ? `<div class="ctrl-list-label">${label}</div><dl class="ctrl-list">${rows}</dl>` : "";
  }).join("");

  return `<div class="detail-top">
      <a class="back-link" data-route="#/module/${m.id}">← ${esc(m.name)}</a>
    </div>
    <h2 class="detail-title">Panel guide</h2>
    <p class="pg-hint">Numbered rings mark the controls on the panel — tap a number to jump to its description. Hover a row to light up its control.</p>
    <div class="panel-guide">
      <div class="pg-imgwrap"><img src="${esc(m.image)}" alt="${esc(m.name)} front panel">${rings}</div>
      <div class="pg-legend">${legend}</div>
    </div>`;
}

function specsBlockHTML(m) {
  const specs = Object.entries(m.specs)
    .map(([k, v]) => `<div class="spec"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`)
    .join("");
  return `<details class="specs-details"><summary>Specifications</summary><div class="specs">${specs}</div></details>`;
}

// Module overview hub: panel image + clickable summary of every function.
function viewModuleOverview(m) {
  activeModule = m;
  const ctrlCount = moduleControls(m).length;
  const trivia = m.trivia
    .map((t) => `<div class="dyk-card"><h4>${esc(t.title)}</h4><p>${esc(t.fact)}</p></div>`)
    .join("");
  const head = `<div class="module-head">
      <div class="module-img module-img--link" data-route="#/module/${m.id}/panel" title="Open the panel guide">
        <img src="${esc(m.image)}" alt="${esc(m.name)} front panel — tap for the panel guide">
        <span class="module-img-hint">Tap to explore every control</span>
      </div>
      <div class="module-meta">
        <div class="mfr">${esc(m.manufacturer)}</div>
        <h2>${esc(m.name)}</h2>
        <p class="tagline">${esc(m.tagline)}</p>
        <div class="badges">
          <span class="badge"><b>${esc(m.hp)}</b> HP</span>
          <span class="badge"><b>${ctrlCount}</b> controls</span>
          <span class="badge"><b>${m.sections.length}</b> functions</span>
        </div>
        <p class="overview">${esc(m.overview)}</p>
        <a class="manual-link" href="${esc(m.manualUrl)}" target="_blank" rel="noopener">Official manual / product page ↗</a>
      </div>
    </div>`;
  return `${head}
    ${outcomeCardsHTML(m)}
    ${allModelTablesHTML(m)}
    ${allEffectBanksHTML(m)}
    <div class="block-label fn-grid-label">Functions — tap one to open its guide</div>
    ${sectionCardsHTML(m)}
    ${specsBlockHTML(m)}
    <div class="section-title">Did you know? · ${esc(m.name)}</div>
    <div class="dyk-grid">${trivia}</div>`;
}

// Focused detail view for one function (section).
function viewSection(m, si) {
  activeModule = m;
  const sec = m.sections[si];
  if (!sec) return viewModuleOverview(m);
  const switcher = m.sections
    .map((s, i) => `<a class="sec-chip ${i === si ? "active" : ""}" data-route="#/module/${m.id}/${i}" title="${esc(s.title)}">${i + 1}</a>`)
    .join("");
  const prev = si > 0
    ? `<a class="sec-nav" data-route="#/module/${m.id}/${si - 1}">← ${esc(m.sections[si - 1].title)}</a>`
    : "<span></span>";
  const next = si < m.sections.length - 1
    ? `<a class="sec-nav next" data-route="#/module/${m.id}/${si + 1}">${esc(m.sections[si + 1].title)} →</a>`
    : "<span></span>";
  return `<div class="detail-top">
      <a class="back-link" data-route="#/module/${m.id}">← ${esc(m.name)}</a>
      <div class="sec-switcher">${switcher}</div>
    </div>
    <h2 class="detail-title">${esc(sec.title)}</h2>
    ${renderSection(m, si)}
    <div class="sec-prevnext">${prev}${next}</div>`;
}

let lastTriviaIdx = -1;
function randomTriviaIdx() {
  if (TRIVIA.length <= 1) return 0;
  let i;
  do { i = Math.floor(Math.random() * TRIVIA.length); } while (i === lastTriviaIdx);
  lastTriviaIdx = i;
  return i;
}

function viewDidYouKnow() {
  const t = TRIVIA[randomTriviaIdx()];
  const cards = TRIVIA.map(
    (x) => `<div class="dyk-card">
      <span class="module-pill route-link" data-route="#/module/${x.moduleId}">${esc(x.module)}</span>
      <h4>${esc(x.title)}</h4>
      <p>${esc(x.fact)}</p>
    </div>`
  ).join("");

  return `<div class="home-hero"><h2>Did You Know?</h2>
      <p>${TRIVIA.length} bits of trivia across the rack.</p></div>
    <div class="dyk-feature" id="dyk-feature">
      <div class="label">Random fact</div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.fact)}</p>
      <div class="src">— ${esc(t.module)}</div>
      <div style="margin-top:18px"><button class="btn" id="dyk-shuffle">Another one →</button></div>
    </div>
    <div class="section-title">All trivia</div>
    <div class="dyk-grid">${cards}</div>`;
}

function shuffleFeature() {
  const t = TRIVIA[randomTriviaIdx()];
  const el = document.getElementById("dyk-feature");
  if (!el) return;
  el.querySelector("h3").textContent = t.title;
  el.querySelector("p").textContent = t.fact;
  el.querySelector(".src").textContent = "— " + t.module;
}

/* ---------- Router ---------- */
function render() {
  const route = location.hash || "#/";
  const content = document.getElementById("content");
  let html;

  let title = "Modular Manuals";
  if (route.startsWith("#/module/")) {
    const rest = route.slice("#/module/".length);
    const slash = rest.indexOf("/");
    const id = slash === -1 ? rest : rest.slice(0, slash);
    const m = MODULES.find((x) => x.id === id);
    if (!m) {
      html = viewHome();
    } else if (slash === -1) {
      html = viewModuleOverview(m);
      title = `${m.name} — Modular Manuals`;
    } else if (rest.slice(slash + 1) === "panel") {
      html = viewPanel(m);
      title = `Panel guide · ${m.name}`;
    } else {
      const si = parseInt(rest.slice(slash + 1), 10);
      html = viewSection(m, si);
      title = `${m.sections[si] ? m.sections[si].title : m.name} · ${m.name}`;
    }
  } else if (route === "#/did-you-know") {
    html = viewDidYouKnow();
    title = "Did You Know? — Modular Manuals";
  } else {
    html = viewHome();
  }

  content.innerHTML = html;
  document.title = title;
  setActiveNav(route);
  enhanceA11y(content);
  hideHotPop();
  window.scrollTo(0, 0);

  const shuffle = document.getElementById("dyk-shuffle");
  if (shuffle) shuffle.addEventListener("click", shuffleFeature);

  if (!route.startsWith("#/module/") && route !== "#/did-you-know") mountHome();

  applyPendingScroll();
}

// Make injected click targets reachable by keyboard / screen readers.
function enhanceA11y(root) {
  root.querySelectorAll("[data-route],[data-scroll]").forEach((el) => {
    el.setAttribute("tabindex", "0");
    if (!el.getAttribute("role")) el.setAttribute("role", "link");
  });
  root.querySelectorAll(".hot").forEach((el) => {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Show ${el.textContent} on the panel`);
  });
}

/* ---------- Control hover preview (panel image with the control circled) ---------- */
let hotPop = null;
function ensureHotPop() {
  if (!hotPop) {
    hotPop = document.createElement("div");
    hotPop.className = "hot-pop";
    hotPop.style.display = "none";
    document.body.appendChild(hotPop);
  }
  return hotPop;
}
function showHotPop(el) {
  const m = activeModule;
  const key = el.getAttribute("data-hot");
  const HS = moduleHotspots(m);
  const hs = HS && HS[key];
  if (!hs) return;
  const rx = hs.rx != null ? hs.rx : hs.r;
  const ry = hs.ry != null ? hs.ry : hs.r;
  const pop = ensureHotPop();
  pop.innerHTML =
    `<div class="hot-pop-inner"><img src="${esc(m.image)}" alt="">` +
    `<span class="hot-ring" style="left:${hs.x * 100}%;top:${hs.y * 100}%;width:${rx * 200}%;height:${ry * 200}%"></span></div>` +
    `<div class="hot-pop-cap">${esc(el.textContent)}</div>`;
  pop.style.display = "block";
  const r = el.getBoundingClientRect();
  const pw = pop.offsetWidth;
  const ph = pop.offsetHeight;
  let top = r.top - ph - 8;
  if (top < 8) top = r.bottom + 8;
  top = Math.max(8, Math.min(top, window.innerHeight - ph - 8));
  let left = r.left + r.width / 2 - pw / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;
}
function hideHotPop() {
  if (hotPop) hotPop.style.display = "none";
}
// Hover (desktop) and focus (keyboard) both reveal the preview.
document.addEventListener("mouseover", (e) => {
  const el = e.target.closest(".hot");
  if (el) showHotPop(el);
  // Panel guide: hovering a legend row lights up its ring on the image.
  const row = e.target.closest(".pg-row[data-mark]");
  document.querySelectorAll(".pg-ring.sel").forEach((r) => r.classList.remove("sel"));
  if (row) {
    const ring = document.getElementById("pgm-" + row.getAttribute("data-mark"));
    if (ring) ring.classList.add("sel");
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(".hot")) hideHotPop();
});
document.addEventListener("focusin", (e) => {
  const el = e.target.closest && e.target.closest(".hot");
  if (el) showHotPop(el);
});
document.addEventListener("focusout", (e) => {
  if (e.target.closest && e.target.closest(".hot")) hideHotPop();
});
// Tap toggles on touch; tapping/clicking anywhere else dismisses it.
document.addEventListener("click", (e) => {
  const el = e.target.closest(".hot");
  if (!el) { hideHotPop(); return; }
  e.preventDefault();
  if (hotPop && hotPop.style.display === "block") hideHotPop();
  else showHotPop(el);
});
window.addEventListener("scroll", hideHotPop, true);
// Keyboard: Enter/Space activate any click target; Escape closes the preview;
// "/" focuses the global search from anywhere outside an input.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { hideHotPop(); return; }
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
  if (e.key === "/" && !typing) {
    e.preventDefault();
    const s = document.getElementById("global-search");
    if (s) { s.focus(); s.select(); }
    return;
  }
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest && e.target.closest("[data-route],[data-scroll],.hot");
  if (!el) return;
  e.preventDefault();
  el.click();
});

/* ---------- Keyword search ---------- */
function buildSearchIndex() {
  const idx = [];
  MODULES.forEach((m) => {
    (m.sections || []).forEach((sec, si) => {
      const route = `#/module/${m.id}/${si}`;
      const ctrlNames = (sec.controls || []).map((c) => (typeof c === "string" ? c : c.name)).join(" ");
      idx.push({
        mod: m.name, kind: "Function", label: sec.title, route, target: "",
        text: `${sec.title} ${(sec.body || []).join(" ")} ${ctrlNames}`.toLowerCase()
      });
      (sec.howtos || []).forEach((h, hi) => {
        idx.push({
          mod: m.name, kind: "Task", label: h.goal, route, target: `task-${si}-${hi}`,
          text: `${h.goal} ${h.steps.join(" ")}`.toLowerCase()
        });
      });
    });
    (m.effectBanks || []).forEach((b) => {
      (b.programs || []).forEach((p) => {
        idx.push({
          mod: m.name, kind: "Effect", label: p.name, route: `#/module/${m.id}`, target: "",
          text: `${p.name} ${p.k1} ${p.k2} ${p.k3} ${p.notes || ""}`.toLowerCase()
        });
      });
    });
  });
  return idx;
}
const SEARCH_INDEX = buildSearchIndex();
const KIND_ORDER = { Task: 0, Effect: 1, Function: 2 };

function mountSearch() {
  const inp = document.getElementById("global-search");
  const res = document.getElementById("search-results");
  if (!inp || !res) return;
  inp.addEventListener("input", () => {
    const q = inp.value.trim().toLowerCase();
    if (q.length < 2) {
      res.innerHTML = q.length === 1 ? `<div class="search-empty">Keep typing…</div>` : "";
      return;
    }
    const all = SEARCH_INDEX.filter((e) => e.text.includes(q))
      .sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
    const hits = all.slice(0, 24);
    if (!hits.length) {
      res.innerHTML = `<div class="search-empty">No match for “${esc(inp.value)}”.</div>`;
      return;
    }
    const more = all.length > hits.length ? `<div class="search-count">Showing ${hits.length} of ${all.length}</div>` : "";
    res.innerHTML = more + hits.map((h) =>
      `<a class="search-hit" data-route="${h.route}"${h.target ? ` data-target="${h.target}"` : ""}>
        <span class="hit-top"><span class="hit-kind hit-${h.kind.toLowerCase()}">${h.kind}</span><span class="hit-mod">${esc(h.mod)}</span></span>
        <span class="hit-label">${esc(h.label)}</span>
      </a>`
    ).join("");
    enhanceA11y(res);
  });
}

// Open any collapsed <details> ancestors (and the target itself), scroll, flash.
function revealAndScroll(el) {
  if (!el) return;
  if (el.tagName === "DETAILS") el.open = true;
  let p = el.parentElement && el.parentElement.closest("details");
  while (p) { p.open = true; p = p.parentElement && p.parentElement.closest("details"); }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 1200);
}

let pendingScroll = null;
function applyPendingScroll() {
  if (!pendingScroll) return;
  const el = document.getElementById(pendingScroll);
  pendingScroll = null;
  revealAndScroll(el);
}

// Delegate clicks: data-route navigates (optionally scrolling to data-target),
// data-scroll jumps to an anchor in-page.
document.addEventListener("click", (e) => {
  const route = e.target.closest("[data-route]");
  if (route) {
    e.preventDefault();
    const href = route.getAttribute("data-route");
    const target = route.getAttribute("data-target");
    if (target) pendingScroll = target;
    if (location.hash === href) applyPendingScroll();
    else location.hash = href;
    return;
  }
  const scroll = e.target.closest("[data-scroll]");
  if (scroll) {
    e.preventDefault();
    revealAndScroll(document.getElementById(scroll.getAttribute("data-scroll")));
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  mountSearch();
  enhanceA11y(document.querySelector(".sidebar")); // static nav links
  render();
});
