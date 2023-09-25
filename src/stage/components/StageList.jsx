import React, { useEffect, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import StageItem from './StageItem';
import Button from '../../shared/components/FormElements/Button';
import './StageList.css';

const StageList = props => {
  const [stages, setStages] = useState([]);
  let filteredStages = props.stages;

  useEffect(() => {
    fetch('https://development-project-0105-api-zdnf.onrender.com/internships/')
      .then(response => response.json())
      .then(data => {
        setStages(data.internships);
      })
      .catch(error => console.error(error));
  }, []);

  filteredStages = props.selectedStageType === "Tous"
  ? stages
  : stages.filter(stage => stage.type === props.selectedStageType);

  console.log(stages);

  if (stages.length === 0) {
    return (
      <div className="stage-list center">
        <Card>
          <h2>No stage found. Maybe create one?</h2>
          <Button to="/stages/new">Share stage</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="stage-list">
      {filteredStages.map(stage => (
        <StageItem
          key={stage.id}
          id={stage.id}
          title={stage.title}
          description={stage.description}
          salary={stage.salary}
          address={stage.address}
          startingDate={stage.startingDate}
          endingDate={stage.endingDate}
        />
      ))}
    </ul>
  );
};

export default StageList;