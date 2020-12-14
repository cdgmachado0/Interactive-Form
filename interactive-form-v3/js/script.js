const form = document.querySelector('form');
const name = document.querySelector('#name');
const nameLabel = name.parentNode;
const email = document.querySelector('#email');
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

// Focus on the name input when the page loads
name.focus();

otherRole.style.display = 'none';
colorSelect.disabled = 'true';


paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Selects "Credit Card" as the default option when the page loads
ccOption.selected = true;

jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherRole.style.display = '';
    } else {
        otherRole.style.display = 'none';
    }
});

themeSelect.addEventListener('change', e => {
    const selection = e.target.value;
    if (selection) {
        colorSelect.disabled = '';
    }
    if (selection === 'js puns') {
        for (let i = 0; i < heartJs.length; i++) {
            heartJs[i].style.display = 'none';
            jsPuns[i].style.display = '';
        }
    } else if (selection === 'heart js') {
        for (let i = 0; i < heartJs.length; i++) {
            heartJs[i].style.display = '';
            jsPuns[i].style.display = 'none';
        }
    }
})


let total = 0;
listActivities.addEventListener('change', e => {
    let checkbox = e.target;
    if (checkbox.tagName === 'INPUT') {
        function toggleDisable(_element, _bool) {
            if (_element) {
            _element.disabled = _bool;
            }
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
                const jsFrameworks = document.querySelector('[name="js-frameworks"]');
                toggleDisable(jsFrameworks, true);
            } else if (compareActivities('Tuesday 9am-12pm', 'js-frameworks')) {
                const jsLibs = document.querySelector('[name="js-libs"]');
                toggleDisable(jsLibs, true);
            } else if (compareActivities('Tuesday 1pm-4pm', 'node')) {
                const buildTools = document.querySelector('[name="build-tools"]'); 
                toggleDisable(buildTools, true);
            } else if (compareActivities('Tuesday 1pm-4pm', 'build-tools')) {
                const node = document.querySelector('[name="node"]'); 
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
                const jsFrameworks = document.querySelector('[name="js-frameworks"]');
                toggleDisable(jsFrameworks, false);
            } else if (compareActivities('Tuesday 9am-12pm', 'js-frameworks')) {
                const jsLibs = document.querySelector('[name="js-libs"]');
                toggleDisable(jsLibs, false);
            } else if (compareActivities('Tuesday 1pm-4pm', 'node')) {
                const buildTools = document.querySelector('[name="build-tools"]'); 
                toggleDisable(buildTools, false);
            } else if (compareActivities('Tuesday 1pm-4pm', 'build-tools')) {
                const node = document.querySelector('[name="node"]'); 
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

listActivities.addEventListener('keydown', e => {
    // labelList = listActivities.children;
    // for (let i = 0; i < labelList.length; i++) {
    //     labelList[i].style.background = 'red';
    // }
    if (e.target.tagName === 'INPUT') {
        // e.target.parentNode.className = 'selected';
    }
});





selectPayment.addEventListener('change', e => {
    let selection = e.target.value;
    if (selection === 'paypal') {
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
    } else if (selection === 'bitcoin') {
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        creditCard.style.display = 'none';
    } else {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditCard.style.display = '';
    }
});




const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
const ccRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;

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

// function checkValidCheckboxes() {
//     for (let i = 0; i < actCheckboxes.length; i++) {
//         if (!actCheckboxes[i].checked) {
//             toggleError(activitiesLegend, null, 'error-label', 'Register for Activities: Select at least one activity', e);
//             break;
//         } else {
//             break;
//         }
//     }
// }

form.addEventListener('submit', e => {
    listActivities = document.querySelector('#activities-box');
    if (name.value === '') {
        toggleError(name, nameLabel, 'error', 'Name: Can\'t be empty', e);
    }
    if (!emailRegex.test(email.value)) {
        toggleError(email, emailLabel, 'error', 'Email Address: Insert a valid email', e);
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
        if (!ccRegex.test(ccNum.value)) {
            toggleError(ccNum, ccLabel, 'error', 'Card Number: Enter a valid card number', e);
        } 
        if (!zipRegex.test(zipInput.value)) {
            toggleError(zipInput, zipLabel, 'error', 'Zip Code: Wrong value', e);
        } 
        if (!cvvRegex.test(cvvInput.value)) {
            toggleError(cvvInput, cvvLabel, 'error', 'CVV: Wrong value', e);
        } 
    }
});




const inputList = document.querySelectorAll('input[type="text"]');
const inputListArr = Array.from(inputList);
inputListArr[1] = email;
for (let i = 0; i < inputListArr.length; i++) {
    inputListArr[i].addEventListener('input', e => {
        let valid = [
            {name: e.target.value},
            {email: emailRegex.test(email.value)},
            {cc: ccRegex.test(ccNum.value)},
            {zip: zipRegex.test(zipInput.value)},
            {cvv: cvvRegex.test(cvvInput.value)}
        ];
        if (valid[i]['name'] && e.target.name === 'user-name') {
            toggleError(name, nameLabel, '', 'Name: ');    
        } else if (valid[i]['name'] === '') {
            toggleError(name, nameLabel, 'error', 'Name: Can\'t be empty', e);
        }
        if (valid[i]['email'] && e.target.name === 'user-email') {
            toggleError(email, emailLabel, '', 'Email Address: ');
        } else if (!valid[i]['email'] && e.target.name === 'user-email') {
            toggleError(email, emailLabel, 'error', 'Email Address: Insert a valid email', e);
        }
        if (valid[i]['cc'] && e.target.name === 'user-cc-num') {
            toggleError(ccNum, ccLabel, '', 'Card Number: ');
        } else if (!valid[i]['cc'] && e.target.name === 'user-cc-num') {
            toggleError(ccNum, ccLabel, 'error', 'Card Number: Enter a valid card number', e);
        }
        if (valid[i]['zip'] && e.target.name === 'user-zip') {
            toggleError(zipInput, zipLabel, '', 'Zip Code: ');
        } else if (!valid[i]['zip'] && e.target.name === 'user-zip') {
            toggleError(zipInput, zipLabel, 'error', 'Zip Code: Wrong value', e);
        }
        if (valid[i]['cvv'] && e.target.name === 'user-cvv') {
            toggleError(cvvInput, cvvLabel, '', 'CVV: ');
        } else if (!valid[i]['cvv'] && e.target.name === 'user-cvv') {
            toggleError(cvvInput, cvvLabel, 'error', 'CVV: Wrong value', e);
        }
    });
}





