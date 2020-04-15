import React from 'react';
import './App.css';
import Faq from './Faq.js'

class Sidebar extends React.Component {

//   state = {
//     searchTerm: "",
//   }
//
//   handleSearchChange = (event) => {
//   // console.log("typin'", event.target.value)
//   let fullTerm = (event.target.value.charAt(0).toUpperCase()) + (event.target.value.slice(1));
//   this.setState({
//     searchTerm: fullTerm
//   })
// }
//
// handleSearchSubmit = (event) => {
//   // console.log("submit!")
//   event.preventDefault();
//     if (this.state.searchTerm){
//       console.log("submit!!")
//       // let filtered = this.state.bodies.filter(body => {
//       //   return body.englishName === this.state.searchTerm
//       //   console.log("submit!!!")
//       // })
//       //   this.setState({
//       //     searchTerm: ""
//       //   })
//       // return this.state.searchTerm
//     } else {
//       console.log("nah")
//     }
//
// }


  render () {
    console.log("sidebar", this.props)
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
