import React from 'react';
import './App.css';



class GardenShow extends React.Component {


  render () {
    console.log("Garden Show Props:", this.props)
    return (
      <div className="GardenShowContainer">
      <span><h3> Name: {this.props.currentPlant.plant.plant_name} </h3><br />
      <h3> Nickname: {this.props.currentPlant.plant.plant_nickname}</h3><br />
      <h3> Acquired: {this.props.currentPlant.plant.acquired}</h3><br />
      <h3> Repot notes: {this.props.currentPlant.plant.repot}</h3><br /></span>
      <button style={{textDecoration: 'none'}}>Edit</button>
      <button style={{textDecoration: 'none'}}>Delete</button>
      <button style={{textDecoration: 'none'}}>Propagate!!</button>
      </div>
    );
  }

}

export default GardenShow;
