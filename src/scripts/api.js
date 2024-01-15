const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
	headers: {
		authorization: '6390187a-042d-4d43-bc45-a03db32ec1f8',
		"Content-Type": "application/json",
	}
}

function testData(res) {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка: ${res.status}`);
}

function getDataUser() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'GET',
		headers: config.headers,
	})
	.then((res) => testData(res));
}

function getDataCards() {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'GET',
		headers: config.headers,
	})
	.then((res) => testData(res));
}

function changeUserData(userName, userAbout) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers:	config.headers,
		body: JSON.stringify({
			name: userName,
			about: userAbout,
		}),
	})
	.then((res) => testData(res));
}

function addCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers:	config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	})
	.then((res) => testData(res));
}

function likeCard(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	})
	.then((res) => testData(res));
}

function deleteLikeCard(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	})
	.then((res) => testData(res));
}

function deleteUserCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	})
	.then((res) => testData(res));
}

function changeUserPhoto(avatar) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar
		}),
	})
	.then((res) => testData(res));
}

export {getDataUser, getDataCards, changeUserData, addCard, likeCard, deleteLikeCard, deleteUserCard, changeUserPhoto}