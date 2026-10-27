import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

// Reads the installed zod version from node_modules so the check works
// regardless of which zod major is installed.
const here = dirname(fileURLToPath(import.meta.url));
const zodVersion = (JSON.parse(
  readFileSync(join(here, "../node_modules/zod/package.json"), "utf8"),
) as { version: string }).version;

describe("zod dependency pinned to patched version", () => {
  test("zod resolves to 4.6.6 or newer (GHSA-mrhx-c7xc-m3w5)", () => {
    const [major, minor, patch] = zodVersion.split(".").map(Number);
    expect(major).toBeGreaterThanOrEqual(4);
    if (major === 4) {
      expect(minor).toBeGreaterThanOrEqual(6);
      if (minor === 6) {
        expect(patch).toBeGreaterThanOrEqual(6);
      }
    }
  });
});
