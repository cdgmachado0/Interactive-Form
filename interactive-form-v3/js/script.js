const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const nameLabel = nameInput.parentNode;
const emailInput = document.querySelector('#email');
const emailLabel = email.parentNode;
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
const themeSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const jsPuns = document.querySelectorAll('[data-theme="js puns"]');
const heartJs = document.querySelectorAll('[data-theme="heart js"]');
let listActivities = document.querySelector('#activities-box');
const activitiesLegend = listActivities.previousElementSibling;
const actCheckboxes = listActivities.querySelectorAll('input');
const totalHTML = document.querySelector('#activities-cost');
const jsFrameworks = document.querySelector('[name="js-frameworks"]');
const jsLibs = document.querySelector('[name="js-libs"]');
const buildTools = document.querySelector('[name="build-tools"]');
const node = document.querySelector('[name="node"]');
const creditCard = document.querySelector('#credit-card');
const ccNum = document.querySelector('#cc-num');
let ccLabel = ccNum.parentNode;
const cvvInput = document.querySelector('#cvv');
const cvvLabel = cvvInput.parentNode;
const zipInput = document.querySelector('#zip');
const zipLabel = zipInput.parentNode;
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const selectPayment = document.querySelector('#payment');
const ccOption = selectPayment.querySelector('[value="credit-card"]');
const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
const ccRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;

// Focus on the name input when the page loads
nameInput.focus();

/**
 * Changes an element's display to hidden and shown
 * @param {HTML Element} _element Element which will get its display changed
 * @param {string} _display property of the display
 */
const toggleDisplay = (_element, _display) => _element.style.display = _display;

toggleDisplay(otherRole, 'none');
colorSelect.disabled = 'true';

toggleDisplay(paypal, 'none');
toggleDisplay(bitcoin, 'none');


//Selects "Credit Card" as the default option when the page loads
ccOption.selected = true;

/**
 * Switches the error class back and forward, and updates error message accordingly
 * @param {HTML Element} _element main element where the error class will be enabled/disabled
 * @param {HTML Element} _element2 secondary element with a secondary procedure for the error class
 * @param {string} _class name of the error class
 * @param {string} _text error message
 * @param {event} e event object
 */
function toggleError(_element, _element2, _class, _text, e) {
    if (!_element2) {
        _element.className = _class;
        _element.innerHTML = _text;
    } else {
        if (_class === 'error') {
            _element.className = 'error'
            _element2.className = 'error-label';
        } else {
            _element.className = ''
            _element2.className = '';
        }
        _element2.firstChild.textContent = _text;
    }
    if (e) {e.preventDefault();}
}

// Shows/hides the "Other Job Role" input
jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
        toggleDisplay(otherRole, '');
    } else {
        toggleDisplay(otherRole, 'none');
    }
});

// Switches between T-shirt designs depending on user's choice
themeSelect.addEventListener('change', e => {
    const selection = e.target.value;
    if (selection) {colorSelect.disabled = '';}
    function switchTypes(_display1, _display2) {
        colorSelect.firstElementChild.selected = true;
        for (let i = 0; i < heartJs.length; i++) {
            toggleDisplay(heartJs[i], _display1);
            toggleDisplay(jsPuns[i], _display2);
        }
    }
    selection === 'js puns' ? switchTypes('none', '') : switchTypes('', 'none'); 
})

//Manages the interactivity with the checkboxes and the validation
//of the activities depending their schedule. Also, keeps updated the
//total of $ of activities chosen
let total = 0;
listActivities.addEventListener('change', e => {
    let checkbox = e.target;
    if (checkbox.tagName === 'INPUT') {
        function toggleDisable(_element, _bool) {
            if (_element) {_element.disabled = _bool;}
            _bool ? total += +checkbox.dataset.cost : total -= +checkbox.dataset.cost;
        }
        const compareActivities = (_date, _name) => {
            if (_date) {
                 return checkbox.dataset.dayAndTime === _date && checkbox.name === _name;
            } else {
                return checkbox.name === _name;
            }
        }
        if (checkbox.checked) {
            if (compareActivities('Tuesday 9am-12pm', 'js-libs')) {
                toggleDisable(jsFrameworks, true);
            } else if (compareActivities('Tuesday 9am-12pm', 'js-frameworks')) {
                toggleDisable(jsLibs, true);
            } else if (compareActivities('Tuesday 1pm-4pm', 'node')) {
                toggleDisable(buildTools, true);
            } else if (compareActivities('Tuesday 1pm-4pm', 'build-tools')) {
                toggleDisable(node, true);
            } else if (compareActivities('', 'all')) {
                toggleDisable('', true);
            } else if (compareActivities('', 'npm')) {
                toggleDisable('', true);
            } else if (compareActivities('', 'express')) {
                toggleDisable('', true);
            }
        } else {
            if (compareActivities('Tuesday 9am-12pm', 'js-libs')) {
                toggleDisable(jsFrameworks, false);
            } else if (compareActivities('Tuesday 9am-12pm', 'js-frameworks')) {
                toggleDisable(jsLibs, false);
            } else if (compareActivities('Tuesday 1pm-4pm', 'node')) {
                toggleDisable(buildTools, false);
            } else if (compareActivities('Tuesday 1pm-4pm', 'build-tools')) {
                toggleDisable(node, false);
            }else if (compareActivities('', 'all')) {
                toggleDisable('', false);
            } else if (compareActivities('', 'npm')) {
                toggleDisable('', false);
            } else if (compareActivities('', 'express')) {
                toggleDisable('', false);
            }
        }
        let flag = false;
        for (let i = 0; i < actCheckboxes.length; i++) {
            if (actCheckboxes[i].checked) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            toggleError(activitiesLegend, null, 'error-label', 'Register for Activities: Select at least one activity', e);
        } else {
            toggleError(activitiesLegend, null, '', 'Register for Activities <span class="asterisk">*</span>');
        }
    }
    totalHTML.textContent = `Total: $${total}`;
});


