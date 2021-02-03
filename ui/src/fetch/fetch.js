import { csrftoken } from "./cookie";
import errorCheck, { errorCheckForLogin } from "./errorCheck";
import { getToken } from "./../Authentication/AuthState";

export const register = (username, password, email) =>
  fetch("https://vocab-mem.herokuapp.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  }).then((newUserDetails) => errorCheck(newUserDetails));

export const login = (username, password) =>
  fetch("https://vocab-mem.herokuapp.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => errorCheckForLogin(response));

export const logout = (token) =>
  fetch("https://vocab-mem.herokuapp.com/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.ok);

export const getVocab = (token) =>
  fetch("https://vocab-mem.herokuapp.com/api/vocab", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => errorCheck(response));

export const addVocab = (token, newCard) =>
  fetch("https://vocab-mem.herokuapp.com/api/vocab/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(newCard),
  }).then((response) => errorCheck(response));

export const deleteVocab = (token, word) =>
  fetch(`https://vocab-mem.herokuapp.com/api/vocab/${word}/`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${token}`,
    },
  }).then((response) => errorCheck(response));

export const cambridgeDefinitionAPI = (word) =>
  fetch(`https://vocab-mem.herokuapp.com/api/definition_cambridge/${word}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((response) => errorCheck(response));

export const oxfordDefinitionAPI = (word) =>
  fetch(`https://vocab-mem.herokuapp.com/api/definition_oxford/${word}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((response) => errorCheck(response));

export const uploadNewProfilePic = (profPic, extension) =>
  fetch(`https://vocab-mem.herokuapp.com/api/manage_user_profile_pic`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${getToken()}`,
    },
    body: profPic,
  });

export const getProfilePicture = () =>
  fetch(`https://vocab-mem.herokuapp.com/api/manage_user_profile_pic`, {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
