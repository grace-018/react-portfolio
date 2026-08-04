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
