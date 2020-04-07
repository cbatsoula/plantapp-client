import React from 'react';
import './App.css';


class PlantCard extends React.Component {

  state = {
    thisPlantData: null,
    images: null,
  }

  componentDidMount () {

    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${this.props.plantInfo.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
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
    // if (this.state.thisPlantData.images) {
    //   return <img src={this.state.thisPlantData.images[0]}></img>
    // } else if (this.state.thisPlantData.images === false)
    //   return <h3>no photo available</h3>


  }


  render () {
    console.log("plant card", this.state)

    return (
      <div className="PlantCard">

      <h3>{this.props.plantInfo.common_name ? this.props.plantInfo.common_name : "no common name"}</h3>
      <h4>{this.props.plantInfo.scientific_name}</h4>

        <div className="PlantCardImage">
        {
          this.state.images
          ?
          <img src={this.state.thisPlantData.images[0].url} width={300} ></img>
          :
          <h4> No image available </h4>
        }
        </div>


      </div>
    );
  }

}

export default PlantCard;
