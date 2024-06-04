const { Builder, By, until } = require('selenium-webdriver');

async function testLoginWithValidCredentials() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login'); 

        await driver.wait(until.elementLocated(By.id('email')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 10000);

        console.log('Fusha e email-it është e pranishme dhe e dukshme.');

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admin');

        console.log('Fushat e email-it dhe fjalëkalimit janë plotësuar.');

        await driver.findElement(By.className('btn-primary')).click();

        console.log('Butoni Kyçu është klikuar.');

        await driver.sleep(2000);

        await driver.wait(until.urlContains('statistics'), 20000);
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('statistics')) {
            console.log('Testimi i login-it kaloi me sukses!');
        } else {
            console.log('Testimi i login-it dështoi.');
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

testLoginWithValidCredentials();
