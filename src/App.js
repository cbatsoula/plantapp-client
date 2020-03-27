import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  state = {
    term: "sage"
  }

  componentDidMount () {
    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?q=${this.state.term}&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( data => {
        console.log("where are you", data)
      })
      .catch(error => {
        console.log("error", error)
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
