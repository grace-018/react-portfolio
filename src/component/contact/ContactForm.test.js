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
