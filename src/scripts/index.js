import { initialCards } from './cards.js';
import { openPopup, closePopup, editProfile } from './newModal.js';
import { createCard, deleteCard } from './card.js';

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

const nameInputs = editForm.name;
const infoInputs = editForm.description;

const userName = document.querySelector('.profile__title');
const userInfo = document.querySelector('.profile__description');
//Формы

//popup-ы--------------------------------------------------------------------
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

//Кнопки открытия попапов
const popupProfileButtons = document.querySelector('.profile__edit-button');
const popupPostButtons = document.querySelector('.profile__add-button');
//popup-ы--------------------------------------------------------------------

const popupImageLink = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');

function editProfile(nameInputs, infoInputs, userName, userInfo) {
	nameInputs.value = userName.textContent;
	infoInputs.value = userInfo.textContent;
}

function openPopupImage(name, link) {
	openPopup(popupImage, unlock, timeout);
	popupImageLink.src = link;
	popupImageLink.alt = name;
	popupImageTitle.textContent = name;
}

//Вставляем карточки с файлика cards.js
initialCards.forEach(({name, link}) => {
	cardList.append(createCard(name, link, deleteCard, openPopupImage));
});
//Вставляем карточки с файлика cards.js

//повесили слушетели на нажатие кнопок
popupProfileButtons.addEventListener('click', () => {
	openPopup(popupEdit, unlock, timeout, editForm);
});

popupPostButtons.addEventListener('click', () => {
	openPopup(popupNewCard, unlock, timeout, addForm);
});

//повесили слушетели на нажатие кнопок

//повесили слушетели на submit добавления карточки
addForm.addEventListener('submit', (e) => {
	cardList.prepend(createCard(addForm['place-name'].value, addForm['link'].value, deleteCard, openPopupImage));

	closePopup(popupNewCard, true, unlock, timeout);
	e.preventDefault();
	addForm.reset();
});
//повесили слушетели на submit добавления карточки

editProfile(nameInputs, infoInputs, userName, userInfo)

editForm.addEventListener('submit', (e) => {
	userName.textContent = nameInputs.value;
	userInfo.textContent = infoInputs.value;

	closePopup(popupEdit, true, unlock, timeout);
	e.preventDefault();
});