import React, {useState, useEffect} from 'react';
import '../dashboard.css';
import './navbar.css';
import Book from '../../svg/book';
import {logout, uploadNewProfilePic} from '../../fetch/fetch';
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

    const [profImgToServer, setprofImgToServer] = useState(null);
    const [currentProfImg, setCurrentProfImg] = useState(null);
    //use this boolean state to decide whether to run the useEffect or not
    //if false, don't run useEffect
    //When the application pull the user's profile image from the sever after login, the flag will be false,
    //as such, useEffect will not be run.
    //However, useEffect is run when the user upload a new prof image.
    const [uploadImageFlag, setUploadImageFlag] = useState(false);

    //reserve this function for uploading an image
    useEffect(()=>
    {
        if (uploadImageFlag)
        {
            const uploadData = new FormData();
            uploadData.append("newprofImg", profImgToServer);
            uploadNewProfilePic(uploadData, getFileExtension(profImgToServer.name))
            .then((res)=>
            {
                if (res.status === 200)
                {
                    //TODO make it work
                    setCurrentProfImg(profImgToServer);
                }
            });
        }
        setUploadImageFlag(false);
    }, [profImgToServer]);

    function prepareImageUpload()
    {
        const imgHolder = document.getElementById("img");
        setUploadImageFlag(true);
        imgHolder.click();
    }

    return(
            <form id="profile-pic" onClick={()=>prepareImageUpload()} style={{backgroundImage: `url(./${currentProfImg? currentProfImg: ""})`}}>
                 <div style={{display: "none"}}>
                    <input type="file" id="img" name="img" accept="image/*" onChange={(e) => setprofImgToServer(e.target.files[0])}/>
                 </div>
            </form>
    );
}

function getFileExtension(filename)
{
    return filename.split('.').pop();
}
