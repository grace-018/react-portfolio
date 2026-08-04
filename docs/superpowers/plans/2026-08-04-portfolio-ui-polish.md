# Portfolio UI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize the portfolio's colors/fonts into a single MUI theme and use it to fix concrete inconsistencies (off-palette Contact button, monotone section backgrounds, `100vw` overflow risk, duplicated nav markup, static cards, an unstyled dark `:root` background) without changing content or introducing a new visual identity.

**Architecture:** Add one new `src/theme.js` (MUI `createTheme`) consumed via `ThemeProvider` in `src/index.js`. Every other task edits exactly one existing component file to replace hardcoded hex/font strings with theme-token references (e.g. `"primary.main"`) and apply the specific fix described for that file. No new runtime dependencies — `@mui/material` (which provides `createTheme`/`ThemeProvider`) is already installed.

**Tech Stack:** React 18 (Create React App / `react-scripts`), MUI v5 (`@mui/material`, `@emotion/*`), Jest + React Testing Library (already configured via `react-scripts test`), `react-scroll` for in-page nav.

## Global Constraints

- Keep the existing brand identity: colors `#65451F` (primary/brown), `#C8AE7D` (secondary/tan), `#F9F5E7` (base cream). Do not introduce a new palette or new fonts.
- Fonts stay as-is: `Didact Gothic` (body), `Pacifico` (hero name), `Merriweather` (logo wordmark). Only the nav link font changes, from `Arial` to `Didact Gothic`, per the approved design.
- No content/copy changes, no dark mode, no new sections, no carousel redesign — see the spec's Non-goals section.
- Exact palette tokens for `src/theme.js` (all tasks below assume these exist once Task 1 is done):
  - `palette.primary.main` = `"#65451F"`
  - `palette.secondary.main` = `"#C8AE7D"`
  - `palette.accent.main` = `"#765827"` (shared CTA color for the Home and Contact buttons)
  - `palette.accent.contrastText` = `"#FFFFFF"`
  - `palette.background.default` = `"#F9F5E7"`
  - `palette.background.alt` = `"#F1E6C8"`
  - `typography.fontFamily` = `'"Didact Gothic", Arial, sans-serif'`
