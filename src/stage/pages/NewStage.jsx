import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
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

const NewStage = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [isFormVisible, setFormVisible] = useState(false);
  const [stages, setStages] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState("Tous");

  const handleStageTypeChange = (id, value, isValid) => {
    if (isValid) {
      setSelectedStageType(value);
    } else {
      setSelectedStageType("Tous");
    }
  };

  useEffect(() => {
    fetch('https://development-project-0105-api-zdnf.onrender.com/internships/')
      .then(response => response.json())
      .then(data => {
        setStages(data.stages);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredStages = selectedStageType === "Tous"
  ? stages
  : stages.filter(stage => stage.type === selectedStageType);

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

  const history = useNavigate ();

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
      employerId: "6511ef9299867bb2d4bc921d"
    });

    console.log(dataToSend);


    try {
      const reponseData = await sendRequest(
        'https://development-project-0105-api-zdnf.onrender.com/internships/',
        "POST",
        dataToSend,
        {
          "Content-Type": "application/json",
        }
      );

      console.log(reponseData);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Button onClick={toggleFormVisibility}>
        {isFormVisible ? "Masquer le formulaire" : "Afficher le formulaire"}
      </Button>

      <Select
        id="stageType"
        label="Type de stage à afficher"
        onInput={handleStageTypeChange}
        value={selectedStageType}
      />

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
              type="email"
              label="Description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText="Entrez un courriel valide."
              onInput={inputHandler}
            />
            <Input
              id="salary"
              element="input"
              type="tel"
              label="Salaire"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
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
            <Button type="submit">Ajouter stage</Button>
          </form>
      )}
            <StageList selectedStageType={selectedStageType}/>
    </React.Fragment>
  );
};

export default NewStage;