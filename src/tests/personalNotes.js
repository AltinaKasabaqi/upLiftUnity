const { Builder, By, until } = require('selenium-webdriver');

async function testNotesForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admini'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 20000);
      
        await driver.get('http://localhost:8080/#/addNotes');
        await driver.wait(until.elementLocated(By.css("input[placeholder='Note Title']")), 10000);
        await driver.wait(until.elementLocated(By.css("textarea[placeholder='Enter your note']")), 10000);

        await driver.findElement(By.css("input[placeholder='Note Title']")).sendKeys('Test Note Title');
        await driver.findElement(By.css("textarea[placeholder='Enter your note']")).sendKeys('Test Note Content');

        await driver.findElement(By.css("button[type='submit']")).click();

        console.log('Note added successfully');
    } catch (error) {
        console.error('Gabim gjatë testimin e formës së notave:', error);
    } finally {
        await driver.quit();
    }
}

testNotesForm();
