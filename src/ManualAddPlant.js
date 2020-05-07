import React from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManualAddPlant extends React.Component {
// name, nickname, repot, acquired,

  state = {
    name: null,
    nickname: null,
    repot: null,
    acquired: null,
    location: null,
    startDate: new Date(),
  }

  handleAddNameChange = (event) => {
    let fullTerm = (event.target.value);
    console.log("fullTerm", fullTerm)

    this.setState({
      name: fullTerm
    })
  }

  handleAddNicknameChange = (event) => {
    let fullTerm = (event.target.value);
    console.log("fullTerm", fullTerm)

    this.setState({
      nickname: fullTerm
    })
  }

  handleAddRepotChange = (event) => {
    let fullTerm = (event.target.value);
    console.log("fullTerm", fullTerm)

    this.setState({
      repot: fullTerm
    })
  }

  handleAddLocationChange = (event) => {
    let fullTerm = (event.target.value);
    console.log("fullTerm", fullTerm)

    this.setState({
      location: fullTerm
    })
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleAddSubmit = (event) => {
    console.log("submit!")
    event.preventDefault();

        console.log("submit!!", this.state.name, this.state.nickname, this.state.repot, this.state.startDate)
        let acquired = this.state.startDate.toDateString()
        console.log("date", typeof acquired)


        fetch(`http://localhost:3000/plants`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            plant_name: this.state.name,
            plant_nickname: this.state.nickname,
            repot: this.state.repot,
            acquired: acquired,
            owner_id: 1,
          })
        })
          .then(r => r.text())
          .then( data => {
            console.log(data)
          })
  }

  render () {

    return (
      <div className="ManualAddPlantContainer">
        <div className="ManualAddDetails">
          <label><br />
            Name: <br />
          </label> <br />
            <input
            type="text"
            value={this.state.name}
            onChange={this.handleAddNameChange}
            placeholder="Name"/><br />

            <label><br />
              Nickname: <br />
            </label> <br />
              <input
              type="text"
              value={this.state.nickname}
              onChange={this.handleAddNicknameChange}
              placeholder="Nickname"/><br />

            <label><br />
              Repot: <br />
            </label> <br />
              <input
              type="text"
              value={this.state.repot}
              onChange={this.handleAddRepotChange}
              placeholder="Nickname"/><br />

            <label>
              Location: <br />
              <select value={this.state.bloom_period} onChange={this.handleAddLocationChange}>
                <option value={null}>Select</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </label> <br />

            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange} />

            <button
            type="submit"
            onClick={this.handleAddSubmit}>Submit</button>
        </div>
      </div>

    );
  }

}

export default ManualAddPlant;
