import { waitFor } from "@testing-library/react";

test("mounts into #root under a ThemeProvider without crashing", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await expect(import("./index.js")).resolves.not.toThrow();
  const root = document.getElementById("root");
  await waitFor(() => expect(root.children.length).toBeGreaterThan(0));
});

test(":root background is the site's cream, not the CRA-default near-black", () => {
  const fs = require("fs");
  const source = fs.readFileSync(require.resolve("./index.css"), "utf8");
  expect(source).not.toMatch(/#272829/);
  expect(source).toMatch(/#F9F5E7/);
});
