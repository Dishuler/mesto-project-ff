import { initialCards } from './cards.js';
import { openPopup, closePopup } from './newModal.js';
import { createCard, deleteCard, likeCard } from './card.js';

//элементы блокировки body
const timeout = 600;
let unlock = true;
//элементы блокировки body

//Контейнер карточки
const cardList = document.querySelector('.places__list');
//Контейнер карточки

//Формы
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
//Формы

//popup-ы--------------------------------------------------------------------
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupOpenCard = document.querySelector('.popup_type_image');

//Кнопки открытия попапов
const popupProfileButtons = document.querySelector('.profile__edit-button');
const popupPostButtons = document.querySelector('.profile__add-button');
//popup-ы--------------------------------------------------------------------

//Вставляем карточки с файлика cards.js
initialCards.forEach(({name, link}) => {
	cardList.append(createCard(name, link, deleteCard, likeCard));
});
//Вставляем карточки с файлика cards.js

//повесили слушетели на нажатие кнопок
popupProfileButtons.addEventListener('click', () => {
	openPopup(popupEdit, unlock, timeout, editForm);
});

popupPostButtons.addEventListener('click', () => {
	openPopup(popupNewCard, unlock, timeout, addForm);
});

cardList.addEventListener('click', (e) => {
	if(e.target.matches('.card__image')) {
		openPopup(popupOpenCard, unlock, timeout, null, e);
	}
});
//повесили слушетели на нажатие кнопок

//повесили слушетели на submit добавления карточки
addForm.addEventListener('submit', (e) => {
	cardList.prepend(createCard(addForm['place-name'].value, addForm['link'].value, deleteCard));

	closePopup(popupNewCard, true, unlock, timeout);
	e.preventDefault();
	addForm.reset();
});
//повесили слушетели на submit добавления карточки