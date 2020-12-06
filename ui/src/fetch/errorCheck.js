import {showToast} from './../dashboard/toast';
export default async function errorCheck(response)
{   
    //TODO
    return response.json();
}

export async function errorCheckForLogin(response)
{
    if (response.ok)
    {
        return response.json();
    }
    let errormsg = "Invalid username or password";
    showToast(errormsg, "red");
    throw errormsg;
    //TODO notify invalid username or password
    
}