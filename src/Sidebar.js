import React from 'react';
import './App.css';
import Faq from './Faq.js'

class Sidebar extends React.Component {

  render () {
    // console.log("sidebar", this.props)
    return (
      <div className="Sidebar">
        <div className="Sidebar-Search" >
          <input
          type="text"
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
          placeholder="Search here!"
          />
          <label>
            Fruit color:
            <select value={this.props.value} onChange={this.props.handleColorChange}>
              <option value={null}>Select</option>
              <option value="White">White</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Red">Red</option>
              <option value="Purple">Purple</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
            </select>
          </label>
          <label>
            Bloom period:
            <select value={this.props.bloom_period} onChange={this.props.handleBloomChange}>
              <option value={null}>Select</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
            </select>
          </label>
          <button
          type="submit"
          onClick={this.props.handleSearchSubmit}>Submit</button>
        </div>

        <Faq />
      </div>
    );
  }

}

export default Sidebar;
