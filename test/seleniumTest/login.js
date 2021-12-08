
const { Builder, By, Key, until } = require('selenium-webdriver');



(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('localhost:8080/login').then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Login Page') {
                    console.log('Test 1 passed for reaching the Login page');
                } else {
                    console.log('Test 1 failed for reaching the Login page');
                }

            });
        });;

        const email = 'ASBC@kea.dk'
        const id = driver.findElement(By.id('email'))
        await id.sendKeys(email, Key.RETURN).then();


        const password = 'ASBCASBC'
        const password_id = driver.findElement(By.id('password'))
        await password_id.sendKeys('ASBCASBC', Key.RETURN).then();

        await driver.findElement(By.id('login-button')).click().then();



        await driver.wait(until.titleIs('Teacher Page'), 1000).then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Teacher Page') {
                    console.log('Test 2 passed for Teacher page');
                } else {
                    console.log('Test 2 failed for Teacher page');
                }

            });
        });
    }
    finally {
        await driver.quit();
    }
})();