function formatPackagePrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

for (const panel of document.querySelectorAll("[data-package]")) {
  const item = catalogue.find((entry) => entry.id === panel.dataset.package);
  if (!item) continue;
  panel.querySelector(".meta").textContent =
    item.category + " · " + item.duration + " minutes";
  panel.querySelector("h2").textContent = item.name;
  const descriptions = panel.querySelectorAll("p");
  descriptions[0].textContent = item.detail;
  descriptions[1].textContent =
    item.photos +
    " edited digital photographs · Proof gallery access · Optional prints";
  panel.querySelector("strong").textContent = formatPackagePrice(item.price);
  panel.querySelector("a").href =
    "contact.html?service=" +
    encodeURIComponent(item.category) +
    "&package=" +
    item.id;
}

const comparisonBody = document.querySelector("[data-package-comparison]");
if (comparisonBody) {
  for (const item of catalogue) {
    const row = document.createElement("tr");
    const values = [
      item.name,
      item.duration + " minutes",
      item.photos + " digital photographs",
      "Included",
      "Optional",
      formatPackagePrice(item.price),
    ];
    values.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "th" : "td");
      if (index === 0) cell.scope = "row";
      cell.textContent = value;
      row.append(cell);
    });
    comparisonBody.append(row);
  }
}
