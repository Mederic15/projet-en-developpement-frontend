import React, { useState, useContext } from 'react';
import './StageItem.css';

const StageItem = props => {

  return (
    <React.Fragment>
      <div className='stage-item__actions'>
      <h2>{props.title}</h2>
      <h2>{props.description}</h2>
      <h2>{props.salary}</h2>
      <h2>{props.address}</h2>
      <h2>{props.startingDate}</h2>
      <h2>{props.endingDate}</h2>
      <h2>{props.description}</h2>
      </div>
    </React.Fragment>
  );
};

export default StageItem;