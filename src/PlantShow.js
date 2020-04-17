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

    this.fetchPlant()
  }

  fetchPlant = () => {

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
    console.log("renderImages:", this.state.images, this.state.thisPlantData)
    if (this.state.images){
      console.log("renderImages TRUUUU", this.state.images)
      return this.state.images.map( image => {
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
          <h2>Photos</h2>
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
