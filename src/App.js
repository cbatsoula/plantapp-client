import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import PlantCollection from './PlantCollection.js';
import PlantShow from './PlantShow.js';
import Faq from './Faq.js'
import GardenShelf from './GardenShelf.js'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  //STYLE
  //I need to be able to close any Show component, use a boolean state to toggle when it shows
    //perhaps it can look like a modal to fade in quickly or something


  //Looks boxy, look up a name and make a ~style~
    //if logo is possible, add it in Sidebar(home navigation button) and make a Footer?


  //FUNCTION
  // can view both plant collection and garden collection at the same time - dont want this,
  // i need to make these components line up so that the show is always "taken" this would work best
  // for comparing photos between plants (what i just did for campanulas to find mine - did not)
  //Work on CRUD with plants
    //create success
    //delete success
    //update
    // user experience on CRUD !
  //create plant from plant search, after it saves render within the plantShow a confirmation of plant creation, "Woo! You've added a #{plant name} to your garden!"
  //Adding(post) custom plant form success, consider a photo uploading feature ... can then track plant progress!! would need to display photos




  state = {
    plantdata: null,
    searchTerm: "",
    currentPlant: null,
    value: null,
    showing: null,
    bloom_period: null,
    gardenOnClick: false,
    myPlants: null,
    nodata: null,
    pastplantdata: null,
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

  selectPlant = (propsID) => {

    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${propsID}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
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
            //if data.length === 0 have an error message pop up saying, please edit the search criteria
            if (data.length === 0) {
              this.setState({
                nodata: true,
              })
            }
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
     gardenOnClick: !this.state.gardenOnClick,
     pastplantdata: this.state.plantdata,
     plantdata: null,
   }, () => {console.log("gardenOnClick", this.state)})

 }

 closePlantShow = () => {
   console.log("cLOSE")
   this.setState({
     showing: !this.state.showing,
   }, () => {console.log("CLOSE AFTER", this.state.showing)})
 }


  render () {
    console.log("here it is from APP", this.state)
    return (
      // <>

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
          this.state.nodata
          ?
          <div className="noData"> please edit the search criteria </div>
          :
          null
        }
        {
          this.state.plantdata
          ?
          <PlantCollection
          searchTerm={this.state.searchTerm}
          selectPlant={this.selectPlant}
          someData={this.state.plantdata} />
          :
          null
          //if i have plant data, render plantCollection, if not, dont render anything..aka for default just show the logo?
        }

        {
          this.state.showing
          ?
          <PlantShow closePlantShow={this.closePlantShow} currentPlant={this.state.currentPlant} showing={this.state.showing}/>
          :
          <h1>HELLO WORLD</h1>
          //if i have a currentPlant I want to see the details, if I dont have a current plant, show nothing
        }

          <Switch>
            <Route exact path='/faq' render={(routerProps) => <Faq {...routerProps} /> } />

            {
              this.state.gardenOnClick
              ?
              <GardenShelf myPlants={this.state.myPlants}  />
              :
              null
              //logo?
            }


          </Switch>


        </div>
      //
      // </>
    );
  }

}

export default App;
