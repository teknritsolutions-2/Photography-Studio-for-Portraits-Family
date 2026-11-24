const viewer = $("#viewer");
let visiblePhotos = [],
  viewIndex = 0,
  favoriteAction;
function displayPhoto() {
  const p = visiblePhotos[viewIndex];
  const image = $("img", viewer);
  image.sizes = "(max-width:1129px) 85vw, 960px";
  image.width = p.width;
  image.height = p.height;
  image.srcset = p.srcset || "";
  image.src = p.src;
  image.alt = p.title;
  $(".viewerbar span", viewer).textContent =
    p.title + " · " + (viewIndex + 1) + " / " + visiblePhotos.length;
  const fav = $("[data-viewfav]");
  fav.hidden = !favoriteAction;
  if (favoriteAction) {
    fav.textContent = favoriteAction.label(p);
    fav.onclick = () => {
      favoriteAction.toggle(p);
      fav.textContent = favoriteAction.label(p);
    };
  }
  develop(image);
}
function viewPhotos(photos, index, favorite) {
  visiblePhotos = photos;
  viewIndex = index;
  favoriteAction = favorite;
  displayPhoto();
  viewer.showModal();
}
function nextPhoto(delta) {
  viewIndex = (viewIndex + delta + visiblePhotos.length) % visiblePhotos.length;
  displayPhoto();
}
swipe(viewer, nextPhoto);
$$("[data-viewer]").forEach(
  (b) => (b.onclick = () => nextPhoto(Number(b.dataset.viewer))),
);
if ($(".filters")) {
  const photos = $$("[data-photo]");
  const filter = (category) => {
    $$("[data-filter]").forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.filter === category),
    );
    photos.forEach(
      (b) =>
        (b.hidden =
          category !== "Selected Work" && b.dataset.category !== category),
    );
  };
  filter(
    ["Portraits", "Family", "Maternity"].includes(params.get("category"))
      ? params.get("category")
      : "Selected Work",
  );
  $$("[data-filter]").forEach(
    (b) => (b.onclick = () => filter(b.dataset.filter)),
  );
  photos.forEach(
    (b) =>
      (b.onclick = () => {
        const visible = photos.filter((p) => !p.hidden);
        viewPhotos(
          visible.map((p) => ({
            title: p.dataset.title,
            src: $("img", p).src,
            srcset: $("img", p).srcset,
            width: Number($("img", p).getAttribute("width")),
            height: Number($("img", p).getAttribute("height")),
          })),
          visible.indexOf(b),
        );
      }),
  );
}
