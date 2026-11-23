# Lumen & Kin completion and QA report

## Design and delivery

Lumen & Kin pairs an original viewfinder mark with editorial serif headings, charcoal, warm paper and copper. Home 1 presents a monochrome portrait with a clickable stack of photographic prints and a perspective gallery. Home 2 uses a journal layout with a family opening spread, a maternity feature and practical preparation notes.

The only supplied attachment contained written descriptions of references A–G. Layered prints, perspective framing, same-image color comparison and differentiated package panels draw on those descriptions. Portrait changes dissolve, the print stack responds to focus and hover, and selected frames change with the carousel controls. Reduced-motion preferences disable the animation.

Delivered Home 1, Home 2, About Studio, Services, Packages, Gallery, Contact, Client Login and Client Dashboard. All eleven source photographs are credited individually in [asset credits](asset-credits.md).

## Rendered browser checks

Tested in desktop Brave with Playwright, including mobile viewport and touch emulation. Inspected captures across desktop, tablet and mobile. Device hardware and other browser engines were outside this run.

| Area | Checks performed |
| --- | --- |
| Responsive layouts | Checked document overflow on all nine pages and every dashboard section at 320, 360, 390, 430, 768, 820, 960, 1024, 1180, 1280, 1440 and 1920 px, in LTR and RTL. The carousel simplifies to one frame on phones. |
| Navigation | Used desktop Home dropdown, footer home link, physical-left RTL mobile drawer, Escape dismissal, direct demo entry and floating back-to-top. Verified all local HTML links and asset paths resolve. |
| Themes | Switched theme and direction and verified persistence on another page. Opened the proof viewer and saved a favorite in mobile dark RTL. |
| Photography | Advanced the hero and print stack, stepped the selected gallery with buttons and keyboard, filtered public portraits, navigated the viewer by keyboard and emulated touch, and dragged the monochrome comparison. |
| Enquiry | Followed a Family service through its matching package into the preselected form. Tested required-field validation, review, edit, clipboard contents and the text download. |
| Login | Exercised sample email/password entry, Remember Me, password visibility, reset explanation and direct demo access. |
| Sessions | Selected category, package, date and time, reviewed the local request, saved it, edited the time and verified the overview and history. |
| Proofs | Navigated the dedicated proof series, favorited an image, reloaded the favorites list and removed the selection. |
| Print requests | Selected size and finish, edited quantity, checked three ₹450 prints total ₹1,350, removed a line, prepared a new request and expanded its item summary. |
| Profile | Changed the demo name and verified the updated greeting. |

Visual inspection led to corrections to the desktop panel typography, the expanded print summary and horizontal touch handling in the viewer.

## Screenshots

[Desktop homepage](screenshots/home-desktop.png) · [Mobile homepage](screenshots/home-mobile.png) · [Mobile navigation](screenshots/mobile-menu.png) · [Dark RTL tablet journal](screenshots/journal-tablet-dark-rtl.png) · [Portfolio viewer](screenshots/gallery-viewer.png) · [Dashboard](screenshots/dashboard.png) · [Booking review](screenshots/booking-review.png) · [Print summary](screenshots/print-request.png) · [Mobile dark RTL proof viewer](screenshots/proof-mobile-dark-rtl.png)

The [README](../README.md) covers local persistence, indicative pricing, GitHub Pages deployment and the backend integrations needed to accept real bookings or orders.
