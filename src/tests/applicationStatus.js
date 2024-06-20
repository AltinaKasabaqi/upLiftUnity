const { Builder, By, Key, until } = require('selenium-webdriver');

async function testRejectApplication() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:8080/#/login');
        
        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admin', Key.RETURN);

        await driver.wait(until.urlIs('http://localhost:8080/#/callsHistory'), 10000);

        await driver.get('http://localhost:8080/#/applications');

        await driver.wait(until.elementLocated(By.id('filterType')), 10000);

        const rejectButton = await driver.findElement(By.xpath("//button[contains(text(),'Refuzuar')]"));
        await rejectButton.click();

        console.log("Aplikacioni u refuzua me sukses!");
    } catch (error) {
        console.error("Gabim gjatë testimin e aplikacionit:", error);
    } finally {
        await driver.quit();
    }
}

testRejectApplication();
