import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/services",
  "/about",
  "/gallery",
  "/quote",
  "/contact",
  "/privacy",
  "/missing-page",
];
for (const width of [390, 768, 1440]) {
  test(`routes, responsive layout, accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("header")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}
test("all internal links resolve to a known page", async ({ page }) => {
  for (const route of routes.slice(0, -1)) {
    await page.goto(route);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((a) => a.map((x) => new URL(x.href).pathname));
    for (const path of links) expect(routes).toContain(path);
  }
});
test("navigation, mobile menu, keyboard skip link and FAQ", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/services/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  await page.goto("/");
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await summary.click();
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});
test("calculator arithmetic and form simulation make no requests", async ({
  page,
}) => {
  await page.goto("/quote");
  await expect(page.locator("output")).toContainText("$200");
  await page.getByLabel("Inside oven").check();
  await expect(page.locator("output")).toContainText("$235");
  await page.getByRole("radio", { name: /^Every week/ }).check();
  await expect(page.locator("output")).toContainText("$200");
  await page.getByLabel("1. Choose a sample service").selectOption("deep");
  await expect(page.locator("output")).toContainText("$276");
  const requests = [];
  page.on("request", (r) => {
    if (["fetch", "xhr"].includes(r.resourceType()) || r.method() === "POST")
      requests.push(r.url());
  });
  await page.getByRole("button", { name: "Simulate quote request" }).click();
  await expect(page.getByRole("alert")).toContainText("Choose a sample");
  await page.locator('select[name="scenario"]').selectOption("home");
  await page.locator('select[name="topic"]').selectOption({ index: 1 });
  await page.getByRole("checkbox", { name: /I understand/ }).check();
  await page.getByRole("button", { name: "Simulate quote request" }).click();
  await expect(
    page.getByRole("button", { name: "Simulating…" }),
  ).toBeDisabled();
  await expect(page.locator(".form-success[role='status']")).toContainText("No request was sent");
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.getByRole("button", { name: "Try another scenario" }).click();
  await expect(page.locator('select[name="scenario"]')).toHaveValue("");
});
test("contact demo validates and completes", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Simulate message" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.locator('select[name="scenario"]').selectOption("office");
  await page.locator('select[name="topic"]').selectOption({ index: 1 });
  await page.getByRole("checkbox", { name: /I understand/ }).check();
  await page.getByRole("button", { name: "Simulate message" }).click();
  await expect(page.getByRole("status")).toContainText("No request was sent");
});
test("gallery filters and modal keyboard behaviour", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.locator(".gallery-item")).toHaveCount(6);
  await page.getByRole("button", { name: "Kitchens", exact: true }).click();
  await expect(page.locator(".gallery-item")).toHaveCount(1);
  await page.getByRole("button", { name: "Enlarge A fresh start" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close photograph" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Enlarge A fresh start" }),
  ).toBeFocused();
});
test("photographs load and capture representative layouts", async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.locator(".hero-visual img").evaluate((img) => img.decode());
    await expect(page.locator(".hero-visual img")).toBeVisible();
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((image) => image.decode());
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.goto("/gallery");
  for (const img of await page.locator(".gallery-item img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((image) => image.decode());
  }
});
