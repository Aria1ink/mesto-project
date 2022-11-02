import '../pages/index.css';
import { enableValidation } from './validate.js';
import { createCard } from './card';
import { openPopup, closePopup } from './modal.js';
import { initialCards, settings, connectionData } from './data.js';
import { setUserProfile } from './api.js';

// profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openProfilePopupButton = document.querySelector('.profile__edit-button');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
// popups
const closePopupButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const profilePopup = document.querySelector('.profile-popup');
const profileNameInput = document.getElementById('user-name');
const profileAboutInput = document.getElementById('user-info');
const profileSubmitBtn = profilePopup.querySelector('.popup__submit')
export const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = cardPopup.querySelector('.popup__form');
// cards
const cardPlaceNameInput = document.getElementById('place-name');
const cardPlaceLinkInput = document.getElementById('place-link');
// кнопки закрытия попапов
closePopupButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// кнопки открытия попапов
openProfilePopupButton.addEventListener('click', openProfilePopup);
cardPopupOpenButton.addEventListener('click', () => {
  openPopup(cardPopup);
  resetForm(cardPopupForm);
});
// Кнопки сохранения попапов
profilePopup.addEventListener('submit', saveProfile);
cardPopup.addEventListener('submit', saveCard);
initialCards.forEach(createCard);
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
// загрузка профиля при открытии страницы
function getProfileData (connectionData) {
  getUserProfile(connectionData)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      
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
  setUserProfile(connectionData, userData)
    .then(res => {
      if (res.ok) {
        profileName.textContent = userData.name;
        profileAbout.textContent = userData.about;
        closePopup(profilePopup);
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      };
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
};
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
  createCard(item);
  closePopup(cardPopup);
};
// включаем валидацию форм
enableValidation(settings);