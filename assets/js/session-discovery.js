const discovery = document.querySelector("[data-session-discovery]");
if (discovery) {
  discovery.innerHTML = ["Portraits", "Family", "Maternity"]
    .map((category) => {
      const packages = catalogue.filter((item) => item.category === category);
      return (
        "<article><h3>" +
        category +
        "</h3><p>" +
        packages
          .map(
            (item) =>
              item.name +
              " · " +
              item.duration +
              " minutes · ₹" +
              item.price.toLocaleString("en-IN"),
          )
          .join("<br>") +
        '</p><a class="textlink" href="contact.html?service=' +
        category +
        "&package=" +
        packages[0].id +
        '">Enquire about ' +
        category.toLowerCase() +
        "</a></article>"
      );
    })
    .join("");
}
