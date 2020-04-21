import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import PlantCollection from './PlantCollection.js';
import PlantShow from './PlantShow.js';

class App extends React.Component {

  state = {
    plantdata: null,
    searchTerm: "",
    currentPlant: null,
    value: null,
    showing: null,
  }


  componentDidMount () {

    fetch(`http://localhost:3000/plants`,
        {   method:'GET',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*'
            },
        })
      .then( r => r.json() )
      .then( data => {
        console.log("my plants!", data)
      })
  }

  selectPlant = (props) => {
    console.log("HELL YEAH", props)
    //props switches correctly from pastplant to new current plant
    console.log("why", this.state)

    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${props.id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("APP id fetch data response", data)
        this.setState({
          currentPlant: data,
          showing: true,
          searchTerm: null,
        }, () => {console.log("setState on selected plant!", this.state.currentPlant)})
        // {console.log("from state data", this.state.thisPlantData.images[0])}
      })

  }



    handleSearchChange = (event) => {
    let fullTerm = (event.target.value);
    console.log("fullTerm", fullTerm)

    let newOne = fullTerm.split(' ').join('_')
    console.log("newOne", newOne)
    this.setState({
      searchTerm: fullTerm
    })
  }

  handleSearchSubmit = (event) => {
    // add error if an empty array returns from fetch -- suggest looking up by scientific_name
    // console.log("submit!")
    event.preventDefault();
      if (this.state.searchTerm){
        console.log("submit!!")

        //scientific_name is way more accurate than trying to find what "sage" I meant as a common name -- include this in the FAQ/About/How to use
        fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?q=${this.state.searchTerm}&page=1&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
          .then( r => r.json())
          .then( data => {
            console.log("where are you", data)
            this.setState({
              plantdata: data,
              currentPlant: null,
            })
          })
          .catch(error => {
            console.log("error", error)
          })

      } else if (this.state.value){
        console.log("fruit color success", this.state.value, this.state.searchTerm)
        fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?fruit_color=${this.state.value}&page=1&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
          .then( r => r.json())
          .then( data => {
            console.log("fruit_color: where are you", data)
            this.setState({
              plantdata: data,
              currentPlant: null,
            })
          })
          .catch(error => {
            console.log("error", error)
          })
      } else {
        console.log("nah")
      }

  }

  handleColorChange = (event) => {
    console.log("handleColorChange", event.target.value)
    this.setState({
      value: event.target.value
    })
    console.log("after handleCOLORCHANGE", this.state.value)
 }

  render () {
    console.log("here it is from APP", this.state)
    return (
      <>
      <div className="App">
      <Sidebar
      handleSearchSubmit={this.handleSearchSubmit}
      handleSearchChange={this.handleSearchChange}
      searchTerm={this.state.searchTerm}
      handleColorChange={this.handleColorChange}
      value={this.state.value} />

      {
        this.state.plantdata
        ?
        <PlantCollection
        selectPlant={this.selectPlant}
        someData={this.state.plantdata}/>
        :
        null
      }

      {
        this.state.showing
        ?
        <PlantShow
        currentPlant={this.state.currentPlant}
        showing={this.state.showing}/>
        :
        null
      }



      </div>
      </>
    );
  }

}

export default App;
