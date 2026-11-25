/* Keep form values native while providing consistently sized, anchored menus. */
(() => {
  const controls = new WeakMap();
  let opened = null;
  let sequence = 0;
  function enhance(select) {
    if (controls.has(select) || select.multiple || select.size > 1) return;
    const label = select.closest("label");
    const name =
      select.getAttribute("aria-label") ||
      label?.firstChild?.textContent.trim() ||
      select.name;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "select-trigger";
    button.setAttribute("role", "combobox");
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    const menu = document.createElement("div");
    menu.id = "form-options-" + ++sequence;
    menu.className = "select-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-label", name);
    menu.hidden = true;
    button.setAttribute("aria-controls", menu.id);
    select.after(button);
    select.hidden = true;
    select.tabIndex = -1;
    const control = { select, button, menu, active: -1, name };
    controls.set(select, control);
    const sync = () => {
      button.textContent =
        select.selectedOptions[0]?.textContent || "Choose an option";
      button.setAttribute("aria-label", name + ": " + button.textContent);
      button.disabled = select.disabled;
      button.setAttribute("aria-required", String(select.required));
      if (opened === control) {
        if (select.disabled) close();
        else {
          build(control);
          position();
        }
      }
    };
    control.sync = sync;
    sync();
    button.addEventListener("click", () =>
      opened === control ? close() : open(control),
    );
    button.addEventListener("keydown", (event) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
        "Enter",
        " ",
        "Escape",
        "Tab",
      ];
      if (event.key === "Tab") {
        if (opened === control) close();
        return;
      }
      if (event.key === "Escape") {
        if (opened === control) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        return;
      }
      if (keys.includes(event.key)) {
        event.preventDefault();
        if (opened !== control) {
          open(control);
          if (event.key === "Enter" || event.key === " ") return;
        }
        if (event.key === "Enter" || event.key === " ") {
          choose(control, control.active);
          return;
        }
        const enabled = [...select.options]
          .map((o, i) => (!o.disabled && !o.parentElement.disabled ? i : -1))
          .filter((i) => i >= 0);
        const current = enabled.indexOf(control.active);
        const index =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? enabled.length - 1
              : Math.max(
                  0,
                  Math.min(
                    enabled.length - 1,
                    current + (event.key === "ArrowUp" ? -1 : 1),
                  ),
                );
        activate(control, enabled[index]);
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        if (opened !== control) open(control);
        clearTimeout(control.typingTimer);
        control.search = (control.search || "") + event.key.toLocaleLowerCase();
        control.typingTimer = setTimeout(() => (control.search = ""), 600);
        const index = [...select.options].findIndex(
          (o) =>
            !o.disabled &&
            !o.parentElement.disabled &&
            o.text.toLocaleLowerCase().startsWith(control.search),
        );
        if (index >= 0) activate(control, index);
      }
    });
    select.addEventListener("change", sync);
    select.addEventListener("invalid", (event) => {
      event.preventDefault();
      button.focus();
      button.setAttribute("aria-invalid", "true");
    });
  }
  function build(control) {
    const { select, menu } = control;
    menu.replaceChildren(
      ...[...select.options].map((option, index) => {
        const item = document.createElement("div");
        item.id = menu.id + "-" + index;
        item.className = "select-option";
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", String(option.selected));
        item.setAttribute(
          "aria-disabled",
          String(option.disabled || !!option.parentElement.disabled),
        );
        item.textContent = option.text;
        item.addEventListener("pointerdown", (event) => event.preventDefault());
        item.addEventListener("click", () => choose(control, index));
        return item;
      }),
    );
    activate(control, select.selectedIndex);
  }
  function activate(control, index) {
    control.active = index;
    [...control.menu.children].forEach((item, i) =>
      item.classList.toggle("is-active", i === index),
    );
    const item = control.menu.children[index];
    if (item) {
      control.button.setAttribute("aria-activedescendant", item.id);
      item.scrollIntoView({ block: "nearest" });
    }
  }
  function choose(control, index) {
    const option = control.select.options[index];
    if (!option || option.disabled || option.parentElement.disabled) return;
    control.select.selectedIndex = index;
    control.button.removeAttribute("aria-invalid");
    control.select.dispatchEvent(new Event("input", { bubbles: true }));
    control.select.dispatchEvent(new Event("change", { bubbles: true }));
    control.sync();
    close();
    control.button.focus({ preventScroll: true });
  }
  function open(control) {
    close();
    opened = control;
    document.body.append(control.menu);
    control.menu.hidden = false;
    control.menu.dir = getComputedStyle(control.button).direction;
    control.button.setAttribute("aria-expanded", "true");
    build(control);
    position();
    activate(control, control.select.selectedIndex);
  }
  function close() {
    if (!opened) return;
    opened.button.setAttribute("aria-expanded", "false");
    opened.button.removeAttribute("aria-activedescendant");
    opened.menu.hidden = true;
    opened.menu.remove();
    opened = null;
  }
  function position() {
    if (!opened) return;
    const { button, menu, select } = opened;
    if (!select.isConnected || !button.getClientRects().length) {
      close();
      return;
    }
    const rect = button.getBoundingClientRect();
    const viewport = window.visualViewport;
    const top = viewport?.offsetTop || 0,
      left = viewport?.offsetLeft || 0;
    const width = viewport?.width || innerWidth,
      height = viewport?.height || innerHeight;
    if (rect.bottom < top || rect.top > top + height) {
      close();
      return;
    }
    const menuWidth = Math.min(Math.max(rect.width, 280), width - 24);
    menu.style.width = menuWidth + "px";
    menu.style.left =
      Math.max(
        left + 12,
        Math.min(
          menu.dir === "rtl" ? rect.right - menuWidth : rect.left,
          left + width - menuWidth - 12,
        ),
      ) + "px";
    const below = top + height - rect.bottom - 16,
      above = rect.top - top - 16;
    const up = below < Math.min(menu.scrollHeight, 264) && above > below;
    menu.style.maxHeight =
      Math.max(44, Math.min(320, up ? above : below)) + "px";
    menu.style.top =
      (up ? rect.top - menu.offsetHeight - 6 : rect.bottom + 6) + "px";
  }
  document.querySelectorAll("select").forEach(enhance);
  new MutationObserver((records) => {
    const update = new Set();
    for (const record of records) {
      const select = record.target.closest?.("select");
      if (select) update.add(select);
      for (const node of record.addedNodes)
        if (node.nodeType === 1) {
          if (node.matches("select")) enhance(node);
          node.querySelectorAll("select").forEach(enhance);
        }
    }
    update.forEach((select) => controls.get(select)?.sync());
    if (opened && !opened.select.isConnected) close();
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["disabled", "selected", "required", "label", "value"],
  });
  document.addEventListener("pointerdown", (event) => {
    if (
      opened &&
      !opened.button.contains(event.target) &&
      !opened.menu.contains(event.target)
    )
      close();
  });
  document.addEventListener("focusin", (event) => {
    if (opened && event.target !== opened.button) close();
  });
  document.addEventListener("reset", (event) =>
    setTimeout(
      () =>
        event.target
          .querySelectorAll("select")
          .forEach((select) => controls.get(select)?.sync()),
      0,
    ),
  );
  addEventListener("resize", position);
  document.addEventListener(
    "scroll",
    (event) => {
      if (opened && event.target !== opened.menu) position();
    },
    true,
  );
  window.visualViewport?.addEventListener("resize", position);
  window.visualViewport?.addEventListener("scroll", position);
  addEventListener("pageshow", () =>
    document
      .querySelectorAll("select")
      .forEach((select) => controls.get(select)?.sync()),
  );
})();
