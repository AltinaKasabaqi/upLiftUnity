const { Builder, By, until } = require('selenium-webdriver');

async function testLoginForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login'); 

        await driver.wait(until.elementLocated(By.id('email')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 10000);

        await driver.findElement(By.id('email')).sendKeys('admii1n@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admin');

  
        await driver.findElement(By.className('btn-primary')).click();

        console.log('Butoni Kyçu është klikuar.');

        await driver.sleep(2000);

        try {
            await driver.wait(until.urlContains('Statistics'), 10000);
            let currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('Statistics')) {
                console.log('Testimi i login-it kaloi me sukses!');
            } else {
                console.log('Testimi i login-it dështoi.');
            }
        } catch (error) {
            try {
                await driver.wait(until.elementLocated(By.css('.swal2-popup')), 20000);
                let alertText = await driver.findElement(By.css('.swal2-popup')).getText();
                if (alertText.includes('Kredenciale te gabuar')) {
                    console.log('Testimi i login-it tregoi kredenciale të gabuara siç pritej.');
                } else {
                    console.log('Testimi i login-it dështoi.');
                }
            } catch (e) {
                console.error('Error finding swal2-popup element:', e);
            }
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

testLoginForm();
