// Действия с профилем пользователя
export const getUserProfileApi = (connectionData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me `, {
    headers: {
      authorization: connectionData.token
    }
  });
};
export const setUserProfileInfoApi = (connectionData, userData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me `, {
    method: 'PATCH',
    headers: {
      authorization: connectionData.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  });
};
export const setUserProfileAvatarApi = (connectionData, avatarLink) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: connectionData.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink,
    })
  });
};
// Действия с карточками
export const getCardsApi = (connectionData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards`, {
    headers: {
      authorization: connectionData.token
    }
  });
};
export const setCardApi = (connectionData, cardData) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards`, {
    method: 'POST',
    headers: {
      authorization: connectionData.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  });
};
export const removeCardApi = (connectionData, cardId) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: connectionData.token
    }
  });
};
export const setCardLikeApi = (connectionData, cardID, connectionMethod) => {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards/likes/${cardID}`, {
    method: connectionMethod,
    headers: {
      authorization: connectionData.token
    }
  });
};