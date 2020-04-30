import React from 'react';
import './App.css';



class GardenShelf extends React.Component {

  listPlants = () => {
    this.props.myPlants.map( plant => {console.log(plant.plant_name)})
  }

  render () {
    console.log("Garden Shelf Props:", this.props)
    return (
      <div className="GardenShelfContainer">
        <h3>These are your plants!</h3>
        {this.listPlants()}
      </div>
    );
  }

}

export default GardenShelf;
