const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const params = new URLSearchParams(location.search);
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
