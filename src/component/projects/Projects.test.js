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
