function popupOpen(curentPopup, edit, unlock, timeout) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup_is-opened');
		
		if(curentPopup.getAttribute('class').includes('popup_type_edit')) {
			edit();
		}

		if(popupActive) {
			popupClose(popupActive, false, unlock, timeout);
		} else {
			curentPopup.classList.add('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
			bodyLock(unlock, timeout);
		}

		curentPopup.addEventListener('click', (e) => {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'), true, unlock, timeout);
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true, unlock, timeout) {
	if(unlock) {
		popupActive.classList.remove('popup_is-opened');

		if (doUnlock) {
			bodyUnlock(unlock, timeout);
		}
	}
}

function bodyLock(unlock, timeout) {
	const body = document.querySelector('body');
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock(unlock, timeout) {
	const body = document.querySelector('body');
	setTimeout(function () {
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

export { popupOpen, popupClose, bodyLock }