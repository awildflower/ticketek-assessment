1. Installation

Prerequisite: Install NPM
https://nodejs.org/en/download

Step 1: Clone the repository
git clone https://github.com/awildflower/ticketek-assessment.git

Step 2: Navigate to the project directory

Step 3: Install dependencies
npm install

Step 4: Install Playwright browser with dependencies
npx playwright install --with-deps

2. Environment Variable Configuration (see https://www.npmjs.com/package/dotenv)

Before running the test, please go to /.env file and enter your own email and password

eg:
TEST_USERNAME='your@email'
TEST_PASSWORD='yourPassword'

Note: Best practice is to include this file in /gitignore but for visibility sake, I have pushed this to the repo for you

3. Test Run Execution

Headless mode (default)
​​npx playwright test tests/ticketekAssessment.spec.ts

Headed mode
npx playwright test tests/ticketekAssessment.spec.ts --headed

UI mode
If you prefer UI interaction, simply go to the “Testing” tab from the Primary side bar in VS Code, enable “Show browser” or “Show trace viewer” and run the test.

4. Architecture Defense

Overview
For this assessment, I prioritise simplicity and easy reading. A few implementation choices may not be the “best practice” in the real job and on a much bigger scope of work. However I believe this serves the purpose better.
Page Object Model (POM) is used to keep the tests clean and page objects methods can be reusable in multiple test classes.
As a QA, I believe in writing tests that read like a test case and avoid sophisticated coding logic / algorithms so engineers of different technical levels can easily read / follow and make contributions.  I also believe Test Automation serves as a Live documentation of the product and be the real source of truth for the business. (eg: No really updates nor read the mundane product requirement on confluence in reality)

Locator strategy
Playwright recommends built-in locator methods such as getByRole() etc, I often prefer using CSS locator (such as element IDs, classnames) whenever applicable, the main reason is to avoid relying on copy texts which can often change as requirements change which make the tests fragile.
XPaths although is frowned upon, I personally would still use it where the occasion fits.
In the selectTicketByPrice() method, I am setting the locator dynamically based on price value (assessment task has asked for zero valued ticket). I decided to make this method reusable as I can see the value of having 1 method that can pick any ticket based on different price values.

Authentication Setup
Using Playwright’s storage state feature to re-use previous logged in sessions, I am including this within the test itself as the assessment has asked for an E2E test case where users may or may not have an existing logged in session.
It is probably to have a separated file / method to manage authentication flows in a real Automation suite.