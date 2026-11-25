const dash = $("#dashboard");
const key = "lumen-kin-client-v1";
const defaultState = {
  profile: { name: "Guest", email: "" },
  sessions: [],
  favorites: [],
  cart: [],
  orders: [],
};
function readState() {
  try {
    return {
      ...structuredClone(defaultState),
      ...JSON.parse(localStorage.getItem(key)),
    };
  } catch {
    return structuredClone(defaultState);
  }
}
let state = readState();
function change(fn) {
  state = readState();
  fn(state);
  localStorage.setItem(key, JSON.stringify(state));
}
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const proofs = [1, 2, 3].map((n) => ({
  id: "AM-00" + n,
  ...photoSources("proof-" + n),
  title: "A morning at home · AM-00" + n,
}));
const titles = {
  overview: "Overview",
  book: "Book a session",
  sessions: "My sessions",
  proofs: "Proof galleries",
  favorites: "Favorites",
  prints: "Print orders",
  profile: "Profile",
};
const route = () =>
  Object.hasOwn(titles, location.hash.slice(1))
    ? location.hash.slice(1)
    : "overview";
const action = (href, text) =>
  '<a class="button outline" href="#' + href + '">' + text + "</a>";
const panel = (title, body) =>
  '<section class="panel"><h2>' + title + "</h2>" + body + "</section>";
