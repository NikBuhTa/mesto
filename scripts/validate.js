const toValidate = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_unactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

const showValidationError = (formElement, inputElement, errorMessage, arr) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${arr.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${arr.errorClass}`);
};

const hideValidationError =  (formElement, inputElement, arr) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(`${arr.inputErrorClass}`);
    errorElement.classList.remove(`${arr.errorClass}`);
};

const checkInputValidity = (formElement, inputElement, arr) => {
    if(!inputElement.validity.valid) {
        showValidationError(formElement, inputElement, inputElement.validationMessage, arr);
    } else {
        hideValidationError(formElement, inputElement, arr);
    }
};

const setEventListeners = (formElement, arr) => {
    const inputList = Array.from(formElement.querySelectorAll(`${arr.inputSelector}`));
    const buttonElement = formElement.querySelector(`${arr.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement, arr);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, arr);
            toggleButtonState(inputList, buttonElement, arr);
        });
    });
};

const enableValidation = (arr) => {
    const formList = Array.from(document.querySelectorAll(`${arr.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement, arr);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
/* */
const toggleButtonState = (inputList, buttonElement, arr) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${arr.inactiveButtonClass}`);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(`${arr.inactiveButtonClass}`);
        buttonElement.removeAttribute('disabled');
    };
};

const turnOffButtonForOpenPopupNewCard = (formElement, arr) => {
    const buttonElement = formElement.querySelector(`${arr.submitButtonSelector}`);
    buttonElement.classList.add(`${arr.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
}

const turnOnSubmitButton = (formElement, arr) => {
    const buttonElement = formElement.querySelector(`${arr.submitButtonSelector}`);
    buttonElement.classList.remove(`${arr.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled', true);
}

const hideValidationErrorForOpenPopup = (formElement, arr) => {
    const listInputsCurrentPopup = Array.from(formElement.querySelectorAll(`${arr.inputSelector}`));
    listInputsCurrentPopup.forEach((inputElement) => {
        hideValidationError(formElement, inputElement, arr);
    });
}

enableValidation(toValidate);