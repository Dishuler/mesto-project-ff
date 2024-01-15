function showInputError(formElement, inputElement, errorMessage, validationSettings) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(`${validationSettings.inputErrorClass}`);
	errorElement.classList.add(`${validationSettings.errorClass}`);
	errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, validationSettings) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(`${validationSettings.inputErrorClass}`);
	if(errorElement) {
		errorElement.classList.remove(validationSettings.errorClass);
		errorElement.textContent = '';
	}
};

function checkInputValidity(formElement, inputElement, validationSettings) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
	} else {
		hideInputError(formElement, inputElement, validationSettings);
	}
};

function setEventListeners(formElement, validationSettings) {
	const inputList = Array.from(formElement.querySelectorAll(`${validationSettings.inputSelector}`));
	const buttonElement = formElement.querySelector(`${validationSettings.submitButtonSelector}`);

	toggleButtonState(inputList, buttonElement, validationSettings);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement, validationSettings);
			toggleButtonState(inputList, buttonElement, validationSettings);
		});
	});
};

function enableValidation(validationSettings) {
	const formList = Array.from(document.querySelectorAll(`${validationSettings.formSelector}`));

	formList.forEach((formElement) => {
		setEventListeners(formElement, validationSettings);
	});
};

function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

function toggleButtonState(inputList, buttonElement, validationSettings) {
	if(hasInvalidInput(inputList)) {
		console.log(buttonElement)
		buttonElement.disabled = true;
		buttonElement.classList.add(`${validationSettings.inactiveButtonClass}`);
	} else {
		console.log(buttonElement)
		buttonElement.disabled = false;
		buttonElement.classList.remove(`${validationSettings.inactiveButtonClass}`);
	}
};

function clearValidation(form, validationSettings) {
	const buttonElement = form.querySelector(`${validationSettings.submitButtonSelector}`);
	const inputList = Array.from(form.querySelectorAll(`${validationSettings.inputSelector}`));

	inputList.forEach((inputElement) => {
		hideInputError(form, inputElement, validationSettings);
	});
	toggleButtonState(inputList, buttonElement, validationSettings);
}

export { enableValidation, clearValidation };