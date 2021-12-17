const { Builder, By, Key, until } = require('selenium-webdriver');

let test_cases = [
    {
        description: 'Test case 1: Correct Credentials should login',
        email: 'ANDC@kea.dk',
        password: '12345678',
        expect_succes: true
    },
    {
        description: 'Test case 2: Incorrect email should not login',
        email: 'WRONG',
        password: 'ASBCASBC',
        expect_succes: false
    },
    {
        description: 'Test case 3: Incorrect password should not login',
        email: 'WRONG@kea.dk',
        password: 'WRONG',
        expect_succes: false
    },
    {
        description: 'Test case 4: Incorrect credentials should not login',
        email: 'WRONG@kea.dk',
        password: 'WRONG',
        expect_succes: false
    },
]

function log_failure(message) {
    console.error("\x1b[31m", message, '\x1b[0m');
}

function log_success(message) {
    console.error("\x1b[32m", message, '\x1b[0m');
}

test_cases.forEach(async (test_case) => {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        await driver.get('localhost:8080/login').then(async function () {
            await driver.getTitle().then(function (title) {
                if (title === 'Login Page') {
                    log_success('Test passed for reaching the Login page, ' + test_case.description);
                } else {
                    log_failure('Test failed for reaching the Login page, ' + test_case.description);
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
                if (title === 'Teacher Page') {
                    log_success('Test passed for Teacher page ' + test_case.description);
                } else {
                    log_failure('Test failed for Teacher page ' + test_case.description);
                }
            });
        }).catch(err => {
            if (test_case.expect_succes) log_failure("Test failed for Teacher page, " + test_case.description);
            else log_success("Test passed for Teacher page, " + test_case.description);
        });
    }
    finally {
        await driver.quit();
    }
});
