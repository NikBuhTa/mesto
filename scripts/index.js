//Здесь ниже все о карточках
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    }, 
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const templateCard = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards');
const templateImagePopup = document.querySelector('#fullImage').content;

//Открытие попапа с карточкой
function addImagePopup(element) {
    const templateImagePopupElement = templateImagePopup.cloneNode(true);
    const templateImagePopupTitle = templateImagePopupElement.querySelector('.popup__subtitle');
    const templateImagePopupImage = templateImagePopupElement.querySelector('.popup__image');
    const templateImagePopupButton = templateImagePopupElement.querySelector('.popup__button');

    templateImagePopupTitle.textContent = element.name;
    templateImagePopupImage.src = element.link;

    templateImagePopupButton.addEventListener('click', function(e){
        e.target.closest('.popup').classList.remove('popup_open');
        setTimeout(function() {e.target.closest('.popup').remove()}, 500)
    });

    footer.after(templateImagePopupElement);
};

// добавление новых карточек
function renderCard(item) {
    const templateCardElement = templateCard.cloneNode(true);
    const templateCardTitle = templateCardElement.querySelector('.card__name');
    const templateCardImage = templateCardElement.querySelector('.card__image');
    const templateCardDelButton = templateCardElement.querySelector('.card__delete-button');
    const templateCardLikeButton = templateCardElement.querySelector('.card__button');

    templateCardDelButton.addEventListener('click', function(e) {
        e.target.closest('.card').remove();
    })
    templateCardLikeButton.addEventListener('click', function(e) {
        e.target.classList.toggle('card__button_active');
    })
    templateCardTitle.textContent = item.name;
    templateCardImage.src = item.link;

    templateCardImage.addEventListener('click', function() {
        addImagePopup(item);
        const imagePopup = document.querySelector('.popup_opacity_image');
        setTimeout(function() {imagePopup.classList.add('popup_open');}, 100);
    })
    cardsList.prepend(templateCardElement);
}

initialCards.forEach(function(item) {
    renderCard(item);
});

//здесь все о попапах
const availablePopups = [
    {
        title: 'Редактировать профиль',
        formName: 'about',
        firstInput: 'name',
        secondInput: 'status',
        name: 'Имя',
        status: 'Статус'
    },
    {
        title: 'Новое место',
        formName: 'information',
        firstInput: 'title',
        secondInput: 'address',
        name: 'Название',
        status: 'Ссылка на картинку'
    }
];

const popup = document.querySelector('#popup').content;
const footer = document.querySelector('.footer');

availablePopups.forEach(function(item, index) {
    const popupElement = popup.cloneNode(true);
    const formElementTitle = popupElement.querySelector('.form__title');
    const formFormName = popupElement.querySelector('form');
    const formInputs = Array.from(popupElement.querySelectorAll('.form__input'));
    const popupCloseButton = popupElement.querySelector('.popup__button');
    const submitFormButton = popupElement.querySelector('.form__button');

    formElementTitle.textContent = item.title;
    formFormName.setAttribute('name', item.formName);
    formInputs.forEach(function(items, index) {
        if (index === 0) {
            items.setAttribute('name', item.firstInput);
            items.setAttribute('placeholder', item.name)
        } else {
            items.setAttribute('name', item.secondInput);
            items.setAttribute('placeholder', item.status);
        }
    });

    if (index === 0) {
        formInputs[0].classList.add('form__input_class_name');
        formInputs[1].classList.add('form__input_class_status');
    }

    popupCloseButton.addEventListener('click', function(e) {
        e.target.closest('.popup').classList.remove('popup_open');
    })

    submitFormButton.textContent = 'Сохранить';

    footer.after(popupElement);
});

const popupElements = Array.from(document.querySelectorAll('.popup')); //Создаем массив попапов
const popupElementCard = popupElements[0];
const popupElementEdit = popupElements[1];

// Открытие\submit попапа "Редактирование профиля"
const openEditFormButton = document.querySelector('.profile__button-edit');
const submitEditFormButton = popupElementEdit.querySelector('.form__button');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let nameInput = popupElementEdit.querySelector('.form__input_class_name');
let statusInput = popupElementEdit.querySelector('.form__input_class_status');

const openPopup = (element) => {
    element.classList.add('popup_open');
};

function closePopup(element) {
    element.classList.remove('popup_open');
}

openEditFormButton.addEventListener('click', function() {
    openPopup(popupElementEdit);
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});

submitEditFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    closePopup(popupElementEdit);
})
// Открытие\submit попапа "Новое место"

const openCardFormButton = document.querySelector('.profile__button-add');
const submitCardFormButton = popupElementCard.querySelector('.form__button');

openCardFormButton.addEventListener('click', function() {
    openPopup(popupElementCard);
});

submitCardFormButton.addEventListener('click', function(e) {
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
})