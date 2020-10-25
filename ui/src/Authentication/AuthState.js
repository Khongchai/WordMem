export var authState = {
    "isAuthenticated": localStorage.getItem("isAuthenticated"),
    "token": localStorage.getItem("token"),
    "curUser": JSON.stringify(localStorage.getItem("curUser"))
}

export function setAuthState(dataOfUser, action)
{
    let curUser = JSON.stringify(dataOfUser.user);
    let token = dataOfUser.token;
    let isAuthenticated = token && curUser? true: false;
    switch(action)
    {
        case("LOG_IN"):
            localStorage.setItem("isAuthenticated", isAuthenticated);
            localStorage.setItem("token", token);
            localStorage.setItem("curUser", curUser);
            return isAuthenticated;
        default:
            //do nothing
    }

}



