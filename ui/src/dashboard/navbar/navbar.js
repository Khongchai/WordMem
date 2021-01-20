import React, {useState, useEffect} from 'react';
import '../dashboard.css';
import Book from '../../svg/book';
import {logout} from '../../fetch/fetch';
import {getToken, setLocalStorageAuthState, getCurrentUser} from '../../Authentication/AuthState';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Navbar()
{
    const vocabList = useSelector(state => state.cardHistory.present);
    var history = useHistory();
    function logUserOutAndRedirect(e)
    {
        e.preventDefault();
        logout(getToken())
        .then(logoutSuccessful => 
        {
            if (checkLogOutStatAndClearLocalStorage(logoutSuccessful))
            {
                history.push("/login");
            }
        })
        
    }
    function checkLogOutStatAndClearLocalStorage(ok)
    {
        if (ok)
        {
            setLocalStorageAuthState(null, "SIGN_OUT");
            return true
        }
        else
        {
            throw new Error("logout unsuccessful");
        }
    }

    return (
        <div className="dashboardNavBar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <ProfilePic />
                </li>

                <li className="nav-item">
                    <div className="user-name">
                        <p className="name-capitalized">
                            {JSON.parse(getCurrentUser()).username}
                        </p>
                    </div>
                </li>
                <br/>
                <br/>
                <li className="nav-item">
                    <div className="vocab-count">
                        <Book/>: {vocabList.length}
                    </div>
                </li>

                <form className="nav-item" onSubmit={(e)=>logUserOutAndRedirect(e)}>
                    <button className="dashboard-button">
                        Sign Out
                    </button>
                </form>
            </ul>
        </div>
    )
}

function ProfilePic(props)
{

    const [profImg, setProfImg] = useState(null);

    //use this boolena state to decide whether to run the useEffect or not
    //if false, don't run useEffect
    //When the application pull the user's profile image from the sever, the flag will be false,
    //as such, useEffect will not be run.
    const [uploadImageFlag, setUploadImageFlag] = useState(false);

    //reserver this function for uploading an image
    useEffect(()=>
    {
        if (uploadImageFlag)
        {
            //fetch send image to django
        }
        setUploadImageFlag(false);
    }, [profImg]);

    function manageProfileImage()
    {
        const imgHolder = document.getElementById("img");
        setUploadImageFlag(true);
        imgHolder.click();
    }

    return(
            <form id="profile-pic" onClick={()=>manageProfileImage()}>
                 <div style={{display: "none"}}>
                    <input type="file" id="img" name="img" accept="image/*" onChange={(e) => setProfImg(e.target.files[0])}/>
                 </div>
            </form>
    );
}

