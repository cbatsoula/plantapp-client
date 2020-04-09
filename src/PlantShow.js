import React from 'react';
import './App.css';



class PlantShow extends React.Component {

  //maybe change layout, so that the detail show page of each plant will almost just be a panel, I think this would be a good way to browse the plants with images rather than even showing the image in a PlantCard maybe??!!!

  state = {
    thisPlantData: null,
    images: null,
  }

  componentDidMount () {

    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${this.props.currentPlant.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("id fetch data response", data)
        this.setState({
          thisPlantData: data,
        }, () => {this.images()})
        // {console.log("from state data", this.state.thisPlantData.images[0])}
      })
  }

  images () {
    if (this.state.thisPlantData.images) {
      this.setState({
        images: this.state.thisPlantData.images
      })
    }
  }

  render () {
    console.log("in plant show", this.props)
    return (
      <div className="PlantShow">
        <h5> {this.props.currentPlant.common_name} </h5>
        <h5> {this.props.currentPlant.scientific_name} </h5>
        <h5> complete data? :{this.props.currentPlant.complete_data.toString()} </h5>

        {
          this.state.thisPlantData
          ?
          <>
          <h5> class: {this.state.thisPlantData.class.name}</h5>
          <h5> division: {this.state.thisPlantData.division.name}</h5>
          <h5> family: {this.state.thisPlantData.family.common_name}, {this.state.thisPlantData.family.name}</h5>
          <h5> order: {this.state.thisPlantData.order.name}</h5>

          <h5> duration: {this.state.thisPlantData.duration}</h5>

          <h3> flower: {this.state.thisPlantData.main_species.flower.color}</h3>
          <h3> foliage: {this.state.thisPlantData.main_species.foliage.color},  {this.state.thisPlantData.main_species.foliage.porosity_summer}, {this.state.thisPlantData.main_species.foliage.texture}</h3>

          <h3>growth: ph min {this.state.thisPlantData.main_species.growth.ph_minimum}, ph max {this.state.thisPlantData.main_species.growth.ph_maximum}</h3>

          </>
          :
          null
        }


      </div>
    );
  }

}

export default PlantShow;
