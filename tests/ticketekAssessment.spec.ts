import { test, expect } from '@playwright/test';
import { ShowPage } from '../pages/showPage';
import { TicketsPage } from '../pages/ticketsPage';
import { SeatmapPage } from '../pages/seatmapPage';
import { LoginPage } from '../pages/loginPage';
import { ViewBasketPage } from '../pages/viewBasketPage';
import { ConfirmPage } from '../pages/confirmPage';

test('Select a free ticket and checkout', async ({ page }) => {
  const showPage = new ShowPage(page);
  const ticketsPage = new TicketsPage(page);
  const seatmapPage = new SeatmapPage(page);
  const loginPage = new LoginPage(page);
  const viewBasketPage = new ViewBasketPage(page);
  const confirmPage = new ConfirmPage(page);

  const emailAddress: string = process.env.TEST_USERNAME!;
  const password: string = process.env.TEST_PASSWORD!;
  const storageStateFilePath = 'auth/storageState.json';

  await showPage.goto();
  await showPage.dismissCookiePrivacyPrompt();
  await showPage.selectDateByIndex(3);
  await showPage.clickFindTicketsButton();

  await ticketsPage.selectTicketByPrice('0.00');
  await ticketsPage.addAdmitTicket();
  await ticketsPage.checkMobileDeliveryOption()
  await ticketsPage.clickNextButton();

  await seatmapPage.clickGoToCheckoutButton();

  if (await loginPage.isSignInPageLoaded()) {

    await loginPage.enterEmailAddress(emailAddress);
    await loginPage.enterPassword(password);
    await loginPage.clickSignInButton();

    if (await viewBasketPage.isViewBasketPageLoaded()) {
      await page.context().storageState({
        path: storageStateFilePath
      });
    }
  }

  await viewBasketPage.setMarketingCommsCheckbox(false);
  await viewBasketPage.setVenueTCCheckbox(true);
  await viewBasketPage.setShowTCCheckbox(true);
  await viewBasketPage.clickPaymentSubmitButton();

  await expect(confirmPage.getOrderConfirmation()).toHaveText('Order Confirmed');

});