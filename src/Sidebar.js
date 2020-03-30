import React from 'react';
import './App.css';


class Sidebar extends React.Component {

  state = {
    searchTerm: "",
  }

  handleSearchChange = (event) => {
  // console.log("typin'", event.target.value)
  let fullTerm = (event.target.value.charAt(0).toUpperCase()) + (event.target.value.slice(1));
  this.setState({
    searchTerm: fullTerm
  })
}

handleSearchSubmit = (event) => {
  // console.log("submit!")
  event.preventDefault();
    if (this.state.searchTerm){
      console.log("submit!!")
      // let filtered = this.state.bodies.filter(body => {
      //   return body.englishName === this.state.searchTerm
      //   console.log("submit!!!")
      // })
      //   this.setState({
      //     searchTerm: ""
      //   })
      // return this.state.searchTerm
    } else {
      console.log("nah")
    }

}


  render () {
    return (
      <div className="Sidebar">
        <div className="Sidebar-Search" >
          <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search here!"
          />
          <button
          type="submit"
          onClick={this.handleSearchSubmit}>Submit</button>

        </div>
        <header className="Sidebar-Inner">

        </header>
      </div>
    );
  }

}

export default Sidebar;
