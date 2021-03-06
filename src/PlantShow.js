import React from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PlantShow extends React.Component {


  //EOL data services -- kind of weird, they dont require a key but still include ?key= in the fetch request and its hard to really browse or make a -proper- request
  //"native_status": "L48(N)AK(N)CAN(N)",// native code status N native, states follow, AK Alaska, CAN Canada

  state = {
    repot: null,
    startDate: new Date(),
    newPlant: null,
    success: null,


  }

  addPlant = (props) => {
            // onClick={this.props.handleSearchSubmit}
    console.log("----------------ADDING PLANT!", props.currentPlant.common_name, props.currentPlant.scientific_name, this.state.repot, this.state.startDate)
    //what do i want to save?
    // props.common_name, props.scientific_name, date of today, and any note for potting, user_id me,
    // :plant_name,        :plant_nickname,       :acquired,             :repot,           :owner_id
    fetch(`http://localhost:3000/plants`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        plant_name: props.currentPlant.common_name,
        plant_nickname: props.currentPlant.scientific_name,
        repot: this.state.repot,
        acquired: this.state.startDate,
        owner_id: 1,
      })
    })
      .then(r => r.json())
      .then( data => {
        console.log(data)
        this.setState({
          newPlant: data,
          success: true,
        })
      })
  }

  handleRepotChange = (event) => {

    let fullRepot = (event.target.value);
    console.log("fullRepot", fullRepot)
    this.setState({
      repot: fullRepot,
    })
  }

  renderImages () {
    if (this.props.currentPlant.images.length > 0){
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

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  //could deconstruct these props for readability now that i lifted code from here higher up so all this.props.currentPlant are extra

  render () {
    console.log("in plant show, props:", this.props)
    return (
      <div className="PlantShow">
        <button className="button-close" style={{textDecoration: 'none'}} onClick={this.props.closePlantShow}>Close</button>
        {
          this.state.success
          ?
          <>
          <h3> Woo! You've added {this.props.currentPlant.scientific_name} to your garden!</h3>
          <button>See your garden</button>
          </>
          :
          <>
          <span><h3> Common name: {this.props.currentPlant.common_name ? this.props.currentPlant.common_name : "Incomplete data"} </h3><br />
          <h3> Scientific name: {this.props.currentPlant.scientific_name ? this.props.currentPlant.scientific_name : "Incomplete data"} </h3><br />
          <h3> Data:{this.props.currentPlant.complete_data ? "Complete" : "Incomplete"} </h3><br />
          <h3> Class: {this.props.currentPlant.class ? this.props.currentPlant.class.name : "Incomplete data"}</h3><br />
          <h3> Division: {this.props.currentPlant.division ? this.props.currentPlant.division.name : "Incomplete data"}</h3><br />
          <h3> Family: {this.props.currentPlant.family ? this.props.currentPlant.family.name || this.props.currentPlant.family_common_name : "Incomplete data"} </h3><br />
          <h3> Order: {this.props.currentPlant.order ? this.props.currentPlant.order.name : "Incomplete data"}</h3><br />
          <h3> Duration: {this.props.currentPlant.duration}</h3><br />
          <h3> Flower: {this.props.currentPlant.main_species.flower.color}</h3><br />
          <h3> Foliage: {this.props.currentPlant.main_species.foliage.color},  {this.props.currentPlant.main_species.foliage.porosity_summer}, {this.props.currentPlant.main_species.foliage.texture}</h3><br />
          <h3> Soil: ph min {this.props.currentPlant.main_species.growth.ph_minimum}, ph max {this.props.currentPlant.main_species.growth.ph_maximum}</h3><br />
          <h3>Blooms in: {this.props.currentPlant.seed ? this.props.currentPlant.seed.bloom_period : "Incomplete data"}</h3><br />
          <input
          type="text"
          value={this.state.repot}
          onChange={this.handleRepotChange}
          placeholder="Potting situation of new addition"/><br />

          <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange} />

          <button
          type="submit"
          onClick={() => {this.addPlant(this.props)}}
          style={{textDecoration: 'none'}}>Add to your garden</button>


          <h3> Photos</h3></span><br />
          {this.renderImages()}
          </>
        }




      </div>
    );
  }

}

export default PlantShow;
