const sizes = { "5 × 7 in": 250, "8 × 10 in": 450, "12 × 16 in": 850 };
const totals = (rows) =>
  rows.reduce((sum, r) => sum + sizes[r.size] * r.qty, 0);
const inr = (amount) => "₹" + amount.toLocaleString("en-IN");

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
