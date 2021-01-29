export function setLocalStorageAuthState(dataOfUser, action) {
  switch (action) {
    case "LOG_IN":
      let curUser = JSON.stringify(dataOfUser.user);
      let token = dataOfUser.token;
      let isAuthenticated = token && curUser ? true : false;
      localStorage.setItem("isAuthenticated", isAuthenticated);
      localStorage.setItem("token", token);
      localStorage.setItem("curUser", curUser);
      return isAuthenticated;
    case "SIGN_OUT":
      localStorage.clear();
      break;
    default:
    //do nothing
  }
}

//these should perform check against the server
export function getAuthState() {
  return localStorage.getItem("isAuthenticated");
}
export function getToken() {
  return localStorage.getItem("token");
}
export function getCurrentUser() {
  return localStorage.getItem("curUser");
}
