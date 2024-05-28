const { Builder, By, until } = require('selenium-webdriver');

async function testCallRegistrationForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admin'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 20000);
      
        await driver.get('http://localhost:8080/#/callsForm');

        await driver.wait(until.elementLocated(By.id('CallerNickname')), 30000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('CallerNickname'))), 30000);
        await driver.wait(until.elementLocated(By.id('Description')), 30000);
        await driver.wait(until.elementLocated(By.id('RiskLevel')), 30000);

        // Prit deri sa faqja të jetë e plotësisht ngarkuar
        await driver.wait(async () => {
            const readyState = await driver.executeScript('return document.readyState');
            return readyState === 'complete';
        }, 20000);

        // Vendosni vlerat e fushave
        await driver.findElement(By.id('CallerNickname')).sendKeys('TestUser');
        await driver.findElement(By.id('Description')).sendKeys('Test Description');
        await driver.findElement(By.id('RiskLevel')).sendKeys('3');

        // Dorëzo formën duke klikuar butonin "Shto"
        await driver.findElement(By.css('form button[type="submit"]')).click();

        // Prit për një mesazh të suksesit ose mesazhin e gabimit
        await driver.wait(until.elementLocated(By.css('.alert')), 30000);
        const alertElement = await driver.findElement(By.css('.alert'));
        const alertText = await alertElement.getText();
        console.log('Teksti i alertit:', alertText)

        if (alertText.includes('Ju lutem plotësoni të gjitha fushat.')) {
            console.log('Forma u testua me sukses: Mesazhi i gabimit për fushat e zbrazëta u shfaq si pritej.');
        } else {
            console.log('Forma nuk u testua me sukses: Mesazhi i gabimit për fushat e zbrazëta nuk u shfaq si pritej.');
        }
    } catch (error) {
        console.error('Gabim gjatë testimin e formës së regjistrimit të thirrjes:', error);
    } finally {
        await driver.quit();
    }
}

testCallRegistrationForm();
