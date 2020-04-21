import React from 'react';
import './App.css';



class PlantShow extends React.Component {

  //maybe change layout, so that the detail show page of each plant will almost just be a panel, I think this would be a good way to browse the plants with images rather than even showing the image in a PlantCard maybe??!!!

  state = {
    thisPlantData: null,
    images: null,
  }

  componentDidMount () {

    //hoist this fetch up to app and add in a conditional to check the id??

    // this.fetchPlant()
  }

  fetchPlant = () => {

    // fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${this.props.currentPlant.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
    //   .then( r => r.json())
    //   .then( data => {
    //     console.log("id fetch data response", data)
    //     this.setState({
    //       thisPlantData: data,
    //     }, () => {this.images()})
    //     // {console.log("from state data", this.props.currentPlant.images[0])}
    //   })
  }

  renderImages () {
    console.log("renderImages:", this.state.images, this.state.thisPlantData)
    if (this.props.currentPlant.images){
      console.log("renderImages TRUUUU", this.state.images)
      return this.props.currentPlant.images.map( image => {
        console.log("image", image)
        return <img src={image.url} height={500} width={500} ></img>
      })
    } else {
      console.log("renderImages NAAHHHHH")
      return <h4> No images available </h4>
    }
  }

  images () {
    if (this.props.currentPlant.id || this.state.thisPlantData.id) {
      console.log("images, props id:",this.props.currentPlant.id, "state id:", this.state.thisPlantData.id)
      // this.setState({
      //   images: this.state.thisPlantData.images
      // })
    } else if (this.state.thisPlantData.images === []) {
      this.setState({
        images: null
      })
    // } else if (this.state.thisPlantData.images) {
    //   // console.log("images, props id:",this.props.currentPlant.id, "state id:", this.state.thisPlantData.id)
    }
  }

  render () {
    console.log("in plant show, props:", this.props, "in plant show, state:", this.state)
    return (
      <div className="PlantShow">
        <span><h3> Common name:{this.props.currentPlant.common_name ? this.props.currentPlant.common_name : "No common name"} </h3><br />
        <h3> Scientific name: {this.props.currentPlant.scientific_name ? this.props.currentPlant.scientific_name : "No scientific name"} </h3><br />
        <h3> Data:{this.props.currentPlant.complete_data ? "Complete" : "Incomplete"} </h3><br />
        <h3> Class: {this.props.currentPlant.class.name}</h3><br />
        <h3> Division: {this.props.currentPlant.division.name}</h3><br />
        <h3> Family: {this.props.currentPlant.family.common_name}, {this.props.currentPlant.family.name}</h3><br />
        <h3> Order: {this.props.currentPlant.order.name}</h3><br />
        <h3> Duration: {this.props.currentPlant.duration}</h3><br />
        <h3> Flower: {this.props.currentPlant.main_species.flower.color}</h3><br />
        <h3> Foliage: {this.props.currentPlant.main_species.foliage.color},  {this.props.currentPlant.main_species.foliage.porosity_summer}, {this.props.currentPlant.main_species.foliage.texture}</h3><br />
        <h3> Growth: ph min {this.props.currentPlant.main_species.growth.ph_minimum}, ph max {this.props.currentPlant.main_species.growth.ph_maximum}</h3><br />
        <h3> Photos</h3></span><br />
        {this.renderImages()}


      </div>
    );
  }

}

export default PlantShow;
