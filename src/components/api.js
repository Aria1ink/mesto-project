import { connectionData } from "./data.js";
const configHeaders = {
  authorization: connectionData.token,
  'Content-Type': 'application/json'
};
function checkPromiseResult (res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  };
};
// Действия с профилем пользователя
export const getUserProfileApi = () => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me `, {
    headers: configHeaders
  })
  .then(checkPromiseResult)
};
export const setUserProfileInfoApi = (userData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me `, {
    method: 'PATCH',
    headers: configHeaders,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
  .then(checkPromiseResult)
};
export const setUserProfileAvatarApi = (avatarLink) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me/avatar`, {
    method: 'PATCH',
    headers: configHeaders,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
  .then(checkPromiseResult)
};
// Действия с карточками
export const getCardsApi = () => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards`, {
    headers: configHeaders
  })
  .then(checkPromiseResult)
};
export const setCardApi = (cardData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards`, {
    method: 'POST',
    headers: configHeaders,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(checkPromiseResult)
};
export const removeCardApi = (cardId) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configHeaders
  })
  .then(checkPromiseResult)
};
export const setCardLikeApi = (cardID, connectionMethod) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards/likes/${cardID}`, {
    method: connectionMethod,
    headers: configHeaders
  })
  .then(checkPromiseResult)
};