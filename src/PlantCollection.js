import React from 'react';
import './App.css';
import PlantCard from './PlantCard.js'


class PlantCollection extends React.Component {

  renderCards () {
    return this.props.someData.map( el => {
      return <PlantCard selectPlant={this.props.selectPlant} plantInfo={el}  />
    })
  }


  render () {
    // console.log("in plant collection", this.props.someData)

    return (
      <div className="PlantCollection">
      {
        this.props.someData
        ?
        <>
        <h3>These are the results for {this.props.pastSearchTerm}</h3><br />
        <button onClick={this.props.prevPage}>Previous</button>
        {this.renderCards()}
        <button onClick={this.props.nextPage}>Next</button>
        </>
        :
        null
      }
      </div>
    );
  }

}

export default PlantCollection;
