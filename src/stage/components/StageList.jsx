import React, { useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import StageItem from "./StageItem";
import Button from "../../shared/components/FormElements/Button";
import "./StageList.css";

const StageList = (props) => {
  const [stages, setStages] = useState([]);
  let filteredStages = props.stages;

  const fetchStages = async () => {
    try {
      const response = await fetch(
        "https://development-project-0105-api-zdnf.onrender.com/internships/"
      );
      const data = await response.json();

      let internships = data.internships;
      if (props.utilisateur.message === "employer object") {
        internships = internships.filter((internship) => {
          return internship.employerId === props.utilisateur.employer.id;
        });
      }
      setStages(internships);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const handleSaveStage = (stageId, updatedStageData) => {
    fetch(
      "https://development-project-0105-api-zdnf.onrender.com/internships/" + stageId,
      {
        method: "PATCH",
        body: JSON.stringify(updatedStageData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        console.log(response);
        alert("Le stage a bien été modifié");
        fetchStages();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  filteredStages =
    props.selectedStageType === "Tous"
      ? stages
      : stages.filter((stage) => stage.type === props.selectedStageType);

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
          isStudent={props.utilisateur.message === "student object"}
          onClickDeleteFunction={() => {
            try {
              console.log("stage.id" + stage.id);
              fetch(
                "https://development-project-0105-api-zdnf.onrender.com/internships/" +
                  stage.id,
                {
                  method: "DELETE",
                }
              ).then(() => {
                fetchStages();
              });
            } catch (err) {
              console.log(err);
            }
          }}
          onSaveFunction={(updatedStageData) => {
            handleSaveStage(stage.id, updatedStageData);
          }}
        />
      ))}
    </ul>
  );
};

export default StageList;
