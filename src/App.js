import React, { Component } from "react";
import { Cards, Chart, CountryPicker, StateTable } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/index";
import coronaImage from "./images/image.png";
// Adding commit for deployment-2
class App extends Component {
  state = {
    data: {},
    country: {},
  };
  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    //set the state
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="covid-19"></img>
        <Cards data={this.state.data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.data} country={this.state.country} />
        {this.state.country ? (
          <StateTable country={this.state.country} />
        ) : null}
      </div>
    );
  }
}

export default App;
