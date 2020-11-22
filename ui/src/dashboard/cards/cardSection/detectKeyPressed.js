import {allowDelete} from "../../../actions/allowDelete";
import {store} from "../../../index";
export default function detectKeyPressed()
{
    
    document.addEventListener("keydown", function(e) {
        if (e.key === "Control")
        {
            addORremoveDeleteIndicator("ADD");
            store.dispatch(allowDelete(true));
        }
    });
    document.addEventListener("keyup", function(e)
    {
        if (e.key === "Control")
        {
            addORremoveDeleteIndicator("REMOVE");
            store.dispatch(allowDelete(false));
        }
    });
}

function addORremoveDeleteIndicator(action)
{
    let cards = document.getElementsByClassName("card");
    if (action === "ADD")
    {
        for (let card of cards)
        {
            card.classList.add("delete-indicator");
        }
    }
    else
    {
        for (let card of cards)
        {
            card.classList.remove("delete-indicator");
        } 
    }

}
