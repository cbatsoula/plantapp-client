import React from 'react';
import './App.css';


class PlantCard extends React.Component {
  //this might be better hoisted up into App so I can have all plant images and data before rendering the card and selecting the plant and then again calling a fetch to get the same data
  state = {
    thisPlantData: null,
    images: null,
  }

  componentDidMount () {

  //   fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${this.props.plantInfo.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
  //     .then( r => r.json())
  //     .then( data => {
  //       console.log("id fetch data response", data)
  //       this.setState({
  //         thisPlantData: data,
  //       }, () => {this.images()})
  //       // {console.log("from state data", this.state.thisPlantData.images[0])}
  //     })
  // }

  // images () {
  //   if (this.state.thisPlantData.images) {
  //     this.setState({
  //       images: this.state.thisPlantData.images
  //     })
  //   }
    // if (this.state.thisPlantData.images) {
    //   return <img src={this.state.thisPlantData.images[0]}></img>
    // } else if (this.state.thisPlantData.images === false)
    //   return <h3>no photo available</h3>


  }

  //commented out from within PlantCard bc JSX
  // <div className="PlantCardImage">
  // {
  //   this.state.images
  //   ?
  //   <img src={this.state.thisPlantData.images[0].url} width={300} ></img>
  //   :
  //   <h4> No image available </h4>
  // }
  // </div>


  render () {
    console.log("plant card", this.props)

    return (
      <div className="PlantCard" onClick={() => {this.props.selectPlant(this.props.plantInfo)}}>
        <div className="PlantCardDetails">
        <span>
          <h3>{this.props.plantInfo.common_name ? this.props.plantInfo.common_name : "no common name"}</h3><br />
          <h3>{this.props.plantInfo.scientific_name}</h3><br />
        </span>
        </div>



      </div>

    );
  }

}

export default PlantCard;
