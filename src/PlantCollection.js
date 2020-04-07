import React from 'react';
import './App.css';
import PlantCard from './PlantCard.js'


class PlantCollection extends React.Component {

  renderNames () {
    return this.props.someData.map( el => {
      return <PlantCard selectPlant={this.props.selectPlant} plantInfo={el}  />
    })
  }


  render () {
    console.log("in plant collection", this.props.someData)

    return (
      <div className="PlantCollection">
      {
        this.props.someData
        ?
        this.renderNames()
        :
        null
      }
      </div>
    );
  }

}

export default PlantCollection;
