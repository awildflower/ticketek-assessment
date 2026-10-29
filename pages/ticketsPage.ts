import { Locator, type Page } from '@playwright/test';

export class TicketsPage {
    private readonly page: Page;
    private readonly admitIncrementButton: Locator;
    private readonly mobileDeliveryRadio: Locator;
    private readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.admitIncrementButton = page.getByRole('button', { name: 'Increase quantity' }).first()
        this.mobileDeliveryRadio = page.locator('#delType_S');
        this.nextButton = page.locator('#ticket-selection-page-next-button');
    }

    // re-usable function to select ticket of different prices
    async selectTicketByPrice(price: string): Promise<void> {
        const priceRegex: RegExp = new RegExp(`, \\$${price}\$`);
        const ticketByPriceSelectButton: Locator = this.page.getByRole('button', { name: priceRegex });

        await ticketByPriceSelectButton.click();
    }

    async addAdmitTicket(): Promise<void> {
        await this.admitIncrementButton.click();
    }

    async checkMobileDeliveryOption(): Promise<void> {
        await this.page.locator('.show-afterpay-ad').scrollIntoViewIfNeeded();
        await this.mobileDeliveryRadio.setChecked(true, { force: true })
    }

    async clickNextButton(): Promise<void> {
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.nextButton.click();
    }

}