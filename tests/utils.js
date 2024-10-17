// utils.js

import { validUserDetails,invalidUserDetails, loginurl } from './constants';

// valid login
export async function validLogin(page) {
  try {
    // Navigate to the login page using the URL from constants.js
    await page.goto(loginurl.BASE_URL);

    // Wait for the page content to load
    await page.waitForLoadState("domcontentloaded");

    // Fill in the email field (placeholder for username)
    await page.locator("//input[@class='r4vIwl BV+Dqf']").fill(validUserDetails.phoneNumber);

    // Click the login button
    await page.getByRole("button", { name: "Request OTP" }).click();
    
console.log("Login successful!");
  } catch (error) {
    console.error("Error occurred during login:", error);
  }
}

// invalid login
export async function invalidLogin(page) {
  try {
    // Navigate to the login page using the URL from constants.js
    await page.goto(loginurl.BASE_URL);

    // Wait for the page content to load
    await page.waitForLoadState("domcontentloaded");

    // Fill in the email field (placeholder for username)
    await page.locator("//input[@class='r4vIwl BV+Dqf']").fill(invalidUserDetails.email);
    // Click the login button
    await page.getByRole("button", { name: "Request OTP" }).click();
    
console.log("Login successful!");
  } catch (error) {
    console.error("Error occurred during login:", error);
  }
}