# Lumen & Kin

A static portrait, family and maternity photography studio with nine public and client-facing pages. The site ships as HTML, CSS and vanilla JavaScript, with locally hosted photographs and system typography.

## Run or deploy

From this directory, run `python3 -m http.server 8000 ` and open `http://localhost:8000`. For GitHub Pages, publish the contents of `` as the Pages artifact or place those contents at the publishing branch root. All internal URLs are relative. No bundler, network fonts or application server is required.

## Edit the site

- The main homepage is `index.html`. The alternative journal, studio, services, packages, portfolio, enquiry, login and client dashboard are in `pages/`.
- Edit the package catalogue in `assets/js/catalog.js` and matching editorial copy in `pages/packages.html`. Print formats and indicative INR prices are defined in `assets/js/dashboard.js`.
- Theme tokens, responsive layouts and reduced-motion preferences are in `assets/css/style.css`.
- The photographic sources and licensing are recorded in [the credits](documentation/asset-credits.md). Responsive small files derive from the corresponding originals.

## Client demonstration

Use **Client portal → Open demo dashboard**, or enter a sample email and a demo password of at least four characters. Remember me saves only the demo email. Passwords are discarded. The seven dashboard sections use a local profile, one coherent proof collection and editable browser-local records. Enquiries remain in the current tab until copied or downloaded.

## Production integrations

Production requires server-side authentication and recovery, per-client access checks and private image storage. Connect booking to studio scheduling, availability and conflict handling. Connect enquiries and order requests to a studio inbox or CRM. A paid print workflow also requires confirmed pricing, a payment provider and fulfilment integration. Replace the illustrative package and print catalogue with studio-approved values and licensed client photographs.

[QA report and browser captures](documentation/qa-report.md)
