export function openModal(index, cardCreate, cardDelete) {
//Переменные
	const popup = document.querySelectorAll('.popup');
	const curentPopup = popup[index];
	const closePopup = curentPopup.querySelector('.popup__close');
//Переменные

//Открытие попапа(вешаем класс)
	curentPopup.classList.add('popup_is-opened');//тут мы открываем
	curentPopup.classList.add('popup_is-animated');
//Открытие попапа(вешаем класс)

//Если у нас форма профиля
	if(curentPopup.getAttribute('class').includes('popup_type_edit')) {
//Переменные
		const editForm = document.forms[index];

		const nameInputs = editForm.name;
		const infoInputs = editForm.description;

		const userName = document.querySelector('.profile__title');
		const userInfo = document.querySelector('.profile__description');
//Переменные

		nameInputs.value = userName.textContent;
		infoInputs.value = userInfo.textContent;

//Функция по замене данных профиля
		function change(nameValue, infoValue) {
			userName.textContent = nameValue;
			userInfo.textContent = infoValue;
		}
//Функция по замене данных профиля

//Слушател отправки Формы
		editForm.addEventListener('submit', function(e) {
			e.preventDefault();

			change(nameInputs.value, infoInputs.value);

			e.target.closest('.popup').classList.remove('popup_is-opened');
		});
//Слушател отправки Формы
	} else if(curentPopup.getAttribute('class').includes('popup_type_new-card')) {
		const addForm = document.forms['new-place'];

		addForm.addEventListener('submit', create);

		function create(e) {
			e.preventDefault();

			const cardList = document.querySelector('.places__list');

			cardList.prepend(cardCreate(addForm['place-name'].value, addForm['link'].value, cardDelete));

			e.target.closest('.popup').classList.remove('popup_is-opened');

			e.target.removeEventListener('click', create);
		}
		
		addForm.reset();
	}




//а тут мы закрываем
	closePopup.addEventListener('click', (e) => {
		e.target.closest('.popup').classList.remove('popup_is-opened');
		curentPopup.classList.add('popup_is-animated');
	});
//а тут мы закрываем

//а тут мы закрываем если нажато вне
	curentPopup.addEventListener('click', (e) => {
		if(e.target.classList.contains('popup')) {
			e.target.closest('.popup').classList.remove('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
		}
	});
//а тут мы закрываем если нажато вне
}