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
