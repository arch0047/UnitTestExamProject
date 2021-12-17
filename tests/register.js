const { Builder, By, Key, until } = require('selenium-webdriver');

let test_cases = [
    {
        description: 'Test case 1: Correct Credentials should register',
        email: 'ANDC@kea.dk',
        activation_code: 'ANDC',
        password: '12345678',
        repeat_password: '12345678',
        expect_succes: true
    },
    {
        description: 'Test case 2: Invalid email should not register',
        email: 'WRONG@kea.dk',
        activation_code: 'ANDL',
        password: '12345678',
        repeat_password: '12345678',
        expect_succes: false
    },
    {
        description: 'Test case 3: Invalid activation code should not register',
        email: 'ANDC@kea.dk',
        activation_code: 'WRONG',
        password: '12345678',
        repeat_password: '12345678',
        expect_succes: false
    },
    {
        description: 'Test case 4: Invalid password should not register',
        email: 'ANDC@kea.dk',
        activation_code: 'ANDL',
        password: 'WRONG',
        repeat_password: '12345678',
        expect_succes: false
    },
    {
        description: 'Test case 5: Invalid repeat password should not register',
        email: 'ANDC@kea.dk',
        activation_code: 'ANDL',
        password: '12345678',
        repeat_password: 'WRONG',
        expect_succes: false
    }
]

function log_failure(message) {
    console.error("\x1b[31m", message, '\x1b[0m');
}

function log_success(message) {
    console.error("\x1b[32m", message, '\x1b[0m');
}

const pause_duration = 1000;

test_cases.forEach(async (test_case) => {

    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('localhost:8080/register').then(async function () {
            await driver.getTitle().then(function (title) {
                if (title === 'Register Page') {
                    log_success('Test passed for reaching the Register page, ' + test_case.description);
                } else {
                    log_failure('Test failed for reaching the Register page, ' + test_case.description);
                }

            });
        });;

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        const email = test_case.email
        const id = driver.findElement(By.id('email'))
        await id.sendKeys(email).then();

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        const activation_code = test_case.activation_code
        const activation_code_id = driver.findElement(By.id('activation-code'))
        await activation_code_id.sendKeys(activation_code).then();

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        const password = test_case.password
        const password_id = driver.findElement(By.id('password'))
        await password_id.sendKeys(password).then();

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        repeat_password = test_case.repeat_password
        const repeat_password_id = driver.findElement(By.id('repeat-password-input'))
        await repeat_password_id.sendKeys(repeat_password).then();

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        await driver.findElement(By.id('register-button')).click().then();

        await new Promise(resolve => setTimeout(resolve, pause_duration));

        await driver.wait(until.titleIs('Login Page'), 1000).then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Login Page') {
                    console.log();
                    log_success('Test passed for redirecting to the login page' + test_case.description);
                } else {
                    log_failure('Test failed for redirecting to the login page' + test_case.description);
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
