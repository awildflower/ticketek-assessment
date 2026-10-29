import { test, expect } from '@playwright/test';
import { ShowPage } from '../pages/showPage';
import { TicketsPage } from '../pages/ticketsPage';
import { SeatmapPage } from '../pages/seatmapPage';

test('Select a free ticket and checkout', async ({ page }) => {
  const showPage = new ShowPage(page);
  const ticketsPage = new TicketsPage(page);
  const seatmapPage = new SeatmapPage(page);

  await showPage.goto();
  await showPage.dismissCookiePrivacyPrompt();
  await showPage.selectDateByIndex(3);
  await showPage.clickFindTicketsButton();

  await ticketsPage.selectTicketByPrice('0.00');
  await ticketsPage.addAdmitTicket();
  await ticketsPage.checkMobileDeliveryOption()
  await ticketsPage.clickNextButton();

  await seatmapPage.clickGoToCheckoutButton();
  await page.waitForTimeout(5000);
});