import { likeCard, deleteLikeCard } from "./api";

function createCard(card, handleClick, deleteUserCard, profileId) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardItem.querySelector('.card__delete-button');

	const likeButton = cardItem.querySelector(".card__like-button");
	const likeCounter = cardItem.querySelector(".card__like-counter");

	const cardImage = cardItem.querySelector('.card__image');

	cardItem.id = card._id;
	cardImage.src = card.link;
	cardImage.alt = card.name;
	likeCounter.textContent = card.likes.length
	cardItem.querySelector('.card__title').textContent = card.name;

	handlerLike(card, likeButton, likeCounter);

	if (profileId !== card.owner["_id"]) {
		deleteButton.remove();
	} else {
		deleteButton.addEventListener("click", () => {
			deleteUserCard(card);
		});
	}

	cardImage.addEventListener('click', () => handleClick(cardImage.alt, cardImage.src))

	return cardItem;
}

function handlerLike(card, likeButton, likeCounter) {
	likeButton.addEventListener('click', (e) => {
		if(e.target.classList.contains('card__like-button')) {
			if (e.target.closest('.card__like-button').matches(".card__like-button_is-active")) {
				deleteLikeCard(card._id)
					.then((res) => {
						likeCounter.textContent = res.likes.length;
						card.likes = res.likes;
					})
					.catch((error) => {
						console.error('Проблемка при снятии лайка', error);
					});
			} else {
				likeCard(card._id)
					.then((res) => {
						likeCounter.textContent = res.likes.length;
						card.likes = res.likes;
					})
					.catch((error) => {
						console.log('Проблемка при лайке', error);
					});
			}

			e.target.classList.toggle('card__like-button_is-active');
		}
	});
}

export { createCard }