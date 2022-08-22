const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.edit-profile__close-button');
const editProfileSaveButton = document.querySelector('.edit-profile__save-button');
const addCardOpenButton = document.querySelector('.profile__add-button');
const addCardCloseButton = document.querySelector('.add-card__close-button');
const addCardSaveButton = document.querySelector('.add-card__save-button');
const likes = document.querySelectorAll('.like');
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
editProfileOpenButton.addEventListener('click', editProfileOpen);
editProfileCloseButton.addEventListener('click', () => { popupChangeState('.edit-profile', 'edit-profile_enabled');});
editProfileSaveButton.addEventListener('click', editProfileSave);
addCardOpenButton.addEventListener('click', () => { popupChangeState('.add-card', 'add-card_enabled');});
addCardCloseButton.addEventListener('click', () => { popupChangeState('.add-card', 'add-card_enabled');});
addCardSaveButton.addEventListener('click', addCardSave);
likes.forEach((element) => {element.addEventListener('click', liked)});
initialCards.forEach(cardCreate);


function editProfileOpen () {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');
  const editProfileName = document.getElementsByName('user-name');
  const editProfileAbout= document.getElementsByName('user-info');
  editProfileName[0].value = profileName.textContent;
  editProfileAbout[0].value = profileAbout.textContent;
  popupChangeState('.edit-profile', 'edit-profile_enabled');
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
    console.log(item);
    cardCreate(item);
    addCardPlaceName[0].placeholder = "Название";
    addCardPlaceLink[0].placeholder = "Ссылка на картинку";
    popupChangeState('.add-card', 'add-card_enabled');
  } else {
    addCardPlaceName[0].placeholder = "Пожалуйста, заполните все поля.";
    addCardPlaceLink[0].placeholder = "Пожалуйста, заполните все поля.";
  };
};
function popupChangeState (element, state) {
  const editProfilePopup = document.querySelector(element);
  editProfilePopup.classList.toggle(state);
};
function cardCreate (item) {
  if (item) {
    const firstCard = document.querySelector('.element__card');
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const card = cardTemplate.querySelector('.element__card').cloneNode(true);
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;
    card.querySelector('.like').addEventListener('click', liked);
    firstCard.before(card);
  } else {
    alert('Ошибка загрузки');
  };
};
function liked (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('like_status_active');
}