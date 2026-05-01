const amount = document.getElementById('gift-amount');
const total = document.getElementById('gift-total-cost');

amount.addEventListener('input', (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
        total.textContent = inputValue.toLocaleString();
    } else {
        total.textContent = '0';
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.querySelector('.gift-form__checkbox');
  const patronymicInput = document.querySelector('input[name="patronymic"]');

  if (!checkbox || !patronymicInput) return;

  function updatePatronymicState() {
    const isChecked = checkbox.checked;

    if (isChecked) {
      patronymicInput.removeAttribute('required');
      patronymicInput.disabled = true;
      patronymicInput.value = '';
      patronymicInput.classList.add('input--disabled');
    } else {
      patronymicInput.setAttribute('required', '');
      patronymicInput.disabled = false;
      patronymicInput.classList.remove('input--disabled');
    }
  }

  checkbox.addEventListener('change', updatePatronymicState);

  updatePatronymicState();
});

document.querySelectorAll('input[name="firstname"], input[name="surname"], input[name="patronymic"]').forEach(input => {
  input.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, '');
  });
});


// валидация номера телефона
const phoneInput = document.querySelector('input[name="phone"]');

phoneInput.addEventListener('keydown', function (e) {
  if (e.key === '+') {
    if (this.selectionStart !== 0 || this.value.startsWith('+')) {
      e.preventDefault();
    }
  }
});

phoneInput.addEventListener('input', function () {
  this.value = this.value
    .replace(/[^\d\+]/g, '')
    .replace(/(?!^)\+/g, '');
});