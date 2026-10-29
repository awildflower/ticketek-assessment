import { expect, Locator, type Page } from '@playwright/test';

export class SeatmapPage {
    private readonly page: Page;
    private readonly goToCheckoutButton;

    constructor(page: Page) {
        this.page = page;
        this.goToCheckoutButton = page.locator('#goToPaymentButton');
    }

    async clickGoToCheckoutButton(): Promise<void> {
        await this.goToCheckoutButton.scrollIntoViewIfNeeded();
        await this.goToCheckoutButton.click({ force: true });
    }


}