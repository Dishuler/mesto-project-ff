import { likeCard, deleteLikeCard } from "./api";

function createCard(card, handleClick, deleteUserCard, profileId, addLikeCardHand) {
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

	likeButton.addEventListener('click', (e) => {
		addLikeCardHand(card, likeCounter, e);
	});
	
	
	if (checkMyLike(card, profileId)) {
		likeButton.classList.add('card__like-button_is-active');
	} else {
		likeButton.classList.remove('card__like-button_is-active');
	}

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

function checkMyLike(card, profileId) {
	return card.likes.some((item) => item._id === profileId);
}

function addLikeCard(card, likeCounter, e) {
	if(e.target.classList.contains('card__like-button')) {
		if (e.target.closest('.card__like-button').matches(".card__like-button_is-active")) {
			deleteLikeCard(card._id)
				.then((res) => {
					likeCounter.textContent = res.likes.length;
					card.likes = res.likes;
					e.target.classList.remove('card__like-button_is-active');
				})
				.catch((error) => {
					console.error('Проблемка при снятии лайка', error);
				});
		} else {
			likeCard(card._id)
				.then((res) => {
					likeCounter.textContent = res.likes.length;
					card.likes = res.likes;
					e.target.classList.add('card__like-button_is-active');
				})
				.catch((error) => {
					console.log('Проблемка при лайке', error);
				});
		}
	}
}

export { createCard, addLikeCard }