const fs = require("fs");
const path = require("path");

test("App root does not use a scrollbar-inclusive 100vw width", () => {
  const source = fs.readFileSync(path.join(__dirname, "App.jsx"), "utf8");
  expect(source).not.toMatch(/100vw/);
});
