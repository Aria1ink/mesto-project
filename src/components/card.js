import { openImage, userId } from './index.js';
import { api } from './api.js';
const cardContainer = document.querySelector('.element');
// лайки
function countLikes (card) {
  return card.likes.length;
};
function isILikeIt (card) {
  return card.likes.some(like => like._id == userId);
}
function writeLikeCount (cardLikesCounter, likeSum) {
  cardLikesCounter.textContent = likeSum;
}
function toggleLike (cardLike) {
  cardLike.classList.toggle('like_status_active');
}
function addLike (evt, cardID, cardLike, cardLikesCounter) {
  if (evt.target.classList.contains('like_status_active')) {
    api.setCardLikeApi(cardID, 'DELETE')
      .then(card => {
        writeLikeCount(cardLikesCounter, countLikes(card));
        toggleLike (cardLike);
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    api.setCardLikeApi(cardID, 'PUT')
      .then(card => {
        writeLikeCount(cardLikesCounter, countLikes(card));
        toggleLike (cardLike);
      })
      .catch(err => {
        console.log(err);
      })
  };
};
// карточки
// формирование шаблона карточки
export function getCard (item) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const card = cardTemplate.querySelector('.element__card').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardLikesCounter = card.querySelector('.element__like-counter');
  const cardLike = card.querySelector('.element__like');
  card.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.like').addEventListener('click', evt => {
    addLike(evt, item._id, cardLike, cardLikesCounter);
  });
  if (item.owner._id == userId) {
    card.querySelector('.element__remove').addEventListener('click', () => {
      removeCard(item._id, card);
    });
  } else {
    card.removeChild(card.querySelector('.element__remove'));
  };
  cardImage.addEventListener('click', (evt) => {openImage(cardImage.src, cardImage.alt);});
  if (isILikeIt(item)) {
    toggleLike(cardLike);
  }
  writeLikeCount(cardLikesCounter, countLikes(item));
  return card;
};
// вставка на страницу
export function createCard (item) {
  if (item) {
    const card = getCard(item);
    cardContainer.prepend(card);
  };
};
// удаление карточки
function removeCard (cardId, card) {
  api.removeCardApi(cardId)
  .then(() => {
    removeCardItem(card);
  })
  .catch(err => {
    console.log(err);
  })
}
function removeCardItem (card) {
  card.remove();
};