# Interactive Form
 
 1. A "For...lop" dynamically creates "AddEventListener"s for each mandatory input.

 2. The "isValid" array contains five objects with the validation condition that each field needs to complete:
    2.1 "name" tests if the name input is empty.
    2.2 The order inputs are tested by their own ReGex. 

    let isValid = [
            {name: e.target.value},
            {email: emailRegex.test(emailInput.value)},
            {cc: ccRegex.test(ccNum.value)},
            {zip: zipRegex.test(zipInput.value)},
            {cvv: cvvRegex.test(cvvInput.value)}
        ];

3. Multiple "if" and "else if" conditionals test if the validation condition is "true" or "false", 
    and which target input is the one that needs to be tested for validation (e.target.name).

4. The "toggleError" function switches the "error" and "error-label" classes back and forward on the
    inputs and labels where the function is called, depending on the result of the validation condition and its
    target element.

5. The "toggleError" function also displays the proper error message depending on the reason why the mandatory
    input couldn't be validated. 