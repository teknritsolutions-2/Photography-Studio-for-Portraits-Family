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
    e.preventDefault();
    compare.setPointerCapture(e.pointerId);
    dragComparison(e);
  };
  compare.onpointermove = (e) => {
    if (compare.hasPointerCapture(e.pointerId)) dragComparison(e);
  };
  $(".range input").oninput = (e) =>
    $(".compare").style.setProperty("--split", e.target.value + "%");
}
