import React from 'react';
import './App.css';


class PlantCard extends React.Component {

  state = {
    thisPlantData: null,
  }

  componentDidMount () {

    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${this.props.plantInfo.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("id fetch data response", data)
        this.setState({
          thisPlantData: data,
        }, () => {console.log("from state data", this.state.thisPlantData.images[0])})

      })
  }

  images () {
    if (this.state.thisPlantData.images) {
      return <img src={this.state.thisPlantData.images[0]}></img>
    } else
      return <h3>no photo available</h3>


  }


  render () {
    // console.log("plant card", this.props.plantInfo)

    return (
      <div className="PlantCard">

      <h3>{this.props.plantInfo.common_name ? this.props.plantInfo.common_name : null}</h3>
      <h4>{this.props.plantInfo.scientific_name}</h4>

      </div>
    );
  }

}

export default PlantCard;
