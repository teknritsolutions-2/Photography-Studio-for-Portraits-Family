# Targeted layout and authentication refinement report

Reviewed on 25 November 2026.

## Sitewide image and text sharpness audit

The tablet portfolio captions were included in the carousel's perspective transforms. Captions now stay flat and fully opaque while the photographic frames transition. Tablet image perspective is disabled. Desktop perspective applies only to photographs. The print caption also sits outside its rotated paper frame, and hover scaling is restricted to devices with a precise pointer.

Responsive image slot sizes now account for full-width tablet layouts and cover crops. The hero uses responsive source selection when advancing photographs and resizing. Proof thumbnails, the dashboard preview and gallery/proof viewers carry suitable source sets.

Twenty-eight higher-density JPEG derivatives were downloaded from the same licensed originals at quality 88. Each requested width was checked against the native source dimensions and capped accordingly. Browser source selection preserves the existing small and standard versions for appropriately sized displays. Sources and dimensions are recorded in the [resolution manifest](image-resolution-manifest.json).

The physical-pixel audit covered 200 page/view configurations across all ten pages, including 1x/2x mobile, tablet and desktop displays through 1920px and 3x checks at 390px and 768px. It found 58 samples below 85% of their required source width before correction. The final run found zero below 98% coverage. Five transformed tablet text elements became zero. [Machine-readable audit](sharpness-audit.json)

All 24 public lightbox images, three proof images and three hero slides also passed high-density pixel checks. Rendered layout checks passed all ten pages at eight widths in light/dark and LTR/RTL. Existing carousel controls, comparison dragging, filtering, touch/keyboard viewing, authentication, session requests, favorites, print totals and saved dashboard records passed regression checks.

Inspected high-density tablet renders of the portfolio, plus full-page mobile/tablet/desktop captures. The selected portrait's source photograph includes visible grain.

[Tablet portfolio at 2x](screenshots/tablet-selected-moments.png) · [Tablet portfolio in dark RTL at 2x](screenshots/tablet-selected-moments-dark-rtl.png)

## Brand logo refresh

The shared identity now uses a custom LK monogram and an uppercase serif wordmark. All 26 linked logo placements across the ten pages use `assets/icons/brand-mark.svg`. A matching favicon is supplied in `assets/icons/mark.svg`. The mark inherits the current text color, and its left-to-right orientation is preserved in RTL.

Verified the shared SVG resource, logo home links, light/dark contrast and overflow at 320, 390, 768, 1024, 1280 and 1440px on all ten pages in both text directions. Mobile/tablet drawers fit their logo and close controls. Authentication and sidebar logo sizes are adjusted to their available space. JavaScript and page content behavior are preserved.

[Rendered light logo](screenshots/logo-light.png) · [Rendered dark logo](screenshots/logo-dark.png)

## Completed compositions

Home 2's Family Stories section is a two-photograph journal spread. A large editorial headline introduces a full family portrait and a smaller supporting craft-table photograph with the copy and portfolio action. Tablet moves the supporting image and text into a row below the main portrait. Mobile puts the supporting image after the copy. Both photographs retain their complete source framing.

About's Working with Light section combines a landscape editorial portrait and an integrated content panel. On tablet the image and content form a compact, aligned two-column panel, while mobile uses a readable stacked composition. A Few Ways of Seeing now has three unique, consistently aligned photographs. Its supporting paragraph sits beside the heading, and each caption sits directly beneath its photograph.

Services has a photographic introduction followed by two coordinated collections. Portraits, Family and Maternity form the core collection, with suitable portrait frames and package actions. Couples, Headshots and Milestones use aligned specialist panels. Image areas, headings, descriptions, metadata and enquiry actions share a consistent rhythm. All six categories and the custom-session handling remain functional. The banner uses a light editorial composition with the heading and session actions on the left and the complete photograph on the right. Tablet and mobile reflow the photograph above the content. Subtle image hover motion respects reduced-motion settings.

Login and Signup retain their form structure and have distinct genuine photography backgrounds. Desktop uses a dedicated side photograph and a proportionate form area. Tablet and mobile use a controlled photographic background and opaque form card. Branding, password visibility, Remember Me/Forgot Password alignment, provider feedback, validation and crosslinks are preserved. Account submissions continue to report the integration requirement and clear passwords.

## Latest follow-up verification

The Family Stories journal spread passed 320, 390, 430, 768, 1024, 1280 and 1440px widths in light/dark and LTR/RTL. Six full-page views were captured and desktop, tablet and mobile renders inspected. All images loaded, and the portfolio link correctly filtered to seven Family photographs. Its newly activated supporting photograph has a unique source ID among public placements.

The dashboard sidebar label is now **Exit**, and the mobile/tablet drawer provides the same action. Both return to Home 1 and retain browser-local sessions, selections and profile data.

The updated Home 2, Services and Dashboard passed seven widths in four theme/direction combinations. Eighteen full-page screenshots cover desktop 1440px, tablet 768 × 1024 and mobile 390 × 844 in light LTR and dark RTL. Inspected rendered views, tested the Family-filtered portfolio link, checked both Services banner actions and verified both Exit destinations while retaining an existing local record.

[Dashboard Exit drawer](screenshots/dashboard-exit-drawer.jpg) · [Updated dashboard](screenshots/dashboard-1440-light-ltr.jpg)

## Photography and typography

Eight licensed photographs were added for the targeted placements. Sources and composition guidance are documented in the [targeted asset manifest](targeted-asset-manifest.json) and [photographic credits](asset-credits.md). The placement audit confirms 67 distinct static public originals and two additional hero-slide originals. The color/monochrome comparison intentionally presents the same original twice. Gallery viewers and dashboard favorites and prints use functional representations of their corresponding images.

