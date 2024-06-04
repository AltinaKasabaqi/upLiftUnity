const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function testRuleForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admini'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 20000);

        await driver.get('http://localhost:8080/#/RulesForma');

        await driver.wait(until.elementLocated(By.id('name')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('name'))), 20000);

        await driver.findElement(By.id('name')).sendKeys('TestRuleName');
        await driver.findElement(By.id('description')).sendKeys('Test Rule Description');

        await driver.findElement(By.css('form button[type="submit"]')).click();

   

        console.log('Rule added succesfully');
    } catch (error) {
        console.error('Gabim gjatë testimin e formës së regjistrimit të rregullave:', error);
    } finally {
        await driver.quit();
    }
}

testRuleForm();
