const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const params = new URLSearchParams(location.search);
const assetRoot =
  document.body.dataset.page === "home" ? "assets/" : "../assets/";
const photoURL = (name) => assetRoot + "images/" + name + ".jpg";
function localDay() {
  const now = new Date();
  return new Date(now - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}
function syncPrefs() {
  $$("[data-dir]").forEach(
    (b) => (b.textContent = prefs.dir === "ltr" ? "RTL" : "LTR"),
  );
  $$("[data-theme]").forEach((b) =>
    b.setAttribute(
      "aria-label",
      "Switch to " +
        (prefs.dataset.theme === "light" ? "dark" : "light") +
        " theme",
    ),
  );
}
syncPrefs();
document.addEventListener("click", (e) => {
  const b = e.target.closest("button,a");
  if (b?.matches("[data-dir]")) {
    prefs.dir = prefs.dir === "rtl" ? "ltr" : "rtl";
    localStorage.setItem("lk-dir", prefs.dir);
    syncPrefs();
  }
  if (b?.matches("[data-theme]")) {
    prefs.dataset.theme = prefs.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("lk-theme", prefs.dataset.theme);
    syncPrefs();
  }
  if (b?.matches("[data-menu]")) $(".drawer").showModal();
  if (b?.matches("[data-close],.drawer a")) b.closest("dialog").close();
  if (e.target.matches("dialog")) {
    const r = e.target.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      e.target.close();
  }
  if (!e.target.closest("details"))
    $$("details[open]").forEach((d) => (d.open = false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape")
    $$("details[open]").forEach((d) => {
      d.open = false;
      $("summary", d).focus();
    });
});
const topButton = $(".back");
if (topButton) {
  addEventListener(
    "scroll",
    () => topButton.classList.toggle("show", scrollY > 450),
    { passive: true },
  );
  topButton.onclick = () =>
    scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
}
function swipe(el, advance) {
  let start;
  el.addEventListener("pointerdown", (e) => (start = [e.clientX, e.clientY]));
  el.addEventListener("pointerup", (e) => {
    if (!start) return;
    const dx = e.clientX - start[0],
      dy = e.clientY - start[1];
    start = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    el.addEventListener(
      "click",
      (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      },
      { once: true, capture: true },
    );
    advance(dx < 0 ? 1 : -1);
  });
  el.onpointercancel = () => (start = null);
  el.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    advance(e.key === "ArrowRight" ? 1 : -1);
  });
}
function develop(el) {
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches)
    el.animate([{ opacity: 0.55 }, { opacity: 1 }], { duration: 280 });
}
if ($(".hero")) {
  const slides = [
    ["hero", "Portrait study"],
    ["family", "Family study"],
    ["maternity", "Maternity study"],
  ];
  let index = 0;
  const advance = (delta) => {
    index = (index + delta + slides.length) % slides.length;
    const [file, caption] = slides[index],
      image = $(".hero-photo");
    image.removeAttribute("srcset");
    image.src = photoURL(file + (innerWidth <= 640 ? "-small" : ""));
    $(".print-stack img").src = photoURL(
      slides[(index + 1) % slides.length][0] + "-small",
    );
    image.alt = caption;
    $("#hero-caption").textContent = caption;
    $(".hero-index").firstChild.textContent = "0" + (index + 1) + " ";
    develop(image);
  };
  $$("[data-hero]").forEach(
    (b) => (b.onclick = () => advance(Number(b.dataset.hero))),
  );
  const film = $(".film");
  const move = (delta) => {
    if (delta > 0) film.append(film.firstElementChild);
    else film.prepend(film.lastElementChild);
    develop(film);
  };
  swipe(film, move);
  $$("[data-film]").forEach(
    (b) => (b.onclick = () => move(Number(b.dataset.film))),
  );
  const compare = $(".compare");
  function dragComparison(e) {
    const bounds = compare.getBoundingClientRect();
    const value = Math.round(
      Math.max(
        0,
        Math.min(100, ((e.clientX - bounds.left) * 100) / bounds.width),
      ),
    );
    $(".range input").value = value;
    compare.style.setProperty("--split", value + "%");
  }
  compare.onpointerdown = (e) => {
    compare.setPointerCapture(e.pointerId);
    dragComparison(e);
  };
  compare.onpointermove = (e) => {
    if (compare.hasPointerCapture(e.pointerId)) dragComparison(e);
  };
  $(".range input").oninput = (e) =>
    $(".compare").style.setProperty("--split", e.target.value + "%");
}
const viewer = $("#viewer");
let visiblePhotos = [],
  viewIndex = 0,
  favoriteAction;
