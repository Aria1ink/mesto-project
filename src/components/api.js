// Действия с профилем пользователя
export function getUserProfileApi (connectionData) {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/users/me `, {
    headers: {
      authorization: connectionData.token
    }
  });
};
export function setUserProfileInfoApi (connectionData, userData) {
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
export function setUserProfileAvatarApi (connectionData, avatarLink) {
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
export function getCardsApi (connectionData) {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards`, {
    headers: {
      authorization: connectionData.token
    }
  });
};
function setCardApi (connectionData, cardData) {
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
export function setCardLikeApi (connectionData, cardID, connectionMethod) {
  return fetch(`${connectionData.baseUrl}${connectionData.id}/cards/likes/${cardID}`, {
    method: connectionMethod,
    headers: {
      authorization: connectionData.token
    }
  });
};