//cards
export const openCardPopup = document.querySelector('.profile__add-button');
const cardContainer = document.querySelector('.element');
const cardPlaceNameInput = document.getElementById('place-name');
const cardPlaceLinkInput = document.getElementById('place-link');
// получение содержимого карточки для создания
export function saveCard (evt) {
  evt.preventDefault();
  const item = {};
  item['name'] = cardPlaceNameInput.value;
  item['link'] = cardPlaceLinkInput.value;
  createCard(item);
  closePopup(cardPopup);
};
// формирование шаблона карточки
function getCard (item) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const card = cardTemplate.querySelector('.element__card').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.like').addEventListener('click', addLike);
  card.querySelector('.element__remove').addEventListener('click', removeCard);
  cardImage.addEventListener('click', (evt) => {openImage(cardImage.src, cardImage.alt);});
  return card;
};
// вставка на страницу
export function createCard (item) {
  if (item) {
    const card = getCard(item);
    cardContainer.prepend(card);
  } else {
    alert('Ошибка загрузки');
  };
};
// удаление карточки
function removeCard (evt) {
  evt.target.closest('.element__card').remove();
};
// лайки
function addLike (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('like_status_active');
};