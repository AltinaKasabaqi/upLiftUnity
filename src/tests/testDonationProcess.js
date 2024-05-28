const { Builder, By, until } = require('selenium-webdriver');

async function testDonationProcess() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/donationPackages'); 

        // Prisni që elementi i paketës së donacionit të jetë i pranishëm dhe i dukshëm
        await driver.wait(until.elementLocated(By.className('package-card')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.className('package-card'))), 10000);

        // Klikoni mbi paketën e parë të donacionit
        await driver.findElement(By.className('package-card')).click();

        // Prisni që URL-ja të ndryshojë për të përfshirë Stripe
        await driver.wait(until.urlContains('stripe.com'), 10000);

        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('stripe.com')) {
            console.log('Testimi i procesit të donacionit kaloi me sukses!');
        } else {
            console.log('Testimi i procesit të donacionit dështoi.');
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

testDonationProcess();