let editing = null;
function sessionRow(s, edit = true) {
  const p = catalogue.find((p) => p.id === s.package);
  return (
    '<div class="orderrow"><div><strong>' +
    escapeHTML(
      p?.name ||
        (services.find((item) => item.id === s.service)?.name || s.service) +
          " · Custom enquiry",
    ) +
    "</strong><br>" +
    escapeHTML(s.date) +
    " · " +
    escapeHTML(s.time) +
    " · Draft enquiry</div>" +
    (edit
      ? '<button class="textlink" data-session="' +
        escapeHTML(s.id) +
        '">Edit enquiry</button>'
      : "") +
    "</div>"
  );
}
function overview() {
  const upcoming = state.sessions
    .filter((s) => s.date >= localDay())
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  return (
    "<p>Welcome, " +
    escapeHTML(state.profile.name) +
    '.</p><div class="stats"><a href="#sessions"><strong>' +
    upcoming.length +
    '</strong>Session enquiries</a><a href="#favorites"><strong>' +
    state.favorites.length +
    '</strong>Favorites</a><a href="#prints"><strong>' +
    state.orders.length +
    "</strong>Prepared print requests</a></div>" +
    panel(
      "Session enquiries",
      upcoming.length
        ? upcoming
            .slice(0, 3)
            .map((s) => sessionRow(s))
            .join("")
        : "<p>Your saved session enquiries will appear here.</p>" +
            action("book", "Book a session"),
    ) +
    panel(
      "Recent proof gallery",
      '<img class="bannerphoto" src="' +
        proofs[0].src +
        '" srcset="' +
        proofs[0].srcset +
        '" sizes="(max-width:1180px) max(100vw, 450px), calc(100vw - 380px)" width="' +
        proofs[0].width +
        '" height="' +
        proofs[0].height +
        '" alt="Mother and daughter by a window"><h3>A morning at home</h3><p>Family session · 3 proofs</p>' +
        action("proofs", "View proof gallery"),
    )
  );
}
function booking() {
  return (
    '<p>Choose your preferred date and time to prepare a session enquiry. Contact the studio to confirm availability.</p><form id="booking"><div class="formgrid"><label>Photography category<select name="service"><option>Portraits</option><option>Family</option><option>Maternity</option></select></label><label>Package<select name="package"></select></label><label>Session date<input name="date" type="date" required min="' +
    localDay() +
    '"></label><label>Session time<select name="time"><option>09:00</option><option>11:00</option><option>14:00</option><option>16:00</option></select></label></div><button class="button">Review enquiry</button></form><dialog id="booking-review"><h2>Review session enquiry</h2><p></p><div class="actions"><button class="button" id="save-session">Save enquiry</button><button class="button outline" data-close>Edit details</button></div></dialog>'
  );
}
function bindBooking() {
  const form = $("#booking"),
    f = form.elements;
  const existing = state.sessions.find((s) => s.id === editing);
  populateServices(f.service);
  f.service.value = existing?.service || "Portraits";
  packageOptions(form, existing?.package);
  if (existing) {
    f.date.value = existing.date;
    f.time.value = existing.time;
  }
  f.service.onchange = () => packageOptions(form);
  form.onsubmit = (e) => {
    e.preventDefault();
    $("#booking-review p").textContent = [
      f.package.selectedOptions[0].text,
      f.date.value,
      f.time.value,
      "Preferred time",
    ].join(" · ");
    $("#booking-review").showModal();
  };
  $("#save-session").onclick = () => {
    const request = Object.fromEntries(new FormData(form));
    const id = editing || crypto.randomUUID();
    change((s) => {
      s.sessions = [
        ...s.sessions.filter((r) => r.id !== id),
        { ...request, id },
      ];
    });
    $("#booking-review").close();
    editing = null;
    location.hash = "sessions";
  };
}
function favorite(id) {
  change((s) => {
    s.favorites = s.favorites.includes(id)
      ? s.favorites.filter((v) => v !== id)
      : [...s.favorites, id];
  });
}
function proofSection(onlyFav) {
  const list = proofs.filter((p) => !onlyFav || state.favorites.includes(p.id));
  const body = list
    .map(
      (p) =>
        '<article><button class="thumb" data-proof="' +
        p.id +
        '"><img src="' +
        p.src.replace(".jpg", "-small.jpg") +
        '" srcset="' +
        p.srcset +
        '" sizes="(max-width:380px) 100vw, (max-width:740px) 50vw, 30vw" width="' +
        p.width +
        '" height="' +
        p.height +
        '" alt="' +
        p.title +
        '"></button><div class="proof-actions"><strong>' +
        p.id +
        '</strong><button class="choice" data-fav="' +
        p.id +
        '" aria-pressed="' +
        state.favorites.includes(p.id) +
        '">' +
        (state.favorites.includes(p.id) ? "♥ Saved" : "♡ Favorite") +
        "</button></div></article>",
    )
    .join("");
  return (
    (onlyFav
      ? "<p>Your selected proof photographs.</p>"
      : "<h2>A morning at home</h2><p>Family session · 3 photographs. Choose your favorites and explore print options.</p>") +
    (body
      ? '<div class="proof-grid">' +
        body +
        "</div><p>" +
        action("prints", "Prepare prints") +
        "</p>"
      : "<p>No favorites yet. Select a photograph in your proof gallery.</p>" +
        action("proofs", "View proofs"))
  );
}
function profile() {
  return (
    '<p>Manage your display name and contact details.</p><form id="profile"><label>Display name<input name="name" required maxlength="80" value="' +
    escapeHTML(state.profile.name) +
    '"></label><label>Email (optional)<input name="email" type="email" value="' +
    escapeHTML(state.profile.email) +
    '"></label><button class="button">Save profile</button><p role="status"></p></form>'
  );
}
function render() {
  state = readState();
  const r = route();
  if (r !== "book") editing = null;
  const sections = {
    overview,
    book: booking,
    sessions: () =>
      state.sessions.length
        ? state.sessions.map((s) => sessionRow(s)).join("")
        : "<p>You have no saved session enquiries yet.</p>" +
          action("book", "Book a session"),
    proofs: () => proofSection(false),
    favorites: () => proofSection(true),
    prints,
    profile,
  };
  dash.innerHTML =
    '<div class="eyebrow"><b></b>CLIENT PORTAL</div><h1>' +
    titles[r] +
    "</h1>" +
    sections[r]();
  $$(".dash nav a").forEach((a) =>
    a.classList.toggle("active", a.hash === "#" + r),
  );
  $$("[data-session]").forEach(
    (b) =>
      (b.onclick = () => {
        editing = b.dataset.session;
        location.hash = "book";
      }),
  );
  if (r === "book") bindBooking();
  if (r === "prints") bindPrints();
  if (r === "profile")
    $("#profile").onsubmit = (e) => {
      e.preventDefault();
      change((s) => (s.profile = Object.fromEntries(new FormData(e.target))));
      $("[role=status]", dash).textContent = "Profile updated.";
    };
  $$("[data-fav]").forEach(
    (b) =>
      (b.onclick = () => {
        favorite(b.dataset.fav);
        render();
      }),
  );
  $$("[data-proof]").forEach(
    (b) =>
      (b.onclick = () => {
        const list = proofs.filter(
          (p) => r !== "favorites" || state.favorites.includes(p.id),
        );
        viewPhotos(
          list,
          list.findIndex((p) => p.id === b.dataset.proof),
          {
            label: (p) =>
              state.favorites.includes(p.id)
                ? "Remove favorite"
                : "Save favorite",
            toggle: (p) => favorite(p.id),
          },
        );
        viewer.addEventListener(
          "close",
          () => {
            render();
          },
          { once: true },
        );
      }),
  );
}
addEventListener("hashchange", () => {
  render();
  scrollTo(0, 0);
});
addEventListener("storage", (e) => {
  if (
    e.key === key &&
    !$("dialog[open]") &&
    !["book", "profile"].includes(route())
  )
    render();
});
render();
