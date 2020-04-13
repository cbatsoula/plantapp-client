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

  renderImages () {
    if (this.state.images){
      console.log("renderImages TRUUUU", this.state.images)
      return this.state.images.map( image => {
        console.log("image", image)
        return <img src={image} width={300} ></img>
      })
    } else {
      console.log("renderImages NAAHHHHH")
      return <h4> No image available </h4>
    }
  }

  images () {
    if (this.state.thisPlantData.images) {
      this.setState({
        images: this.state.thisPlantData.images
      })
    }
  }

  render () {
    console.log("in plant show, props:", this.props, "in plant show, state:", this.state)
    return (
      <div className="PlantShow">
        <h5> common name:{this.props.currentPlant.common_name} </h5><br />
        <h5> scientific name: {this.props.currentPlant.scientific_name} </h5>
        <h5> complete data? :{this.props.currentPlant.complete_data.toString()} </h5>

        {
          this.state.thisPlantData
          ?
          <>
          <span><h5> class: {this.state.thisPlantData.class.name}</h5><br />
          <h5> division: {this.state.thisPlantData.division.name}</h5><br />
          <h5> family: {this.state.thisPlantData.family.common_name}, {this.state.thisPlantData.family.name}</h5><br />
          <h5> order: {this.state.thisPlantData.order.name}</h5><br />

          <h5> duration: {this.state.thisPlantData.duration}</h5><br />

          <h3> flower: {this.state.thisPlantData.main_species.flower.color}</h3><br />
          <h3> foliage: {this.state.thisPlantData.main_species.foliage.color},  {this.state.thisPlantData.main_species.foliage.porosity_summer}, {this.state.thisPlantData.main_species.foliage.texture}</h3><br />

          <h3>growth: ph min {this.state.thisPlantData.main_species.growth.ph_minimum}, ph max {this.state.thisPlantData.main_species.growth.ph_maximum}</h3><br /></span>

          {this.renderImages()}

          </>
          :
          null
        }


      </div>
    );
  }

}

export default PlantShow;
