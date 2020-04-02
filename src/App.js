import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import PlantCollection from './PlantCollection.js';

class App extends React.Component {

  state = {
    term: "sage", //snake case for spaces fyi
    plantdata: null,
  }

  componentDidMount () {

    //scientific_name is way more accurate than trying to find what "sage" I meant as a common name -- include this in the FAQ/About/How to use
    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?q=${this.state.term}&page=2&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("where are you", data)
        this.setState({
          plantdata: data
        })
      })
      .catch(error => {
        console.log("error", error)
      })

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

  render () {
    console.log("here it is", this.state.plantdata)
    return (
      <>
      <div className="App">
      <Sidebar />
      {
        this.state.plantdata ? <PlantCollection someData={this.state.plantdata}/> : null
      }

      </div>
      </>
    );
  }

}

export default App;
