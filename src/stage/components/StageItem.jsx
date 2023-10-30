import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";
import "./StageItem.css";

const StageItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedValues, setModifiedValues] = useState({
    title: props.title,
    description: props.description,
    salary: props.salary,
    address: props.address,
    startingDate: props.startingDate,
    endingDate: props.endingDate,
  });

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

  const areFieldsValid = (values) => {
    return (
      values.title.trim() !== "" &&
      values.description.trim() !== "" &&
      values.salary.trim() !== "" &&
      values.address.trim() !== "" &&
      values.startingDate.trim() !== "" &&
      values.endingDate.trim() !== ""
    );
  };

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Vérifiez que tous les champs obligatoires sont remplis avant d'enregistrer
    if (areFieldsValid(modifiedValues)) {
      // Envoyez les valeurs modifiées à votre fonction onSaveFunction
      props.onSaveFunction(modifiedValues);

      // Arrêtez l'édition
      setIsEditing(false);
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  const handleCancelClick = () => {
    // Annulez l'édition
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
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
          <h2>{props.startingDate}</h2>
          <h2>{props.endingDate}</h2>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>{props.title}</h1>
          <h2>{props.description}</h2>
          <h2>{props.salary}$</h2>
          <h2>{props.address}</h2>
          <h2>{props.startingDate}</h2>
          <h2>{props.endingDate}</h2>
          <Button onClick={props.onClickDeleteFunction}>Supprimer</Button>
          <Button onClick={handleModifyClick}>Modifier</Button>
        </React.Fragment>
      )}
      {isEditing && (
        <React.Fragment>
          <Input
            id="title"
            element="input"
            type="text"
            label="Titre du stage"
            value={modifiedValues.title}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un titre valide."
            onInput={inputHandler} // Make sure inputHandler is defined
          />
          <Input
            id="description"
            element="input"
            type="text"
            label="Description"
            value={modifiedValues.description} // Set the value to display current value
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un courriel valide."
            onInput={inputHandler}
          />
          <Input
            id="salary"
            element="input"
            type="text"
            label="Salaire"
            value={modifiedValues.salary} // Set the value to display current value
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un numéro de téléphone valide."
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Adresse de l'entreprise"
            value={modifiedValues.address} // Set the value to display current value
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un nom valide."
            onInput={inputHandler}
          />
          <Input
            id="startingDate"
            element="input"
            type="date"
            label="Date de début"
            value={modifiedValues.startingDate} // Set the value to display current value
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez une adresse valide."
            onInput={inputHandler}
          />
          <Input
            id="endingDate"
            element="input"
            type="date"
            label="Date de fin"
            value={modifiedValues.endingDate} // Set the value to display current value
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez une date valide."
            onInput={inputHandler}
          />
          <div className="button-row">
            <Button onClick={handleSaveClick}>Enregistrer</Button>
            <Button onClick={handleCancelClick}>Annuler</Button>
            <Button onClick={props.onClickDeleteFunction}>Supprimer</Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default StageItem;
