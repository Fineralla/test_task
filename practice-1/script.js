'use strict';

const img = document.querySelector('.form__choosen-img');
const discardImage = document.querySelector('.icon-close');
const choose = document.getElementById('logo');

const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.form__button-cancel');
const btnShowModalWindow = document.querySelector('.show-modal-window');
const btnSubmitForm = document.querySelector('.form__button-submit');

// функция изменения логотипа на выбранный пользователем
function displayImage() {
	let f = logo.files[0];
	console.log(f);
	if (f) {
		img.src = URL.createObjectURL(f);
	}
}

// изменить логотип на первоначальный
discardImage.addEventListener('click', () => {
	img.src = 'img/man.png';
});

// открыть модальное окно
const showModalWindow = function () {
	modalWindow.classList.remove('hidden');
	overlay.classList.remove('hidden');
};
// закрыть модальное окно
const closeModalWindow = function () {
	modalWindow.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnShowModalWindow.addEventListener('click', showModalWindow);
btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
		closeModalWindow();
	}
});

document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter' && !modalWindow.classList.contains('hidden')) {
		btnSubmitForm.click();
	}
});


// маска для телефона
const phone = document.getElementById('phone');


// берем из поля только цифры, для подсчета
const getNumbers = function(input) {
	// удаляем пробелы с конца и с начала, заменяем все симоволы, которые не числа
	return input.value.trim().replace(/\D/g, ""); 
}

const changeInput = function(e) {
	let input = e.target,
			inputNumbers = getNumbers(input),
			selectionStart = input.selectionStart,
			formattedInput = '';
	
	// не дает начать введение номера с буквы
	if (!inputNumbers) {
		return input.value = '';
	} 

	if (input.value.length != selectionStart) {
		console.log(e);
		let data = e.data;
		if (data && /\D/g.test(data)) {
			input.value = inputNumbers;
		}
		return;
}
	
	// если начали вводить русские номера с 7, 8 или 9: то +7
	if (['7','8','9'].indexOf(inputNumbers[0]) > -1) {

		if (inputNumbers[0] == '9') {
			formattedInput = '+7' + ' 9';
		} else {
			formattedInput = '+7' + ' ';
		}
		if (inputNumbers.length > 1) {
			formattedInput += inputNumbers.substring(1,4);
		}
		if (inputNumbers.length > 4) {
			formattedInput += ' ' + inputNumbers.substring(4,7);
		}
		if (inputNumbers.length > 7) {
			formattedInput += '-' + inputNumbers.substring(7,9);
		}
		if (inputNumbers.length > 9) {
			formattedInput += '-' + inputNumbers.substring(9,11);
		}

	} else {
		// иностранный номер
		formattedInput = input.value = '+' + inputNumbers;
	}

	input.value = formattedInput;
}

// очистить +7 в input
const clearInput = function(e) {
	let input = e.target;
	if (e.keyCode == 8 && getNumbers(input).length == 1) {
		e.target.value = "";
	}
}

phone.addEventListener('input', changeInput);
phone.addEventListener('keydown', clearInput);

// нет нормального редактирования в середине строки