import {Page, expect, Locator} from "@playwright/test";

export class CategoryPage {
    readonly page: Page
    readonly addButton: Locator
    readonly addCategoryTitle: Locator
    readonly categoryName: Locator
    readonly acceptButton: Locator
    readonly toast: Locator
    readonly footerPage: Locator
    readonly nameColumn: Locator
    readonly parentCategoryColumn: Locator
    readonly subCategoryCheckbox: Locator
    readonly dropdownArrow: Locator
    readonly categoryList: Locator

    constructor(page: Page){
        this.page = page
        this.addButton = page.locator(':text-is("Adicionar")')
        this.addCategoryTitle = page.locator(':text-is("Adicionar tipo de categoría")')
        this.categoryName = page.locator('input[placeholder="Nombre de categoría"]')
        this.acceptButton = page.locator(':text-is("Aceptar")')
        this.toast = page.locator('#toast-container')
        this.footerPage = page.locator('.card-footer ul li:nth-last-child(2)')
        this.nameColumn = page.locator('tbody tr:last-child td:first-child')
        this.parentCategoryColumn = page.locator('tbody tr:last-child td:nth-last-child(2)')
        this.subCategoryCheckbox = page.getByRole('checkbox', {name: "Es subcategoria?"})
        this.dropdownArrow = page.locator('.ng-arrow-wrapper:last-child')
        this.categoryList = page.getByLabel('Options list').locator('div').filter({ hasText: 'Test Category' })
    }

    async createCategory(){
        await this.addButton.click();
        await expect(this.addCategoryTitle).toBeInViewport();
        await this.categoryName.fill("Test Category");
        await this.acceptButton.click();
        await expect(this.toast).toBeInViewport();
        await expect(this.toast).toHaveText("Tipo de categoría adicionada satisfactoriamente");
    }

    async validateCategory(){
        await this.footerPage.click();
        await expect(this.nameColumn).toHaveText("Test Category");
        await expect(this.parentCategoryColumn).toBeEmpty();
    }

    async createSubCategory(){
        await this.addButton.click()
        await expect(this.addCategoryTitle).toBeInViewport();
        await this.categoryName.fill("Child Test Category");
        await this.subCategoryCheckbox.click({force: true});
        await this.dropdownArrow.click();
        await this.categoryList.last().click();
        await this.acceptButton.click();
        await expect(this.toast).toBeInViewport();
        await expect(this.toast).toHaveText("Tipo de categoría adicionada satisfactoriamente");
    }

    async validateSubCategory(){
        await this.page.waitForTimeout(1000);
        await this.footerPage.click();
        await expect(this.nameColumn).toHaveText("Child Test Category");
        await expect(this.parentCategoryColumn).toHaveText("Test Category");
    }
}