import { Locator, type Page } from '@playwright/test';

export class ShowPage {
  private readonly page: Page;
  private readonly cookiePolicyButton: Locator;
  private readonly closeCookiePromptButton: Locator;
  private readonly fairAccessInfoSection: Locator;
  private readonly dateSelectionDropdown: Locator;
  private readonly findTicketsButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cookiePolicyButton = page.getByRole('link', { name: 'Cookie Policy' });
    this.closeCookiePromptButton = page.getByRole('button', { name: 'Close' });
    this.fairAccessInfoSection = page.getByRole('button', { name: /Fair access/i });
    this.dateSelectionDropdown = page.locator('[id="p"]')
    this.findTicketsButton = page.locator('[id="buyButton"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/shows/show.aspx?sh=ESPLOAD', { waitUntil: 'load' });
  }

  async dismissCookiePrivacyPrompt(): Promise<void> {
    // Make sure the prompt appears before closing
    if (await this.cookiePolicyButton.isVisible())
      await this.closeCookiePromptButton.click();
  }

  // reusable function to select date by index
  async selectDateByIndex(index: number): Promise<void> {
    await this.fairAccessInfoSection.scrollIntoViewIfNeeded();
    await this.dateSelectionDropdown.selectOption({ index: index });
  }

  async clickFindTicketsButton(): Promise<void> {
    await this.findTicketsButton.click();
  }

}