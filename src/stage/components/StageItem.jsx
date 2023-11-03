import React, { useState } from 'react';
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import './StageItem.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";

const StageItem = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedValues, setModifiedValues] = useState({
    title: props.title,
    description: props.description,
    salary: props.salary,
    address: props.address,
    startingDate: props.startingDate,
    endingDate: props.endingDate,
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    // Utilisez toISOString() pour formater la date au format ISO 8601 (AAAA-MM-JJ)
    return date.toISOString().split("T")[0];
  }

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      salary: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      startingDate: {
        value: "",
        isValid: false,
      },
      endingDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Envoyez les valeurs modifiées à votre fonction onSaveFunction
    props.onSaveFunction(modifiedValues);

    // Arrêtez l'édition
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Annulez l'édition
    setIsEditing(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setModifiedValues({ ...modifiedValues, [name]: value });
  };

  return (
    <div className="stage-item__actions">
      {isEditing ? (
        <React.Fragment>
          <h1>{props.title}</h1>
          <h2>{props.description}</h2>
          <h2>{props.salary}$</h2>
          <h2>{props.address}</h2>
          <h2>{formatDate(props.startingDate)}</h2>
          <h2>{formatDate(props.endingDate)}</h2>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1><u>{props.title}</u></h1>
          <br />
          <h2>{props.description}</h2>
          <h2>Salaire: {props.salary}$</h2>
          <h2>Adresse: {props.address}</h2>
          <h2>Date du Debut: {formatDate(props.startingDate)}</h2>
          <h2>Date de Fin: {formatDate(props.endingDate)}</h2>
          {(props.isStudent) ? <></> : <>
          <Button onClick={props.onClickDeleteFunction}>Supprimer</Button>
          <Button onClick={handleModifyClick}>Modifier</Button></>}
        </React.Fragment>
      )}
      {isEditing && (
        <React.Fragment>
          <Input
            id="title"
            element="input"
            type="text"
            label="Titre du stage"
            validators={[VALIDATOR_REQUIRE()]}
            name="title"
            value={modifiedValues.title}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <input
            id="description"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            name="description"
            value={modifiedValues.description}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <input
            id="salary"
            element="input"
            type="text"
            label="Salaire"
            validators={[VALIDATOR_REQUIRE()]}
            name="salary"
            value={modifiedValues.salary}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <input
            id="address"
            element="input"
            type="text"
            label="Adresse de l'entreprise"
            validators={[VALIDATOR_REQUIRE()]}
            name="address"
            value={modifiedValues.address}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <input
            id="startingDate"
            element="input"
            type="date"
            label="Date de début"
            validators={[VALIDATOR_REQUIRE()]}
            name="startingDate"
            value={formatDate(modifiedValues.startingDate)}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <input
            id="endingDate"
            element="input"
            type="date"
            label="Date de fin"
            validators={[VALIDATOR_REQUIRE()]}
            name="endingDate"
            value={formatDate(modifiedValues.endingDate)}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <div className="button-row">
            {(props.isStudent) ? <></> : <><Button onClick={handleInputChange}>Enregistrer</Button>
            <Button onClick={handleCancelClick}>Annuler</Button>
            <Button onClick={props.onClickDeleteFunction}>Supprimer</Button></>}
            
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>{props.title}</h1>
          <h2>{props.description}</h2>
          <h2>{props.salary}$</h2>
          <h2>{props.address}</h2>
          <h2>{formatDate(props.startingDate)}</h2>
          <h2>{formatDate(props.endingDate)}</h2>
          <Button onClick={props.onClickDeleteFunction}>Supprimer</Button>
          <Button onClick={handleModifyClick}>Modifier</Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default StageItem;
