import { Locator, type Page } from '@playwright/test';

export class ConfirmPage {
    private readonly page: Page;
    private readonly orderConfirmHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmHeader = page.locator('.part-payment-header');
    }

    getOrderConfirmation(): Locator {
        return this.orderConfirmHeader;
    }
}