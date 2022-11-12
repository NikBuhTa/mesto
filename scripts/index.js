/* open/close popup */
const popupElement = document.querySelector('.popup');
const popupOpenVisibility = document.querySelector('.profile__button-edit');
const popupCloseVisibility = popupElement.querySelector('.popup__button');

/* function popupOpen () {
    popupElement.classList.toggle('popup_open');
} */

popupOpenVisibility.addEventListener('click', function() {
    popupElement.classList.toggle('popup_open');
});

popupCloseVisibility.addEventListener('click', function() {
    popupElement.classList.toggle('popup_open');
});

/* submit */
const formElement = popupElement.querySelector('.form');

function formSubmitHandler(event) {
	event.preventDefault();
	let nameInput = formElement.querySelector('.form__input_class_name');
	let jobInput = formElement.querySelector('.form__input_class_status');

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
	
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__status');

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
    popupElement.classList.toggle('popup_open')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);