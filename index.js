const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.edit-profile__close-button');
const editProfileSaveButton = document.querySelector('.edit-profile__save-button');
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
editProfileCloseButton.addEventListener('click', editProfileChangeState);
editProfileSaveButton.addEventListener('click', editProfileSave);

initialCards.forEach(cardCreate);

function editProfileOpen () {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');
  const editProfileName = document.getElementsByName('user-name');
  const editProfileAbout= document.getElementsByName('user-info');
  editProfileName[0].value = profileName.textContent;
  editProfileAbout[0].value = profileAbout.textContent;
  editProfileChangeState();
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
    editProfileName[0].placeholder = "Жак-Ив Кусто"
    editProfileAbout[0].placeholder = "Исследователь океана"
    editProfileChangeState();
  } else {
    editProfileName[0].placeholder = "Пожалуйста, заполните все поля."
    editProfileAbout[0].placeholder = "Пожалуйста, заполните все поля."
  };
};
function editProfileChangeState () {
  const editProfilePopup = document.querySelector('.edit-profile');
  editProfilePopup.classList.toggle('edit-profile_enabled');
};
function cardCreate (item) {
  const firstCard = document.querySelector('.element__card');
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const card = cardTemplate.querySelector('.element__card').cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  firstCard.before(card);
}