import { expect, Locator, type Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly signInTitle: Locator
    private readonly emailAddressField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInTitle = page.locator('#myTick2Col');
        this.emailAddressField = page.getByRole('textbox', { name: 'Email*' });
        this.passwordField = page.getByRole('textbox', { name: 'Password*' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async isSignInPageLoaded(): Promise<boolean> {
        return await this.signInTitle.isVisible();
    }

    async enterEmailAddress(email: string): Promise<void> {
        await this.emailAddressField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
}