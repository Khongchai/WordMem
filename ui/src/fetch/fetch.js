/*
    All functions should returns JSON when called.
*/

import {csrftoken} from "./cookie";
import errorCheck, {errorCheckForLogin} from "./errorCheck";
import {getToken} from './../Authentication/AuthState';

export const register = (username, password, email) => fetch("http://127.0.0.1:8000/api/auth/register",{
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
        username,
        password,
        email
    })
}).then(newUserDetails => errorCheck(newUserDetails))

export const login = (username, password) => fetch("http://127.0.0.1:8000/api/auth/login", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
        username,
        password
    })
}).then(response => errorCheckForLogin(response))


export const logout = (token) => fetch("http://127.0.0.1:8000/api/auth/logout", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Token ${token}`,
    }
}).then(response => response.ok);

export const getVocab = (token) => fetch("http://127.0.0.1:8000/api/vocab", {
    method:"GET",
    headers:{
        "Authorization": `Token ${token}`,
    }
}).then(response => errorCheck(response));

export const addVocab = (token, newCard) => fetch("http://127.0.0.1:8000/api/vocab/", {
    method:"POST",
    headers:{
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Token ${token}`,
    },
    body: JSON.stringify(newCard)
}).then(response => errorCheck(response));

export const deleteVocab = (token, word) => fetch(`http://127.0.0.1:8000/api/vocab/${word}/`, {
    method:"DELETE",
    headers:{
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
        "Authorization": `Token ${token}`,
    }
}).then(response => errorCheck(response));

export const cambridgeDefinitionAPI = (word) => fetch(`http://127.0.0.1:8000/api/definition_cambridge/${word}`,{
    method: "GET",
    headers:{
        "Authorization": `Token ${getToken()}`
    }
}).then(response => errorCheck(response));

export const oxfordDefinitionAPI = (word) => fetch(`http://127.0.0.1:8000/api/definition_oxford/${word}`,{
    method: "GET",
    headers:{
        "Authorization": `Token ${getToken()}`
    }
}).then(response => errorCheck(response));

export const uploadNewProfilePic = (profPic, extension) => fetch(`http://127.0.0.1:8000/api/manage_user_profile_pic`,
{
    method: "POST",
    headers:{
        "X-CSRFToken": csrftoken,
        "Authorization": `Token ${getToken()}`,
    },
    body: profPic
})