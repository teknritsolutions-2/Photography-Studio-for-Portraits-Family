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
