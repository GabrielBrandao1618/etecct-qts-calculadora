function test(result, expectedResult, n) {
    if (result !== expectedResult) {
        return {
            msg: `❌ Teste ${n} falhou (resultado esperado: "${expectedResult}"; resultado obtido: "${result}")`,
            sucess: false
        }
    }
    return {
        msg: `✔ Teste ${n} funcionou (obtido o resultado "${result}" com sucesso!)`,
        sucess: true
    }
}

function testWithInterface(n1, n2, operation, expectedResult, n) {
    document.querySelector('input#n1').value = n1
    document.querySelector('input#n2').value = n2
    document.querySelector('input#operation').value = operation

    const { n1: formN1, n2: formN2, operation: formOperation } = getFormData()
    const result = calculate(formN1, formN2, formOperation)
    document.querySelector('p.result').textContent = result

    return test(result, expectedResult, n)
}

function testCaseFactory(n1, n2, operation, expectedResult, n) {
    const fn = () => {
        return testWithInterface(n1, n2, operation, expectedResult, n)
    }
    return fn
}

const testCase1 = testCaseFactory(4, 6, "+", 10, 1)
const testCase2 = testCaseFactory(2.5, 4.5, "+", 7, 2)
const testCase3 = testCaseFactory(0, 2, "/", 0, 3)
const testCase4 = testCaseFactory(4, 8, "a", 0, 4)
const testCase5 = testCaseFactory(4, null, "-", 4, 5)
const testCase6 = testCaseFactory(.1, .2, "+", .3, 6)
const testCase7 = testCaseFactory(6, 4, "-", 2, 7)
const testCase8 = testCaseFactory(5, 2, "/", 2.5, 8)
const testCase9 = testCaseFactory(6, .2, "*", 1.2, 9)
const testCase10 = testCaseFactory(.3, 3, "/", .1, 10)


function showTestResult(result) {
    const display = document.querySelector('p.test-result')
    display.textContent = result.msg
    if (result.sucess) {
        display.classList.add('sucess')
        display.classList.remove('fail')
    } else {
        display.classList.add('fail')
        display.classList.remove('sucess')
    }
}

function configTestsButtons() {
    const tests = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, testCase7, testCase8, testCase9, testCase10]
    for (let i = 0; i < 10; i++) {
        document.querySelector(`button.run-test-${i + 1}`).addEventListener('click', () => showTestResult(tests[i]()))
    }
}

configTestsButtons()