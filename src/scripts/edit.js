export function edit() {
		const editForm = document.forms['edit-profile'];
		const nameInputs = editForm.name;
		const infoInputs = editForm.description;
		const userName = document.querySelector('.profile__title');
		const userInfo = document.querySelector('.profile__description');
		const body = document.querySelector('body');
	
		nameInputs.value = userName.textContent;
		infoInputs.value = userInfo.textContent;
	
		function change(nameValue, infoValue) {
			userName.textContent = nameValue;
			userInfo.textContent = infoValue;
		}
	
		editForm.addEventListener('submit', replace);
		function replace(e) {
			change(nameInputs.value, infoInputs.value);
	
			e.target.closest('.popup').classList.remove('popup_is-opened');
			body.classList.remove('lock');
			e.preventDefault();
			e.target.removeEventListener('click', replace);
		}
}