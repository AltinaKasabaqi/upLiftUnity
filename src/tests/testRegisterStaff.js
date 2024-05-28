const { Builder, By,Key, until } = require('selenium-webdriver');

async function testRegisterStaff() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.wait(until.elementLocated(By.id('email')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 20000);

        await driver.findElement(By.id('email')).sendKeys('admin2@gmail.com'); 
        await driver.findElement(By.id('password')).sendKeys('admini'); 
        await driver.findElement(By.xpath("//button[text()='Kyçu']")).click();

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 10000);

        await driver.get('http://localhost:8080/#/register'); 

        await driver.wait(until.elementLocated(By.id('emri')), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('emri'))), 20000);

        await driver.findElement(By.id('emri')).sendKeys('TestEmri');
        await driver.findElement(By.id('mbiemri')).sendKeys('TestMbiemri');
        await driver.findElement(By.id('email')).sendKeys('testemail@example.com');
        await driver.findElement(By.id('fjalekalimi')).sendKeys('TestFjalekalimi123');
        await driver.findElement(By.id('phoneNumber')).sendKeys('123456789');
        await driver.findElement(By.id('address')).sendKeys('Test Adresa');

        let roleSelect = await driver.findElement(By.id('roli'));
        await roleSelect.click();
        await roleSelect.sendKeys(Key.ARROW_DOWN); 
        await roleSelect.sendKeys(Key.ENTER); 

        let registerButton = await driver.findElement(By.xpath("//button[text()='Regjistrohu']"));
        await driver.wait(until.elementIsVisible(registerButton), 20000);
        await registerButton.click();

        await driver.sleep(3000);

        let bodyText = await driver.findElement(By.tagName('body')).getText();
        if (bodyText.includes('Përdoruesi u regjistrua me sukses!')) {
            console.log('Testimi i regjistrimit të stafit kaloi me sukses!');
        } else {
            console.log('Testimi i regjistrimit të stafit deshtoi.');
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

testRegisterStaff();
