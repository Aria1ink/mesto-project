import { openImage, checkPromiseResult } from './index.js';
import { setCardLike } from './api.js';
import { connectionData } from './data.js';
//cards
const cardContainer = document.querySelector('.element');
function countLikes (card) {
  const likes = {
    likeSum: 0,
    iLikeIt: false
  };
  if (card.likes.lenght != 0) {
    likes.iLikeIt = card.likes.some(like => like._id == '43a35a073393c920572f7de1')
    likes.likeSum = card.likes.length;
  };
  return likes;
};
// формирование шаблона карточки
function getCard (item) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const card = cardTemplate.querySelector('.element__card').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardLikesCount = card.querySelector('.element__like-counter');
  const cardLikes = countLikes(item);
  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.like').addEventListener('click', evt => {addLike(evt, item._id);});
  if (item.owner._id == '43a35a073393c920572f7de1') {
    card.querySelector('.element__remove').addEventListener('click', removeCard);
  } else {
    card.removeChild(card.querySelector('.element__remove'));
  };
  cardImage.addEventListener('click', (evt) => {openImage(cardImage.src, cardImage.alt);});
  cardLikesCount.textContent = cardLikes.likeSum;
  return card;
};
// вставка на страницу
export function createCard (item) {
  if (item) {
    const card = getCard(item);
    cardContainer.prepend(card);
    console.log(item);
  };
};
// удаление карточки
function removeCard (evt) {
  evt.target.closest('.element__card').remove();
};
// лайки
function addLike (evt, cardID) {
  evt.preventDefault();
  console.log(cardID);
  if (evt.target.classList.contains('like_status_active')) {
    setCardLike(connectionData, cardID, 'DELETE')
      .then(checkPromiseResult)
      .then(card => {
        console.log(card);
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    setCardLike(connectionData, cardID, 'PUT')
      .then(checkPromiseResult)
      .then(card => {
        countLikes(card);

      })
      .catch(err => {
        console.log(err);
      })
  };
  evt.target.classList.toggle('like_status_active');
};