- Section background alternation (per the approved design, Section 2): Home = `background.default`, About = `background.alt`, Skills = `background.default`, Projects = `background.alt`, Contact = `background.default`.
- **Known pre-existing failure, out of scope:** `src/App.test.js` already fails today — it asserts a `"learn react"` link exists, which is stale Create React App boilerplate and matches nothing in this app (verified: no other file contains that text). This is unrelated to this work; do not fix it as part of this plan. Run new/modified tests with a targeted `react-scripts test` pattern (shown in each task) rather than relying on the full suite being green.
- Test runner: `npm test -- --watchAll=false <pattern>` (CRA's Jest wrapper; `--watchAll=false` makes it run once and exit instead of entering watch mode).

---

### Task 1: Theme foundation

**Files:**
- Create: `src/theme.js`
- Test: `src/theme.test.js`

**Interfaces:**
- Produces: `src/theme.js` default-exports a MUI theme object with `palette.primary.main`, `palette.secondary.main`, `palette.accent.main`, `palette.accent.contrastText`, `palette.background.default`, `palette.background.alt`, and `typography.fontFamily`, per the Global Constraints values above. Tasks 2–10 import this as `import theme from "../../theme"` (path depth varies by file location) or, once `ThemeProvider` is mounted (Task 2), reference it indirectly via `sx` token strings like `"primary.main"`.

- [ ] **Step 1: Write the failing test**

Create `src/theme.test.js`:

```js
import theme from "./theme";

test("theme exposes the site's brand palette", () => {
  expect(theme.palette.primary.main).toBe("#65451F");
  expect(theme.palette.secondary.main).toBe("#C8AE7D");
  expect(theme.palette.accent.main).toBe("#765827");
  expect(theme.palette.accent.contrastText).toBe("#FFFFFF");
  expect(theme.palette.background.default).toBe("#F9F5E7");
  expect(theme.palette.background.alt).toBe("#F1E6C8");
});

test("theme sets Didact Gothic as the default font family", () => {
  expect(theme.typography.fontFamily).toMatch(/Didact Gothic/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false theme.test.js`
Expected: FAIL with "Cannot find module './theme'" (file doesn't exist yet).

- [ ] **Step 3: Write the implementation**

Create `src/theme.js`:

```js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#65451F",
    },
    secondary: {
      main: "#C8AE7D",
    },
    accent: {
      main: "#765827",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F9F5E7",
      alt: "#F1E6C8",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Didact Gothic", Arial, sans-serif',
  },
});

export default theme;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false theme.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/theme.js src/theme.test.js
git commit -m "feat: add centralized MUI theme with brand palette"
```

---

### Task 2: Wire ThemeProvider into the app root, fix the dark `:root` background, remove dead CSS

**Files:**
- Modify: `src/index.js`
- Modify: `src/index.css`
- Delete: `src/App.css` (confirmed unused — not imported by any file; grepped `App\.css` across `src/`, zero matches)
- Test: `src/index.test.js`

**Interfaces:**
- Consumes: `theme` default export from `src/theme.js` (Task 1).
- Produces: every component under `<App />` now renders inside a MUI `ThemeProvider`, so `sx` props anywhere in the tree can reference theme palette paths as strings (e.g. `bgcolor: "primary.main"`). Tasks 3–10 rely on this being in place — their token-string `sx` values only resolve correctly once this task is done.

**Context:** `src/index.css` currently sets `:root { background-color: #272829; }` — a near-black leftover from Create React App's default dark boilerplate. Because it's on `:root`, it applies globally regardless of which components are on screen, so any moment the page content doesn't fully cover the viewport (e.g. a transition, a gap during a resize) shows a jarring near-black flash against the site's cream palette. `src/App.css` defines `.App`, `.App-logo`, `.App-header` (with `background-color: #282c34`), `.App-link`, and a spin keyframe — all Create React App boilerplate for classes that `src/App.jsx` never applies (`App.jsx` uses `<Box sx={{ width: "100vw" }}>` with no `className="App"`), and no file imports `App.css`, so it's dead code carrying the same off-brand dark colors. Both are fixed/removed here since they're the direct cause of the app's only non-cream background color and are tightly coupled to the "app boot" files this task already touches.

- [ ] **Step 1: Write the failing test**

Create `src/index.test.js`:

```js
import { waitFor } from "@testing-library/react";

test("mounts into #root under a ThemeProvider without crashing", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await expect(import("./index.js")).resolves.not.toThrow();
  const root = document.getElementById("root");
  // React 18's createRoot().render() schedules its commit rather than
  // committing synchronously, so poll instead of asserting immediately.
  await waitFor(() => expect(root.children.length).toBeGreaterThan(0));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false index.test.js`
Expected: This test actually PASSES already against the current `index.js` (it renders fine today, just without a theme) — so first confirm the *background* assertion fails instead. Replace the test file with the version below, which additionally checks the root div's resolved background color, which only turns cream after Step 3's `index.css` edit:

```js
import { waitFor } from "@testing-library/react";

test("mounts into #root under a ThemeProvider without crashing", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await expect(import("./index.js")).resolves.not.toThrow();
  const root = document.getElementById("root");
  await waitFor(() => expect(root.children.length).toBeGreaterThan(0));
});

test(":root background is the site's cream, not the CRA-default near-black", () => {
  const fs = require("fs");
  const source = fs.readFileSync(require.resolve("./index.css"), "utf8");
  expect(source).not.toMatch(/#272829/);
  expect(source).toMatch(/#F9F5E7/);
});
```

Run: `npm test -- --watchAll=false index.test.js`
Expected: FAIL on the second test ("expect(source).not.toMatch(/#272829/)" fails because `#272829` is still present).

- [ ] **Step 3: Write the implementation**

Edit `src/index.css` — change the `:root` rule:

```css
:root {
  margin: 0;
  background-color: #F9F5E7;
}
```

(rest of the file — the `body` and `code` rules — unchanged)

Delete `src/App.css`:

```bash
rm src/App.css
```

Edit `src/index.js` to wrap `<App />` in `ThemeProvider`:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false index.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/index.js src/index.css src/index.test.js
git rm src/App.css
git commit -m "fix: wire up ThemeProvider, fix dark :root background, remove dead CRA CSS"
```

---

### Task 3: App.jsx width fix

**Files:**
- Modify: `src/App.jsx`
- Test: `src/App.width.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` from Task 2 (already mounted by the test harness's own render in `App.test.js`'s pattern — this task's test doesn't need to render, it's a source check, see below).

**Context:** `<Box sx={{ width: "100vw" }}>` at the app root. `100vw` includes the browser scrollbar's width, so on any browser where the vertical scrollbar takes up layout space, the root box is wider than the visible viewport, causing horizontal overflow. Block-level `Box` already fills its parent's width by default, so `100%` is both the fix and the simpler value.

- [ ] **Step 1: Write the failing test**

Create `src/App.width.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("App root does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "App.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false App.width.test.js`
Expected: FAIL (`App.jsx` still contains `"100vw"`).

- [ ] **Step 3: Write the implementation**

Edit `src/App.jsx`, change:

```js
    <Box sx={{ width: "100vw" }}>
```

to:

```js
    <Box sx={{ width: "100%" }}>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false App.width.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/App.width.test.js
git commit -m "fix: replace 100vw with 100% on App root to prevent horizontal overflow"
```

---

### Task 4: Header — DRY desktop nav, theme colors, font, width fix

**Files:**
- Modify: `src/component/header/Header.jsx`
- Test: `src/component/header/Header.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `primary.main` (AppBar background).
- Produces: no change to `Header`'s public interface (still a default-exported, prop-less component); the `pages` array (`{ to, text }` objects) is now used to render both the mobile drawer items and the desktop nav items, instead of the desktop items being hand-duplicated.

**Context:** The desktop nav currently repeats 5 near-identical `Typography` + `ScrollLink` blocks. The mobile drawer already maps over a `pages` array. This task makes the desktop nav map over the same array. It also unifies each link's scroll `offset` to `-100` (the original code had `offset={-100}` on About/Skills/Projects but no offset — i.e. `0` — on "Contact Me", which was an inconsistency, not an intentional difference; unifying it means the header now clears content by the same amount for every link).

- [ ] **Step 1: Write the failing test**

Create `src/component/header/Header.test.js`:

```jsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import Header from "./Header";

function renderHeader() {
  return render(
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

test("renders all nav links and Resume", () => {
  renderHeader();
  ["About", "Skills", "Projects", "Contact Me", "Resume"].forEach((label) => {
    expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
  });
});

test("does not use a scrollbar-inclusive 100vw width", () => {
  const fs = require("fs");
  const path = require("path");
  const source = fs.readFileSync(path.join(__dirname, "Header.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("desktop nav is generated from the pages array, not duplicated by hand", () => {
  const fs = require("fs");
  const path = require("path");
  const source = fs.readFileSync(path.join(__dirname, "Header.jsx"), "utf8");
  // 5 hardcoded ScrollLink blocks in the original became 1 mapped block;
  // there should be exactly one `pages.map(` call left (the mobile drawer
  // and desktop nav both reuse it) rather than the old single (mobile-only) one
  // plus 5 hand-written desktop copies.
  const scrollLinkCount = (source.match(/<ScrollLink/g) || []).length;
  expect(scrollLinkCount).toBeLessThanOrEqual(3); // logo + one mapped mobile + one mapped desktop
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false Header.test.js`
Expected: FAIL — the `100vw` test fails (current file has `width: "100vw"`), and the `scrollLinkCount` test fails (current file has 1 mobile `<ScrollLink` inside the `.map()` plus 4 more hand-written desktop `<ScrollLink` blocks plus the logo one = 6, which is `> 3`).

- [ ] **Step 3: Write the implementation**

Replace the full contents of `src/component/header/Header.jsx`:

```jsx
import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Link as ScrollLink } from "react-scroll";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";

const navLinkStyle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "Didact Gothic",
  letterSpacing: ".1rem",
  color: "#FAF0D7",
  textDecoration: "none",
  cursor: "pointer",
};

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenNavMenu = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsDrawerOpen(false);
  };

  const pages = [
    { to: "about", text: "About" },
    { to: "skills", text: "Skills" },
    { to: "projects", text: "Projects" },
    { to: "contact", text: "Contact Me" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary.main", width: "100%" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "Merriweather",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#EAC696",
            textDecoration: "none",
            marginRight: "5px",
            cursor: "pointer",
          }}
        >
          <ScrollLink
            to="home"
            smooth={true}
            activeClass="active"
            spy={true}
            duration={500}
          >
            {" "}
            GRACE
          </ScrollLink>
        </Typography>

        <Typography
          variant="body"
          component="span"
          sx={{ flexGrow: 1, marginRight: "10px" }}
        ></Typography>

        {/*Mobile Navigation with hamburger icon */}
        <IconButton
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: "flex", md: "none" }, marginLeft: "5px" }}
          onClick={handleOpenNavMenu}
        >
          <FcMenu />
        </IconButton>

        <SwipeableDrawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleCloseNavMenu}
          onOpen={handleOpenNavMenu}
          PaperProps={{
            sx: { width: "50vw" },
          }}
        >
          <br />
          {pages.map((item, index) => (
            <div key={index}>
              <MenuItem>
                {" "}
                <ScrollLink
                  activeClass="active"
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={handleCloseNavMenu}
                >
                  {item.text}{" "}
                </ScrollLink>
              </MenuItem>
            </div>
          ))}
          <MenuItem
            onClick={handleCloseNavMenu}
            component="a"
            href="https://tinyurl.com/5ecwfas7"
            target="_blank"
          >
            Resume
          </MenuItem>
        </SwipeableDrawer>

        <Stack spacing={5} direction="row">
          {pages.map((item, index) => (
            <Typography key={index} variant="body1" noWrap sx={navLinkStyle}>
              <ScrollLink to={item.to} smooth={true} offset={-100}>
                {item.text}
              </ScrollLink>
            </Typography>
          ))}

          <Typography
            variant="body1"
            noWrap
            component="a"
            href="https://tinyurl.com/5ecwfas7"
            target="_blank"
            sx={navLinkStyle}
          >
            Resume
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
```

Note: `50vw` on the `SwipeableDrawer`'s `PaperProps` is left as-is — it's a drawer panel width (a fraction of the viewport it slides in from), not a page-width overflow risk, so it's out of scope for the `100vw` fix.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false Header.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/header/Header.jsx src/component/header/Header.test.js
git commit -m "refactor: DRY up Header desktop nav, fix width and font consistency"
```

---

### Task 5: Home — width fix, theme-driven button colors

**Files:**
- Modify: `src/component/home/Home.jsx`
- Test: `src/component/home/Home.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `background.default`, `accent.main`, `accent.contrastText`, `secondary.main`.

- [ ] **Step 1: Write the failing test**

Create `src/component/home/Home.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("Home does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "Home.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("Home uses theme tokens instead of hardcoded hex for background and CTA button", () => {
  const source = fs.readFileSync(path.join(__dirname, "Home.jsx"), "utf8");
  expect(source).not.toMatch(/#F9F5E7/);
  expect(source).not.toMatch(/#765827/);
  expect(source).not.toMatch(/#C8AE7D/);
  expect(source).toMatch(/background\.default/);
  expect(source).toMatch(/accent\.main/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false Home.test.js`
Expected: FAIL (current file has `100vw`, `#F9F5E7`, `#765827`, `#C8AE7D`, and no `background.default`/`accent.main`).

- [ ] **Step 3: Write the implementation**

Replace the full contents of `src/component/home/Home.jsx`:

```jsx
import { Typography, Grid, Stack, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

function Home() {
  return (
    <Grid
      id="home"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={5} direction="column">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          HELLO, I'M
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Pacifico",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
          }}
        >
          Mary Grace Sio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Web Developer & Accounting Professional
          <br />
          <Button
            variant="contained"
            sx={{
              bgcolor: "accent.main",
              color: "accent.contrastText",
              "&:hover": {
                bgcolor: "secondary.main",
              },
              marginTop: "10px",
            }}
          >
            <ScrollLink
              to="projects"
              smooth={true}
              offset={-100} // Set your desired offset value here
            >
              Explore My Projects
            </ScrollLink>
          </Button>
        </Typography>
      </Stack>
    </Grid>
  );
}

export default Home;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false Home.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/home/Home.jsx src/component/home/Home.test.js
git commit -m "fix: Home width overflow risk, migrate colors to theme tokens"
```

---

### Task 6: About — width fix, alt section background, avatar framing, responsive spacing

**Files:**
- Modify: `src/component/about/About.jsx`
- Test: `src/component/about/About.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `background.alt`, `background.default`.

- [ ] **Step 1: Write the failing test**

Create `src/component/about/About.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("About does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "About.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("About uses the alt section background token and a responsive bottom padding", () => {
  const source = fs.readFileSync(path.join(__dirname, "About.jsx"), "utf8");
  expect(source).not.toMatch(/#F9F5E7/);
  expect(source).toMatch(/background\.alt/);
  expect(source).not.toMatch(/paddingBottom:\s*"220px"/);
});

test("About avatar has a shadow/border frame", () => {
  const source = fs.readFileSync(path.join(__dirname, "About.jsx"), "utf8");
  expect(source).toMatch(/boxShadow/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false About.test.js`
Expected: FAIL (all three assertions fail against the current file).

- [ ] **Step 3: Write the implementation**

Replace the full contents of `src/component/about/About.jsx`:

```jsx
import { Avatar, Typography, Stack, Box } from "@mui/material";

function About() {
  return (
    <Box
      id="about"
      display="flex"
      justifyContent="center"
      wrap="true"
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.alt",
        paddingBottom: { xs: 6, md: 22 },
      }}
    >
      <Stack spacing={5} direction="column" sx={{ width: "80vw" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Didact Gothic",
            fontWeight: "600",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center", // Center the text on smaller screens
          }}
        >
          About Me
        </Typography>

        <Avatar
          alt="Grace"
          src="/assets/grace.png"
          sx={{
            width: 300,
            height: 300,
            alignSelf: "center",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(101, 69, 31, 0.35)",
            border: "4px solid",
            borderColor: "background.default",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          I'm a web developer and accounting professional who enjoys working at
          the intersection of tech and finance.
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          With a background in accountancy and hands-on experience in web
          development, I bring both analytical precision and creative
          problem-solving to the projects I take on. <br />
          I've managed websites, content systems, and e-commerce platforms,
          while also handling financial records, bookkeeping, and data
          management. On the tech side, I love building with HTML, CSS,
          JavaScript, and React, and I've created projects like an interactive
          game and a finance tracker app. On the accounting side, I'm skilled in
          Excel, QuickBooks, and financial reporting, which keeps my work
          detail-oriented and well-organized. <br />
          Whether I'm coding a new feature or balancing the books, I enjoy
          finding smart, efficient solutions and making processes smoother for
          everyone.
        </Typography>
      </Stack>
    </Box>
  );
}

export default About;
```

(Only the root `Box`'s `sx` and the `Avatar`'s `sx` changed; the `Typography` copy is unchanged — the apostrophes shown above are the same curly `'` characters already in the source file, not a content edit.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false About.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/about/About.jsx src/component/about/About.test.js
git commit -m "fix: About width overflow risk, alt section background, avatar framing"
```

---

### Task 7: Skills — width fix, base section background, responsive spacing, card hover

**Files:**
- Modify: `src/component/skills/Skills.jsx`
- Test: `src/component/skills/Skills.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `background.default`.

- [ ] **Step 1: Write the failing test**

Create `src/component/skills/Skills.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("Skills does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "Skills.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("Skills uses the default section background token and a responsive bottom padding", () => {
  const source = fs.readFileSync(path.join(__dirname, "Skills.jsx"), "utf8");
  expect(source).not.toMatch(/background:\s*"#F9F5E7/);
  expect(source).toMatch(/bgcolor:\s*"background\.default"/);
  expect(source).not.toMatch(/paddingBottom:\s*"200px"/);
});

test("Other Skills cards have a hover transition", () => {
  const source = fs.readFileSync(path.join(__dirname, "Skills.jsx"), "utf8");
  expect(source).toMatch(/&:hover/);
  expect(source).toMatch(/translateY/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false Skills.test.js`
Expected: FAIL (all three assertions fail against the current file).

- [ ] **Step 3: Write the implementation**

In `src/component/skills/Skills.jsx`, change the root `Box`'s `sx` (inside the `function Skills()` return, the outer `<Box id="skills" ...>`):

```jsx
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.default",
        paddingBottom: { xs: 6, md: 20 },
      }}
```

And change the "Other Skills" `Card`'s `sx` (the one inside `otherSkills.map((skill) => (...))`):

```jsx
              <Card
                sx={{
                  flex: 1,
                  maxWidth: "90%",
                  height: "100%",
                  // margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
```

No other lines in the file change (the `images` array, the carousel, and the `otherSkills` array stay exactly as they are).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false Skills.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/skills/Skills.jsx src/component/skills/Skills.test.js
git commit -m "fix: Skills width overflow risk, responsive spacing, card hover feedback"
```

---

### Task 8: Projects — width fix, alt section background, card hover

**Files:**
- Modify: `src/component/projects/Projects.jsx`
- Test: `src/component/projects/Projects.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `background.alt`.

**Context:** This file was already modified earlier in this session to add the TripCanvas project entry — that content (the `projectList` array) must be preserved exactly as-is. Only the root `Box`'s `sx` and the `Card`'s `sx` change here.

- [ ] **Step 1: Write the failing test**

Create `src/component/projects/Projects.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("Projects does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "Projects.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("Projects uses the alt section background token", () => {
  const source = fs.readFileSync(path.join(__dirname, "Projects.jsx"), "utf8");
  expect(source).not.toMatch(/background:\s*"#F9F5E7/);
  expect(source).toMatch(/bgcolor:\s*"background\.alt"/);
});

test("Project cards have a hover transition", () => {
  const source = fs.readFileSync(path.join(__dirname, "Projects.jsx"), "utf8");
  expect(source).toMatch(/&:hover/);
  expect(source).toMatch(/translateY/);
});

test("TripCanvas project entry is preserved", () => {
  const source = fs.readFileSync(path.join(__dirname, "Projects.jsx"), "utf8");
  expect(source).toMatch(/TripCanvas/);
  expect(source).toMatch(/tripcanvas\.netlify\.app/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false Projects.test.js`
Expected: 3 of the 4 tests FAIL (the `100vw`, `background.alt`, and hover-transition assertions); the "TripCanvas project entry is preserved" test already PASSES against the current file — that's expected, it's a guard rail for the next step, not something this task needs to change.

- [ ] **Step 3: Write the implementation**

In `src/component/projects/Projects.jsx`, change the root `Box`'s `sx`:

```jsx
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.alt",
        paddingBottom: "50px",
      }}
```

And change the `Card`'s `sx` inside `projectList.map((proj) => (...))`:

```jsx
              <Card
                sx={{
                  flex: 1,
                  maxWidth: "90%",
                  height: "100%",
                  // margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
```

Do not touch the `projectList` array (including the TripCanvas entry) or anything else in the file.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false Projects.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/projects/Projects.jsx src/component/projects/Projects.test.js
git commit -m "fix: Projects width overflow risk, alt section background, card hover feedback"
```

---

### Task 9: ContactForm — width fix, on-palette submit button

**Files:**
- Modify: `src/component/contact/ContactForm.jsx`
- Test: `src/component/contact/ContactForm.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme tokens `background.default`, `accent.main`, `accent.contrastText`, `secondary.main`.

- [ ] **Step 1: Write the failing test**

Create `src/component/contact/ContactForm.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("ContactForm does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "ContactForm.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("ContactForm submit button matches the site's brown/tan palette, not the old off-palette blue/pink", () => {
  const source = fs.readFileSync(path.join(__dirname, "ContactForm.jsx"), "utf8");
  expect(source).not.toMatch(/#B8C5F9/);
  expect(source).not.toMatch(/#F5E7F9/);
  expect(source).toMatch(/accent\.main/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false ContactForm.test.js`
Expected: FAIL (current file has `100vw`, `#B8C5F9`, `#F5E7F9`, and no `accent.main`).

- [ ] **Step 3: Write the implementation**

Replace the full contents of `src/component/contact/ContactForm.jsx`:

```jsx
// src/ContactMe.js (React frontend)
import React from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";

const ContactMe = () => {
  return (
    <Box
      id="contact"
      display="flex"
      justifyContent="center"
      wrap="true"
      alignItems="center"
      sx={{
        height: "80vh", // Adjust the height for smaller screens
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={5} direction="column">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Didact Gothic",
            fontWeight: "600",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center", // Center the text on smaller screens
          }}
        >
          Contact Me
        </Typography>
        <form
          action="https://formspree.io/f/mnqkpnva"
          method="POST"
          // Replace "your-formspree-email" with your Formspree email
        >
          <Stack spacing={5} direction="column" sx={{ width: "80vw" }}>
            {" "}
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              required
              sx={{
                marginBottom: "10px",
                backgroundColor: "#F4F4F4",
              }}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              required
              sx={{ marginBottom: "10px", backgroundColor: "#F4F4F4" }}
            />
            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              required
              sx={{ marginBottom: "20px", backgroundColor: "#F4F4F4" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "200px",
                alignSelf: "center",
                bgcolor: "accent.main",
                color: "accent.contrastText",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "accent.contrastText",
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default ContactMe;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false ContactForm.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/contact/ContactForm.jsx src/component/contact/ContactForm.test.js
git commit -m "fix: ContactForm width overflow risk, on-palette submit button"
```

---

### Task 10: Footer — width fix, theme color

**Files:**
- Modify: `src/component/footer/Footer.jsx`
- Test: `src/component/footer/Footer.test.js`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2); theme token `primary.main`.

- [ ] **Step 1: Write the failing test**

Create `src/component/footer/Footer.test.js`:

```js
const fs = require("fs");
const path = require("path");

test("Footer does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "Footer.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});

test("Footer uses the primary theme token instead of hardcoded hex", () => {
  const source = fs.readFileSync(path.join(__dirname, "Footer.jsx"), "utf8");
  expect(source).not.toMatch(/#65451F/);
  expect(source).toMatch(/primary\.main/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false Footer.test.js`
Expected: FAIL (current file has `100vw` and `#65451F`, no `primary.main`).

- [ ] **Step 3: Write the implementation**

In `src/component/footer/Footer.jsx`, change the `AppBar`'s `sx`:

```jsx
    <AppBar
      position="static"
      sx={{ backgroundColor: "primary.main", width: "100%" }}
    >
```

No other lines in the file change.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false Footer.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/component/footer/Footer.jsx src/component/footer/Footer.test.js
git commit -m "fix: Footer width overflow risk, migrate color to theme token"
```

---

### Task 11: Final regression sweep and manual browser verification

**Files:**
- Test: `src/uiPolish.regression.test.js`

**Interfaces:**
- Consumes: nothing new — this is a whole-tree static check plus a manual verification pass, confirming Tasks 1–10 collectively satisfy the spec's Verification section.

- [ ] **Step 1: Write the failing test**

Create `src/uiPolish.regression.test.js`:

```js
const fs = require("fs");
const path = require("path");

function readAllSourceFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(readAllSourceFiles(fullPath));
    } else if (/\.jsx?$/.test(entry.name) && !/\.test\.js$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

test("no source file uses a scrollbar-inclusive 100vw width", () => {
  const files = readAllSourceFiles(path.join(__dirname));
  const offenders = files.filter((file) =>
    /100vw/.test(fs.readFileSync(file, "utf8"))
  );
  expect(offenders).toEqual([]);
});

test("no source file contains the old off-palette Contact button colors", () => {
  const files = readAllSourceFiles(path.join(__dirname));
  const offenders = files.filter((file) => {
    const content = fs.readFileSync(file, "utf8");
    return content.includes("#B8C5F9") || content.includes("#F5E7F9");
  });
  expect(offenders).toEqual([]);
});

test("src/App.css was removed", () => {
  expect(fs.existsSync(path.join(__dirname, "App.css"))).toBe(false);
});
```

This test file lives in `src/`, so `readAllSourceFiles(path.join(__dirname))` walks the whole `src/` tree (including itself and other `*.test.js` files, which are filtered out by the regex).

- [ ] **Step 2: Run test to verify it fails**

Run this *before* Tasks 1–10 are applied (or, if run after, temporarily re-add `width: "100vw"` to one file to confirm the test catches it — do not leave that change in place). In the normal course of executing this plan task-by-task, by the time you reach Task 11 all of Tasks 1–10 are already done, so this step is a sanity check that the test *would* fail on the old code, not a step that blocks Task 11 — if you're executing tasks in order, skip straight to Step 3 and confirm PASS.

- [ ] **Step 3: Run test to verify it passes**

Run: `npm test -- --watchAll=false uiPolish.regression.test.js`
Expected: PASS (3 tests) — this should already be true if Tasks 1–10 were completed in order.

- [ ] **Step 4: Manual browser verification**

Start the dev server (`npm start` from `react-portfolio/`) and check, in a browser:

1. Open the site at a typical desktop width (~1280px). Confirm there is no horizontal scrollbar.
2. Resize to a mobile width (375px). Confirm there is still no horizontal scrollbar, and that About/Skills sections don't have excessive empty space at the bottom.
3. At 375px, confirm the Skills "Other Skills" cards and the Projects cards each stack in a single column (the existing `xs=12` grid breakpoint) rather than being squeezed side by side.
4. Scroll from the hero through About, Skills, Projects, to Contact. Confirm the background visibly alternates (cream → deeper cream → cream → deeper cream → cream) rather than reading as one flat field.
5. Click each header nav link (About, Skills, Projects, Contact Me) — both desktop nav and, at mobile width, the hamburger drawer — confirming each scrolls to the correct section with consistent clearance from the sticky header.
6. Hover over a card in Skills' "Other Skills" grid and in Projects — confirm a lift/shadow hover effect.
7. Check the Contact section's "Send" button — confirm it's brown/tan, matching the "Explore My Projects" button in the hero, not the old blue/pink.
8. Confirm there's no near-black flash/background visible anywhere (e.g. during the mobile drawer opening/closing).

- [ ] **Step 5: Commit**

```bash
git add src/uiPolish.regression.test.js
git commit -m "test: add whole-tree regression sweep for the UI polish pass"
```

---

## Full test suite note

After Task 11, `npm test -- --watchAll=false` will show one pre-existing failure (`src/App.test.js`, see Global Constraints) alongside all-passing new/modified tests (`theme.test.js`, `index.test.js`, `App.width.test.js`, `Header.test.js`, `Home.test.js`, `About.test.js`, `Skills.test.js`, `Projects.test.js`, `ContactForm.test.js`, `Footer.test.js`, `uiPolish.regression.test.js`). That one failure is expected and out of scope — do not attempt to fix it as part of this plan.
