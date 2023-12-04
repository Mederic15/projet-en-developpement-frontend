import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StageList from "../components/StageList";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Select from "../../shared/components/FormElements/Select";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./StageForm.css";

const NewStage = (props) => {
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [isFormVisible, setFormVisible] = useState(false);
  const [utilisateur, setUtilisateur] = useState(props.utilisateur);
  const [stages, setStages] = useState([]);

  const [selectedStageType, setSelectedStageType] = useState("Tous");
  const history = useNavigate();

  const handleStageTypeChange = (id, value, isValid) => {
    if (isValid) {
      setSelectedStageType(value);
    } else {
      setSelectedStageType("Tous");
    }
  };

  useEffect(() => {
    fetch("https://development-project-0105-api-zdnf.onrender.com/internships/")
      .then((response) => response.json())
      .then((data) => {
        setStages(data.internships);
      })
      .catch((error) => console.error(error));
  }, []);

  const toggleFormVisibility = () => {
    setFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

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

  const checkFormValidity = () => {
    for (const inputName in formState.inputs) {
      if (!formState.inputs[inputName].isValid) {
        setIsFormValid(false);
        return;
      }
    }
    setIsFormValid(true);
  };

  useEffect(() => {
    checkFormValidity();
  }, [formState]);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleManagerNameChange = (value, isValid) => {
    setManagerName(value);
  };

  const handleManagerEmailChange = (value, isValid) => {
    setManagerEmail(value);
  };

  const stageSubmitHandler = async (event) => {
    event.preventDefault();
    setFormVisible(false);

    const dataToSend = JSON.stringify({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      salary: formState.inputs.salary.value,
      address: formState.inputs.address.value,
      startingDate: formState.inputs.startingDate.value,
      endingDate: formState.inputs.endingDate.value,
      employerId: utilisateur.employer.id,
      managerName:
        utilisateur.employer.managerFirstName +
        " " +
        utilisateur.employer.managerLastName, // Ajoutez le nom du gérant
      managerEmail: utilisateur.employer.email,
    });

    try {
      await sendRequest(
        "https://development-project-0105-api-zdnf.onrender.com/internships/",
        "POST",
        dataToSend,
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {utilisateur.message === "student object" ? (
        <></>
      ) : (
        <>
          <Button onClick={toggleFormVisibility}>
            {isFormVisible ? "Masquer le formulaire" : "Afficher le formulaire"}
          </Button>
        </>
      )}

      {isFormVisible && (
        <form className="stage-form" onSubmit={stageSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Titre du stage"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un titre valide."
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un courriel valide."
            onInput={inputHandler}
          />
          <Input
            id="salary"
            element="input"
            type="text"
            label="Salaire"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un numéro de téléphone valide."
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Adresse de l'entreprise"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un nom valide."
            onInput={inputHandler}
          />
          <Input
            id="startingDate"
            element="input"
            type="date"
            label="Date de début"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez une adresse valide."
            onInput={inputHandler}
          />
          <Input
            id="endingDate"
            element="input"
            type="date"
            label="Date de fin"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez une date valide."
            onInput={inputHandler}
          />

          {isFormValid && <Button type="submit">Ajouter stage</Button>}
        </form>
      )}
      <StageList
        selectedStageType={selectedStageType}
        utilisateur={utilisateur}
      />
    </React.Fragment>
  );
};

export default NewStage;
