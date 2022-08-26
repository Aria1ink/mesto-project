//profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openProfilePopupButton = document.querySelector('.profile__edit-button');
//cards
const cardContainer = document.querySelector('.element');
const openCardPopup = document.querySelector('.profile__add-button');
//popups
const closePopupButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const profilePopup = document.querySelector('.profile-popup');
const profileNameInput = document.getElementById('user-name');
const profileAboutInput= document.getElementById('user-info');
const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPlaceNameInput = document.getElementById('place-name');
const cardPlaceLinkInput = document.getElementById('place-link');
//6 cards
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
closePopupButtons.forEach((element) => {element.addEventListener('click', closePopup);});
//Open popup
openProfilePopupButton.addEventListener('click', openProfilePopup);
openCardPopup.addEventListener('click', () => {
  openPopup(cardPopup);
  resetForm(cardPopupForm);
});
//Submit
profilePopup.addEventListener('submit', saveProfile);
cardPopup.addEventListener('submit', saveCard);
//6 cards
initialCards.forEach(createCard);
//interface
function openPopup (popup) {
  popup.classList.add('popup_opened');
};
function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
};
function addLike (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('like_status_active');
};
function resetForm (form) {
  form.reset();
};
//profile
function openProfilePopup () {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
};
function saveProfile (evt) {
  evt.preventDefault(); 
  if (profileNameInput.value && profileAboutInput.value) {
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    closePopup(evt);
  } else {
    alert("Пожалуйста, заполните все поля.");
  };
};
//card
function saveCard (evt) {
  evt.preventDefault();
  let item = [{name: '', link: ''}];
  if (cardPlaceNameInput.value && cardPlaceLinkInput.value) {
    item['name'] = cardPlaceNameInput.value;
    item['link'] = cardPlaceLinkInput.value;
    createCard(item);
    closePopup(evt);
  } else {
    alert("Пожалуйста, заполните все поля.");
  };
};
function getCard (item) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const card = cardTemplate.querySelector('.element__card').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.like').addEventListener('click', addLike);
  card.querySelector('.element__remove').addEventListener('click', removeCard);
  cardImage.addEventListener('click', openImage);
  return card;
};
function createCard (item) {
  if (item) {
    const card = getCard(item);
    cardContainer.prepend(card);
  } else {
    alert('Ошибка загрузки');
  };
};
function removeCard (evt) {
  evt.target.closest('.element__card').remove();
};
function openImage (evt) {
  openPopup(imagePopup);
  imagePopupImage.setAttribute('src', evt.target.getAttribute('src'));
  imagePopupImage.setAttribute('alt', evt.target.getAttribute('alt'));
  if (container = evt.target.closest('.element__card')) {
    imagePopupCaption.textContent = container.querySelector('.element__title').textContent;
  } else {
    imagePopupCaption.textContent = '';
  };
};
