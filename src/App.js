import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  componentDidMount () {
    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?common_name=sage&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("where are you", data)
      })
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
  }

}

export default App;
