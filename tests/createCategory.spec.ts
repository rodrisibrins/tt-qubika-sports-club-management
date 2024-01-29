import { test, expect, request } from '@playwright/test';

let randomEmail : string;
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

function generateRandomEmail(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';
  const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  for (let i = 0; i < length; i++) {
      email += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  email += '.qubika@qubika.com';

  return email;
}

test.describe('create new user through API', () => {
  test.beforeAll(async ({ }) => {
    randomEmail = generateRandomEmail();
  });

  test('post new user data', async ({ page, request }) => {
    const response = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
      data: {
        "email": `${randomEmail}`,
        "password": "12345678",
        "roles": [
            "ROLE_ADMIN"
        ]
    }
    })
    const responseBody = await response.json()
    console.log(responseBody)
  });

});