import { openCardPopup, saveCard } from "./card";
//profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openProfilePopupButton = document.querySelector('.profile__edit-button');
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
// активация кнопки закрытия попапа
closePopupButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// кнопки открытия попапов
export function initOpenPopupButtons() {
  openProfilePopupButton.addEventListener('click', openProfilePopup);
  openCardPopup.addEventListener('click', () => {
    openPopup(cardPopup);
    resetForm(cardPopupForm);
  });
};
// Кнопки сохранения попапов
profilePopup.addEventListener('submit', saveProfile);
cardPopup.addEventListener('submit', saveCard);
// открытие попапов
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', closePopupByEvt);
  document.addEventListener('keydown', closePopupByKey);
};
// закрытие через событие
function closePopupByEvt (evt) {
  closePopup(evt.target);
}
// закрытие по ножатию кнопки
function closePopupByKey (evt) {
  if(evt.key=='Escape'){
    hideClosestPopup(evt);
  };
}
// закрытие попапа
function closePopup (popup) {
  if(popup.classList.contains('popup') || popup.classList.contains('popup__close-button')){
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', closePopupByEvt);
    document.removeEventListener('keydown', closePopupByKey);
  }
};
// закрыть ближайший попап
function hideClosestPopup (evt) {
  const popup = evt.target.closest('.popup')
  if (popup) {
    closePopup(popup);
  }
};
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
// сохранение профиля
function saveProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(profilePopup);
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