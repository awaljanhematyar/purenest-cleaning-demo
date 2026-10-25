# PureNest Cleaning verification

Verified on October 25, 2026 using Node.js 24 and headless Microsoft Edge through Playwright.

- Production build: passed. Main JavaScript approximately 95 kB gzip; CSS approximately 7.5 kB gzip.
- ESLint: passed with zero errors or warnings.
- All eight routes tested at 390px, 768px, and 1440px. No horizontal overflow or browser runtime errors.
- Automated axe WCAG 2 A/AA and WCAG 2.1 AA checks passed across all 24 route/viewport combinations after contrast corrections.
- Keyboard skip link, responsive navigation, FAQ toggle, gallery filtering, lightbox focus/Escape and focus restoration passed.
- Calculator amounts, extras, recurring discount and service changes passed.
- Both forms validated missing selections and completed the simulated submission; loading and reset behavior passed.
- Network and storage assertions confirmed quote form submission produces no fetch/XHR/POST requests and uses no local or session storage.
- All six stock photographs loaded successfully. Mobile, tablet and desktop screenshots were reviewed.

Initial QA identified low-contrast step numerals and map caption, plus initial focus moving past the skip link in React Strict Mode. These were corrected. Test selectors were also clarified to distinguish the price output from the form confirmation.

The nine test scenarios passed across the corrected suite and the focused calculator rerun. Run `npm test` to regenerate the complete report. Hosting verification is recorded separately after deployment.

Limitations: automated accessibility checks and keyboard testing are not a full assistive-technology audit; testing used Chromium/Edge rather than Safari or Firefox. Forms deliberately do not submit real enquiries. Prices, reviews and business identity are fictional. Images depend on Unsplash availability. Unknown SPA routes render the custom 404 with the hosting fallback's HTTP 200 status.
