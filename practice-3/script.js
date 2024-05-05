'use strict';

// функция фильтрации таблицы
function filterTable() {
	// инициализируем необходимые параметры
	let search = document
		.getElementById('searchInput')
		.value.toLowerCase()
		.trim();
	let rows = document.getElementById('table').getElementsByTagName('tr');
	let column = document.getElementById('table').getElementsByTagName('th');
	let content = 0;

	// фильтр будет начинаться только после 3 и более введенных символов
	if (search.length >= 3) {
		for (let i = 1; i < rows.length; i++) {
			for (let j = 0; j < column.length; j++) {
				content = rows[i].cells[j].textContent.toLowerCase();
				rows[i].style.display = content.includes(search) ? '' : 'none';
			}
		}
		// если символы были стерты, то все возвращается как было
	} else {
		for (let i = 0; i < rows.length; i++) {
			rows[i].style.display = '';
		}
	}
}

document.getElementById('searchInput').addEventListener('keyup', filterTable);

// функция сортировки таблицы (будет доступна через 1 секунду, т.к. необходимо
// чтобы данные с сервера пришли на страницу)

setTimeout(function () {
	// сортировка по возрастанию?
	let ascendingSort = false;
	const table = document.getElementById('table');
	const headers = document.querySelectorAll('th');

	for (let i = 0; i < headers.length; i++) {
		headers[i].addEventListener('click', function () {
			// создаем массив для корректной сортировки
			let compare;
			let sortedRows = Array.from(table.rows).slice(1);
			// если сортируем во возрастанию
			if (ascendingSort) {
				ascendingSort = false;
				if (i > 1) {
					compare = function (rowA, rowB) {
						return rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1;
					};
				} else {
					compare = function (rowA, rowB) {
						return rowA.cells[i].innerHTML - rowB.cells[i].innerHTML;
					};
				}
				// если сортируем во убыванию
			} else {
				ascendingSort = true;
				if (i > 1) {
					compare = function (rowA, rowB) {
						return rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? -1 : 1;
					};
				} else {
					compare = function (rowA, rowB) {
						return rowB.cells[i].innerHTML - rowA.cells[i].innerHTML;
					};
				}
			}
			// заменяем элементы таблицы
			sortedRows.sort(compare);
			table.tBodies[0].append(...sortedRows);
		});
	}
}, 1000);
