import {initialCards} from './cards.js';
import { popupOpen, popupClose, bodyLock } from './newModal.js';

const body = document.querySelector('body');

//Кнопки попапов(open/close)
const popupButtons = document.querySelectorAll('section button');
const closePopup = document.querySelectorAll('.popup__close');
//Кнопки попапов

//Форма добавление карточки
const addForm = document.forms['new-place'];
//Форма добавление карточки

//элементы плокировки body
let unlock = true;
const timeout = 600;
//элементы плокировки body

// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');
// @todo: DOM узлы


// @todo: Функция создания карточки
export function cardCreate(name, link, cardDelete) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardItem.querySelector('.card__delete-button');

	const cardImage = cardItem.querySelector('.card__image');
	cardImage.src = link;
	cardImage.alt = name;
	cardItem.querySelector('.card__title').textContent = name;

	deleteButton.addEventListener('click', cardDelete);
	cardList.addEventListener('click', cardLike);
	cardImage.addEventListener('click', popupCard);

	return cardItem;
}
// @todo: Функция создания карточки

// @todo: Функция редактирования профиля
function edit() {
	const editForm = document.forms['edit-profile'];
	const nameInputs = editForm.name;
	const infoInputs = editForm.description;
	const userName = document.querySelector('.profile__title');
	const userInfo = document.querySelector('.profile__description');
	const body = document.querySelector('body');

	nameInputs.value = userName.textContent;
	infoInputs.value = userInfo.textContent;

	function change(nameValue, infoValue) {
		userName.textContent = nameValue;
		userInfo.textContent = infoValue;
	}

	editForm.addEventListener('submit', replace);
	function replace(e) {
		change(nameInputs.value, infoInputs.value);

		e.target.closest('.popup').classList.remove('popup_is-opened');
		body.classList.remove('lock');
		e.preventDefault();
		e.target.removeEventListener('click', replace);
	}
}
// @todo: Функция редактирования профиля

// @todo: Функция удаления карточки
function cardDelete(event) {
	event.currentTarget.parentElement.remove();
}
// @todo: Функция удаления карточки

// @todo: Функция лайка
function cardLike(event) {
	if(event.target.classList.contains('card__like-button')) {
		event.target.classList.toggle('card__like-button_is-active');
	}
}
// @todo: Функция лайка

// @todo: Вывести карточки на страницу
initialCards.forEach(({name, link}) => {
	cardList.append(cardCreate(name, link, cardDelete, cardLike));
});
// @todo: Вывести карточки на страницу


function popupCard(e) {
	const cards = document.querySelectorAll('.card__image');
	if(e.target.classList.contains('card__image')) {
		if(cards.length > 0) {
			for (let index = 0; index < cards.length; index++) {
				const card = cards[index];
		
				card.addEventListener('click', (e) => {
					const curentPopup =  document.querySelector('.popup_type_image');
					const cardLink = card.src;
					const cardDescription = card.alt;

		
					if(curentPopup && unlock) {
						const popupActive = document.querySelector('.popup.popup_is-opened');
						
						if(curentPopup.getAttribute('class').includes('popup_type_image')) {
							const popupImage = curentPopup.querySelector('.popup__image');
							const popupTitle = curentPopup.querySelector('.popup__caption');
				
							popupImage.src = cardLink;
							popupImage.alt = cardDescription;
							popupTitle.textContent = cardDescription;
				
							curentPopup.classList.add('popup_is-opened');
							curentPopup.classList.add('popup_is-animated');
						}
				
						if(popupActive) {
							popupClose(popupActive, false, unlock, timeout);
						} else {
							curentPopup.classList.add('popup_is-opened');
							curentPopup.classList.add('popup_is-animated');
							bodyLock(unlock, timeout);
						}
				
						curentPopup.addEventListener('click', (e) => {
							if(!e.target.closest('.popup__content')) {
								popupClose(e.target.closest('.popup'), true, unlock, timeout);
							}
						});
					}
		
					e.preventDefault();
				});
			}
		}
	}
}

if (popupButtons.length > 0) {
	for (let index = 0; index < popupButtons.length; index++) {
		const popupButton = popupButtons[index];

		popupButton.addEventListener('click', (e) => {
			const popupName = document.querySelectorAll('.popup');
			const curentPopup = popupName[index];

			popupOpen(curentPopup, edit, unlock, timeout);

			e.preventDefault();
		});
	}
}

if (closePopup.length > 0) {
	for (let index = 0; index < closePopup.length; index++) {
		const closeElement = closePopup[index];

		closeElement.addEventListener('click', (e) => {
			popupClose(closeElement.closest('.popup'), true, unlock, timeout);
			e.preventDefault();
		});
	}
}

body.addEventListener('keydown', (e) => {
	const popups = document.querySelectorAll('.popup_is-opened');
	const popupActive = document.querySelector('.popup_is-opened');
	if(popups.length > 0) {
		if (e.which === 27) {
			popupClose(popupActive, true, unlock, timeout);
		}
	}
});

addForm.addEventListener('submit', (e) => {
	cardList.prepend(cardCreate(addForm['place-name'].value, addForm['link'].value, cardDelete));

	e.target.closest('.popup').classList.remove('popup_is-opened');
	body.classList.remove('lock');
	e.preventDefault();
	addForm.reset()
});