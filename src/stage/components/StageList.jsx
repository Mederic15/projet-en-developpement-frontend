import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import StageItem from "./StageItem";
import Button from "../../shared/components/FormElements/Button";
import "./StageList.css";

const StageList = (props) => {
  const [stages, setStages] = useState([]);
  let filteredStages = props.stages;

  useEffect(() => {
    fetch("https://development-project-0105-api-zdnf.onrender.com/internships/")
      .then((response) => response.json())
      .then((data) => {
        setStages(data.internships);
      })
      .catch((error) => console.error(error));
  }, []);

  filteredStages =
    props.selectedStageType === "Tous"
      ? stages
      : stages.filter((stage) => stage.type === props.selectedStageType);

  console.log(stages);

  if (stages.length === 0) {
    return (
      <div className="stage-list center">
        <Card>
          <h2>Aucun stage trouvé. Voulez-vous en créer un ?</h2>
          <Button to="/stages/new">Créer un stage</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="stage-list">
      {filteredStages.map((stage) => (
        <StageItem
          key={stage.id}
          id={stage.id}
          title={stage.title}
          description={stage.description}
          salary={stage.salary}
          address={stage.address}
          startingDate={stage.startingDate}
          endingDate={stage.endingDate}
          onClickDeleteFunction={() => {
            try {
              console.log("stage.id" + stage.id);
              fetch(
                "https://development-project-0105-api-zdnf.onrender.com/internships/" +
                  stage.id,
                {
                  method: "DELETE",
                }
              );
            } catch (err) {
              console.log(err);
            }
          }}
          onClickModifyFunction={() => {
            let titreStage = prompt("Nouveau titre de stage"),
              descriptionStage = prompt("Nouvelle description"),
              salaire = prompt("Nouveau salaire"),
              adresse = prompt("Nouvelle adresse"),
              dateDebut = prompt("Nouvelle date de début (AAAA/MM/DD)"),
              dateFin = prompt("Nouvelle date de fin (AAAA/MM/DD)");

            fetch(
              "https://development-project-0105-api-zdnf.onrender.com/internships/" + stage.id,
              {
                method: "PATCH",
                body: JSON.stringify({
                  title: titreStage,
                  description: descriptionStage,
                  address: adresse,
                  salary: salaire,
                  startingDate: dateDebut,
                  endingDate: dateFin
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            )
              .then((response) => {
                console.log(response);
                alert("le stage a bien été modifié");
              })
              .then((json) => console.log(json));

          }}
        />
      ))}
    </ul>
  );
};

export default StageList;
