# Portfolio expansion and visual refinement

## Delivered changes

Home 1 retains the layered hero, perspective carousel, portrait story, color comparison and session invitation. New sections introduce The Portrait Edit, Behind the Frame and From Portrait to Print. Four individual portraits form a contact sheet. Actual model sessions illustrate lighting and direction, and a photograph of hands reviewing prints grounds the print feature.

Home 2 retains its journal identity. Family Chapters adds three family photographs, Portraits in Natural Light adds three individual portraits, and Choose Your Session draws its package names, durations and indicative prices from the shared catalogue. The maternity feature has a narrower image column suited to its portrait ratio.

About includes a model-session process feature and a small human-subject collection. Services have stronger descriptions, preparation guidance and different compositions. Packages add photography and a catalogue-driven comparison table. Contact adds preparation, follow-up guidance and four FAQs. The existing dashboard layout and local storage keys remain in use.

## Image audit

The library grew from 11 original photographs to 35, each with a smaller responsive version. The public gallery grew from 6 to 24 distinct photographs, comprising 10 portraits, 7 family photographs and 7 maternity photographs. Three separate proof photographs retain their original identifiers and coherent session grouping.

Home 1 now uses 14 distinct static photographs, Home 2 uses 9, About uses 4, Services uses 3, Packages uses 3, Contact uses 1 and Login uses 1. The comparison deliberately presents the same photograph in two treatments. Portfolio photographs also appear in the relevant public gallery. About, Contact and Login have dedicated new portraits, and the print section has a dedicated physical-print photograph. The original empty-studio asset remains in the source archive and has no public page reference.

All photographs are local assets with source credits. Responsive image dimensions match the downloaded files. The gallery preserves complete source compositions. Visual QA caught a cropped mother's head in the Services family panel, which now displays the full photograph.

[Photographic sources and licenses](asset-credits.md)

## Color and architecture

The light canvas is #FAFAFA with white surfaces, #171719 text and #636368 secondary text. Dark mode uses #0B0C0F, #18191D panels, #F5F5F6 text and #AEAFB7 secondary text. Borders are neutral, with restrained smoky-plum focus and active accents. Header, footer, favicon, dialogs and dashboard surfaces share the revised neutral palette.

CSS is organized into shared, homepage, gallery, dashboard, authentication, inner-page and photographic-expansion files. JavaScript separates shared controls, homepage interactions, gallery, booking, authentication and print orders. Studio configuration and package data are centralized. Images are organized into portraits, family, maternity, studio and proofs folders. Page URLs are preserved.

## Browser verification

Tested in Brave with Playwright, including mobile viewport and touch emulation.

- Checked all nine pages at 320, 390, 430, 768, 820, 1024, 1280 and 1440 pixels in light and dark themes, in LTR and RTL.
- Captured 54 full-page screenshots covering all pages at mobile, tablet and desktop sizes in light LTR and dark RTL. Inspected full-page views and corrected image cropping, maternity column balance and the contact form alignment.
- Checked the dashboard's seven routes across the wider original responsive matrix. Verified desktop sidebar, mobile left drawer, theme persistence and direction persistence.
- Exercised hero and print-stack controls, perspective carousel buttons and keyboard navigation, gallery filtering, keyboard and emulated touch lightbox navigation, and comparison range and pointer dragging.
- Corrected native image dragging interfering with the comparison pointer gesture, then retested it.
- Followed the Family service to its matching package and preselected enquiry. Tested required fields, review, editing, copying and downloading.
- Tested demo login, password visibility, Remember Me, direct demo entry and reset explanation.
- Created and edited a session request. Verified session history and overview.
- Saved and removed favorites, including after reload. Tested the proof viewer in mobile dark RTL.
- Tested print size and finish selection, quantity changes, item removal, consistent totals and prepared-request summaries. Three ₹450 prints total ₹1,350.
- Edited the local profile and verified the updated greeting.
- Verified every local HTML link, stylesheet, script, image and responsive image path resolves. JavaScript syntax and Git whitespace checks passed.

## Full-page captures

[Home 1 desktop](screenshots/expanded/index-1440-light-ltr.jpg) · [Home 1 mobile dark RTL](screenshots/expanded/index-390-dark-rtl.jpg) · [Home 2 desktop](screenshots/expanded/home2-1440-light-ltr.jpg) · [Home 2 tablet dark RTL](screenshots/expanded/home2-820-dark-rtl.jpg) · [About](screenshots/expanded/about-1440-light-ltr.jpg) · [Services](screenshots/expanded/services-1440-light-ltr.jpg) · [Services mobile dark RTL](screenshots/expanded/services-390-dark-rtl.jpg) · [Packages](screenshots/expanded/packages-1440-light-ltr.jpg) · [Gallery](screenshots/expanded/gallery-1440-light-ltr.jpg) · [Contact](screenshots/expanded/contact-1440-light-ltr.jpg) · [Login](screenshots/expanded/login-1440-light-ltr.jpg) · [Dashboard](screenshots/expanded/dashboard-1440-light-ltr.jpg)

## Verification limits

Checks used one browser engine and emulated mobile devices. Real-device Safari and Firefox verification remains outstanding. Session requests, proof selections and print orders remain frontend demonstrations. Production requires the integrations described in the [README](../README.md).
