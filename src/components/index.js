import '../pages/index.css';
import { enableValidation } from './validate.js';
import { createCard } from './card';
import { openPopup, closePopup } from './modal.js';
import { initialCards, settings, connectionData }from './data.js';
import { disableSubmitButton } from './validate.js';
import { getUserProfileApi, setUserProfileInfoApi, setUserProfileAvatarApi, getCardsApi, setCardApi } from './api.js';

// profile
let userID = '';
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
// popups
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const profilePopup = document.querySelector('.profile-popup');
const profileNameInput = document.getElementById('user-name');
const profileAboutInput = document.getElementById('user-info');
const profileAvatarInput = document.getElementById('avatar-link');
const profileSubmitBtn = profilePopup.querySelector('.popup__submit');
export const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardSubmitBtn = cardPopup.querySelector('.popup__submit');
const avatarPopup = document.querySelector('.edit-avatar-popup');
const avatarPopupForm = avatarPopup.querySelector('.popup__form');
const avatarSubmitBtn = avatarPopupForm.querySelector('.popup__submit');
// cards
const cardPlaceNameInput = document.getElementById('place-name');
const cardPlaceLinkInput = document.getElementById('place-link');
// кнопки закрытия попапов
buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// кнопки открытия попапов
buttonOpenProfilePopup.addEventListener('click', openProfilePopup);
buttonOpenCardPopup.addEventListener('click', () => {
  openPopup(cardPopup);
  resetForm(cardPopupForm);
});
buttonEditAvatar.addEventListener('click', () => {
  openPopup(avatarPopup);
  resetForm(avatarPopupForm);
});
// Кнопки сохранения попапов
profilePopup.addEventListener('submit', saveProfile);
cardPopup.addEventListener('submit', saveCard);
avatarPopup.addEventListener('submit', saveAvatar);
// initialCards.forEach(createCard);
// сброс данных формы
export function resetForm (form) {
  form.reset();
};
// открытие редактирования профиля
export function openProfilePopup () {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
};
// запись данных профиля
function writeProfileData (userData) {
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
};
function writeProfileAvatar (avatarLink) {
  profileAvatar.src = avatarLink;
};
// забираем информацию о пользователе
function getProfileData (connectionData) {
  getUserProfileApi(connectionData)
    .then(checkPromiseResult)
    .then(userData => {
      writeProfileData(userData);
      writeProfileAvatar(userData.avatar);
    })
    .catch(err => {
      console.log(err);
    })
}
// сохранение профиля
function saveProfile (evt) {
  evt.preventDefault(); 
  const userData = {};
  userData.name = profileNameInput.value;
  userData.about = profileAboutInput.value;
  profileSubmitBtn.textContent = 'Сохранение...';
  setUserProfileInfoApi(connectionData, userData)
    .then(checkPromiseResult)
    .then(userData => {
      writeProfileData(userData);
      closePopup(profilePopup);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
      disableSubmitButton(profilePopup.querySelector('.popup__submit'), settings);
    });
};
function saveAvatar (evt) {
  evt.preventDefault(); 
  const avatarLink = profileAvatarInput.value;
  avatarSubmitBtn.textContent = 'Сохранение...';
  setUserProfileAvatarApi(connectionData, avatarLink)
    .then(res => {
      if (res.ok) {
        writeProfileAvatar(avatarLink);
        closePopup(avatarPopup);
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      };
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitBtn.textContent = 'Сохранить';
      disableSubmitButton(avatarPopup.querySelector('.popup__submit'), settings);
    });
}
// открытие картинок
export function openImage (src, alt) {
  openPopup(imagePopup);
  imagePopupImage.setAttribute('src', src);
  imagePopupImage.setAttribute('alt', alt);
  if (alt) {
    imagePopupCaption.textContent = alt;
  } else {
    imagePopupCaption.textContent = '';
  };
};
// получение содержимого карточки для создания
function saveCard (evt) {
  evt.preventDefault();
  const item = {};
  item['name'] = cardPlaceNameInput.value;
  item['link'] = cardPlaceLinkInput.value;
  cardSubmitBtn.textContent = 'Сохранение...';
  setCardApi(connectionData, item)
    .then(checkPromiseResult)
    .then(card => {
      createCard(card);
      closePopup(cardPopup);
    })
    .finally(() => {
      cardSubmitBtn.textContent = 'Создать'
      disableSubmitButton(cardPopup.querySelector('.popup__submit'), settings);
    });
};
function loadCards (connectionData){
  getCardsApi(connectionData)
    .then(checkPromiseResult)
    .then(cards => {
      cards.forEach(card => {
        createCard(card);
      });
    })
    .catch(err => {
      console.log(err);
    })
};
export function checkPromiseResult (res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  };
};
// загрузка
//загрузка информации о пользователе
getProfileData(connectionData);
// загрузка карточек
loadCards(connectionData);
// включаем валидацию форм
enableValidation(settings);