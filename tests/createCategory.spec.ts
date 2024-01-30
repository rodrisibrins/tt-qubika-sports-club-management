import { test, expect, request } from '@playwright/test';
import {NavigationPage} from '../page-objects/navigationPage'
import {CategoryPage} from '../page-objects/categoryPage'


let randomEmail : string;

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

test.describe('create new user through API & create new category', () => {
  test.beforeAll(async ({ }) => {
    randomEmail = generateRandomEmail();
  });

  test('post new user data', async ({ page, request }) => {
    const navigateTo = new NavigationPage(page)
    const categoryPage = new CategoryPage(page)


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
    const userEmail = responseBody.email
    const userPassword = "12345678"

    console.log("User email:", userEmail)


    await test.step('navigate to qubika club website', async () => {
      await page.goto('https://club-administration.qa.qubika.com/#/auth/login');
      await expect(page).toHaveURL(/login/);
      await expect(page).toHaveTitle(/Qubika Club/);
      await expect(page.locator('small')).toHaveText('Por favor ingrese correo y contraseña');
      await expect(page.locator('.ni-lock-circle-open')).toBeInViewport();
      await expect(page.locator('.ni-email-83')).toBeInViewport();
    });

    await test.step('login with the new user', async () => {
      await navigateTo.userLogin(userEmail, userPassword);
    });

    await test.step('check user is navigated to dashboard page', async () => {
      await page.waitForTimeout(1000);
      await expect(page.locator('.navbar-brand')).toBeInViewport();
      await page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard');
      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('navigate to category page', async () => {
      await navigateTo.categoryPage();
    });

    await test.step('create a new category', async () => {
      await categoryPage.createCategory();
    });

    await test.step('check Test Category was created', async () => {
      await categoryPage.validateCategory();
    });

    await test.step('create sub category', async () => {
      await categoryPage.createSubCategory();
    });

    await test.step('check Child Test Category was created', async () => {
      await categoryPage.validateSubCategory();
    });

  });
});
