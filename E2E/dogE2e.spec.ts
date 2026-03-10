import { test, expect } from "@playwright/test";

// Test 3: Positive e2e test
test("dog image loads when page loads", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );

  await page.goto("/");
  await responsePromise;
  const dogImage = page.locator("img");
  const src = await dogImage.getAttribute("src");
  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

// Test 4: Positive e2e test
test("dog image loads after button click", async ({ page }) => {
  await page.goto("/");
  await page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200,
  );
  await page.click("button");
  await responsePromise;
  const dogImage = page.locator("img");
  const src = await dogImage.getAttribute("src");
  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

// Test 5: Negative e2e test
test("shows error message when API call fails", async ({ page }) => {
  await page.route("**/api/dogs/random", (route) => route.abort());
  await page.goto("/");
  const errorElement = page.getByText(/error/i);
  await expect(errorElement).toBeVisible();
});
