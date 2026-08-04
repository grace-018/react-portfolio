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
