import React from 'react';
import './App.css';


class GardenShelf extends React.Component {

  render () {
    console.log("Garden Shelf Props:", this.props)
    return (
      <div className="GardenShelfContainer">
        <h3>These are your plants!</h3>
      </div>
    );
  }

}

export default GardenShelf;
