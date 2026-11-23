const prefs = document.documentElement;
prefs.dataset.theme = localStorage.getItem("lk-theme") || "light";
prefs.dir = localStorage.getItem("lk-dir") || "ltr";
