import {initialCards} from './cards.js';
import { openModal } from './newModal.js';
import { edit } from './edit.js';

openModal(edit);

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
	cardImage.addEventListener('click', cardPopup);

	return cardItem;
}

// @todo: Функция удаления карточки
export function cardDelete(event) {
	event.currentTarget.parentElement.remove();
}

function cardLike(event) {
	if(event.target.classList.contains('card__like-button')) {
		event.target.classList.toggle('card__like-button_is-active');
	}
}

function cardPopup(e) {
	if(e.target.classList.contains('card__image')) {
		openModal(edit);
	}
}

// @todo: Вывести карточки на страницу
initialCards.forEach(({name, link}) => {
	cardList.append(cardCreate(name, link, cardDelete, cardLike));
});


const addForm = document.forms['new-place'];
const body = document.querySelector('body');

addForm.addEventListener('submit', (e) => {
	cardList.prepend(cardCreate(addForm['place-name'].value, addForm['link'].value, cardDelete));

	e.target.closest('.popup').classList.remove('popup_is-opened');
	body.classList.remove('lock');
	e.preventDefault();
	addForm.reset()
});
