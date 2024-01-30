import {Page, expect, Locator} from "@playwright/test";

export class NavigationPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly authenticateButton: Locator
    readonly categoryButton: Locator
    readonly categoryTitle: Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('input[placeholder="Usuario o correo electrónico"]')
        this.passwordInput = page.locator('input[placeholder="Contraseña"]')
        this.authenticateButton = page.locator(':text-is("Autenticar")')
        this.categoryButton = page.locator(':text-is(" Tipos de Categorias ")')
        this.categoryTitle = page.locator(':text-is("Tipos de categorías")')
    }

    async userLogin(userEmail, userPassword){
        await this.emailInput.fill(userEmail);
        await this.passwordInput.fill(userPassword);
        await this.authenticateButton.click();
    }

    async categoryPage(){
        await this.categoryButton.click()
        await this.page.waitForURL('https://club-administration.qa.qubika.com/#/category-type');
        await expect(this.page).toHaveURL(/category-type/);
        await expect(this.categoryTitle).toBeInViewport();
    }
}