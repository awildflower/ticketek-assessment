import { Locator, type Page } from '@playwright/test';

export class ViewBasketPage {
    private readonly page: Page;
    private readonly paymentContent: Locator;
    private readonly marketingCommsCheckbox: Locator;
    private readonly venueTCCheckbox: Locator;
    private readonly showTCCheckbox: Locator
    private readonly submitPaymentButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentContent = page.locator('.payment-content');
        this.marketingCommsCheckbox = page.locator('#ctl00_uiContent_uiClientOptInCheckBox_checkBox');
        this.venueTCCheckbox = page.locator('#ctl00_uiContent_uiShowConditions_uiConditions_ctl00_uiAgree');
        this.showTCCheckbox = page.locator('#ctl00_uiContent_uiShowConditions_uiConditions_ctl01_uiAgree');
        this.submitPaymentButton = page.locator('#ctl00_uiContent_uiPurchaseSubmit');
    }

    async isViewBasketPageLoaded(): Promise<boolean> {
        return await this.paymentContent.isVisible();
    }


    async setMarketingCommsCheckbox(checkStatus: boolean): Promise<void> {
        await this.showTCCheckbox.scrollIntoViewIfNeeded();
        await this.marketingCommsCheckbox.setChecked(checkStatus, { force: true });
    }

    async setVenueTCCheckbox(checkStatus: boolean): Promise<void> {
        await this.venueTCCheckbox.setChecked(checkStatus, { force: true });
    }

    async setShowTCCheckbox(checkStatus: boolean): Promise<void> {
        await this.showTCCheckbox.setChecked(checkStatus, { force: true });
    }

    async clickPaymentSubmitButton(): Promise<void> {
        await this.submitPaymentButton.scrollIntoViewIfNeeded();
        await this.submitPaymentButton.click();
    }

}