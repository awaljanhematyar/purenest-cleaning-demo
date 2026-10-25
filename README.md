# PureNest Cleaning

A premium, responsive **fictional Calgary cleaning business demonstration**, built with React 19, Vite, Tailwind CSS 4, React Router, and Lucide React. No actual cleaning services, bookings, testimonials, or customer information collection.

**Live demo:** https://purenest-cleaning-demo.vercel.app

**GitHub:** https://github.com/awaljanhematyar/purenest-cleaning-demo

Production was verified on October 25, 2026: all nine Playwright scenarios passed against the actual public URL. See `QA.md` for scope and limitations.

## Run locally

Use Node.js 22.12+ (Node 24 supported).

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Customize

- `src/config.js`: company identity, city, navigation, services, checklists, prices, frequency discounts, FAQs, fictional testimonials, image sources, and page SEO descriptions.
- `src/styles.css`: central palette in `:root` and Tailwind `@theme`, typography, spacing, and responsive styles. Update the navy/cyan/teal variables to rebrand.
- `src/main.jsx`: page layouts and reusable components. The home page contains the marketing flow; eight routes include a custom 404.
- `index.html`, `public/favicon.svg`: browser defaults, favicon, language, and theme color.
- Before real use, replace demo content with verified client content and licensed client photography. Replace page copy and privacy policy as needed. Do not publish unverified reviews, certifications, service claims, addresses, or contact details.

## Demo data safety

The calculator runs locally. Forms use only fictional preset selections, with no free-text or personal-information inputs. Submission validates locally, shows a loading state, then a clear simulation confirmation. Nothing is sent, emailed, booked, or saved. There is no backend, analytics, cookie consent dependency, or browser-storage use. Vercel and Unsplash may process normal delivery request metadata; the privacy page discloses this.

All prices are **illustrative CAD, before applicable tax**, and are not offers. Formula: service base + bedroom/office-room count × $25 + bathroom count × $30 + extras, then routine discount, rounded to a whole dollar. Weekly sample discount is 15%; biweekly is 10%. Office room counts are a demo simplification. Edit amounts in `src/config.js`.

Connecting a real booking system requires a separate privacy/security review, actual business details, a server-side integration, validation, abuse prevention, a retention policy, and a truthful privacy notice. Do not enable data collection by merely changing the demo label.

## Images and licensing

Images are externally hosted stock photography from Unsplash, used under the [Unsplash License](https://unsplash.com/license), which allows commercial and noncommercial use. They illustrate interiors/cleaning and are not PureNest work or staff. No Unsplash+ assets are used. Source image identifiers are centralized in `src/config.js`:

- photo-1600210492486-724fe5c67fb0
- photo-1556912172-45b7abe8b7e1
- photo-1505693416388-ac5ce068fe85
- photo-1600585154340-be6161a56a0c
- photo-1497366811353-6870744d04b2
- photo-1581578731548-c64695cc6952

The exact delivery URLs are `https://images.unsplash.com/<identifier>` with responsive sizing/quality parameters. Use these identifiers and their corresponding photos when replacing assets; identifiers are image CDN IDs, not Unsplash webpage slugs. System fonts avoid font-service requests. Icons are from Lucide (ISC license). Images have meaningful alternative text, dimensions, responsive sources, eager hero loading and deferred offscreen loading.

## QA

```sh
npm run lint
npm run build
npm test
```

Playwright uses installed Microsoft Edge (`channel: msedge`). On a machine without Edge, install a Playwright browser and update the channel. Tests cover 390px mobile, 768px tablet, and 1440px desktop across all eight routes; WCAG A/AA automated axe checks; overflow; route links; mobile menu; skip link; FAQ; calculator arithmetic; invalid and successful form submission; simulation loading; no form network/storage activity; lightbox focus/Escape; and image loading. Screenshots and HTML reports are generated in ignored QA directories. Automated accessibility testing is not a substitute for a full assistive-technology audit.

For an already deployed site: `TEST_BASE_URL=https://your-site.vercel.app npm test` (use your shell's environment-variable syntax).

## GitHub and Vercel deployment

Create a dedicated `purenest-cleaning-demo` repository. Do not attach this project to an existing unrelated repository or Vercel project. Commit source and lockfile; never commit `.vercel`, dependencies, build output, or secrets.

Import the repository into Vercel, select Vite, use `npm run build`, and set output to `dist`. No environment variables or backend services are required. `vercel.json` supplies SPA rewrites so direct visits and reloads on `/services`, `/quote`, etc. work. The custom React 404 renders for unknown routes; SPA hosting returns HTTP 200 for that client-side fallback.

CLI alternative after authentication: `npx vercel --prod`. Confirm the new project name is `purenest-cleaning-demo`. Verify the actual returned production URL, deep links, image requests, and interactions before reporting publication as complete. Set a deployment-specific canonical URL/OG image after a domain is confirmed; no fictional canonical or business structured data is published.
