const { Builder, By, Key, until } = require('selenium-webdriver');

async function testChat() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.findElement(By.id('email')).sendKeys('ds61483@ubt-uni.net');
        await driver.findElement(By.id('password')).sendKeys('1234', Key.RETURN);

        await driver.wait(until.urlIs('http://localhost:8080/#/callsHistory'), 10000);

        await driver.get('http://localhost:8080/#/chat');

        await driver.wait(until.elementLocated(By.className('main')), 10000);
        await driver.findElement(By.className('user')).click();

        await driver.findElement(By.className('msger-input')).sendKeys('Hello, how are you?', Key.RETURN);
        
        await driver.wait(until.elementLocated(By.className('right-msg')), 5000);

        console.log('Mesazhi u dërgua me sukses!');
    } finally {
        await driver.quit();
    }
}

testChat();
