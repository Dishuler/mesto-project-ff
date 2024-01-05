//задание другого проекта
//const showInputError = (formElement, inputElement, errorMessage) => {
// 	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
// 	console.log(errorElement)
// 	inputElement.classList.add('form__input_type_error');
// 	errorElement.textContent = errorMessage;
// 	errorElement.classList.add('form__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
// 	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
// 	console.log(errorElement)
// 	inputElement.classList.remove('form__input_type_error');
// 	errorElement.classList.remove('form__input-error_active');
// 	errorElement.textContent = '';
// };

// const toggleButtonState = (inputList, buttonElement) => {
// 	if(hasInvalidInput(inputList)) {
// 		buttonElement.disabled = true;
// 		buttonElement.classList.add('button_inactive');
// 	} else {
// 		buttonElement.disabled = false;
// 		buttonElement.classList.remove('button_inactive');
// 	}
// }

// const checkInputValidity = (formElement, inputElement) => {
// 	if (!inputElement.validity.valid) {
// 		showInputError(formElement, inputElement, inputElement.validationMessage);
// 	} else {
// 		hideInputError(formElement, inputElement);
// 	}
// };

// const setEventListeners = (formElement, inputList) => {
// 	const buttonElement = formElement.querySelector('.button');
// 	toggleButtonState(inputList, buttonElement); 

// 	inputList.forEach((inputElement) => {
// 		inputElement.addEventListener('input', function () {
// 			checkInputValidity(formElement, inputElement);
// 			toggleButtonState(inputList, buttonElement);
// 		});
// 	});
// };

// const enableValidation = () => {
// 	const formList = Array.from(document.querySelectorAll('.popup__form'));
// 		formList.forEach((formElement) => {
// 			formElement.addEventListener('submit', function (evt) {
// 				evt.preventDefault();
// 			});

// 		const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

// 		setEventListeners(formElement, inputList);
// 	});
	
// };

// const hasInvalidInput = (inputList) => {
// 	return inputList.some((inputElement) => {
// 		return !inputElement.validity.valid;
// 	});
// }

// enableValidation();