import React from 'react';
import './App.css';



class GardenCard extends React.Component {


  render () {
    console.log("Garden Card Props:", this.props)
    return (
      <div className="GardenCard">
        <span><h3> Name: {this.props.plant.plant_name}</h3><br />
        <h3> Nickname: {this.props.plant.plant_nickname}</h3><br />
        <h3> Acquired on: {this.props.plant.acquired}</h3><br /></span>
      </div>
    );
  }

}

export default GardenCard;
