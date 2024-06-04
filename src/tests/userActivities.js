const { Builder, By, until } = require('selenium-webdriver');

async function testActivityDashboard() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admini'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 20000);
      
        await driver.get('http://localhost:8080/#/userActivities');

        await driver.wait(until.elementLocated(By.css("table")), 10000);

        console.log('User activity dashboard displayed successfully');
    } catch (error) {
        console.error('Gabim gjatë testimin e shfaqjes së dashboardit të aktivitetit të përdoruesve:', error);
    } finally {
        await driver.quit();
    }
}

testActivityDashboard();
