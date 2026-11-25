# Lumen & Kin

A portrait, family and maternity photography portfolio with a client dashboard. Built with HTML5, CSS3 and vanilla JavaScript.

## Run and publish

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. GitHub Pages publishes the root of `main`. Relative links support the repository URL.

## Source layout

This repository root is the authoritative project directory. Implement all future changes directly here. The GitHub Pages publishing root and page URLs are preserved.

The public pages are in `index.html` and `pages/`. Shared typography, navigation and forms live in `assets/css/style.css`, with focused CSS for homepages, gallery, authentication, dashboard, footer and refined page compositions.

`assets/js/site-config.js` centralizes the studio configuration and six service categories. `catalog.js` supplies the four established packages. New categories use a custom enquiry, with details confirmed separately. Shared behavior lives in `main.js`; gallery, booking, authentication and print-order behavior use focused modules.

[Photo credits](documentation/asset-credits.md), [source metadata](documentation/refined-asset-manifest.json) and the [placement audit](documentation/image-placement-audit.json) document licensing, geographic evidence and uniqueness by original source ID. The comparison intentionally uses two treatments of one image. Gallery viewers and dashboard favorites and prints reuse their corresponding source photograph.

## Client and authentication behavior

Login and Signup use matching compact forms. Passwords are validated, cleared after a valid submission and never saved. Account creation, sign in, password recovery and provider controls report that their backend service is unavailable. Remember Me retains only the entered email on this browser.

**Dashboard** is a separate public navigation destination with enquiries, photographs, favorites and print-request tools. Session requests, favorites, print drafts, prepared requests and profile details persist locally. The existing storage key and proof identifiers are preserved.

## Production integrations

Real account access requires backend authentication, recovery, authorization and protected image storage. Studio scheduling must handle availability and conflicting requests. Enquiries and print requests require an inbox or CRM integration. Payment and fulfilment integrations are required for paid print ordering. Displayed package and print prices remain indicative.

[QA and screenshot report](documentation/qa-report.md)