//Display the correct payment method depending on user's choice
selectPayment.addEventListener('change', e => {
    let selection = e.target.value;
    if (selection === 'paypal') {
        toggleDisplay(paypal, '');
        toggleDisplay(bitcoin, 'none');
        toggleDisplay(creditCard, 'none');
    } else if (selection === 'bitcoin') {
        toggleDisplay(paypal, 'none');
        toggleDisplay(bitcoin, '');
        toggleDisplay(creditCard, 'none');
    } else {
        toggleDisplay(paypal, 'none');
        toggleDisplay(bitcoin, 'none');
        toggleDisplay(creditCard, '');
    }
});


//Handles the validation of each mandatory input once the form is submitted
form.addEventListener('submit', e => {
    listActivities = document.querySelector('#activities-box');
    if (nameInput.value === '') {
        toggleError(nameInput, nameLabel, 'error', 'Name: Can\'t be empty', e);
    }
    if (!emailRegex.test(emailInput.value)) {
        toggleError(emailInput, emailLabel, 'error', 'Email Address: Insert a valid email', e);
    }
    for (let i = 0; i < actCheckboxes.length; i++) {
        if (!actCheckboxes[i].checked) {
            toggleError(activitiesLegend, null, 'error-label', 'Register for Activities: Select at least one activity', e);
            break;
        } else {
            break;
        }
    }
    if (selectPayment.value === 'credit-card') {
        if (!ccRegex.test(ccNum.value)) {toggleError(ccNum, ccLabel, 'error', 'Card Number: Enter a valid card number', e);} 
        if (!zipRegex.test(zipInput.value)) {toggleError(zipInput, zipLabel, 'error', 'Zip Code: Wrong value', e);} 
        if (!cvvRegex.test(cvvInput.value)) {toggleError(cvvInput, cvvLabel, 'error', 'CVV: Wrong value', e);} 
    }
});



// Select the mandatory inputs for validation and converts them to
// an array for better handling. 
const inputList = document.querySelectorAll('input[type="text"]');
const inputListArr = Array.from(inputList);
inputListArr[1] = email;

// Dynamically adds "AddEvenListener"s to each mandatory input, 
// and handles its live validation.
for (let i = 0; i < inputListArr.length; i++) {
    inputListArr[i].addEventListener('input', e => {
        let isValid = [
            {name: e.target.value},
            {email: emailRegex.test(emailInput.value)},
            {cc: ccRegex.test(ccNum.value)},
            {zip: zipRegex.test(zipInput.value)},
            {cvv: cvvRegex.test(cvvInput.value)}
        ];
        let targetName = e.target.name;
        if (isValid[i]['name'] && targetName === 'user-name') {
            toggleError(nameInput, nameLabel, '', 'Name: ');    
        } else if (isValid[i]['name'] === '') {
            toggleError(nameInput, nameLabel, 'error', 'Name: Can\'t be empty', e);
        }
        if (isValid[i]['email'] && targetName === 'user-email') {
            toggleError(emailInput, emailLabel, '', 'Email Address: ');
        } else if (!isValid[i]['email'] && targetName === 'user-email') {
            toggleError(emailInput, emailLabel, 'error', 'Email Address: Insert a valid email', e);
        }
        if (isValid[i]['cc'] && targetName === 'user-cc-num') {
            toggleError(ccNum, ccLabel, '', 'Card Number: ');
        } else if (!isValid[i]['cc'] && targetName === 'user-cc-num') {
            toggleError(ccNum, ccLabel, 'error', 'Card Number: Enter a valid card number', e);
        }
        if (isValid[i]['zip'] && targetName === 'user-zip') {
            toggleError(zipInput, zipLabel, '', 'Zip Code: ');
        } else if (!isValid[i]['zip'] && targetName === 'user-zip') {
            toggleError(zipInput, zipLabel, 'error', 'Zip Code: Wrong value', e);
        }
        if (isValid[i]['cvv'] && targetName === 'user-cvv') {
            toggleError(cvvInput, cvvLabel, '', 'CVV: ');
        } else if (!isValid[i]['cvv'] && targetName === 'user-cvv') {
            toggleError(cvvInput, cvvLabel, 'error', 'CVV: Wrong value', e);
        }
    });
}
