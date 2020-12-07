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

    toast.style.backgroundColor = manageColor(optionalColor);

    console.log(timeouthandle);
    manageTimeout(toast);
}

function manageColor(optionalColor)
{
    return optionalColor? optionalColor: "##F17300";
}

function manageTimeout(toast)
{
    if (timeouthandle !== null)
    {
        window.clearTimeout(timeouthandle);
    }
    timeouthandle = window.setTimeout(function()
                    { 
                        toast.className = toast.className.replace("show", ""); 
                        //always reset color
                        toast.style.background = "#F17300";
                    }, 3000);

}
