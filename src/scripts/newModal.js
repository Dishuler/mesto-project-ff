function close(e) {
	if (e.which === 27) {
		console.log(document.querySelector('.popup_is-opened'));
		closePopup(document.querySelector('.popup_is-opened'));
	} else if(!e.target.closest('.popup__content')) {
		console.log(e.target.closest('.popup'));
		closePopup(e.target.closest('.popup'));
	} else if((e.target.closest('.popup__close'))) {
		console.log(e.target.closest('.popup'));
		closePopup(e.target.closest('.popup'));
	}
}

function openPopup(curentPopup, unlock, timeout, e) {
	if(curentPopup && unlock) {
		if(!curentPopup) {
			closePopup(curentPopup, false, unlock, timeout);
		} else {
			curentPopup.classList.add('popup_is-opened');
			curentPopup.classList.add('popup_is-animated');
			lockBody(unlock, timeout);
			curentPopup.addEventListener('click', close);
			document.addEventListener('keydown', close);
		}
	}
}

function closePopup(curentPopup, doUnlock = true, unlock = true, timeout = 600) {
	if(curentPopup !== null && unlock) {
		curentPopup.classList.remove('popup_is-opened');

		if (doUnlock) {
			unlockBody(unlock, timeout);
		}
		
		curentPopup.removeEventListener('click', close);
		curentPopup.removeEventListener('click', close);
	}
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

function editProfile(nameInputs, infoInputs, userName, userInfo) {
	nameInputs.value = userName.textContent;
	infoInputs.value = userInfo.textContent;
}

export { openPopup, closePopup, editProfile }


//ещё нужно прикрутить удаление событий при закрытии и добавление при открытии