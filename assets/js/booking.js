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
