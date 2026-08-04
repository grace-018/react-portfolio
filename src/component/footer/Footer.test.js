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
