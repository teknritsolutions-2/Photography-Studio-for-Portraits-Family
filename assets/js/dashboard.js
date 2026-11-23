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
  src: photoURL("proof-" + n),
  title: "A morning at home · AM-00" + n,
}));
const sizes = { "5 × 7 in": 250, "8 × 10 in": 450, "12 × 16 in": 850 };
const totals = (rows) =>
  rows.reduce((sum, r) => sum + sizes[r.size] * r.qty, 0);
const inr = (amount) => "₹" + amount.toLocaleString("en-IN");
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
    escapeHTML(p?.name || s.service) +
    "</strong><br>" +
    escapeHTML(s.date) +
    " · " +
    escapeHTML(s.time) +
    " · Requested locally</div>" +
    (edit
      ? '<button class="textlink" data-session="' +
        escapeHTML(s.id) +
        '">Edit request</button>'
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
    '</strong>Upcoming requests</a><a href="#favorites"><strong>' +
    state.favorites.length +
    '</strong>Favorites</a><a href="#prints"><strong>' +
    state.orders.length +
    "</strong>Prepared print requests</a></div>" +
    panel(
      "Upcoming sessions",
      upcoming.length
        ? upcoming
            .slice(0, 3)
            .map((s) => sessionRow(s))
            .join("")
        : "<p>Your upcoming session requests will appear here.</p>" +
            action("book", "Book a session"),
    ) +
    panel(
      "Recent proof gallery",
      '<img class="bannerphoto" src="' +
        proofs[0].src +
        '" alt="Mother and daughter by a window"><h3>A morning at home</h3><p>Family session · 3 proofs</p>' +
        action("proofs", "View proof gallery"),
    )
  );
}
function booking() {
  return (
    '<p>Choose an illustrative slot and review your request. Studio availability requires separate confirmation.</p><form id="booking"><div class="formgrid"><label>Photography category<select name="service"><option>Portraits</option><option>Family</option><option>Maternity</option></select></label><label>Package<select name="package"></select></label><label>Session date<input name="date" type="date" required min="' +
    localDay() +
    '"></label><label>Session time<select name="time"><option>09:00</option><option>11:00</option><option>14:00</option><option>16:00</option></select></label></div><button class="button">Review request</button></form><dialog id="booking-review"><h2>Review session request</h2><p></p><div class="actions"><button class="button" id="save-session">Save local request</button><button class="button outline" data-close>Edit details</button></div></dialog>'
  );
}
function bindBooking() {
  const form = $("#booking"),
    f = form.elements;
  const existing = state.sessions.find((s) => s.id === editing);
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
      "Illustrative slot",
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
      : "<h2>A morning at home</h2><p>Family session · 3 proofs. This example collection is publicly accessible demo photography.</p>") +
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
function options(values) {
  return values.map((v) => "<option>" + v + "</option>").join("");
}
function orderRows(items, editable) {
  return items
    .map(
      (r) =>
        '<div class="orderrow"><img src="' +
        proofs.find((p) => p.id === r.photo).src +
        '" alt="' +
        r.photo +
        '"><div><strong>' +
        r.photo +
        "</strong><br>" +
        r.size +
        " · " +
        r.finish +
        "<br>" +
        inr(sizes[r.size]) +
        " each</div>" +
        (editable
          ? '<label>Quantity<input data-qty="' +
            r.id +
            '" type="number" min="1" max="99" value="' +
            r.qty +
            '"></label>'
          : "<span>Qty " + r.qty + "</span>") +
        "<strong>" +
        inr(r.qty * sizes[r.size]) +
        "</strong>" +
        (editable
          ? '<button class="textlink" data-remove="' +
            r.id +
            '">Remove</button>'
          : "") +
        "</div>",
    )
    .join("");
}
function prints() {
  return (
    '<p>Prepare a print request from your session proofs. Prices are indicative.</p><form id="print"><div class="formgrid"><label>Proof image<select name="photo">' +
    options(proofs.map((p) => p.id)) +
    '</select></label><label>Print size<select name="size">' +
    Object.entries(sizes)
      .map(
        ([v, c]) =>
          '<option value="' + v + '">' + v + " · " + inr(c) + "</option>",
      )
      .join("") +
    '</select></label><label>Finish<select name="finish">' +
    options(["Matte", "Gloss"]) +
    '</select></label><label>Quantity<input name="quantity" type="number" min="1" max="99" value="1" required></label></div><button class="button">Add to draft</button></form>' +
    panel(
      "Draft",
      state.cart.length
        ? orderRows(state.cart, true) +
            "<p>Indicative total <strong>" +
            inr(totals(state.cart)) +
            '</strong></p><button id="prepare" class="button">Prepare print request</button>'
        : "<p>Your print draft is empty.</p>",
    ) +
    panel(
      "Prepared requests",
      state.orders.length
        ? state.orders
            .slice()
            .reverse()
            .map(
              (o, i) =>
                "<details><summary>Request " +
                (state.orders.length - i) +
                " · " +
                inr(totals(o.items)) +
                " · Prepared request ▾</summary>" +
                orderRows(o.items, false) +
                "</details>",
            )
            .join("")
        : "<p>Prepared print requests will appear here.</p>",
    )
  );
}
function bindPrints() {
  $("#print").onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    change((s) =>
      s.cart.push({
        id: crypto.randomUUID(),
        photo: d.photo,
        size: d.size,
        finish: d.finish,
        qty: Number(d.quantity),
      }),
    );
    render();
  };
  $$("[data-qty]").forEach(
    (input) =>
      (input.onchange = () => {
        if (!input.value || !input.checkValidity()) {
          input.reportValidity();
          input.value = state.cart.find((r) => r.id === input.dataset.qty).qty;
          return;
        }
        change((s) => {
          const row = s.cart.find((r) => r.id === input.dataset.qty);
          if (row) row.qty = Number(input.value);
        });
        render();
      }),
  );
  $$("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        change(
          (s) => (s.cart = s.cart.filter((r) => r.id !== b.dataset.remove)),
        );
        render();
      }),
  );
  if ($("#prepare"))
    $("#prepare").onclick = () => {
      change((s) => {
        if (s.cart.length) s.orders.push({ items: s.cart });
        s.cart = [];
      });
      render();
    };
}
function profile() {
  return (
    '<p>Use sample details for this browser-local profile.</p><form id="profile"><label>Display name<input name="name" required maxlength="80" value="' +
    escapeHTML(state.profile.name) +
    '"></label><label>Demo email (optional)<input name="email" type="email" value="' +
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
        : "<p>You have no session requests yet.</p>" +
          action("book", "Book a session"),
    proofs: () => proofSection(false),
    favorites: () => proofSection(true),
    prints,
    profile,
  };
  dash.innerHTML =
    '<div class="eyebrow"><b></b>LOCAL CLIENT DEMO</div><h1>' +
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
      $("[role=status]", dash).textContent = "Profile saved on this browser.";
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
