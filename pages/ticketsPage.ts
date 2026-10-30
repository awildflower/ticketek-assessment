import { Locator, type Page } from '@playwright/test';

export class TicketsPage {
    private readonly page: Page;
    private readonly admitIncrementButton: Locator;
    private readonly mobileDeliveryRadio: Locator;
    private readonly showAfterpayAdSection: Locator;
    private readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.admitIncrementButton = page.getByRole('button', { name: 'Increase quantity' }).first()
        this.mobileDeliveryRadio = page.locator('#delType_S');
        this.showAfterpayAdSection = page.locator('.show-afterpay-ad');
        this.nextButton = page.locator('#ticket-selection-page-next-button');
    }

    // re-usable function to select ticket of different prices
    async selectTicketByPrice(price: string): Promise<void> {
        const priceRegex = new RegExp(`, \\$${price}\$`);
        const ticketByPriceSelectButton = this.page.getByRole('button', { name: priceRegex });

        await ticketByPriceSelectButton.click();
    }

    async addAdmitTicket(): Promise<void> {
        await this.admitIncrementButton.click();
    }

    async checkMobileDeliveryOption(): Promise<void> {
        await this.mobileDeliveryRadio.setChecked(true, { force: true })
    }

    async clickNextButton(): Promise<void> {
        await this.nextButton.click();
        await this.page.waitForURL('**\/seatmap', { waitUntil: 'load'});
    }

}