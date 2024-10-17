

import { test, expect, chromium } from '@playwright/test';

// UI Test: Automate a test to verify the presence of key UI elements on the homepage.
// Ensure elements like the search bar, navigation menu, and footer are correctly displayed and functional.

test('Verify key Ulements on the Flipkart homepage', async () => {
  // Launch the browser and create a new context with video recording
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Directory to save videos
      size: { width: 1280, height: 720 }, // Video size
    },
  });

  const page = await context.newPage();

  // Navigate to the Flipkart homepage
  await page.goto('https://www.flipkart.com/account/login');

  // Validate that the search bar is visible
  const searchBar = page.getByPlaceholder('Search for products, brands and more');
  await expect(searchBar).toBeVisible(); // Check if the search bar is visible

  // Validate that the navigation menu is visible
  const navMenu = page.locator('div.bpjkJb'); // Using a class selector for the navigation menu
  await expect(navMenu).toBeVisible(); // Check if the navigation menu is visible

  // Validate that the footer is visible
  const footer = page.locator('footer'); // Check if the footer is visible
  await expect(footer).toBeVisible();

  // Validate the "Electronics" link visibility and hover action
  const electronicsLink = page.locator('span.TSD49J:has-text("Electronics")'); // Using has-text for better specificity
  await expect(electronicsLink).toBeVisible(); // Ensure the link is visible
  await electronicsLink.hover(); // Perform mouse-over action

  // Click on the "Mobiles" link
  await page.getByRole('link', { name: 'Mobiles►' }).click(); // Wait for the page to load
  await page.waitForLoadState('networkidle'); // Ensure the network is idle
  
  // Validate the URL after clicking
  await expect(page).toHaveURL(/mobile-phones-store/); // Check if the page navigates correctly

  console.log('UI elements verified: Search bar, Navigation menu, Footer, Electronics link');

  // Close context to save video
  await context.close(); 
  await browser.close(); // Close browser
});
