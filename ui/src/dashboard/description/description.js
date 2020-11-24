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
                    {synonymList.length > 0?
                     <div style={{fontStyle: "normal", fontWeight: "bold", marginBottom: "1rem"}}>Synonyms: </div>
                      : ""}
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