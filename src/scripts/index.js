import { openPopup, closePopup } from './newModal.js';
import { createCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getDataUser, getDataCards, changeUserData, addCard, deleteUserCard, changeUserPhoto } from './api.js';

let profileId = '';

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
const errorForm = document.forms['delete-card'];
const popupUserPhotoForm = document.forms['photo-change'];

const nameInputs = editForm.name;
const infoInputs = editForm.description;

const userName = document.querySelector('.profile__title');
const userInfo = document.querySelector('.profile__description');
const userImage = document.querySelector('.profile__image');
//Формы

//popup-ы--------------------------------------------------------------------
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupEditButton = popupEdit.querySelector('.popup__button');
const popupNewCardButton = popupNewCard.querySelector('.popup__button');

//Кнопки открытия попапов
const popupCardDelete = document.querySelector('.popup_delete_card');
const popupButton = document.querySelector('.popup__button');
const popupProfileButtons = document.querySelector('.profile__edit-button');
const popupPostButtons = document.querySelector('.profile__add-button');
//popup-ы--------------------------------------------------------------------

const popupImageLink = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');

//Элементы попапа сменны фото полбзователя
const popupUserPhoto = document.querySelector('.popup_type_edit-photo');
const popupUserPhotoInput = popupUserPhotoForm.querySelector('.popup__input_type_user-photo-url');
const popupUserPhotoButton = popupUserPhoto.querySelector('.popup__button');
//Элементы попапа сменны фото полбзователя

const validationSettings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
};

//валидация
enableValidation(validationSettings);
//валидация


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


//Смена фото пользователь
popupUserPhotoForm.addEventListener('submit', (e) => {
	const buttonStatus = editForm.textContent;
	popupUserPhotoButton.textContent = 'Сохранение...';

	changeUserPhoto(popupUserPhotoInput.value)
		.then((userData) => {
			userImage.style.backgroundImage = `url(${userData.avatar})`;
			closePopup(popupUserPhoto);
		})
		.catch((error) => console.log('Ошибка загрузки данных. Код 3:', error))
		.finally(() => (popupUserPhotoButton.textContent = buttonStatus));

	clearValidation(popupUserPhotoForm, validationSettings);
	e.preventDefault();
});

userImage.addEventListener('click', () => {
	popupUserPhotoInput.value = userImage.style.backgroundImage.replace(/url\(['']?(.*?)['']?\)/, '$1');
	openPopup(popupUserPhoto);
	clearValidation(popupUserPhotoForm, validationSettings)
});
//Смена фото пользователь


//Удаление карточки пользователь
function deleteIOwnCard(cards) {
	openPopup(popupCardDelete);
	popupButton.id = cards._id;
}

errorForm.addEventListener('submit', (e) => {
	const cardId = popupButton.id;
	deleteUserCard(cardId)
		.then(() => {
			const curentCard = document.getElementById(`${cardId}`);
			curentCard.remove();
			popupButton.id = '';
			closePopup(popupCardDelete);
		})
		.catch((error) => console.log('Ошибка удаленния данных. Код 4:', error));

	e.preventDefault();
});
//Удаление карточки пользователь


//Собираем два fetch в один promise для загрузки карточек и данных пользователя 
Promise.all([getDataUser(), getDataCards()])
	.then(([userData, cardsData]) => {
		profileId = userData._id;
		userName.textContent = userData.name;
		userInfo.textContent = userData.about;

		userImage.style.backgroundImage = `url(${userData.avatar})`;

		cardsData.forEach((card) => {
			cardList.append(createCard(card, openPopupImage, deleteIOwnCard, profileId));
		})
	})
	.catch((error) => console.log('Ошибка загрузки данных. Код 1:', error));
//Собираем два fetch в один promise для загрузки карточек и данных пользователя



//повесили слушетели на нажатие кнопок
popupProfileButtons.addEventListener('click', () => {
	editProfile(nameInputs, infoInputs, userName, userInfo)
	openPopup(popupEdit, unlock, timeout, editForm);
	clearValidation(editForm, validationSettings);
});

popupPostButtons.addEventListener('click', () => {
	openPopup(popupNewCard, unlock, timeout, addForm);
	clearValidation(addForm, validationSettings);
});
//повесили слушетели на нажатие кнопок

//повесили слушетели на submit добавления карточки
addForm.addEventListener('submit', (e) => {
	const buttonStatus = popupNewCardButton.textContent;
	popupNewCardButton.textContent = 'Сохранение...';
	addCard(addForm['place-name'].value, addForm['link'].value)
	.then((card) => {
		cardList.prepend(createCard(card, openPopupImage, deleteIOwnCard, profileId));
		closePopup(popupNewCard, true, unlock, timeout);
		addForm.reset();
	})
	.catch((error) => console.log('Ошибка загрузки данных. Код 3:', error))
	.finally(() => popupNewCardButton.textContent = buttonStatus)

	clearValidation(addForm, validationSettings);
	e.preventDefault();
});
//повесили слушетели на submit добавления карточки

editForm.addEventListener('submit', (e) => {
	const buttonStatus = popupEditButton.textContent;
	popupEditButton.textContent = 'Сохранение...';

	changeUserData(nameInputs.value, infoInputs.value)
	.then((userData) => {
		userName.textContent = userData.name;
		userInfo.textContent = userData.about;
		closePopup(popupEdit, true, unlock, timeout);
	})
	.catch((error) => console.log('Ошибка загрузки данных. Код 2:', error))
	.finally(() => popupEditButton.textContent = buttonStatus)

	clearValidation(editForm, validationSettings);
	e.preventDefault();
});
