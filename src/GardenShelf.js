import React from 'react';
import './App.css';
import GardenCard from './GardenCard.js';
import GardenShow from './GardenShow.js';


class GardenShelf extends React.Component {

  state = {
    gardenShow: null,
  }

  listPlants = () => {
    return this.props.myPlants.map( plant => { return <GardenCard plant={plant} gardenShow={this.state.gardenShow} selectGardenPlant={this.selectGardenPlant} key={plant.id} /> })
  }

  selectGardenPlant = () => {
    console.log("selectGardenPlant!")
    this.setState({
      gardenShow: !this.state.gardenShow
    }, () => {console.log("selectGardenPlant setSTATE", this.state.gardenShow)})
  }

  render () {
    console.log("Garden Shelf Props:", this.props)
    return (
      <div className="GardenShelfContainer">
        <span><h3>These are your plants!</h3><br /></span>
        {this.listPlants()}
        {
          this.state.gardenShow
          ?
          <GardenShow />
          :
          null
        }
      </div>
    );
  }

}

export default GardenShelf;
