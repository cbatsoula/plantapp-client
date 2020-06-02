import React from 'react';
import './App.css';

class Quiz extends React.Component {

  state = {
    zipcode: {
      question: "What zipcode are you gardening in?",
      answer: "",
    }

  }

  answerChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: {...this.state[event.target.name], answer: event.target.value},
    })
  }

  answerSubmit = (event) => {
    event.preventDefault();
    console.log("submittin", event.target.name)
    let realZip = Number(this.state.zipcode.answer)
    console.log(realZip)
    fetch(`https://phzmapi.org/{realZip}.json`)
      .then( r => {
        console.log("Temps", r)
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
