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

// Inline style for a hotspot ring/overlay. A plain `r` renders as a TRUE circle
// (sized off the image width via aspect-ratio, so it stays round on tall panels);
// explicit rx/ry render as an ellipse (width % of width, height % of height).
function ringStyle(h) {
  const pos = `left:${h.x * 100}%;top:${h.y * 100}%;`;
  const rx = h.rx != null ? h.rx : h.r;
  const ry = h.ry != null ? h.ry : h.r;
  // Equal radii (incl. r-only and editor/localStorage rx==ry) → true circle,
  // sized off the image WIDTH so it stays round on any panel aspect ratio.
  if (Math.abs(rx - ry) < 0.0005) return `${pos}width:${rx * 200}%;aspect-ratio:1;`;
  return `${pos}width:${rx * 200}%;height:${ry * 200}%;`;
}

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
  const r = route || "#/";
  document.querySelectorAll(".nav-item").forEach((el) => {
    const t = el.getAttribute("data-route");
    const active = t === "#/" ? r === "#/" : r === t || r.startsWith(t + "/");
    el.classList.toggle("active", active);
  });
}

// Persistent module list in the sidebar (data-driven).
function mountModuleNav() {
  const el = document.getElementById("module-nav");
  if (!el) return;
  el.innerHTML = MODULES.map(
    (m) => `<a class="nav-item nav-mod" data-route="#/module/${m.id}">${esc(m.name)}<span class="mfr">${esc(m.manufacturer)}</span></a>`
  ).join("");
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
      <p>A pocket reference for a small rack of Eurorack modules. Pick a module to walk through every control, jack and mode, grab a <a data-route="#/patches" class="route-link">Patch starter</a>, or dip into <a data-route="#/did-you-know" class="route-link">Did You Know</a> for trivia.</p>
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
    .map((k) => `<span class="hot-ring" style="${ringStyle(HS[k])}"></span>`)
    .join("");
  return `<span class="step-vis" aria-hidden="true"><img src="${esc(m.image)}" alt="" loading="lazy">${rings}</span>`;
}

