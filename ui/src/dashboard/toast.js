import React from 'react';
export default function()
{
    return (
        <div id="toast">
            
        </div>
    )
}

export async function showToast(toastMessage)
{
    var toast = document.getElementById("toast");
    toast.className = "show";
    toast.innerHTML = toastMessage;
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}