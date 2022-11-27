//Загрузка массива с карточками
import initialCards from './cards.js';

const templateCard = document.querySelector('#card');
const cardsList = document.querySelector('.cards');
const templateImagePopup = document.querySelector('#fullImage');
const footer = document.querySelector('.footer');

let popupImageCounter = [] //счетчик попапов с картинками
let cardElements = []; //счетчик блоков card
let number = 0; //Вспомогательная переменнная

//Создание попапа с карточкой

//Вспомогательные функции
//Функция ищет номер элемента массива, который соответствует условию
function searchAndIndex(array, counter, searchArg) {
    array.forEach(function(item, index) { //ищем тот блок, который имеет класс removable и сохраняем его index
        const cardClassList = item.classList;
        let hasOpened = false;
        cardClassList.forEach(function(item) {if (item === `${searchArg}`) return hasOpened = true});
        if (hasOpened === true) {
            counter = index;
        }
        return counter;
    });
    return counter;
};
//Функция создания карточки
function createCard(element) {
    const templateImagePopupElement = templateImagePopup.content.firstElementChild.cloneNode(true);
    const templateImagePopupTitle = templateImagePopupElement.querySelector('.popup__subtitle');
    const templateImagePopupImage = templateImagePopupElement.querySelector('.popup__image');
    const templateImagePopupButton = templateImagePopupElement.querySelector('.popup__button');

    templateImagePopupTitle.textContent = element.name;
    templateImagePopupImage.src = element.link;

    templateImagePopupButton.addEventListener('click', function(e){
        closePopup(templateImagePopupElement);
        cardElements.forEach(function(e, index) {
            if (number === index) {
                e.classList.remove('opened');
            }
        })
    });
    return templateImagePopupElement;
}
//Функция размещения карточки
function placeImagePopup(element) {
    const newCard = createCard(element);
    footer.after(newCard);
};

//Функция размещения новой карточки
function renderCard(item) {
    const templateCardElement = templateCard.content.firstElementChild.cloneNode(true);
    const templateCardTitle = templateCardElement.querySelector('.card__name');
    const templateCardImage = templateCardElement.querySelector('.card__image');
    const templateCardDelButton = templateCardElement.querySelector('.card__delete-button');
    const templateCardLikeButton = templateCardElement.querySelector('.card__button');

    templateCardDelButton.addEventListener('click', function(e) { //при удалении card происходит удаление соответствующего попапа
        e.target.closest('.card').classList.add('removable');
        cardElements = Array.from(document.querySelectorAll('.card'));
        number = searchAndIndex(cardElements, number, 'removable');
        if (number === 0) {
            popupImageCounter[0].remove();
        } else {
            popupImageCounter[number].remove();
        }
        e.target.closest('.card').remove();
        cardElements = Array.from(document.querySelectorAll('.card'));
        popupImageCounter = Array.from(document.querySelectorAll('.popup_opacity_image'));
        console.log(popupImageCounter)
    })

    templateCardLikeButton.addEventListener('click', function(e) { //функция лайка/дизлайка
        e.target.classList.toggle('card__button_active');
    })

    templateCardTitle.textContent = item.name;
    templateCardImage.src = item.link;
    templateCardImage.alt = item.name;

    placeImagePopup(item); //Ставим его здесь, поскольку дальше нам нужно точное кол-во блоков card
    cardsList.prepend(templateCardElement);
/* Происходит считывание элементов card и popupImage(попапов с картинкой) */
    popupImageCounter = Array.from(document.querySelectorAll('.popup_opacity_image'));
    cardElements = Array.from(document.querySelectorAll('.card'));
/* При клике на картинку происходит соответствие между картинкой, которая нажата и попапа с этой картинкой. */
    templateCardImage.addEventListener('click', function(e) {
        e.target.closest('.card').classList.add('opened'); //нажатому блоку card добавляем класс opened
        cardElements = Array.from(document.querySelectorAll('.card')); //считываем кол-во блоков card
        number = searchAndIndex(cardElements, number, 'opened'); //ищем тот блок, который имеет класс opened и сохраняем его index
        popupImageCounter[number].classList.add('popup_open'); //добавляем соответствующему попапу с картинкой класс для отображения.
    })

}

//Оторбажаем карточки из массива и создаем их попапы.
initialCards.forEach(renderCard);

//Здесь массив с доступными попапами\\
const popupElements = Array.from(document.querySelectorAll('.popup')); //Создаем массив попапов
const popupElementCard = popupElements[popupElements.length - 1];
const popupElementEdit = popupElements[popupElements.length - 2];

//Функции закрытия и открытия попапов
const openPopup = (element) => {
    element.classList.add('popup_open');
};

function closePopup(element) {
    element.classList.remove('popup_open');
}

// Открытие\submit\закрытте попапа "Редактирование профиля" \\
const openEditFormButton = document.querySelector('.profile__button-edit');
const submitEditForm = popupElementEdit.querySelector('.form');
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
submitEditForm.addEventListener('submit', function(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupElementEdit);
})

// Открытие\submit\закрытие попапа "Новое место" \\
const openCardFormButton = document.querySelector('.profile__button-add');
const submitCardForm = popupElementCard.querySelector('.form');
const closeCardFormButton = popupElementCard.querySelector('.popup__button');

//Открытие
openCardFormButton.addEventListener('click', function() {
    openPopup(popupElementCard);
});
//Закрытие
closeCardFormButton.addEventListener('click', function() {
    closePopup(popupElementCard);
});
//submit
submitCardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newCard = [{
        name: '',
        link: ''
    }];
    let inputValues = Array.from(popupElementCard.querySelectorAll('.form__input'));
    inputValues.map(function(item, index) {
        if (index === 0) {
            newCard.name = item.value;
        } else {
            newCard.link = item.value;
        }
        return newCard;
    })
    renderCard(newCard);
    closePopup(popupElementCard);
});