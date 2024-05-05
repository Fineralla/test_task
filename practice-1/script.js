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
