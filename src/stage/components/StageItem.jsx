import React, { useState } from 'react';
import './StageItem.css';

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
          <button onClick={props.onClickDeleteFunction}>Supprimer</button>
          <button onClick={handleModifyClick}>Modifier</button>
        </React.Fragment>
      )}
      {isEditing && (
        <React.Fragment>
          <input
            type="text"
            name="title"
            value={modifiedValues.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={modifiedValues.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="salary"
            value={modifiedValues.salary}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            value={modifiedValues.address}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="startingDate"
            value={modifiedValues.startingDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endingDate"
            value={modifiedValues.endingDate}
            onChange={handleInputChange}
          />
          <div className="button-row">
            <button onClick={handleSaveClick}>Enregistrer</button>
            <button onClick={handleCancelClick}>Annuler</button>
            <button onClick={props.onClickDeleteFunction}>Supprimer</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default StageItem;
