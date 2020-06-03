import React from 'react';
import './App.css';

class Quiz extends React.Component {

  state = {
    zipcode: {
      question: "What zipcode are you gardening in?",
      answer: "",
    },
    data: null,


  }

  answerChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: {...this.state[event.target.name], answer: event.target.value},
    })
  }

  minTemperature = () => {
    console.log("minTemps", this.state.data)
    let minTemps = this.state.data.temperature_range.split(' ')
    console.log("minTemps", minTemps)
    let minHigh = Number(minTemps.pop())
    console.log("MinHigh", minHigh)
    let minLow = Number(minTemps[0])
    console.log(typeof minLow)
  }

  answerSubmit = (event) => {
    event.preventDefault();
    console.log("submittin", event.target.name)
    let realZip = Number(this.state.zipcode.answer)
    console.log(realZip)
    fetch(`https://cors-anywhere.herokuapp.com/https://phzmapi.org/${realZip}.json`)
      .then( r => r.json())
      .then( data => {
        console.log("Temps", data)
        this.setState({
          data: data
        }, () => {this.minTemperature()})
      })


  }

  componentDidMount() {

  }

  render() {
    console.log("QUIZ", this.state)
    return (
      <>
      <div className="QuizContainer">
        <form onSubmit={this.answerSubmit}>
         <p>1. {this.state.zipcode.question}
           <input
           onChange={this.answerChange}
           name="zipcode"
           value={this.state.zipcode.answer}
           type="text"
           placeholder="please type your answer here"/></p>

         <input type="submit" value="Submit" />
       </form>
      </div>
      </>

    )
  }
}
export default Quiz;
