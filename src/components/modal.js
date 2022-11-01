import { disableSubmitButton } from './validate.js';
import { settings } from './data.js';
// открытие попапов
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', closePopupByEvt);
  document.addEventListener('keydown', closePopupByKey);
};
// закрытие через событие
function closePopupByEvt (evt) {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    closePopup(evt.target);
  }
}
// закрытие по ножатию кнопки
function closePopupByKey (evt) {
  if(evt.key=='Escape'){
    hideClosestPopup(evt);
  };
}
// закрытие попапа
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', closePopupByEvt);
  document.removeEventListener('keydown', closePopupByKey);
  disableSubmitButton(popup.querySelector('.popup__submit'), settings);
};
// закрыть ближайший попап
function hideClosestPopup (evt) {
  const popup = evt.target.closest('.popup')
  if (popup) {
    closePopup(popup);
  }
};
