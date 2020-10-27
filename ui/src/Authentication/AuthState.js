
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

export function getAuthState()
{
    return localStorage.getItem("isAuthenticated");
}
export function getToken()
{
    return localStorage.getItem("token");
}
export function getCurrentUser()
{
    return localStorage.getItem("curUser");
}




