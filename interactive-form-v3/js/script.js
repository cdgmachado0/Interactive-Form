const name = document.querySelector('#name');
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
const themeSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');

// Focus on the name input when the page loads
name.focus();

otherRole.style.display = 'none';
colorSelect.disabled = 'true';

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

    }
})



