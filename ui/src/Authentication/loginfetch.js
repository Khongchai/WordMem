import {setLocalStorageAuthState} from "./AuthState";
import {login} from "../fetch/fetch";

export default async function logUserIn(username, password)
{  
    const ok = await login(username, password).then(dataOfUser => {
                        return setLocalStorageAuthState(dataOfUser, "LOG_IN");
                    }).then(ok => ok);
    return ok;
}


