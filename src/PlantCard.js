import React from 'react';
import './App.css';


class PlantCard extends React.Component {



  render () {
    console.log("plant card", this.props.plantInfo)
    return (
      <div className="PlantCard">
      <h3>{this.props.plantInfo.common_name}</h3>
      </div>
    );
  }

}

export default PlantCard;
