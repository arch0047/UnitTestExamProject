
const { Builder, By, Key, until } = require('selenium-webdriver');

let test_cases = [
    {
        email: 'ANDC@kea.dk',
        password: 'WRONG',
        expect_succes: false
    },
    {
        email: 'WRONG',
        password: 'ASBCASBC',
        expect_succes: false
    },
    {
        email: 'WRONG@kea.dk',
        password: 'WRONG',
        expect_succes: false
    },
    {
        email: 'ANDC@kea.dk',
        password: 'ASBCASBC',
        expect_succes: true
    }
]

test_cases.forEach(async (test_case) => {
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
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const email = test_case.email
        const id = driver.findElement(By.id('email'))
        await id.sendKeys(email).then();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const password_id = driver.findElement(By.id('password'))
        await password_id.sendKeys(test_case.password).then();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.id('login-button')).click().then().then().catch(err => console.log(err));

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.wait(until.titleIs('Teacher Page'), 1000).then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Teacher Page') {
                    console.log('Test 2 passed for Teacher page');
                } else {
                    console.log('Test 2 failed for Teacher page');
                }
            });
        }).catch(err => {
            if (test_case.expect_succes) {
                console.log("Test failed! Wrong credentials!");
            }
            console.log("Test passed! For wrong credentials.");
        });
    }
    finally {
        await driver.quit();
    }
});
