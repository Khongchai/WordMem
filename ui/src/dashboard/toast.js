import React from 'react';
export default function Toast()
{
    return (
        <div id="toast">
            
        </div>
    )
}


var timeouthandle = null;
export async function showToast(toastMessage, optionalColor)
{
    var toast = document.getElementById("toast");
    toast.className = "show";
    toast.innerHTML = toastMessage;
    if (optionalColor)
    {
        toast.style.backgroundColor = optionalColor;
    }
    console.log(timeouthandle);
    manageTimeout(toast);
}

function manageTimeout(toast)
{
    if (timeouthandle !== null)
    {
        window.clearTimeout(timeouthandle);
    }
    if (toast.innerHTML === "Vocab deleted")
    {
        setTimeOutForDeletion(toast);
    }
    else
    {
        setTimeOutForGeneralMessages(toast);
    }
}

function setTimeOutForGeneralMessages(toast)
{
    timeouthandle = window.setTimeout(function()
                    { 
                        toast.className = toast.className.replace("show", ""); 
                        //always reset color
                        toast.style.background = "#F17300";
                    }, 3000);
}

function setTimeOutForDeletion(toast)
{
    timeouthandle = window.setTimeout(function()
                    { 
                        toast.className = toast.className.replace("show", ""); 
                        //always reset color
                        toast.style.background = "#F17300";
                    }, 1000);
}

