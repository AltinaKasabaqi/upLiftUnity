const { Builder, By, until } = require('selenium-webdriver');

async function testCallRegistrationForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admini'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 20000);
      
        await driver.get('http://localhost:8080/#/callsForm');

        await driver.wait(until.elementLocated(By.id('CallerNickname')), 30000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('CallerNickname'))), 30000);
        await driver.wait(until.elementLocated(By.id('Description')), 30000);
        await driver.wait(until.elementLocated(By.id('RiskLevel')), 30000);

        await driver.wait(async () => {
            const readyState = await driver.executeScript('return document.readyState');
            return readyState === 'complete';
        }, 20000);

        await driver.findElement(By.id('CallerNickname')).sendKeys('TestUser');
        await driver.findElement(By.id('Description')).sendKeys('Test Description');
        await driver.findElement(By.id('RiskLevel')).sendKeys('3');

        await driver.findElement(By.css('form button[type="submit"]')).click();


        console.log('Call registered succesfully');
    } catch (error) {
        console.error('Gabim gjatë testimin e formës së regjistrimit të thirrjes:', error);
    } finally {
        await driver.quit();
    }
}

testCallRegistrationForm();
