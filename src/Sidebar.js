import React from 'react';
import './App.css';


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
          <button
          type="submit"
          onClick={this.props.handleSearchSubmit}>Submit</button>

        </div>
      </div>
    );
  }

}

export default Sidebar;
