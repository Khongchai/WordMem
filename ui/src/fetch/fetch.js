/*
    All functions should returns JSON when called.
*/

import {csrftoken} from "./cookie";
import errorCheck from "./errorCheck";

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
}).then(response => errorCheck(response))


//put token from localStorage in header.
//export const getVocabfromCurrentUser = ()

