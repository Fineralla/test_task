'use strict';

const url = 'https://jsonplaceholder.typicode.com/posts';

function request() {
	// 1. Создаем объект запроса
	const xhr = new XMLHttpRequest();

	// 2. Куда посылаем и параметры
	xhr.open('GET', url);

	// 3. Как обрабатываем ответ сервера
	xhr.onload = function () {
		// проверка корректности работы
		// console.log(xhr.status);
		// console.log(xhr.response);

		const data = JSON.parse(xhr.response);

		// создание таблицы
		let item = document.getElementById('main-table');
		let table = `
    <table>
      <tr>
    `;

		// получаем ключи для заголовков таблицы, т.к. у объектов ключи
		// идентичные, то можно сделать это 1 раз
		let keyData = Object.keys(data[0]);

		for (let i = 0; i < keyData.length; i++) {
			table += `<th>${keyData[i]}</th>`;
		}
		table += `</tr>`;

		// заполненяем таблицу информацией, каждый объект на новой строке
		for (let i = 0; i < data.length; i++) {
			let valuesData = Object.values(data[i]);
			for (let j = 0; j < valuesData.length; j++) {
				table += `<td>${valuesData[j]}</td>`;
			}
			table += `</tr>`;
		}

		// закрываем таблицу и добавляем её на страницу
		table += `</tr></table>`;
		item.innerHTML = table;
	};
	// 4. Посылаем запрос
	xhr.send();
}
request();
