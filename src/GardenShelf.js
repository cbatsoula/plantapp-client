import React from 'react';
import './App.css';
import GardenCard from './GardenCard.js';
import GardenShow from './GardenShow.js';
import ManualAddPlant from './ManualAddPlant.js';


class GardenShelf extends React.Component {

  state = {
    gardenShow: null,
    currentPlant: null,
    manualPlant: false,
  }

  listPlants = () => {
    return this.props.myPlants.map( plant => { return <GardenCard plant={plant} gardenShow={this.state.gardenShow} selectGardenPlant={this.selectGardenPlant} key={plant.id} /> })
  }

  selectGardenPlant = (props) => {
    console.log("selectGardenPlant!", props)
    this.setState({
      gardenShow: !this.state.gardenShow,
      currentPlant: props
    }, () => {console.log("selectGardenPlant setSTATE", this.state.gardenShow)})
  }

  closeGardenShow = () => {
    console.log("CLOSE")
    this.setState({
      gardenShow: !this.state.gardenShow,
    })
  }

  manualTogglePlant = () => {
     console.log("manualPlant")
     this.setState({
       manualPlant: !this.state.manualPlant,
     })
  }

  render () {
    console.log("Garden Shelf Props:", this.props)
    return (
      <div className="GardenShelfContainer">
        {
          this.state.gardenShow
          ?
          <GardenShow closeGardenShow={this.closeGardenShow} gardenShow={this.state.gardenShow} currentPlant={this.state.currentPlant}/>
          :
          null
        }
        <button onClick={this.manualTogglePlant} style={{textDecoration: 'none'}}>Manually Add Custom Plant</button>
        {
          this.state.manualPlant
          ?
          <ManualAddPlant />
          :
          null
        }
        <span><h3>These are your plants!</h3><br /></span>
        {this.listPlants()}

      </div>
    );
  }

}

export default GardenShelf;