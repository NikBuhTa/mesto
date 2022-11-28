//Загрузка массива с карточками
import initialCards from './cards.js';

const templateCard = document.querySelector('#card');
const cardsList = document.querySelector('.cards');

//Функции закрытия и открытия попапов
function openPopup(element) {
    element.classList.add('popup_open');
};

function closePopup(element) {
    element.classList.remove('popup_open');
}

//Заполнение попапа с картинкой из блока card
function renderCardImage(item) {
    const cardImageTitle = popupElementImage.querySelector('.popup__subtitle');
    const cardImageImage = popupElementImage.querySelector('.popup__image');
    const cardImageCloseButton = popupElementImage.querySelector('.popup__button');

    cardImageTitle.textContent = item.name;
    cardImageImage.src = item.link;
    cardImageImage.alt = item.name;

    cardImageCloseButton.addEventListener('click', function() {
        closePopup(popupElementImage);
    });
};

//Функция создания блока card
function createCard(item) {
    const templateCardElement = templateCard.content.querySelector('.card').cloneNode(true);
    const templateCardTitle = templateCardElement.querySelector('.card__name');
    const templateCardImage = templateCardElement.querySelector('.card__image');
    const templateCardDelButton = templateCardElement.querySelector('.card__delete-button');
    const templateCardLikeButton = templateCardElement.querySelector('.card__button');

    templateCardDelButton.addEventListener('click', function(e) {
        e.target.closest('.card').remove();
    })

    templateCardLikeButton.addEventListener('click', function(e) { //функция лайка/дизлайка
        e.target.classList.toggle('card__button_active');
    })

    templateCardImage.addEventListener('click', function() {
        renderCardImage(item);
        openPopup(popupElementImage);
    })

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

//Здесь доступные попапы\\
const popupElementCard = document.querySelector('#newCard');
const popupElementEdit = document.querySelector('#aboutProfile');
const popupElementImage = document.querySelector('#fullCardImage');

// Открытие\submit\закрытте попапа "Редактирование профиля" \\
const openEditFormButton = document.querySelector('.profile__button-edit');
const EditForm = popupElementEdit.querySelector('.form');
const closeEditFormButton = popupElementEdit.querySelector('.popup__button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const nameInput = popupElementEdit.querySelector('.form__input_class_name');
const statusInput = popupElementEdit.querySelector('.form__input_class_status');

//Открытие
openEditFormButton.addEventListener('click', function() {
    openPopup(popupElementEdit);
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});
//Закрытие
closeEditFormButton.addEventListener('click', function() {
    closePopup(popupElementEdit);
})
//submit
EditForm.addEventListener('submit', function(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupElementEdit);
})

// Открытие\submit\закрытие попапа "Новое место" \\
const openCardFormButton = document.querySelector('.profile__button-add');
const CardForm = popupElementCard.querySelector('.form');
const closeCardFormButton = popupElementCard.querySelector('.popup__button');

//Открытие
openCardFormButton.addEventListener('click', function() {
    openPopup(popupElementCard);
});
//Закрытие
closeCardFormButton.addEventListener('click', function() {
    CardForm.reset()
    closePopup(popupElementCard);
});
//submit

const newCard = [{
    name: '',
    link: ''
}];

CardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titleInput = popupElementCard.querySelector('input[name="title"]');
    const urlInput = popupElementCard.querySelector('input[name="url"]');

    newCard.name = titleInput.value;
    newCard.link = urlInput.value;
    
    renderCard(newCard);
    closePopup(popupElementCard);
    
    CardForm.reset()
});

//Оторбажаем карточки из массива.
initialCards.forEach(renderCard);