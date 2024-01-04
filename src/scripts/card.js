function createCard(name, link, deleteCard, handleClick) {
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

	cardImage.addEventListener('click', () => handleClick(cardImage.alt, cardImage.src))

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

export {createCard, deleteCard}