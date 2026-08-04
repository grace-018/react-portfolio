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
