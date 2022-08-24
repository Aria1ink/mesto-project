//profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openProfilePopupButton = document.querySelector('.profile__edit-button');
//cards
const openAddCardPopup = document.querySelector('.profile__add-button');
//popups
const closePopupButton = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.image-popup');
const profilePopup = document.querySelector('.profile-popup');
const editProfileName = profilePopup.getElementsByName('user-name');
const editProfileAbout= profilePopup.getElementsByName('user-info');
const addCardPopup = document.querySelector('.add-card-popup');
const addCardPlaceName = addCardPopup.getElementsByName('place-name');
const addCardPlaceLink = addCardPopup.getElementsByName('place-link');



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
//Close popup
closePopupButton.forEach((element) => {element.addEventListener(closePopup);});
//Open popup
openProfilePopupButton.addEventListener('click', openProfilePopup);
openAddCardPopup.addEventListener('click', () => {openPopup(addCardPopup);});
//Summit
//editProfileSaveButton.addEventListener('click', editProfileSave);
//addCardSaveButton.addEventListener('click', addCardSave);

initialCards.forEach(cardCreate);

function openProfilePopup () {
  editProfileName.textContent = profileName.textContent;
  editProfileAbout.textContent = profileAbout.textContent;
  openPopup(profilePopup);
};
function editProfileSave (evt) {
  evt.preventDefault(); 
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');
  const editProfileName = document.getElementsByName('user-name');
  const editProfileAbout = document.getElementsByName('user-info');
  const newProfileName = document.createElement('h1');
  const newProfileAbout = document.createElement('p');
  if (editProfileName[0].value && editProfileAbout[0].value) {
    newProfileName.textContent = editProfileName[0].value;
    newProfileName.classList.add('profile__name');
    profileName.replaceWith(newProfileName);
    newProfileAbout.textContent = editProfileAbout[0].value;
    newProfileAbout.classList.add('profile__about');
    profileAbout.replaceWith(newProfileAbout);
    editProfileName[0].placeholder = "Жак-Ив Кусто";
    editProfileAbout[0].placeholder = "Исследователь океана";
    popupChangeState('.edit-profile', 'edit-profile_enabled');
  } else {
    editProfileName[0].placeholder = "Пожалуйста, заполните все поля.";
    editProfileAbout[0].placeholder = "Пожалуйста, заполните все поля.";
  };
};
function addCardSave (evt) {
  evt.preventDefault();
  const addCardPlaceName = document.getElementsByName('place-name');
  const addCardPlaceLink = document.getElementsByName('place-link');
  let item = [{name: '', link: ''}];
  if (addCardPlaceName[0].value && addCardPlaceLink[0].value) {
    item['name'] = addCardPlaceName[0].value;
    item['link'] = addCardPlaceLink[0].value;
    cardCreate(item);
    addCardPlaceName[0].placeholder = "Название";
    addCardPlaceLink[0].placeholder = "Ссылка на картинку";
    popupChangeState('.add-card', 'add-card_enabled');
  } else {
    addCardPlaceName[0].placeholder = "Пожалуйста, заполните все поля.";
    addCardPlaceLink[0].placeholder = "Пожалуйста, заполните все поля.";
  };
};
function openPopup (element) {
  element.classList.add('popup_open');
};
function cardCreate (item) {
  if (item) {
    const cardContainer = document.querySelector('.element');
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const card = cardTemplate.querySelector('.element__card').cloneNode(true);
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;
    card.querySelector('.like').addEventListener('click', liked);
    card.querySelector('.element__remove').addEventListener('click', cardRemove);
    card.querySelector('.element__image').addEventListener('click', openImage);
    cardContainer.prepend(card);
  } else {
    alert('Ошибка загрузки');
  };
};
function liked (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('like_status_active');
};
function cardRemove (evt) {
  evt.target.parentElement.replaceWith('');
};
function openImage (evt) {
  const imagePopupImage = document.querySelector('.image-popup__image');
  const imagePopupCaption = document.querySelector('.image-popup__caption');
  openPopup(imagePopup);
  imagePopupImage.setAttribute('src', evt.target.getAttribute('src'));
  if (container = evt.target.parentElement) {
    imagePopupCaption.textContent = container.querySelector('.element__title').textContent;
  } else {
    imagePopupCaption.textContent = '';
  };
};
function closePopup (evt) {
  evt.preventDefault(); 
  evt.target.closest('popup').classList.remove('popup_open');
};