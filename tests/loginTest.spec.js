
import { test,expect,chromium } from '@playwright/test';
import { loginurl } from './constants';
import { invalidLogin,validLogin } from './utils';


// Login Test:Validate login with valid credentials.
// Redirect to betadashboard logoin URL
test("verify the login page URL", async () => {
  // Launch the browser and create a new context with video recording
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Directory to save videos
      size: { width: 1280, height: 720 }, // Video size
    },
  });

  const page = await context.newPage();

  // Navigating to the login URL (either through a utility function or page.goto)
  await page.goto(loginurl.BASE_URL);
  
    //  expect to have the mentioned title on the application.
    await expect(page).toHaveTitle("Online Shopping India | Buy Mobiles, Electronics, Appliances, Clothing and More Online at Flipkart.com")
  
  // Verify the page URL matches the expected login URL
  await expect(page).toHaveURL("https://www.flipkart.com/account/login");
  await page.screenshot({ path: "successfull-urlRedirection.png" });
});


// Valid credentials
test("verify by giving valid credentials", async ({ page }) => {
  // Perform login with valid credentials
  await validLogin(page);

  // Wait for OTP prompt to appear
  await page.waitForSelector('text="Please enter the OTP sent to"', { timeout: 10000 });

  // Validate that the OTP prompt is visible
  await expect(page.getByText("Please enter the OTP sent to")).toBeVisible();
  await page.screenshot({ path: "successfull-login.png" });
});


  
// LoginTest:Validate that appropriate error messages are shown for invalid credentials.

  // clik on login by providing invalid username and password.
  test("verify by passing invalid credentials", async ({ page }) => {
    // Perform invalid login
    await invalidLogin(page);

    // Wait for the error message to appear
    await page.waitForSelector('text="Looks like you\'re new here!"', { timeout: 5000 });

    // Validate that the error message is visible
    await expect(page.locator('text="Looks like you\'re new here!"')).toBeVisible();

    console.log("Successfully captured error messages for invalid username and password");
    await page.screenshot({ path: "invalid-sinceNewLogin.png" });
});


