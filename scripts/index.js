//Загрузка массива с карточками
import initialCards from './cards.js';

//Переменные
const templateCard = document.querySelector('#card');
const cardsList = document.querySelector('.cards');

//Здесь доступные попапы\\
const popupElementCard = document.querySelector('#newCard');
const popupElementEdit = document.querySelector('#aboutProfile');
const popupElementImage = document.querySelector('#fullCardImage');

// Открытие\submit\закрытте попапа "Редактирование профиля" \\
const buttonOpenPopupEditProfile = document.querySelector('.profile__button-edit');
const editForm = popupElementEdit.querySelector('.form');
const buttonClosePopupEditProfile = popupElementEdit.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const nameInput = popupElementEdit.querySelector('.form__input_class_name');
const statusInput = popupElementEdit.querySelector('.form__input_class_status');

//попап с картинкой \закрытие
const buttonClosePopupCardImage = popupElementImage.querySelector('.popup__button');

//Для функции fillBugImagePopup
const cardImageTitle = popupElementImage.querySelector('.popup__subtitle');
const cardImageImage = popupElementImage.querySelector('.popup__image');

// Открытие\submit\закрытие попапа "Новое место" \\
const buttonOpenPopupNewCard = document.querySelector('.profile__button-add');
const cardForm = popupElementCard.querySelector('.form');
const buttonClosePopupNewCard = popupElementCard.querySelector('.popup__button');

//ФУНКЦИИ
//Функции закрытия и открытия попапов
function openPopup(element) {
    element.classList.add('popup_open');
    eventListenerPressButtonEsc();
    element.addEventListener('click', clickHandlerOverlay);
};

function closePopup(element) {
    element.classList.remove('popup_open');
    window.removeEventListener('keydown', closeHandlerButton);
    const listInputs = Array.from(element.querySelectorAll('.form__input'));
    listInputs.forEach((inputElement) => {
        hideValidationError(element, inputElement, toValidate);
    })
}

//Закрытие через клик по оверлею
const clickHandlerOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(document.querySelector('.popup_open'));
    }
}

//закрытие через ESC
const closeHandlerButton = (item) => {
    if (item.key === 'Escape') {
        closePopup(document.querySelector('.popup_open'));
    };
};

const eventListenerPressButtonEsc = () => {
    window.addEventListener('keydown', closeHandlerButton)
};
//

//Заполнение попапа с картинкой из .card
function fillBigImagePopup(item) {
    cardImageTitle.textContent = item.name;
    cardImageImage.src = item.link;
    cardImageImage.alt = item.name;
};

//Функция создания элемента .card
function createCard(item) {
    const templateCardElement = templateCard.content.querySelector('.card').cloneNode(true);
    const templateCardTitle = templateCardElement.querySelector('.card__name');
    const templateCardImage = templateCardElement.querySelector('.card__image');
    const templateCardDelButton = templateCardElement.querySelector('.card__delete-button');
    const templateCardLikeButton = templateCardElement.querySelector('.card__button');

    templateCardDelButton.addEventListener('click', function(e) {
        templateCardElement.remove();
    });

    templateCardLikeButton.addEventListener('click', function(e) { //функция лайка/дизлайка
        e.target.classList.toggle('card__button_active');
    });

    templateCardImage.addEventListener('click', function() {
        fillBigImagePopup(item);
        openPopup(popupElementImage);
    });

    templateCardTitle.textContent = item.name;
    templateCardImage.src = item.link;
    templateCardImage.alt = item.name;

    return templateCardElement;
};

//Функция размещения блока card
function renderCard(item) {
    const newCard = createCard(item);
    cardsList.prepend(newCard);
};

const fillEditForm = () => {
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

const openPopupNewCard = () => {
    openPopup(popupElementCard);
    cardForm.reset();
    turnOffButtonForOpenPopupNewCard(cardForm, toValidate);
}

const submitEditForm = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupElementEdit);
}

/* СЛУШАТЕЛИ */
//Открытие попапа "Редактировать профиль"
buttonOpenPopupEditProfile.addEventListener('click', function() {
    openPopup(popupElementEdit);
    fillEditForm();
    turnOnSubmitButton(popupElementEdit, toValidate);
});
//Закрытие попапа "Редактировать профиль"
buttonClosePopupEditProfile.addEventListener('click', function() {
    closePopup(popupElementEdit);
})
//submit попапа "Редактировать профиль"
editForm.addEventListener('submit', submitEditForm);

//Открытие попапа "Новое место"
buttonOpenPopupNewCard.addEventListener('click', openPopupNewCard);

//Закрытие попапа "Новое место"
buttonClosePopupNewCard.addEventListener('click', function() {
    closePopup(popupElementCard);
});

//submit попапа "Новое место"
cardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newCard = {
        name: '',
        link: ''
    };

    const titleInput = popupElementCard.querySelector('input[name="title"]');
    const urlInput = popupElementCard.querySelector('input[name="url"]');

    newCard.name = titleInput.value;
    newCard.link = urlInput.value;
    
    renderCard(newCard);
    closePopup(popupElementCard);
});

//Закрытие попапа с развернутой картинкой
buttonClosePopupCardImage.addEventListener('click', function() {
    closePopup(popupElementImage);
});

//Оторбажаем карточки из массива.
initialCards.forEach(renderCard);

//заполняем поля в попапа для того, чтобы при первоначальной загрузке страницы была активна submit 
fillEditForm();