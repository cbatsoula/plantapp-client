import React from 'react';
import './App.css';

class PlantShow extends React.Component {

  //found another api with maybe more complete data, so if thats true, in APP where I get the currentplant's data I need to run a conditional to see if that plant data is complete, if not fetch from this other API. WIll need to likely break down the props bc they will likely not match up in structure.
  //EOL data services -- kind of weird, they dont require a key but still include ?key= in the fetch request and its hard to really browse or make a -proper- request
  //USDA doesnt have a REST API, some individual devs have some progress on making it possible but nothing yet useable

  renderImages () {
    if (this.props.currentPlant.images){
      console.log("renderImages TRUUUU", this.props.currentPlant.images)
      return this.props.currentPlant.images.map( image => {
        console.log("image", image)
        return <img src={image.url} height={500} width={500} ></img>
      })
    } else {
      console.log("renderImages NAAHHHHH")
      return <h4> No images available </h4>
    }
  }

  render () {
    console.log("in plant show, props:", this.props, "in plant show, state:", this.state)
    return (
      <div className="PlantShow">
        <span><h3> Common name: {this.props.currentPlant.common_name ? this.props.currentPlant.common_name : "Incomplete data"} </h3><br />
        <h3> Scientific name: {this.props.currentPlant.scientific_name ? this.props.currentPlant.scientific_name : "Incomplete data"} </h3><br />
        <h3> Data:{this.props.currentPlant.complete_data ? "Complete" : "Incomplete"} </h3><br />
        <h3> Class: {this.props.currentPlant.class ? this.props.currentPlant.class.name : "Incomplete data"}</h3><br />
        <h3> Division: {this.props.currentPlant.division.name ? this.props.currentPlant.division.name : "Incomplete data"}</h3><br />
        <h3> Family: {this.props.currentPlant.family.common_name}, {this.props.currentPlant.family.name}</h3><br />
        <h3> Order: {this.props.currentPlant.order.name}</h3><br />
        <h3> Duration: {this.props.currentPlant.duration}</h3><br />
        <h3> Flower: {this.props.currentPlant.main_species.flower.color}</h3><br />
        <h3> Foliage: {this.props.currentPlant.main_species.foliage.color},  {this.props.currentPlant.main_species.foliage.porosity_summer}, {this.props.currentPlant.main_species.foliage.texture}</h3><br />
        <h3> Soil: ph min {this.props.currentPlant.main_species.growth.ph_minimum}, ph max {this.props.currentPlant.main_species.growth.ph_maximum}</h3><br />
        <h3>Blooms in: {this.props.currentPlant.seed ? this.props.currentPlant.seed.bloom_period : "Incomplete data"}</h3><br />
        <h3> Photos</h3></span><br />
        {this.renderImages()}


      </div>
    );
  }

}

export default PlantShow;
