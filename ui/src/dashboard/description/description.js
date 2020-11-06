import React from 'react';

export default function(props)
{
    const synonymList = [...props.synonymsList];
    return(
        <div>
            <div className="description">
                {props.meaning}
            </div> 
            <div className="synonym-list">
                <ui>
                    {synonymList.map(syn => (
                        <li id={syn}>
                            {syn}
                        </li>
                    ))}
                </ui>
            </div>
        </div>
        
        
    )
}