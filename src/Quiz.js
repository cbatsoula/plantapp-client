import React from 'react';
import './App.css';
import PlantCollection from './PlantCollection.js';
import PlantCard from './PlantCard.js';

class Quiz extends React.Component {

  state = {
    zipcode: {
      question: "What zipcode are you gardening in?",
      answer: "",
    },
    frostFree: {
      question: "Average number of frost free days you experience",
      answer: "",
    },
    data: null,
    plantData: [],


  }

  answerChange = (event) => {
    // console.log(event.target.value)
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

    // temperature_minimum
    fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?temperature_minimum_deg_f=${minLow}&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
      .then( r => r.json())
      .then( pdata => {
        this.setState({
          plantData: [...this.state.plantData, ...pdata]
        })
      })
      fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?temperature_minimum_deg_f=${minHigh}&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
        .then( r => r.json())
        .then( pdata => {
          this.setState({
            plantData: [...this.state.plantData, ...pdata]
          })
        })

        let frostFreeDays = Number(this.state.frostFree.answer)
        console.log("frostFreeDays", frostFreeDays)

        fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?frost_free_days_minimum=${frostFreeDays}&token=${process.env.REACT_APP_TREFLE_API_KEY}`)
          .then( r => r.json())
          .then( pdata => {
            this.setState({
              plantData: [...this.state.plantData, ...pdata]
            })
          })
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

        <p>2. {this.state.frostFree.question}
          <input
             onChange={this.answerChange}
             name="frostFree"
             value={this.state.frostFree.answer}
             type="text"
             placeholder="please type your answer here"/></p>

         <input type="submit" value="Submit" />
       </form>
      </div>
      {
        this.state.plantData.length
        ?
        <PlantCollection selectPlant={this.props.selectPlant} pastSearchTerm={this.state.zipcode.answer} someData={this.state.plantData}/>
        :
        null
      }
      </>

    )
  }
}
export default Quiz;
