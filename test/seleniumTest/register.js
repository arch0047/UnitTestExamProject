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
        description: 'Test case 3: Invalid password should not register',
        email: 'ANDC@kea.dk',
        activation_code: 'ANDL',
        password: 'WRONG',
        repeat_password: '12345678',
        expect_succes: false
    },
    {
        description: 'Test case 3: Invalid repeat password should not register',
        email: 'ANDC@kea.dk',
        activation_code: 'ANDL',
        password: '12345678',
        repeat_password: 'WRONG',
        expect_succes: false
    }
]

test_cases.forEach(async (test_case) => {

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

        const email = test_case.email
        const id = driver.findElement(By.id('email'))
        await id.sendKeys(email).then();

        const activation_code = test_case.activation_code
        const activation_code_id = driver.findElement(By.id('activation-code'))
        await activation_code_id.sendKeys(activation_code).then();


        const password = test_case.password
        const password_id = driver.findElement(By.id('password'))
        await password_id.sendKeys(password).then();

        repeat_password = test_case.repeat_password
        const repeat_password_id = driver.findElement(By.id('repeat-password-input'))
        await repeat_password_id.sendKeys(repeat_password).then();

        await driver.findElement(By.id('register-button')).click().then();

        await driver.wait(until.titleIs('Login Page'), 1000).then(async function () {
            await driver.getTitle().then(function (title) {
                console.log(title)
                if (title === 'Login Page') {
                    console.log('Test 2 passed for redirecting to the login page');
                } else {
                    console.log('Test 2 failed for redirecting to the login page');
                }
            });
        }).catch(err => {
            if (test_case.expect_succes) {
                console.log("---------------------Test failed!", test_case.description);
            }
            console.log("-------------Test passed!", test_case.description);
        });;
    }

    finally {
        await driver.quit();
    }
});
