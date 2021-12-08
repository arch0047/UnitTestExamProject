
const { Builder, By, Key, until } = require('selenium-webdriver');



(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('localhost:8080/register').then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Register Page') {
                    console.log('Test 1 passed for reaching the Register Page');
                } else {
                    console.log('Test 1 failed for reaching the Register Page');
                }

            });
        });;

        const email = 'ANDC@kea.dk'
        const id = driver.findElement(By.id('email'))
        await id.sendKeys(email, Key.RETURN).then();

        const activation_code = 'ANDC'
        const activation_code_id = driver.findElement(By.id('activation-code'))
        await activation_code_id.sendKeys(activation_code, Key.RETURN).then();


        const password = 'ASBCASBC'
        const password_id = driver.findElement(By.id('password'))
        await password_id.sendKeys(password, Key.RETURN).then();

        
        const repeat_password_id = driver.findElement(By.id('repeat-password-input'))
        await repeat_password_id.sendKeys(password, Key.RETURN).then();

        await driver.findElement(By.id('register-button')).click().then();



        await driver.wait(until.titleIs('Login Page'), 10000).then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Login Page') {
                    console.log('Test 2 passed for redirecting to the login page');
                } else {
                    console.log('Test 2 failed for redirecting to the login page');
                }
            });
        });
    }

    finally {
        await driver.quit();
    }
})();