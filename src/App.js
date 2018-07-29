import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    country: "",
    year: "",
    population: []
  };
  componentDidMount() {
    axios
      .get(`http://api.population.io:80/1.0/population/2018/Bhutan`)
      .then(data =>
        this.setState({
          population: data.data
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  }
  handleChangeCountry = e => {
    e.preventDefault();
    this.setState({
      country: e.target.value
    });
  };
  handleChangeYear = e => {
    e.preventDefault();
    this.setState({
      year: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const country = this.state.country;
    const year = this.state.year;
    axios
      .get(`http://api.population.io:80/1.0/population/${year}/${country}`)
      .then(data =>
        this.setState({
          population: data.data,
          country: "",
          year: ""
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value={this.state.country}
            placeholder="Enter a country name"
            onChange={this.handleChangeCountry}
          />
          <input
            type="text"
            value={this.state.year}
            onChange={this.handleChangeYear}
            placeholder="Enter a year"
          />
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>Age</td>
                <td>Females</td>
                <td>Males</td>
              </tr>
            </thead>
            <tbody>
              {this.state.population.map(pop => {
                return (
                  <tr key={pop.age}>
                    <td>{pop.age}</td>
                    <td>{pop.females}</td>
                    <td>{pop.males} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
