const { Builder, By, until } = require('selenium-webdriver');

async function testApplicationForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/applicationForm'); 

    
        await driver.wait(until.elementLocated(By.id('nameSurname')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('nameSurname'))), 10000);

      
        await driver.findElement(By.id('nameSurname')).sendKeys('TestEmri Mbiemri');
        await driver.findElement(By.id('email')).sendKeys('testemail@example.com');
        await driver.findElement(By.id('phoneNumber')).sendKeys('123456789');
        await driver.findElement(By.id('cv')).sendKeys('Test CV');
        await driver.findElement(By.id('description')).sendKeys('Ky është një mesazh testimi.');
        await driver.findElement(By.id('applicationType')).sendKeys('Mbikqyrës');

        await driver.findElement(By.xpath("//button[text()='Apliko']")).click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);
        let alertText = await driver.findElement(By.className('swal2-popup')).getText();
        
        if (alertText.includes('Aplikimi juaj u pranua me sukses.')) {
            console.log('Testimi i aplikimit kaloi me sukses!');
        } else {
            console.log('Testimi i aplikimit dështoi.');
        }
    } catch (error) {
        console.error('Error during the test:', error);
    } finally {
        await driver.quit();
    }
}

testApplicationForm();
