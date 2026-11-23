# Lumen & Kin

A portrait, family and maternity photography portfolio with a browser-local client dashboard. Built with HTML5, CSS3 and vanilla JavaScript.

## Run and publish

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. GitHub Pages publishes the root of `main`. Relative links support the repository URL.

## Source layout

- `index.html` and `pages/` contain the public pages, login and dashboard.
- `assets/css/style.css` contains shared typography, navigation, forms and layout. Homepage, gallery, dashboard, authentication and inner-page styles have focused files. `refinement.css` covers the expanded photographic collections.
- `assets/js/site-config.js` stores shared studio configuration and image mappings. `catalog.js` is the shared package catalogue used by package panels, the comparison table, homepage session discovery and enquiry/booking selectors.
- Shared navigation, theme and interaction helpers live in `main.js`. Page behavior lives in `homepages.js`, `gallery.js`, `booking.js`, `auth.js`, `dashboard.js` and `print-orders.js`.
- Photographs are grouped by subject. Small derivatives serve responsive thumbnails. [Credits](documentation/asset-credits.md) document the photographers and source licenses.

## Client demonstration

Use **Client portal → Open demo dashboard**, or enter a sample email and a demo password of at least four characters. Remember Me saves only the sample email. Session requests, favorites, print drafts, prepared requests and profile details persist on this browser. Existing records retain the same storage key and proof identifiers.

## Production integrations

Real client access requires backend authentication, password recovery, authorization and protected image storage. Studio scheduling must handle availability and conflicting requests. Enquiries and print requests require an inbox or CRM integration. Payment and fulfilment integrations are required for paid print ordering. The displayed INR prices are indicative and configurable.

[Visual QA and regression report](documentation/qa-report.md)
