import React from 'react';
import './App.css';



class GardenShow extends React.Component {

  deletePlant = (props) => {

    console.log("delete!", props)
        fetch(`http://localhost:3000/plants/${props.plant.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE",
        "Access-Control-Allow-Origin": "http://localhost"
      //   "Accept": "application/json",
      },
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
      })
  }


  render () {
    console.log("Garden Show Props:", this.props)
    return (
      <div className="GardenShowContainer">
      <span><h3> Name: {this.props.currentPlant.plant.plant_name} </h3><br /> <button style={{textDecoration: 'none'}} onClick={this.props.closeGardenShow}>Close</button>
      <h3> Nickname: {this.props.currentPlant.plant.plant_nickname}</h3><br />
      <h3> Acquired: {this.props.currentPlant.plant.acquired}</h3><br />
      <h3> Repot notes: {this.props.currentPlant.plant.repot}</h3><br /></span>
        <div className="Garden-Buttons">
          <button style={{textDecoration: 'none'}}>Edit</button>
          <button onClick={() => {this.deletePlant(this.props.currentPlant)}} style={{textDecoration: 'none'}}>Delete</button>
          <button style={{textDecoration: 'none'}}>Propagate!!</button>
        </div>
      </div>
    );
  }

}

export default GardenShow;
