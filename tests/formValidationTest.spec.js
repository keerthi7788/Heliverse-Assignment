import { test,expect ,chromium} from '@playwright/test';
import { Console, error } from 'console';


test("Validate by entering valid name, password, email, country",async()=>{
  // Launch the browser and create a new context with video recording
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Directory to save videos
      size: { width: 1280, height: 720 }, // Video size
    },
  });

  const page = await context.newPage();

   await page.goto("https://formsmarts.com/form/mfe?mode=h5");

  await page.getByLabel("First Name: ").fill("John");
  await page.getByLabel("Last Name: ").fill("Doe");
  await page.getByLabel("Email Address: ").fill("jdoe@gmail.com");
  await page.getByLabel("Country:").selectOption("United Kingdom");
  await page
    .getByLabel("6-Month Subscription Save $7.94 ($52 USD/6 Months)")
    .setChecked(true);
  await page
    .getByLabel("Claim a FREE 7-day Trial Subscription ($0 USD/7 Days)")
    .setChecked(true);

  await page.getByText("Continue").click();

  await page.screenshot({ path: "successfull-fomsubmission.png" });
 
});


  // Validate by entering invalid name, password, email, country and capture the error messages
test("Validate country and capture the error messages", async ({ page }) => {
  // Navigate to the form page
  await page.goto("https://formsmarts.com/form/mfe?mode=h5");

  // Fill out form with invalid details
  await page.locator("#u_xNa_127979").fill("J#rfed"); // Invalid first name
  await page.locator("#u_xNa_127980").fill("@Doe"); // Invalid last name
  await page.locator("#u_xNa_127981").fill("jdoe"); // Invalid email format
  await page.getByLabel("Country:").selectOption("United Kingdom");

  // Select some checkbox options
  await page
      .getByLabel("6-Month Subscription Save $7.94 ($52 USD/6 Months)")
      .setChecked(true);
  await page
      .getByLabel("Claim a FREE 7-day Trial Subscription ($0 USD/7 Days)")
      .setChecked(true);

  // Submit the form
  await page.getByText("Continue").click();
  const emailErrorMessage = page.locator("//div[@class='errmsg' and contains(text(), 'Email address, like alice@example.com.')]"); // Update selector for email error
  await expect(emailErrorMessage).toBeVisible();
  await expect(emailErrorMessage).toHaveText('Email address, like alice@example.com.');
  console.log("Error messages captured successfully")

// Capture a screenshot of the result
  await page.screenshot({ path: "error-capturedForInvalidLogin.png" }); // Ensure the file extension is included
});
