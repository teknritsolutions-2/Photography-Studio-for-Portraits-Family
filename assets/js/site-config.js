// Shared studio identity and legacy image names keep stored client records usable.
const siteConfig = Object.freeze({
  name: "Lumen & Kin",
  currency: "INR",
  imageFolders: {
    hero: "portraits",
    portrait: "portraits",
    "portrait-2": "portraits",
    family: "family",
    "family-2": "family",
    maternity: "maternity",
    "maternity-2": "maternity",
    studio: "studio",
    "proof-1": "proofs",
    "proof-2": "proofs",
    "proof-3": "proofs",
  },
});
const assetRoot =
  document.body.dataset.page === "home" ? "assets/" : "../assets/";
function photoURL(name) {
  const original = name.replace(/-small$/, "");
  const folder = siteConfig.imageFolders[original];
  return assetRoot + "images/" + (folder ? folder + "/" : "") + name + ".jpg";
}

const services = [
  {
    id: "Portraits",
    name: "Individual & Editorial Portraits",
    description:
      "Individual portraits, personal expression and contemporary editorial studies.",
  },
  {
    id: "Family",
    name: "Family Photography",
    description:
      "Whole-family portraits, smaller pairings and the moments in between.",
  },
  {
    id: "Maternity",
    name: "Maternity Photography",
    description:
      "Considered portraits with room for a partner and a pace that feels comfortable.",
  },
  {
    id: "Couples",
    name: "Couples & Engagement Photography",
    description:
      "Relaxed portraits built around your connection, together in a place that feels right.",
  },
  {
    id: "Headshots",
    name: "Professional Headshots",
    description:
      "Clean, expressive photographs for professional profiles and personal brands.",
  },
  {
    id: "Milestones",
    name: "Birthday & Milestone Photography",
    description:
      "A photographic record of a birthday, a new chapter or a meaningful personal moment.",
  },
];
function populateServices(select) {
  select.replaceChildren(
    ...services.map((service) => new Option(service.name, service.id)),
  );
}