Computed sizes were inspected before changes. Existing body copy was 16–18px, navigation and buttons 15px, form labels 15px, captions 15px and metadata 14.4px. Global typography was retained. The new service descriptions are 17px on desktop/mobile and 16px at tablet widths, with 1.65 line height. New service metadata is 15px. Remember Me and Forgot Password use 15px except at the narrowest 320px layout.

## Scope preservation

The shared brand markup has been updated across all ten pages. Page content, photographic compositions and every JavaScript module are preserved. Dashboard includes the previously verified Exit label and matching mobile drawer link. Their interaction and data handling behavior was exercised during regression checks. Shared stylesheet changes remove obsolete rules scoped to replaced About/Home 2/Services markup. The consolidated repository root, static page URLs, package data and localStorage keys are preserved. No nested project directory was introduced.

## Browser verification

Tested in Brave using Playwright, including mobile viewport and touch emulation.

- All ten pages passed seven widths at 320, 390, 430, 768, 1024, 1280 and 1440 pixels in light/dark and LTR/RTL combinations.
- Captured 30 full-page views of the five modified pages at 390 × 844, 768 × 1024 and desktop 1440 pixels in light LTR and dark RTL.
- Inspected actual rendered desktop, tablet and mobile screenshots. The initial Services banner crop cut into a head, so it was replaced with a native-ratio composition and retested.
- Measured service image areas, heading starting positions and CTA positions within each collection. They align within two pixels at tablet and desktop widths.
- Verified descriptions remain at least 16px and Remember Me/Forgot Password remain on one row at the requested sizes.
- Followed all six service enquiry links and checked category/package preselection. The new custom offerings retain custom enquiries.
- Tested enquiry validation, review, editing, copying and downloading.
- Tested authentication visibility controls, name and password confirmation validation, Remember Me, provider/reset feedback, cleared password fields and absence of stored passwords.
- Tested Home dropdown, physical-left mobile drawer, Escape handling, sticky navigation, theme/direction persistence, footer links and back-to-top.
- Exercised hero controls, photographic stack, carousel keyboard navigation, comparison dragging, gallery filters, viewer keyboard navigation and emulated touch swipe.
- Tested requested sessions, edits, proof favorites after reload, favorites removal, print sizes/finishes/quantity changes, totals, item removal, prepared requests and profile editing.
- Loaded prior saved session, favorite and print records and verified all seven dashboard routes at mobile, tablet and desktop sizes.
- Verified all local page, script, stylesheet, image and responsive source paths. Source-ID audit confirms unique independent public photographs.

## Rendered evidence

[Home 2 desktop](screenshots/home2-1440-light-ltr.jpg) · [Home 2 tablet](screenshots/home2-768-light-ltr.jpg) · [Home 2 mobile dark RTL](screenshots/home2-390-dark-rtl.jpg) · [About desktop](screenshots/about-1440-light-ltr.jpg) · [About tablet](screenshots/about-tablet-banner-light.png) · [About mobile dark RTL](screenshots/about-390-dark-rtl.jpg) · [Services desktop](screenshots/services-1440-light-ltr.jpg) · [Services tablet](screenshots/services-768-light-ltr.jpg) · [Services mobile dark RTL](screenshots/services-390-dark-rtl.jpg) · [Login desktop](screenshots/login-1440-light-ltr.jpg) · [Login tablet](screenshots/login-768-light-ltr.jpg) · [Login mobile dark RTL](screenshots/login-390-dark-rtl.jpg) · [Signup desktop](screenshots/signup-1440-light-ltr.jpg) · [Signup tablet](screenshots/signup-768-light-ltr.jpg) · [Signup mobile dark RTL](screenshots/signup-390-dark-rtl.jpg)

## Verification limits

The attachment directory supplied the written brief, with no six reference screenshots. Refinements followed those instructions and were inspected in new rendered screenshots.

Testing used one browser engine and mobile emulation. Physical-device Safari and Firefox verification remains outstanding. Authentication, OAuth providers, recovery and real studio booking/order delivery require production integrations.


## Behind the Frame tablet correction — 25 November 2026

At tablet widths from 741px through 1180px, Watch the Light and its paragraph now appear directly beneath the first photograph. Leave Room to Move and its paragraph appear beneath the second photograph, with aligned headings. Mobile pairs each image with its own copy in a single column. Desktop retains the original right-column text grouping.

Verified placement and overflow at 320, 390, 740, 768, 820, 1024, 1180, 1280 and 1440px in light/dark and LTR/RTL. Inspected the 768px rendered section. Photograph sources, responsive high-density candidates and text content are preserved.

[Tablet light view](screenshots/craft-tablet-light-ltr.png) · [Tablet dark RTL view](screenshots/craft-tablet-dark-rtl.png)


## About tablet banner correction — 25 November 2026

Tablet widths from 741px through 1180px use an aligned portrait-and-content panel with equal-height columns. Reduced introductory padding removes the large gap above the photograph. The portrait crop preserves the full face and head, while the heading, both paragraphs and Gallery action fit together in the first view at the tested tablet sizes. Tablet body copy is 16px with 1.6 line height.

Verified 320, 390, 740, 768, 820, 1024, 1180, 1280 and 1440px in light/dark and LTR/RTL. Inspected the rendered 768px banner and tested the Gallery action.

[Tablet banner light](screenshots/about-tablet-banner-light.png) · [Tablet banner dark RTL](screenshots/about-tablet-banner-dark.png)


## Package price typography — 25 November 2026

Package amounts use the body sans-serif font at regular weight, with lining and tabular numerals for consistent digit heights and widths. Verified the computed font, numeral settings and four catalogue values at 390, 768 and 1440px in light/dark and LTR/RTL.

[Price typography preview](screenshots/package-price-typography.png)