// Result-first entry points: each outcome opens one task, already expanded.
function outcomeCardsHTML(m) {
  if (!m.outcomes || !m.outcomes.length) return "";
  const card = (o) => {
    const sec = m.sections[o.si];
    const h = sec && sec.howtos && sec.howtos[o.hi];
    if (!h) return "";
    return `<a class="oc-card${o.hidden ? " oc-hidden" : ""}" data-route="#/module/${m.id}/${o.si}" data-target="task-${o.si}-${o.hi}">
      ${o.hidden ? `<span class="oc-tag">✦ hidden</span>` : ""}
      <h3>${esc(o.title)}</h3>
      <span class="oc-meta">${h.steps.length} steps →</span>
    </a>`;
  };
  const normal = m.outcomes.filter((o) => !o.hidden).map(card).join("");
  const hidden = m.outcomes.filter((o) => o.hidden).map(card).join("");
  let html = `<div class="block-label oc-label">What do you want to do?</div><div class="oc-grid">${normal}</div>`;
  if (hidden) {
    html += `<div class="block-label oc-label oc-hidden-label">✦ Hidden &amp; secret modes</div><div class="oc-grid">${hidden}</div>`;
  }
  return html;
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

  // Number the markers in panel reading order (top→bottom, then left→right),
  // so 1·2·3 follow the panel and the legend can read in order.
  const markers = hsKeys
    .map((k) => ({ key: k, h: HS[k], ctrl: ctrls.find((c) => c.name.toLowerCase().includes(k.toLowerCase())) }))
    .sort((a, b) => a.h.y - b.h.y || a.h.x - b.h.x)
    .map((mk, i) => ({ ...mk, n: i + 1 }));

  const rings = markers
    .map((mk) => {
      const rx = mk.h.rx != null ? mk.h.rx : mk.h.r;
      const nm = mk.ctrl ? mk.ctrl.name : mk.key;
      const dsc = mk.ctrl ? mk.ctrl.desc : "";
      return `<span class="pg-ring" id="pgm-${mk.n}" style="${ringStyle(mk.h)}"></span>
        <a class="pg-dot" data-scroll="pg-${mk.n}" data-tipname="${esc(nm)}" data-tipdesc="${esc(dsc)}" style="left:${(mk.h.x + rx) * 100}%;top:${mk.h.y * 100}%">${mk.n}</a>`;
    })
    .join("");

  // Numbered legend, in order 1..N (every dot gets a row, even unmatched keys).
  const numberedRows = markers
    .map((mk) => {
      const c = mk.ctrl;
      const name = c ? c.name : mk.key;
      const type = c ? c.type : "mode";
      const desc = c ? c.desc : "";
      return `<div class="ctrl pg-row" id="pg-${mk.n}" data-mark="${mk.n}">
        <dt><span class="pg-num">${mk.n}</span><span class="ctrl-name">${esc(name)}</span><span class="ctrl-type type-${type}">${esc(TYPE_LABEL[type] || type)}</span></dt>
        <dd>${esc(desc)}</dd>
      </div>`;
    })
    .join("");
  const numberedBlock = numberedRows
    ? `<div class="ctrl-list-label">On the panel</div><dl class="ctrl-list">${numberedRows}</dl>`
    : "";

  // Controls that live on a separate expander board (section title mentions it).
  const expanderNames = new Set();
  (m.sections || []).forEach((sec) => {
    if (/expan/i.test(sec.title)) (sec.controls || []).forEach((c) => {
      const o = resolveControl(c);
      if (o) expanderNames.add(o.name);
    });
  });

  const marked = new Set(markers.filter((mk) => mk.ctrl).map((mk) => mk.ctrl.name));
  const GROUPS = [
    ["knob", "Knobs"], ["button", "Buttons"], ["switch", "Switches"],
    ["jack-in", "Inputs"], ["jack-out", "Outputs"], ["mode", "Modes & menus"], ["model", "Models"]
  ];
  const groupBlocks = (list) =>
    GROUPS.map(([type, label]) => {
      const rows = list
        .filter((c) => c.type === type)
        .map((c) => `<div class="ctrl">
          <dt><span class="pg-num pg-num--none"></span><span class="ctrl-name">${esc(c.name)}</span><span class="ctrl-type type-${c.type}">${esc(TYPE_LABEL[c.type] || c.type)}</span></dt>
          <dd>${esc(c.desc)}</dd>
        </div>`)
        .join("");
      return rows ? `<div class="ctrl-list-label">${label}</div><dl class="ctrl-list">${rows}</dl>` : "";
    }).join("");

  const rest = ctrls.filter((c) => !marked.has(c.name) && !expanderNames.has(c.name));
  const expander = ctrls.filter((c) => expanderNames.has(c.name) && !marked.has(c.name));
  const restBlock = rest.length ? `<div class="section-title pg-more-title">Other controls</div>${groupBlocks(rest)}` : "";
  const expanderBlock = expander.length
    ? `<div class="section-title pg-more-title">On the CV &amp; USB expander</div>
       <p class="pg-hint">These live on the included 2HP expander modules, not the main panel.</p>${groupBlocks(expander)}`
    : "";
  const legend = numberedBlock + restBlock + expanderBlock;

  return `${moduleNav(m, "/panel")}
    <div class="detail-top">
      <a class="back-link" data-route="#/module/${m.id}">← ${esc(m.name)}</a>
    </div>
    <h2 class="detail-title">Panel guide</h2>
    <p class="pg-hint">Numbered rings mark the controls on the panel — tap a number to jump to its description. Hover a row to light up its control.</p>
    <div class="panel-guide">
      <div class="pg-imgcol">
        <div class="pg-imgwrap"><img src="${esc(m.image)}" alt="${esc(m.name)} front panel">${rings}</div>
        <a class="pg-edit" href="editor.html?m=${encodeURIComponent(m.id)}" target="_blank" rel="noopener">✎ Adjust these circles in the editor ↗</a>
      </div>
      <div class="pg-legend">${legend}</div>
    </div>`;
}

