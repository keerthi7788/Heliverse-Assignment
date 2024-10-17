
import { test,expect,chromium } from '@playwright/test';

test('User searches for a product, adds it to the cart, and proceeds to checkout', async () => {

  // Launch the browser and create a new context with video recording
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Directory to save videos
      size: { width: 1280, height: 720 }, // Video size
    },
  });

  const page = await context.newPage();

  //  Navigate to the Flipkart homepage
  await page.goto('https://www.flipkart.com/');
  //  Search for a product (e.g., "REDMI")
  await page.getByPlaceholder('Search for products, brands and more').click();
  await page.getByPlaceholder('Search for products, brands and more').fill('REDMI');
  await page.getByPlaceholder('Search for products, brands and more').press('Enter');

  //  Wait for search results and click on the product
  const [productPage] = await Promise.all([
    context.waitForEvent('page'), // Wait for new tab to open
    page.click('a:has-text("REDMI 12 (Moonstone Silver, 128 GB)")'), // Click the product link
  ]);

  //  Ensure the product page is fully loaded
  await productPage.waitForLoadState('networkidle');

  // Click on 'Add to Cart' button
  await productPage.getByRole('button', { name: 'Add to cart' }).click();

  // Navigate to the cart page and validate that the product is added
  await productPage.goto('https://www.flipkart.com/viewcart?exploreMode=true');
  const cartItem = productPage.locator('a:has-text("REDMI 12 (Moonstone Silver, 128 GB)")');
  await expect(cartItem).toBeVisible(); // Validate that the product is in the cart

  // Click 'Place Order' and validate checkout page
  const placeOrderButton = productPage.getByRole('button', { name: 'Place Order' });
  await expect(placeOrderButton).toBeVisible(); // Validate the button is visible
  await placeOrderButton.click();

  //  Validate that the user is taken to the checkout page
  await expect(productPage).toHaveURL(/.*checkout/); // Ensure the URL contains 'checkout'
  console.log('Checkout page successfully reached');
  await page.screenshot({ path: "checkout.png" });
});
