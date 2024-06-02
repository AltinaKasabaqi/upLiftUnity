const { Builder, By, until } = require('selenium-webdriver');

async function testSelectDate() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 10000);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admini');
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 10000);

        await driver.get('http://localhost:8080/#/calendar');

        await driver.wait(until.elementLocated(By.className('container')), 10000);

        for (let i = 0; i < 4; i++) {
            const addButton = await driver.findElement(By.css('.plus-icon button'));
            await driver.wait(until.elementIsVisible(addButton), 10000);
            await addButton.click();

            const modal = await driver.wait(until.elementLocated(By.className('bg-white p-4 rounded shadow relative')), 10000);
            await driver.wait(until.elementIsVisible(modal), 10000);

            const timeSelect = await driver.findElement(By.css("select"));
            await driver.wait(until.elementIsVisible(timeSelect), 10000);
            await timeSelect.click();

            const timeOption = await driver.findElement(By.css("option:not([disabled])"));
            await driver.wait(until.elementIsVisible(timeOption), 10000);
            await timeOption.click();

            const saveButton = await driver.findElement(By.css("button[type='submit']"));
            await driver.wait(until.elementIsVisible(saveButton), 10000);
            await saveButton.click();

        }

        const successMessage = await driver.wait(until.elementLocated(By.xpath("//div[contains(., 'Ju keni zgjedhur orarin :')]")), 20000);
        await driver.wait(until.elementIsVisible(successMessage), 20000);

        console.log('Testimi i zgjedhjes së datës kaloi me sukses!');
    } catch (error) {
        console.error('Gabim gjatë testimit:', error);
    } finally {
        await driver.quit();
    }
}

testSelectDate();
