/*
    All functions should returns JSON when called.
*/

import {csrftoken} from "./cookie"

export const register = (usernameAndPassword) => fetch("http://127.0.0.1/api/auth/register",{
    method: "POST",
    headers: {
        "Content-type": "application.json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(usernameAndPassword)
}).then(newUserDetails => newUserDetails.json())