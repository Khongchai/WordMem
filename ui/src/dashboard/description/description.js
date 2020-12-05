import React from 'react';
import definitionAPI from './definitionAPI';

export default function Description(props)
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

//TODO create a button with cambridge logo that will call the cambridge dictionary API