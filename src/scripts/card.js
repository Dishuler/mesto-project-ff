import { closePopup } from "./newModal";

function createCard(name, link, deleteCard) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardItem.querySelector('.card__delete-button');
	const cardList = document.querySelector('.places__list');

	const cardImage = cardItem.querySelector('.card__image');
	cardImage.src = link;
	cardImage.alt = name;
	cardItem.querySelector('.card__title').textContent = name;

	deleteButton.addEventListener('click', deleteCard);
	cardList.addEventListener('click', likeCard);

	return cardItem;
}

function deleteCard(e) {
	e.currentTarget.parentElement.remove();
}

function likeCard(e) {
	if(e.target.classList.contains('card__like-button')) {
		e.target.classList.toggle('card__like-button_is-active');
	}
}

function edit(curentPopup, unlock, timeout, editForm) {
	const nameInputs = editForm.name;
	const infoInputs = editForm.description;

	const userName = document.querySelector('.profile__title');
	const userInfo = document.querySelector('.profile__description'); 

	nameInputs.value = userName.textContent;
	infoInputs.value = userInfo.textContent;

	editForm.addEventListener('submit', (e) => {
		userName.textContent = nameInputs.value;
		userInfo.textContent = infoInputs.value;

		closePopup(curentPopup, true, unlock, timeout);
		e.preventDefault();
	});
}

export {createCard, deleteCard, likeCard, edit}