const authForm = $("#auth-form");
const authStatus = $("#auth-status");
const signup = document.body.dataset.page === "signup";
if (!signup) {
  authForm.elements.email.value = localStorage.getItem("lk-demo-email") || "";
  authForm.elements.remember.checked = Boolean(authForm.elements.email.value);
}
$$("[data-password]").forEach((button) => {
  button.onclick = () => {
    const input = document.getElementById(button.dataset.password);
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    button.setAttribute("aria-pressed", String(visible));
    button.setAttribute(
      "aria-label",
      (visible ? "Hide " : "Show ") +
        (input.name === "confirm" ? "confirm password" : "password"),
    );
  };
});
function validateAccount() {
  if (!signup) return;
  const fields = authForm.elements;
  fields.name.setCustomValidity(
    fields.name.value.trim() ? "" : "Enter your full name.",
  );
  fields.confirm.setCustomValidity(
    fields.confirm.value === fields.password.value
      ? ""
      : "Passwords must match.",
  );
}
authForm.addEventListener("input", validateAccount);
authForm.onsubmit = (event) => {
  event.preventDefault();
  validateAccount();
  if (!authForm.reportValidity()) return;
  if (!signup) {
    if (authForm.elements.remember.checked)
      localStorage.setItem("lk-demo-email", authForm.elements.email.value);
    else localStorage.removeItem("lk-demo-email");
  }
  authForm.elements.password.value = "";
  if (signup) authForm.elements.confirm.value = "";
  authStatus.textContent =
    (signup ? "Account creation" : "Sign in") +
    " requires a connected account service. Your password has been cleared.";
};
$$("[data-provider]").forEach(
  (button) =>
    (button.onclick = () => {
      authStatus.textContent =
        button.dataset.provider + " sign-in is not connected.";
    }),
);
if ($("[data-reset]"))
  $("[data-reset]").onclick = () => {
    authStatus.textContent =
      "Password reset requires a connected account service.";
  };
