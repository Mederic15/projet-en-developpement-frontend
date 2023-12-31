import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./StageItem.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";

const StageItem = (props) => {
  const { sendRequest } = useHttpClient();

  const [isEditing, setIsEditing] = useState(false);
  const [modifiedValues, setModifiedValues] = useState({
    title: props.title,
    description: props.description,
    salary: props.salary,
    address: props.address,
    startingDate: props.startingDate,
    endingDate: props.endingDate,
  });

  const [studentHasApplied, setStudentHasApplied] = useState(
    hasStudentAppliedToInternship(props.studentId, props.students)
  );

  async function makeStudentApplyToInternship(internshipId, studentId) {
    const dataToSend = JSON.stringify({});

    await sendRequest(
      "https://development-project-0105-api-zdnf.onrender.com/internships/" +
        internshipId +
        "/" +
        studentId,
      "PATCH",
      dataToSend,
      {
        "Content-Type": "application/json",
      }
    );
  }

  function hasStudentAppliedToInternship(studentId, students) {
    let studentHasApplied = false;
    students.forEach((student) => {
      console.log("student", student);
      if (student.student._id === studentId) {
        studentHasApplied = true;
      }
    });
    return studentHasApplied;
  }

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModifiedValues({ ...modifiedValues, [name]: value });
  };

  const handleApplyClick = () => {
    makeStudentApplyToInternship(props.id, props.studentId);
    console.log(
      "    makeStudentApplyToInternship(props.id, props.studentId);",
      props.id,
      props.studentId
    );
    setStudentHasApplied(true);
    alert("Votre candidature a bien été envoyée! ")
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
          <h2>
            Gérant: {props.managerName}
          </h2>
          <h2>Courriel du gérant: {props.managerEmail}</h2>

          <label htmlFor="title">Titre du stage</label>
          <input
            id="title"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            name="title"
            value={modifiedValues.title}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <br></br>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            name="description"
            value={modifiedValues.description}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <br></br>
          <label htmlFor="salary">Salaire</label>
          <input
            id="salary"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            name="salary"
            value={modifiedValues.salary}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <br></br>
          <label htmlFor="address">Adresse de l'entreprise</label>
          <input
            id="address"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            name="address"
            value={modifiedValues.address}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <br></br>
          <label htmlFor="startingDate">Date de début</label>
          <input
            id="startingDate"
            element="input"
            type="date"
            validators={[VALIDATOR_REQUIRE()]}
            name="startingDate"
            value={formatDate(modifiedValues.startingDate)}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <br></br>
          <label htmlFor="endingDate">Date de fin</label>
          <input
            id="endingDate"
            element="input"
            type="date"
            validators={[VALIDATOR_REQUIRE()]}
            name="endingDate"
            value={formatDate(modifiedValues.endingDate)}
            onChange={handleInputChange}
            onInput={inputHandler}
          />
          <div className="button-row">
            {props.isStudent ? (
              <Button onClick={handleApplyClick}>Postuler</Button>
            ) : (
              <>
                <Button onClick={handleSaveClick}>Enregistrer</Button>
                <Button onClick={handleCancelClick}>Annuler</Button>
                <Button onClick={props.onClickDeleteFunction}>Supprimer</Button>
              </>
            )}
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
          <h2>
            Gérant: {props.managerName}
          </h2>
          <h2>Courriel du gérant: {props.managerEmail}</h2>
          <div className="button-row">
            {props.isStudent ? (
              studentHasApplied ? (
                <Button onClick={handleApplyClick} disabled>
                  Postuler
                </Button>
              ) : (
                <Button onClick={handleApplyClick}>Postuler</Button>
              )
            ) : (
              <>
                <h3>Stagiaires:</h3>
                <hr></hr>
                {props.students.map((student) => {
                  console.log("student", student);
                  if (
                    hasStudentAppliedToInternship(
                      student.student._id,
                      props.students
                    )
                  ) {
                    return (
                      <>
                        <h3>
                          {"Nom complet: " +
                            student.student.firstName +
                            " " +
                            student.student.lastName}
                        </h3>
                        <h3>{"Email: " + student.student.email}</h3>
                        <h3>
                          {"Numéro de téléphone: " +
                            student.student.phoneNumber}
                        </h3>
                        <h3>
                          {"Date d'application: " + student.applicationDate}
                        </h3>
                        <hr></hr>
                      </>
                    );
                  } else {
                    return <></>;
                  }
                })}
                <Button onClick={props.onClickDeleteFunction}>
                  Supprimer{" "}
                </Button>
                <Button onClick={handleModifyClick}>Modifier</Button>
              </>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default StageItem;
