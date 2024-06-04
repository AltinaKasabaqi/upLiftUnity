const { Builder, By, until } = require('selenium-webdriver');

async function testDonationProcess() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/donationPackages'); 

        await driver.wait(until.elementLocated(By.className('package-card')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.className('package-card'))), 10000);

        await driver.findElement(By.className('package-card')).click();

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
