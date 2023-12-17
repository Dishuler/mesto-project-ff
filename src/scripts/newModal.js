export function openModal(edit) {
const popupButtons = document.querySelectorAll('section button');
const body = document.querySelector('body');
const cards = document.querySelectorAll('.card__image');

let unlock = true;
const timeout = 600;

if(cards.length > 0) {
	for (let index = 0; index < cards.length; index++) {
		const card = cards[index];

		card.addEventListener('click', (e) => {
			const curentPopup =  document.querySelector('.popup_type_image');
			const cardLink = card.src;
			const cardDescription = card.alt;

			popupImage(curentPopup, cardLink, cardDescription);

			e.preventDefault();
		});
	}
}

if (popupButtons.length > 0) {
	for (let index = 0; index < popupButtons.length; index++) {
		const popupButton = popupButtons[index];

		popupButton.addEventListener('click', (e) => {
			const popupName = document.querySelectorAll('.popup');
			const curentPopup = popupName[index];

			popupOpen(curentPopup, edit);

			e.preventDefault();
		});
	}
}

const closePopup = document.querySelectorAll('.popup__close');
if (closePopup.length > 0) {
	for (let index = 0; index < closePopup.length; index++) {
		const closeElement = closePopup[index];

		closeElement.addEventListener('click', (e) => {
			popupClose(closeElement.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupImage(curentPopup, cardLink, cardDescription) {
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
			popupClose(popupActive, false);
		} else {
			curentPopup.classList.add('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
			bodyLock();
		}

		curentPopup.addEventListener('click', (e) => {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupOpen(curentPopup, edit) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup_is-opened');
		
		if(curentPopup.getAttribute('class').includes('popup_type_edit')) {
			edit();
		}

		if(popupActive) {
			popupClose(popupActive, false);
		} else {
			curentPopup.classList.add('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
			bodyLock();
		}

		curentPopup.addEventListener('click', (e) => {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup_is-opened');

		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}



body.addEventListener('keydown', (e) => {
	const popups = document.querySelectorAll('.popup_is-opened');
	const popupActive = document.querySelector('.popup_is-opened');
	if(popups.length > 0) {
		if (e.which === 27) {
			popupClose(popupActive);
		}
	}
});
}