// Prev/next module bar (wraps around). `kind` is "" (overview) or "/panel".
function moduleNav(m, kind) {
  const i = MODULES.findIndex((x) => x.id === m.id);
  const prev = MODULES[(i - 1 + MODULES.length) % MODULES.length];
  const next = MODULES[(i + 1) % MODULES.length];
  return `<nav class="mod-nav" aria-label="Modules">
    <a class="mod-nav-btn" data-route="#/module/${prev.id}${kind}">← ${esc(prev.name)}</a>
    <span class="mod-nav-pos">${i + 1} / ${MODULES.length}</span>
    <a class="mod-nav-btn next" data-route="#/module/${next.id}${kind}">${esc(next.name)} →</a>
  </nav>`;
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
  return `${moduleNav(m, "")}
    ${head}
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

/* ---------- Patch starters ---------- */
// Quick cross-module patch ideas. `modules` are module ids (chips link to them).
// Keep steps to short, plain sentences — inspiration, not a manual.
const PATCHES = [
  {
    id: "self-writing-voice",
    title: "Self-writing generative voice",
    get: "A melody that composes and re-colours itself.",
    modules: ["marbles", "plaits", "batumi"],
    steps: [
      "Marbles: raise STEPS to quantise X1 → Plaits V/OCT, t1 → TRIG.",
      "Batumi in Quadrature mode → Plaits TIMBRE and MORPH so the tone orbits.",
      "Turn Marbles DÉJÀ VU to noon to lock a phrase, back off to wander."
    ]
  },
  {
    id: "diatonic-chord-machine",
    title: "Diatonic chord machine",
    get: "Chance chords, voice-led, ringing on strings.",
    modules: ["marbles", "harmonaig", "rings"],
    steps: [
      "Quantise Marbles X1 → Harmonaig root; set a key and scale.",
      "Strum Harmonaig's four voices into Rings set to 4-voice polyphony.",
      "Rings holds each note, ringing out an evolving in-key chord."
    ]
  },
  {
    id: "granular-feedback",
    title: "Granular feedback drone",
    get: "One tone that resonates into infinity.",
    modules: ["plaits", "arbhar", "fxaidxl"],
    steps: [
      "Hold a Plaits tone → Arbhar; capture and layer grains.",
      "Arbhar out → FX Aid XL, then feed a little of it back into Arbhar.",
      "Ride scan and spray as the cloud slowly self-resonates."
    ]
  },
  {
    id: "physical-sequence",
    title: "Physical-model sequence, in key",
    get: "Mallet lines that dissolve into texture.",
    modules: ["pams", "rings", "beads"],
    steps: [
      "Pam's quantiser CV → Rings V/OCT · Euclidean gate → strum.",
      "Set Rings to sympathetic strings or a hidden model.",
      "Rings → Beads; freeze and scan the tails into a bed."
    ]
  },
  {
    id: "hidden-wavetable",
    title: "Hidden wavetable, set in motion",
    get: "Wake a secret oscillator and modulate it.",
    modules: ["beads", "batumi", "fxaidxl"],
    steps: [
      "Leave Beads' inputs unpatched ~10 s to wake its wavetable synth.",
      "Batumi LFOs → Beads pitch and density for movement.",
      "Into an FX Aid comb or pitch algorithm for extra harmonics."
    ]
  },
  {
    id: "hand-drawn-rig",
    title: "Hand-drawn modulation rig",
    get: "Your gestures conduct the whole voice.",
    modules: ["gliss", "plaits", "batumi"],
    steps: [
      "GLISS: record a pitch line and a modulation curve on two tracks.",
      "Pitch → Plaits V/OCT · curve → MORPH for motion no LFO makes.",
      "Batumi resets on a GLISS gate track for rhythmic movement."
    ]
  },
  {
    id: "tempo-locked-chance",
    title: "Quantised chance, tempo-locked",
    get: "Generative, but always on the grid and in key.",
    modules: ["pams", "marbles", "plaits"],
    steps: [
      "Pam's clock → Marbles t CLOCK; Marbles quantises X1 to a scale.",
      "X1 → Plaits V/OCT · Marbles t1 → TRIG.",
      "DÉJÀ VU locks bars; JITTER loosens the feel."
    ]
  },
  {
    id: "external-quantiser-chain",
    title: "Teach-a-scale quantiser chain",
    get: "Program a scale, then play it by chance.",
    modules: ["gliss", "marbles", "rings"],
    steps: [
      "Play notes from GLISS into Marbles external mode to learn a scale.",
      "Marbles quantised X1 → Rings V/OCT · a t gate → strum.",
      "Put Rings on a hidden model for an unusual voice."
    ]
  }
];

function patchCardHTML(p) {
  const chips = p.modules
    .map((id) => {
      const m = MODULES.find((x) => x.id === id);
      if (!m) return "";
      return `<span class="pt-mod route-link" data-route="#/module/${m.id}" title="${esc(m.name)}">
        <img src="${esc(m.image)}" alt="" loading="lazy"><span>${esc(m.name)}</span></span>`;
    })
    .join("");
  const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join("");
  return `<div class="pt-card">
    <h3>${esc(p.title)}</h3>
    <p class="pt-get">${esc(p.get)}</p>
    <div class="pt-mods">${chips}</div>
    <ol class="pt-steps">${steps}</ol>
  </div>`;
}

// Pairwise module relations — the deck the slot machine draws from.
// `a` feeds/relates to `b`; both are module ids. Every module appears at least once.
const RELATIONS = [
  { a: "pams", b: "plaits", title: "Quantised acid line", get: "A sequence that stays in key.",
    steps: ["Set a Pam's channel to its quantiser and choose a scale.", "Quantised CV → Plaits V/OCT · a clocked gate → TRIG."] },
  { a: "pams", b: "batumi", title: "Clock-locked modulation", get: "LFOs that ride the tempo, not drift.",
    steps: ["Put Batumi in Divide mode; Pam's clock → Batumi reset.", "Each LFO now runs at a musical division of the beat."] },
  { a: "pams", b: "marbles", title: "Tempo-locked chance", get: "Randomness that lands on the grid.",
    steps: ["Pam's clock → Marbles t CLOCK.", "Ride Marbles BIAS and JITTER to reshape gate density in time."] },
  { a: "pams", b: "rings", title: "Euclidean strum, in key", get: "Rhythmic hits that stay musical.",
    steps: ["Pam's Euclidean gate → Rings strum.", "Pam's quantiser CV → Rings V/OCT so pitches lock to a scale."] },
  { a: "batumi", b: "plaits", title: "Circular timbre motion", get: "The tone orbits instead of wobbling.",
    steps: ["Batumi in Quadrature mode.", "Two 90°-offset outputs → Plaits TIMBRE and MORPH."] },
  { a: "batumi", b: "rings", title: "Morphing resonance", get: "A body that never sits still.",
    steps: ["Batumi sine and assignable outs → Rings structure and position.", "Send them opposite ways so the timbre keeps shifting."] },
  { a: "batumi", b: "arbhar", title: "Related-motion scan", get: "The cloud wanders, but coherently.",
    steps: ["Batumi in Phase mode → Arbhar scan and spray.", "The two moves stay locked in relation, not random."] },
  { a: "batumi", b: "fxaidxl", title: "Effect as instrument", get: "The FX itself becomes the sound.",
    steps: ["Load a pitch, comb or oscillator algorithm on FX Aid XL.", "Batumi → its two CV params so the effect self-plays."] },
  { a: "marbles", b: "plaits", title: "Self-writing melody", get: "In-key notes you can lock into a loop.",
    steps: ["Raise Marbles STEPS to quantise X1 → Plaits V/OCT.", "t1 → TRIG; turn DÉJÀ VU to noon to freeze the phrase."] },
  { a: "marbles", b: "harmonaig", title: "Random SATB chords", get: "Chance roots, four-part voice leading.",
    steps: ["Quantise Marbles X1, then → Harmonaig root.", "Take the four voice-led outputs as an evolving chord."] },
  { a: "marbles", b: "arbhar", title: "Grain lottery", get: "The cloud reshuffles on random gates.",
    steps: ["Marbles t gates trigger Arbhar grains; X1 → scan.", "Lock a favourite pass with Marbles DÉJÀ VU."] },
  { a: "marbles", b: "batumi", title: "Chance-reset motion", get: "Modulation that re-phases at random.",
    steps: ["Marbles t1 (random gate) → Batumi reset.", "The LFOs jump phase unpredictably for glitchy movement."] },
  { a: "harmonaig", b: "plaits", title: "Stacked diatonic chords", get: "Chords on chords, all in key.",
    steps: ["Harmonaig's lowest voice → Plaits V/OCT.", "Use Plaits' chord engine — it stacks a chord on top, in your key."] },
  { a: "plaits", b: "rings", title: "Exciter into a hidden model", get: "Struck, blown, unusual bodies.",
    steps: ["Plaits noise or pluck → Rings input (exciter).", "Switch Rings to a hidden model (FM voice, Western chords)."] },
  { a: "plaits", b: "beads", title: "Two related voices, granulated", get: "A self-harmonising cloud.",
    steps: ["Patch Plaits OUT and AUX (two related engines) → Beads L/R.", "Granulate; the pair drifts as one evolving texture."] },
  { a: "rings", b: "beads", title: "Freeze the resonance", get: "A plucked body stretched into a drone.",
    steps: ["Rings sympathetic-strings model → Beads in.", "Freeze and scan to hold the resonant tail forever."] },
  { a: "beads", b: "fxaidxl", title: "Wavetable through weird FX", get: "A hidden oscillator meets an odd algorithm.",
    steps: ["Leave Beads inputs unpatched ~10 s to wake its wavetable synth.", "Its output → an FX Aid granular or pitch-shift algorithm."] },
  { a: "arbhar", b: "fxaidxl", title: "Smeared pitch cloud", get: "Granular haze pitched into new shapes.",
    steps: ["Arbhar out → an FX Aid pitch-shift or shimmer algorithm.", "Modulate its two params for a moving, harmonised cloud."] },
  { a: "fxaidxl", b: "beads", title: "Echo into freeze", get: "Snapshots of a delay, scanned.",
    steps: ["An FX Aid delay → Beads in.", "Freeze the echo and scan the buffer for glitch textures."] },
  { a: "gliss", b: "marbles", title: "Teach it your scale", get: "Quantise chance to notes you chose.",
    steps: ["Marbles external mode; play notes from GLISS into X CV.", "It learns the scale; STEPS then snaps randomness to it."] },
  { a: "gliss", b: "plaits", title: "Draw a modulation curve", get: "Hand-designed movement on repeat.",
    steps: ["Record a slow gesture on a GLISS track as an LFO shape.", "Loop it → Plaits MORPH for motion no LFO would make."] },
  { a: "gliss", b: "batumi", title: "Punctuate the LFOs", get: "Modulation that resets on your cue.",
    steps: ["Record a gate pattern on a GLISS track.", "GLISS gate → Batumi reset to re-phase the LFOs rhythmically."] }
];

let relIdx = 0;
const rnd = (n) => Math.floor(Math.random() * n);
function pickRel(exclude) {
  if (RELATIONS.length <= 1) return 0;
  let i;
  do { i = rnd(RELATIONS.length); } while (i === exclude);
  return i;
}
// Reroll one reel, keeping the other module fixed (falls back to a fresh pair).
function rerollReel(side) {
  const cur = RELATIONS[relIdx];
  const cand = RELATIONS
    .map((r, i) => i)
    .filter((i) => side === "a"
      ? RELATIONS[i].b === cur.b && RELATIONS[i].a !== cur.a
      : RELATIONS[i].a === cur.a && RELATIONS[i].b !== cur.b);
  relIdx = cand.length ? cand[rnd(cand.length)] : pickRel(relIdx);
}

function reelFaceHTML(id) {
  const m = MODULES.find((x) => x.id === id);
  return `<span class="reel-face route-link" data-route="#/module/${m.id}" title="Open ${esc(m.name)}">
      <img src="${esc(m.image)}" alt=""><span class="reel-name">${esc(m.name)}</span></span>`;
}
function slotHTML() {
  const r = RELATIONS[relIdx];
  return `<div class="slot" id="slot">
      <div class="slot-reels">
        <div class="reel" data-side="a">${reelFaceHTML(r.a)}<button class="reel-roll" data-roll="a" title="Reroll this module" aria-label="Reroll left module">⟳</button></div>
        <div class="slot-arrow">→</div>
        <div class="reel" data-side="b">${reelFaceHTML(r.b)}<button class="reel-roll" data-roll="b" title="Reroll this module" aria-label="Reroll right module">⟳</button></div>
      </div>
      <div class="slot-body">
        <h3 class="slot-title">${esc(r.title)}</h3>
        <p class="slot-get">${esc(r.get)}</p>
        <ol class="slot-steps">${r.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
      </div>
      <button class="btn slot-reroll" id="slot-reroll">🎲 Reroll</button>
    </div>`;
}

function viewPatches() {
  relIdx = pickRel(-1);
  return `<div class="home-hero"><h2>Patch starters</h2>
      <p>Pull the reels for a two-module combo, and reroll until something sparks — or scroll down for full patches.</p></div>
    ${slotHTML()}
    <div class="section-title">Full patches</div>
    <div class="pt-grid">${PATCHES.map(patchCardHTML).join("")}</div>`;
}

// Re-render the slot in place (with a quick spin on the reels that changed).
function refreshSlot(changed) {
  const slot = document.getElementById("slot");
  if (!slot) return;
  const r = RELATIONS[relIdx];
  slot.querySelector(".slot-title").textContent = r.title;
  slot.querySelector(".slot-get").textContent = r.get;
  slot.querySelector(".slot-steps").innerHTML = r.steps.map((s) => `<li>${esc(s)}</li>`).join("");
  ["a", "b"].forEach((side) => {
    if (!changed.includes(side)) return;
    const reel = slot.querySelector(`.reel[data-side="${side}"]`);
    const finalId = side === "a" ? r.a : r.b;
    spinReel(reel, finalId);
  });
}
function setFace(reel, id) {
  const m = MODULES.find((x) => x.id === id);
  const face = reel.querySelector(".reel-face");
  face.setAttribute("data-route", "#/module/" + m.id);
  face.setAttribute("title", "Open " + m.name);
  face.querySelector("img").src = m.image;
  face.querySelector(".reel-name").textContent = m.name;
}
function spinReel(reel, finalId) {
  let n = 0;
  const max = 6;
  reel.classList.add("spinning");
  const t = setInterval(() => {
    n += 1;
    if (n >= max) {
      clearInterval(t);
      setFace(reel, finalId);
      reel.classList.remove("spinning");
    } else {
      setFace(reel, MODULES[rnd(MODULES.length)].id);
    }
  }, 55);
}

function mountPatches() {
  const slot = document.getElementById("slot");
  if (!slot) return;
  slot.addEventListener("click", (e) => {
    const rollOne = e.target.closest(".reel-roll");
    if (rollOne) {
      e.stopPropagation();
      const side = rollOne.getAttribute("data-roll");
      const before = RELATIONS[relIdx];
      rerollReel(side);
      const after = RELATIONS[relIdx];
      // Spin the reel we rerolled, plus the other one only if the fallback changed it too.
      const changed = ["a", "b"].filter((s) => before[s] !== after[s]);
      refreshSlot(changed.length ? changed : [side]);
      return;
    }
    if (e.target.closest("#slot-reroll")) {
      relIdx = pickRel(relIdx);
      refreshSlot(["a", "b"]);
    }
  });
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
  } else if (route === "#/patches") {
    html = viewPatches();
    title = "Patch starters — Modular Manuals";
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

  if (route === "#/patches") mountPatches();

  if (!route.startsWith("#/module/") && route !== "#/did-you-know" && route !== "#/patches") mountHome();

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
  const pop = ensureHotPop();
  pop.innerHTML =
    `<div class="hot-pop-inner"><img src="${esc(m.image)}" alt="">` +
    `<span class="hot-ring" style="${ringStyle(hs)}"></span></div>` +
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

// Small name+description tooltip shown when hovering a panel-guide dot.
let pgTip = null;
function showPgTip(dot) {
  if (!pgTip) {
    pgTip = document.createElement("div");
    pgTip.className = "pg-tip";
    document.body.appendChild(pgTip);
  }
  const desc = dot.getAttribute("data-tipdesc");
  pgTip.innerHTML = `<b>${esc(dot.getAttribute("data-tipname"))}</b>${desc ? `<span>${esc(desc)}</span>` : ""}`;
  pgTip.style.display = "block";
  const r = dot.getBoundingClientRect();
  const pw = pgTip.offsetWidth;
  let left = Math.min(r.right + 8, window.innerWidth - pw - 8);
  if (left < 8) left = 8;
  let top = r.top + r.height / 2 - pgTip.offsetHeight / 2;
  top = Math.max(8, Math.min(top, window.innerHeight - pgTip.offsetHeight - 8));
  pgTip.style.left = `${left}px`;
  pgTip.style.top = `${top}px`;
}
function hidePgTip() { if (pgTip) pgTip.style.display = "none"; }

// Hover (desktop) and focus (keyboard) both reveal the preview.
document.addEventListener("mouseover", (e) => {
  const el = e.target.closest(".hot");
  if (el) showHotPop(el);
  // Panel guide: hovering a legend row or a dot lights up its ring on the image.
  const row = e.target.closest(".pg-row[data-mark]");
  document.querySelectorAll(".pg-ring.sel").forEach((r) => r.classList.remove("sel"));
  if (row) {
    const ring = document.getElementById("pgm-" + row.getAttribute("data-mark"));
    if (ring) ring.classList.add("sel");
  }
  const dot = e.target.closest(".pg-dot");
  if (dot) {
    showPgTip(dot);
    const ring = document.getElementById("pgm-" + dot.getAttribute("data-scroll").replace("pg-", ""));
    if (ring) ring.classList.add("sel");
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(".hot")) hideHotPop();
  if (e.target.closest(".pg-dot")) hidePgTip();
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
  mountModuleNav();
  enhanceA11y(document.querySelector(".sidebar")); // static + module nav links
  render();
});
