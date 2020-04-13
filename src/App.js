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
    console.log("why", this.state)
    // this.setState({
    //   currentBeach: selectedBeach
    // }, () => {this.props.history.push('/beach')})
    this.setState({
      currentPlant: props,
      searchTerm: null,
    }, () => {console.log("setState on selected plant!", this.state)})

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

      } else {
        console.log("nah")
      }

  }

  render () {
    console.log("here it is from APP", this.state)
    return (
      <>
      <div className="App">
      <Sidebar
      handleSearchSubmit={this.handleSearchSubmit}
      handleSearchChange={this.handleSearchChange}
      searchTerm={this.state.searchTerm} />
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
        this.state.currentPlant
        ?
        <PlantShow
        currentPlant={this.state.currentPlant}/>
        :
        null
      }



      </div>
      </>
    );
  }

}

export default App;
