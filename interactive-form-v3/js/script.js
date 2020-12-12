const form = document.querySelector('form');
const name = document.querySelector('#name');
const nameLabel = name.parentNode;
const email = document.querySelector('#email');
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
const themeSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const jsPuns = document.querySelectorAll('[data-theme="js puns"]');
const heartJs = document.querySelectorAll('[data-theme="heart js"]');
const activitiesLegend = listActivities.previousElementSibling;
let listActivities = document.querySelector('#activities-box');
const totalHTML = document.querySelector('#activities-cost');
const creditCard = document.querySelector('#credit-card');
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
        if (checkbox.checked) {
            total += +checkbox.dataset.cost;
        } else {
            total -= +checkbox.dataset.cost;
        }
    }
    totalHTML.textContent = `Total: $${total}`;
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


form.addEventListener('submit', e => {
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const ccRegex = /^\d{13,16}$/;
    listActivities = document.querySelector('#activities-box');

    if (name.value === '') {
        e.preventDefault();
        name.className = 'error';
        nameLabel.className = 'error-label';
        nameLabel.firstChild.textContent = 'Name: Can\'t be empty ';
    }

    if (!emailRegex.test(email.value)) {
        e.preventDefault();
        email.className = 'error';
        const emailLabel = email.parentNode;
        emailLabel.className = 'error-label';
        emailLabel.firstChild.textContent = 'Email Address: Insert a valid email';
    }

    const actCheckboxes = listActivities.querySelectorAll('input');
    for (let i = 0; i < actCheckboxes.length; i++) {
        if (!actCheckboxes[i].checked) {
            activitiesLegend.className = 'error-label';
            activitiesLegend.textContent = 'Register for Activities: Select at least one activity';
            e.preventDefault();
            break;
        }
    }
    const ccNum = document.querySelector('cc-num');
    if (!ccRegex.test(ccNum.value)) {
        //validating the card input
    }

});




