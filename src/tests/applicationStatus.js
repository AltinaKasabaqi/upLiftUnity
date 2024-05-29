const { Builder, By, Key, until } = require('selenium-webdriver');

async function testRejectApplication() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Hapja e faqes së login
        await driver.get('http://localhost:8080/#/login');
        
        // Vendosja e email-it dhe fjalëkalimit
        await driver.findElement(By.id('email')).sendKeys('admin2@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admini', Key.RETURN);

        // Pritja për redirektimin në faqen e statistikave
        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 10000);

        // Hapja e faqes së aplikacioneve
        await driver.get('http://localhost:8080/#/applications');

        // Pritja për shfaqjen e elementit tërheqës për filtrat
        await driver.wait(until.elementLocated(By.id('filterType')), 10000);

        // Gjetja dhe klikimi i butonit për të refuzuar aplikacionin
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
