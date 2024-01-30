import { test, expect, request } from '@playwright/test';

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
      await page.locator('input[placeholder="Usuario o correo electrónico"]').fill(userEmail);
      await page.locator('input[placeholder="Contraseña"]').fill(userPassword);
      await page.locator(':text-is("Autenticar")').click();
    });

    await test.step('check user is navigated to dashboard page', async () => {
      await page.waitForTimeout(1000);
      await expect(page.locator('.navbar-brand')).toBeInViewport();
      await page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard');
      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('navigate to category page', async () => {
      await page.locator(':text-is(" Tipos de Categorias ")').click()
      await page.waitForURL('https://club-administration.qa.qubika.com/#/category-type');
      await expect(page).toHaveURL(/category-type/);
      await expect(page.locator(':text-is("Tipos de categorías")')).toBeInViewport();
    });

    await test.step('create a new category', async () => {
      await page.locator(':text-is("Adicionar")').click()
      await expect(page.locator(':text-is("Adicionar tipo de categoría")')).toBeInViewport();
      await page.locator('input[placeholder="Nombre de categoría"]').fill("Test Category");
      await page.locator(':text-is("Aceptar")').click()
      await expect(page.locator('#toast-container')).toBeInViewport();
      await expect(page.locator('#toast-container')).toHaveText("Tipo de categoría adicionada satisfactoriamente");
    });

    await test.step('check Test Category was created', async () => {
      await page.locator('.card-footer ul li:nth-last-child(2)').click()
      await expect(page.locator('tbody tr:last-child td:first-child')).toHaveText("Test Category");
      await expect(page.locator('tbody tr:last-child td:nth-last-child(2)')).toBeEmpty();
    });

    await test.step('create sub category', async () => {
      await page.locator(':text-is("Adicionar")').click()
      await expect(page.locator(':text-is("Adicionar tipo de categoría")')).toBeInViewport();
      await page.locator('input[placeholder="Nombre de categoría"]').fill("Child Test Category");
      await page.getByRole('checkbox', {name: "Es subcategoria?"}).click({force: true})
      await page.locator('.ng-arrow-wrapper:last-child').click();
      await page.getByLabel('Options list').locator('div').filter({ hasText: 'Test Category' }).last().click()
      await page.locator(':text-is("Aceptar")').click()
      await expect(page.locator('#toast-container')).toBeInViewport();
      await expect(page.locator('#toast-container')).toHaveText("Tipo de categoría adicionada satisfactoriamente");
    });

    await test.step('check Child Test Category was created', async () => {
      await page.locator('.card-footer ul li:nth-last-child(2)').click()
      await expect(page.locator('tbody tr:last-child td:first-child')).toHaveText("Child Test Category");
      await expect(page.locator('tbody tr:last-child td:nth-last-child(2)')).toHaveText("Test Category");
    });

  });
});
