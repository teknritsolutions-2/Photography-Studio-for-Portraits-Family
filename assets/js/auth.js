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
