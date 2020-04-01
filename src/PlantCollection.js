import React from 'react';
import './App.css';


class PlantCollection extends React.Component {

  renderNames () {
    // this.props.someData.map( el => {return <h1> el.common_name </h1>})
  }


  render () {
    console.log("in plant collection", this.props.someData)

    return (
      <div className="PlantCollection">
      {
        this.renderNames()
      }
      </div>
    );
  }

}

export default PlantCollection;
