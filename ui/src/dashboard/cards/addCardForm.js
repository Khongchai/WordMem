import React from 'react';

export default function (props)
{
    var newCard = {};
    
    return(
        <div id="add-card-form" onClick={(e) => {hideForm(e)}}>
            
        </div>
    )
}

function hideForm(e)
{
    e.target.style.display = "none";
}

