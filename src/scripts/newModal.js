import { edit } from './card';

function openPopup(curentPopup, unlock, timeout, curentForm, e) {
	if(curentPopup && unlock) {
		if(!curentPopup) {
			closePopup(curentPopup, false, unlock, timeout);
		} else {
			curentPopup.classList.add('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
			lockBody(unlock, timeout);
		}

		if(curentPopup.matches('.popup_type_edit')) {
			edit(curentPopup, unlock, timeout, curentForm);
		} else if(curentPopup.matches('.popup_type_image')) {
			const cardLink = e.target.src
			const cardDescription = e.target.alt;

			const popupImage = curentPopup.querySelector('.popup__image');
			const popupTitle = curentPopup.querySelector('.popup__caption');
				
			popupImage.src = cardLink;
			popupImage.alt = cardDescription;
			popupTitle.textContent = cardDescription;
		}

		function close(e) {
			if(!e.target.closest('.popup__content')) {
				closePopup(e.target.closest('.popup'), true, unlock, timeout);
			} else if((e.target.closest('.popup__close'))) {
				closePopup(curentPopup, true, unlock, timeout);
			}
		}

		function closeOnEsc(e) {
			if (e.which === 27) {
				closePopup(curentPopup, true, unlock, timeout);
			}
		}

		curentPopup.addEventListener('click', close);
		document.addEventListener('keydown', closeOnEsc);
	}
}

function closePopup(curentPopup, doUnlock = true, unlock, timeout) {
	if(unlock) {
		curentPopup.classList.remove('popup_is-opened');

		if (doUnlock) {
			unlockBody(unlock, timeout);
		}
	}
	curentPopup.removeEventListener('click', close);
}

function lockBody(unlock, timeout) {
	const body = document.querySelector('body');
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function unlockBody(unlock, timeout) {
	const body = document.querySelector('body');
	setTimeout(function () {
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

export { openPopup, closePopup }


//ещё нужно прикрутить удаление событий при закрытии и добавление при открытии