function displayPhoto() {
  const p = visiblePhotos[viewIndex];
  const image = $("img", viewer);
  image.src = p.src;
  image.alt = p.title;
  $(".viewerbar span", viewer).textContent =
    p.title + " · " + (viewIndex + 1) + " / " + visiblePhotos.length;
  const fav = $("[data-viewfav]");
  fav.hidden = !favoriteAction;
  if (favoriteAction) {
    fav.textContent = favoriteAction.label(p);
    fav.onclick = () => {
      favoriteAction.toggle(p);
      fav.textContent = favoriteAction.label(p);
    };
  }
  develop(image);
}
function viewPhotos(photos, index, favorite) {
  visiblePhotos = photos;
  viewIndex = index;
  favoriteAction = favorite;
  displayPhoto();
  viewer.showModal();
}
function nextPhoto(delta) {
  viewIndex = (viewIndex + delta + visiblePhotos.length) % visiblePhotos.length;
  displayPhoto();
}
swipe(viewer, nextPhoto);
$$("[data-viewer]").forEach(
  (b) => (b.onclick = () => nextPhoto(Number(b.dataset.viewer))),
);
if ($(".filters")) {
  const photos = $$("[data-photo]");
  const filter = (category) => {
    $$("[data-filter]").forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.filter === category),
    );
    photos.forEach(
      (b) =>
        (b.hidden =
          category !== "Selected Work" && b.dataset.category !== category),
    );
  };
  filter(
    ["Portraits", "Family", "Maternity"].includes(params.get("category"))
      ? params.get("category")
      : "Selected Work",
  );
  $$("[data-filter]").forEach(
    (b) => (b.onclick = () => filter(b.dataset.filter)),
  );
  photos.forEach(
    (b) =>
      (b.onclick = () => {
        const visible = photos.filter((p) => !p.hidden);
        viewPhotos(
          visible.map((p) => ({
            title: p.dataset.title,
            src: $("img", p).src,
          })),
          visible.indexOf(b),
        );
      }),
  );
}
function packageOptions(form, preferred) {
  const choices = catalogue.filter(
    (p) => p.category === form.elements.service.value,
  );
  form.elements.package.replaceChildren(
    ...choices.map((p) => new Option(p.name, p.id)),
  );
  if (choices.some((p) => p.id === preferred))
    form.elements.package.value = preferred;
}
const enquiry = $("#enquiry");
if (enquiry) {
  const review = $("#review");
  const f = enquiry.elements;
  if (["Portraits", "Family", "Maternity"].includes(params.get("service")))
    f.service.value = params.get("service");
  packageOptions(enquiry, params.get("package"));
  f.service.onchange = () => packageOptions(enquiry);
  f.date.min = localDay();
  enquiry.onsubmit = (e) => {
    e.preventDefault();
    const values = new FormData(enquiry);
    const rows = [...values].map(
      ([k, v]) =>
        k[0].toUpperCase() +
        k.slice(1) +
        ": " +
        (k === "package" ? f.package.selectedOptions[0].text : v || "—"),
    );
    $("pre", review).textContent = rows.join("\n");
    enquiry.hidden = true;
    review.hidden = false;
    $("[data-edit]").focus();
  };
  $("[data-edit]").onclick = () => {
    enquiry.hidden = false;
    review.hidden = true;
    f.name.focus();
  };
  $("[data-copy]").onclick = async () => {
    try {
      await navigator.clipboard.writeText($("pre", review).textContent);
      $("[role=status]", review).textContent = "Enquiry copied.";
    } catch {
      $("[role=status]", review).textContent =
        "Select the details to copy them, or download your enquiry.";
    }
  };
  $("[data-download]").onclick = () => {
    const url = URL.createObjectURL(
      new Blob([$("pre", review).textContent], { type: "text/plain" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "lumen-and-kin-enquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
}
const login = $("#login");
if (login) {
  const f = login.elements;
  f.email.value = localStorage.getItem("lk-demo-email") || "";
  f.remember.checked = !!f.email.value;
  $("[data-show]").onclick = (e) => {
    f.password.type = f.password.type === "text" ? "password" : "text";
    e.target.textContent = f.password.type === "text" ? "Hide" : "Show";
  };
  $("[data-forgot]").onclick = () => ($("#reset").hidden = !$("#reset").hidden);
  login.onsubmit = (e) => {
    e.preventDefault();
    if (f.remember.checked)
      localStorage.setItem("lk-demo-email", f.email.value);
    else localStorage.removeItem("lk-demo-email");
    location.href = "dashboard.html";
  };
}
