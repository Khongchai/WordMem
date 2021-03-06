import { showToast } from "./../dashboard/toast";
export default async function errorCheck(response) {
  if (response.ok) {
    return response.json();
  }
  return response.status;
}

export async function errorCheckForLogin(response) {
  if (response.ok) {
    return response.json();
  }
  let errormsg = "Invalid username or password";
  showToast(errormsg, "red");
  throw errormsg;
  //TODO notify invalid username or password
}
