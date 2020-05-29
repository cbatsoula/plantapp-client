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

  // within any plant show page, I want to be able to HOVER over a term, and see a pop up/modal box with a definition, aka plant heriachy what each term of class or division means, aka, fruit bearing or something along those lines so when  someone sees a word they do not recognise, they still get the jist of it.

  //Looks boxy, look up a name and make a ~style~
    //if logo is possible, add it in Sidebar(home navigation button) and make a Footer?


  //FUNCTION
  //Quiz to generate plants that could work for your space
    //I can't find an API with a hardiness zone parameter so is it worth it to generate the user's hardiness zone? what use is it? I could add links for further reading on that, but thats about it.
    //make a disclaimer that the results given should be researched further before commiting to a plant because the APIs I'm using are not complete with data and may have incorrect data.

    // 1  what state/zipcode do you live in?
    //look up zone, spit it into a results obj
    //temperature mins and maxs? aka params
     // "temperature_minimum": {
     //    "deg_c": null,
     //    "deg_f": null
     //  }
     // "frost_free_days_minimum"   THIS gives me the plant's hardiness zone - INCLUDE in Faq
     //"native_status": "L48(N)AK(N)CAN(N)",// native code status N native, states follow, AK Alaska, CAN Canada

     //https://trefle.io/api/plants?native_status=L48(N)&complete_data=true&{TOKEN}&page=2
     //plants native to the lower 48 states, with all complete data, multiple pages

     //https://trefle.io/api/plants?frost_free_days_minimum=265&{TOKEN}

     //emailed trefle.io again, some results come back that are incorrect and when I go on to correct that entry through their docs they already have a corrected item but it did not come up in my response data set

    // 2  are you looking for... and through this I make a fetch request with params of family/division and temps?
    //something that has flowers?
    //something that produces fruit?
    // an herb?
    // "products": {
    //   "berry_nut_seed": null,
    //   "christmas_tree": null,
    //   "fodder": null,
    //   "fuelwood": null,
    //   "lumber": null,
    //   "naval_store": null,
    //   "nursery_stock": null,
    //   "palatable_browse_animal": null,
    //   "palatable_graze_animal": null,
    //   "palatable_human": null,
    //   "post": null,
    //   "protein_potential": null,
    //   "pulpwood": null,
    //   "veneer": null
    // }

    // "specifications": {
    //   "bloat": "None",
    //   "c_n_ratio": null,
    //   "coppice_potential": null,
    //   "fall_conspicuous": null,
    //   "fire_resistance": null,

    //   "growth_form": "Single Stem",
    //   "growth_habit": "Forb/herb",
    //   "growth_period": "Spring and Summer",
    //   "growth_rate": "Slow",

    //   "known_allelopath": null,
    //   "leaf_retention": null,
    //   "lifespan": "Moderate",
    //   "low_growing_grass": null,
    //   "mature_height": {
    //     "cm": 60.95702529716549,
    //     "ft": 2.0
    //   },
    //   "max_height_at_base_age": {
    //     "cm": null,
    //     "ft": null
    //   },
    //   "nitrogen_fixation": "None",
    //   "regrowth_rate": "Slow",
    //   "shape_and_orientation": "Erect",
    //   "toxicity": "None"
    // },

    //sun type?/soil type?
    //full
    //partial
    //low?
    // "shade_tolerance": "Intolerant", "Intermediate", ??
    // "soils_adaptation": {
    //   "coarse": true,
    //   "fine": null,
    //   "medium": true
    // },

  //Work on CRUD with plants
    //update
    // user experience on CRUD !
  //Adding(post) custom plant form success, consider a photo uploading feature ... can then track plant progress!! would need to display photos with date stamps? or a date picker along with photo upload and then spit out the date under the photo?




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
    pastSearchTerm: "",
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
              gardenOnClick: false,
              pastSearchTerm: this.state.searchTerm,
              searchTerm: "",
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
     showing: null,
     searchTerm: "",
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
          pastSearchTerm={this.state.pastSearchTerm}
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
          null
          // <h1>HELLO WORLD</h1>
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
