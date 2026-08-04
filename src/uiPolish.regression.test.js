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
