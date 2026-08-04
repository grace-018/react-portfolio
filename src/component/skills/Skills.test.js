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
