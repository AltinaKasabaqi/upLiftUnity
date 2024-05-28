const { Builder, By, until } = require('selenium-webdriver');

async function testRegisterStaff() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/myDashboard/register'); // Zëvendësoni me URL-në specifike të regjistrimit të stafit

        // Prisni që elementi me ID 'emri' të jetë i pranishëm dhe i dukshëm
        await driver.wait(until.elementLocated(By.id('emri')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('emri'))), 10000);

        // Plotësoni formularin e regjistrimit
        await driver.findElement(By.id('emri')).sendKeys('TestEmri');
        await driver.findElement(By.id('mbiemri')).sendKeys('TestMbiemri');
        await driver.findElement(By.id('email')).sendKeys('testemail@example.com');
        await driver.findElement(By.id('fjalekalimi')).sendKeys('TestFjalekalimi123');
        await driver.findElement(By.id('phoneNumber')).sendKeys('123456789');
        await driver.findElement(By.id('address')).sendKeys('Test Adresa');
        await driver.findElement(By.id('roli')).sendKeys('2'); // Mbikqyrës

        await driver.findElement(By.xpath("//button[text()='Regjistrohu']")).click();

        await driver.sleep(2000);

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
