import React from 'react';
import './App.css';
import GardenCard from './GardenCard.js';


class GardenShelf extends React.Component {

  listPlants = () => {
    return this.props.myPlants.map( plant => { return <GardenCard plant={plant} key={plant.id} /> })
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
