// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
const cardCreate = (cardName, cardImage, cardDelete) => {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardItem.querySelector('.card__delete-button');

	const cardPicture = cardItem.querySelector('.card__image');
	cardPicture.src = cardImage;
	cardPicture.alt = cardName;
	cardItem.querySelector('.card__title').textContent = cardName;

	deleteButton.addEventListener('click', cardDelete);

	return cardItem;
}

// @todo: Функция удаления карточки
const cardDelete = (event) => {
	event.currentTarget.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItem) => {
	cardList.append(cardCreate(cardItem.name, cardItem.link, cardDelete));
});