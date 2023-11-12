// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
const cardCreate = (name, link, cardDelete) => {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardItem.querySelector('.card__delete-button');

	const cardImage = cardItem.querySelector('.card__image');
	cardImage.src = link;
	cardImage.alt = name;
	cardItem.querySelector('.card__title').textContent = name;

	deleteButton.addEventListener('click', cardDelete);

	return cardItem;
}

// @todo: Функция удаления карточки
const cardDelete = (event) => {
	event.currentTarget.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(({name, link}) => {
	cardList.append(cardCreate(name, link, cardDelete));
	console.log(name);
});