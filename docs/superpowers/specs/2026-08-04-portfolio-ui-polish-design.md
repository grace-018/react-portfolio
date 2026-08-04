# Portfolio UI Polish — Design

## Goal

Targeted visual and structural polish of the existing React portfolio, keeping its current brown/cream/tan identity and typography (Didact Gothic, Pacifico, Merriweather). This is not a redesign — it fixes concrete inconsistencies and bugs found during a source review, and centralizes styling so they don't drift back out of sync.

## Problems found (source review of `src/`)

1. Colors and fonts are hardcoded as raw hex strings / font-family strings in dozens of places across `Header.jsx`, `Home.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `ContactForm.jsx`, `Footer.jsx` — no single source of truth.
2. The Contact form's submit button uses an off-palette blue/pink (`#B8C5F9` → `#F5E7F9` on hover) while every other CTA on the site uses brown/tan.
3. Every section from the hero through the footer shares the exact same cream background (`#F9F5E7`), so the page reads as one unbroken field with no visual rhythm while scrolling.
4. `Header.jsx`'s desktop nav repeats 5 nearly-identical `Typography` + `ScrollLink` blocks instead of mapping over the `pages` array already defined for the mobile drawer.
5. `width: "100vw"` is used throughout (`App.jsx`, `Header.jsx`, `Home.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `ContactForm.jsx`, `Footer.jsx`). `100vw` includes the scrollbar's width, which commonly causes horizontal overflow/scroll on browsers where the scrollbar takes up layout space.
6. `About.jsx` and `Skills.jsx` use large fixed `paddingBottom` (220px, 200px) that don't scale down for mobile, wasting screen space on small viewports.
7. Skills and Projects cards have no hover feedback beyond MUI's default ripple — they read as static.
8. The About avatar photo has no visual framing (shadow/border) to give it presence.

## Approach

Introduce a centralized MUI theme and apply the fixes above on top of it, rather than patching each hardcoded value in place. Since the site is already built entirely on MUI (`AppBar`, `Card`, `Button`, `sx` props throughout), this fits the existing architecture rather than introducing a new styling system.

## Section 1 — Theme foundation

Add `src/theme.js` exporting a MUI `createTheme()`:

- `palette.primary.main` = `#65451F` (existing header/footer brown)
- `palette.secondary.main` = `#C8AE7D` (existing tan hover/accent)
- `palette.background.default` = `#F9F5E7` (existing base cream)
- A new `palette.background.alt` (or a custom theme key) for a slightly deeper cream tint, used for section alternation (Section 2)
- One warm accent color, reused by both the hero "Explore My Projects" button and the Contact submit button, replacing the Contact form's current off-palette blue/pink
- `typography`: default `fontFamily` set to `"Didact Gothic"`; the hero name and logo keep their distinct treatments (`Pacifico` for the hero name, `Merriweather` for the "GRACE" wordmark) via explicit `sx`/variant overrides, since they're intentionally distinct from body text

Wrap `<App />` in `<ThemeProvider theme={theme}>` in `src/index.js`. Components then read colors via `theme.palette.*` (through `useTheme()` or the `sx` callback form `sx={{ color: (theme) => theme.palette.primary.main }}`) instead of hardcoded hex.

This section adds only the theme file and provider — no visual change by itself.

## Section 2 — Section-by-section fixes

Applying the Section 1 theme:

- **Header.jsx**: collapse the 5 duplicated desktop-nav `Typography` blocks into one `.map()` over the existing `pages` array (already used by the mobile drawer). Same visual output, single source for nav items. Switch nav font from `Arial` to `Didact Gothic` for consistency with the rest of the site.
- **Home.jsx**: no structural change; background pulls from the theme's base cream.
- **About.jsx / Skills.jsx / Projects.jsx / ContactForm.jsx**: alternate section background between the theme's base cream and deeper-cream tint (e.g. Home=base, About=alt, Skills=base, Projects=alt, Contact=base) so scrolling shows visible section boundaries instead of one unbroken field. Add a subtle box-shadow ring around the About avatar (`Avatar` `sx` prop) for framing.
- **Skills.jsx / Projects.jsx cards**: add a hover transition (`transform: translateY(-4px)` + increased `boxShadow`) via `sx` on the `Card` component, so cards read as interactive.
- **ContactForm.jsx**: submit button switches from the blue/pink pair to the shared warm accent from Section 1, matching the Home CTA button's brown/tan hover behavior.
- **Footer.jsx**: colors pulled from theme instead of hardcoded hex — no visual change, consistency only.

## Section 3 — Responsive/layout fixes

- Replace every `width: "100vw"` with `100%` (or drop the explicit width where the element is already block-level and fills its container) in `App.jsx`, `Header.jsx`, `Home.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `ContactForm.jsx`, `Footer.jsx`. This removes the scrollbar-inclusive horizontal-overflow risk.
- Replace the fixed `paddingBottom: "220px"` (About) and `paddingBottom: "200px"` (Skills) with breakpoint-aware spacing (smaller on `xs`, current size preserved on `md+`) via the `sx` responsive-object syntax, e.g. `paddingBottom: { xs: 6, md: 22 }` (values in theme spacing units) tuned to visually match today's desktop spacing while shrinking on mobile.
- Spot-check the mobile drawer width (`50vw`) and the existing `Grid` breakpoints (`xs=12`, `sm=6`, `md=4`) for Skills/Projects cards still stack cleanly at phone width — adjust only if the review surfaces an actual problem, not preemptively.

## Verification

After implementation, load the site in the browser preview and:

- Confirm no horizontal scrollbar/overflow at desktop and at a mobile viewport width (e.g. 375px).
- Visually confirm section backgrounds alternate and the Contact button now matches the site's brown/tan palette.
- Confirm nav links (desktop + mobile drawer) still scroll to the correct sections.
- Confirm Skills/Projects cards show a hover effect.

## Non-goals

- No new color palette, no new fonts, no layout/structure redesign (this is polish, not a redesign — see Approach A/B/C discussion; B was chosen, not a rewrite).
- No changes to page content/copy.
- No dark mode.
- No changes beyond what's listed above (e.g. no carousel redesign in Skills, no new sections).
