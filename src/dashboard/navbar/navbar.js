import React, {useState, useEffect} from 'react';
import '../dashboard.css';
import './navbar.css';
import Book from '../../svg/book';
import {logout, uploadNewProfilePic, getProfilePicture} from '../../fetch/fetch';
import {getToken, setLocalStorageAuthState, getCurrentUser} from '../../Authentication/AuthState';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Navbar()
{
    const vocabList = useSelector(state => state.cardHistory.present);
    const [currentProfImg, setCurrentProfImg] = useState(null);
    var history = useHistory();

    useEffect(()=>
    {
        getProfilePicture()
        .then((res)=>
        {
            if (res.status == 204)
            {
                return false;
            }
            else 
            {
                return res.blob();
            }
        })
        .then((profImg)=>
        {
            if (profImg)
            {
                setCurrentProfImg(profImg);
                removeImageIndicatorClassFromProfImage();
            }
        });
    }, []);

    
    function removeImageIndicatorClassFromProfImage()
    {
        document.getElementById('profile-pic').classList.remove("upload-image-indicator");
    }

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
                    <ProfilePic currentProfImg={currentProfImg} setCurrentProfImg={setCurrentProfImg} 
                    removeImageIndicatorClassFromProfImage={removeImageIndicatorClassFromProfImage} />
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

    //reserve this function for uploading an image
    useEffect(()=>
    {
        //User uploads a new profile image
        if (profImgToServer)
        {
            const uploadData = new FormData();
            uploadData.append("newProfImg", profImgToServer);
            uploadNewProfilePic(uploadData, getFileExtension(profImgToServer.name))
            .then((res)=>
            {
                if (res.status === 200)
                {
                    //Set new profile image
                    props.setCurrentProfImg(profImgToServer); 
                    setprofImgToServer(null);
                    props.removeImageIndicatorClassFromProfImage();
                }
            });
        }
        
    }, [profImgToServer], );

    function prepareImageUpload()
    {
        const imgHolder = document.getElementById("img");
        imgHolder.click();
    }


    return(
            <form id="profile-pic" className="upload-image-indicator" onClick={()=>prepareImageUpload()} style={{backgroundImage: `url(${props.currentProfImg? URL.createObjectURL(props.currentProfImg): ""})`}}>
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
