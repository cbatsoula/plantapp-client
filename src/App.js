import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import PlantCollection from './PlantCollection.js';
import PlantShow from './PlantShow.js';
import Faq from './Faq.js'
import GardenShelf from './GardenShelf.js'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  state = {
    plantdata: null,
    searchTerm: "",
    currentPlant: null,
    value: null,
    showing: null,
    bloom_period: null,
    gardenOnClick: false,
    myPlants: null,
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
        this.setState({
          myPlants: data
        })
      })
  }

  selectPlant = (props) => {

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

      } else if (this.state.value && this.state.bloom_period) {
        fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?bloom_period=${this.state.bloom_period}&fruit_color=${this.state.value}&page=1&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
          .then( r => r.json())
          .then( data => {
            console.log("fruit or seed AND bloom", data)
            this.setState({
              plantdata: data,
              currentPlant: null,
            })
          })
          .catch(error => {
            console.log("error", error)
          })
      } else if (this.state.value ){
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
      } else if (this.state.bloom_period) {
        console.log("bloom period", this.state.bloom_period)
        fetch(`https://trefle.io/api/plants?bloom_period=${this.state.bloom_period}&token=${process.env.REACT_APP_TREFLE_API_KEY}`, {
          mode: 'cors',
          headers: {
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Allow-Origin': '*',
          //   // 'Access-Control-Allow-Credentials': true,
          //   // 'Access-Control-Request-Headers': 'Content-Type',
            'Origin': 'http://localhost:3001',
            'Content-Type': 'application/json',
            // 'Referrer-Policy': 'no-referrer-when-downgrade',
            // 'Credentials': 'include',
          },
        })
          .then( r => r.json())
          .then( data => {
            this.setState({
              plantdata: data,
              currentPlant: null,
            }
            // , () => this.context.history.push("/browse")
          )
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      }


      else {
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

 handleBloomChange = (event) => {
   console.log("handleBloomChange", event.target.value)
   this.setState({
     bloom_period: event.target.value
   })
   console.log("after handleBLOOM CHANGE", this.state.bloom_period)
 }

 gardenOnClick = () => {
   console.log("gardenOnClick!!!")
   this.setState({
     gardenOnClick: !this.state.gardenOnClick
   }, () => {console.log("gardenOnClick", this.state.gardenOnClick)})

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
        value={this.state.value}
        bloom_period={this.state.bloom_period}
        handleBloomChange={this.handleBloomChange}
        gardenOnClick={this.gardenOnClick}/>

        {
          this.state.plantdata
          ?
          <PlantCollection
          selectPlant={this.selectPlant}
          someData={this.state.plantdata} />
          :
          null
        }

        {
          this.state.showing
          ?
          <PlantShow currentPlant={this.state.currentPlant} showing={this.state.showing}/>
          :
          null
        }

          <Switch>
            <Route exact path='/faq' render={(routerProps) => <Faq {...routerProps} /> } />

            {
              this.state.gardenOnClick
              ?
              <GardenShelf myPlants={this.state.myPlants}  />
              :
              null
            }


          </Switch>


        </div>

      </>
    );
  }

}

export default App;
