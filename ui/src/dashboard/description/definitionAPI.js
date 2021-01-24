import React from "react";
import { cambridgeDefinitionAPI, oxfordDefinitionAPI } from "../../fetch/fetch";
import cambridgeLogo from "../../images/cambridge.png";
import oxfordLogo from "../../images/oxford.png";
import { useSelector } from "react-redux";
import "./definitionAPI.css";

export default function DefinitionsFromAPI(props) {
  const selectedWord = useSelector((state) => state.currentlySelectedWord);
  const className = selectedWord ? "" : "disabled-grayscale";
  async function fetchDefinition(dictionary) {
    switch (dictionary) {
      case "cambridge":
        cambridgeDefinitionAPI(selectedWord).then((arrayOfDefinitions) => {
          props.setMeaning(
            getDefinitionsAsHTML(arrayOfDefinitions, "cambridge")
          );
        });
        break;
      case "oxford":
        oxfordDefinitionAPI(selectedWord).then((arrayOfDefinitions) => {
          props.setMeaning(getDefinitionsAsHTML(arrayOfDefinitions, "oxford"));
        });
        break;
      default:
        console.log("no dictionaries specified");
    }
  }
  function getDefinitionsAsHTML(arrayOfDefinitions, dictionary) {
    let url;
    if (dictionary === "cambridge") {
      url = `https://dictionary.cambridge.org/dictionary/english/${selectedWord}`;
    } else {
      url = `https://www.oxfordlearnersdictionaries.com/definition/english/${selectedWord}`;
    }

    return (
      <div className="definition-block">
        <DefinitionsList
          arrayOfDefinitions={arrayOfDefinitions}
          url={url}
          dictionary={dictionary}
        />
      </div>
    );
  }
  function DefinitionsList(props) {
    if (props.arrayOfDefinitions.length === 0) {
      return (
        <h3 style={{ color: "#F17300" }}>
          No definitions for this word available in {capFirst(props.dictionary)}{" "}
          Dictionary.
        </h3>
      );
    } else {
      return (
        <ol>
          {props.arrayOfDefinitions.map((definition) => (
            <li className="definition">{definition}</li>
          ))}
          <a href={props.url} target="_blank">
            Go to Dictionary
          </a>
        </ol>
      );
    }
  }
  return (
    <div id="definitions-from-API">
      <img
        src={cambridgeLogo}
        className={className}
        onClick={() => fetchDefinition("cambridge")}
        style={{ width: "100%" }}
      />
      <img
        src={oxfordLogo}
        className={className}
        onClick={() => fetchDefinition("oxford")}
        style={{ width: "100%" }}
      />
    </div>
  );
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
