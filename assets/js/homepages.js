if ($(".hero")) {
  const slides = [
    ["hero", "Portrait study"],
    ["family", "Family study"],
    ["maternity", "Maternity study"],
  ];
  let index = 0;
  const image = $(".hero-photo");
  function sizeHeroPhoto() {
    const details = responsivePhotos[slides[index][0]];
    const sourceWidth = Math.max(
      image.clientWidth,
      (image.clientHeight * details.width) / details.height,
    );
    image.sizes = Math.ceil(sourceWidth) + "px";
  }
  function showHeroPhoto() {
    const [file, caption] = slides[index];
    const source = photoSources(file);
    image.width = source.width;
    image.height = source.height;
    sizeHeroPhoto();
    image.srcset = source.srcset;
    image.src = source.src;
    image.alt = caption;
    $("#hero-caption").textContent = caption;
    $(".hero-index").firstChild.textContent = "0" + (index + 1) + " ";
  }
  const advance = (delta) => {
    index = (index + delta + slides.length) % slides.length;
    showHeroPhoto();
    develop(image);
  };
  showHeroPhoto();
  addEventListener("resize", sizeHeroPhoto, { passive: true });
  $$("[data-hero]").forEach(
    (b) => (b.onclick = () => advance(Number(b.dataset.hero))),
  );
  const film = $(".film");
  const move = (delta) => {
    if (delta > 0) film.append(film.firstElementChild);
    else film.prepend(film.lastElementChild);
    $$("img", film).forEach(develop);
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
