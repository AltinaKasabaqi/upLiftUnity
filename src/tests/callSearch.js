const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testSearchBar() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/#/login');

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('admini', Key.RETURN);

        await driver.wait(until.urlIs('http://localhost:8080/#/statistics'), 10000);

        await driver.get('http://localhost:8080/#/callsHistory');

        await driver.wait(until.elementLocated(By.css('.search-bar input')), 20000);
        let searchBar = await driver.findElement(By.css('.search-bar input'));

        await searchBar.sendKeys('hardhuca');
        
        await driver.wait(async () => {
            let filteredItems = await driver.findElements(By.xpath("//tbody/tr"));
            return filteredItems.length > 0;
        }, 30000);

        let rows = await driver.findElements(By.xpath("//tbody/tr"));

        for (let row of rows) {
            let callerNickname = await row.findElement(By.xpath("td[1]")).getText();
            assert(callerNickname.toLowerCase().includes('hardhuca'), `Caller Nickname does not match: ${callerNickname}`);
        }

        console.log('Test passed: All filtered rows contain the search query in Caller Nickname.');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
}

testSearchBar();
