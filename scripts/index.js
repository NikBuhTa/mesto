const popupElement = document.querySelector('.popup');
const popupOpenVisibility = document.querySelector('.profile__button-edit');
const popupCloseVisibility = popupElement.querySelector('.popup__button');
const formElement = popupElement.querySelector('.form');

let nameInput = formElement.querySelector('.form__input_class_name');
let jobInput = formElement.querySelector('.form__input_class_status');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__status');

/* like button */ /*
let cardButton = document.querySelectorAll('.card__button');

for (let i = 0 ; i < cardButton.length; i ++) {
    cardButton[i].addEventListener('click', function() {
        if (cardButton[i].className.length < 13) {
            cardButton[i].classList.add('card__button_active');
        } else {
            cardButton[i].classList.remove('card__button_active');     
        }
     });
 } */

/* open/close popup */
popupOpenVisibility.addEventListener('click', function() {
    popupElement.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

popupCloseVisibility.addEventListener('click', function() {
    popupElement.classList.remove('popup_open');
});

/* submit */

function formSubmitHandler(event) {
	event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_open');
}

formElement.addEventListener('submit', formSubmitHandler);