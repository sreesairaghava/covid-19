import axios from "axios";

const URL = "https://covid19.mathdro.id/api";
export const fetchStates = async (country) => {
  try {
    const { data } = await axios.get(
      `${URL}/countries/${country.country}/confirmed`
    );
    return data.map((stateData) => ({
      provinceState: stateData.provinceState,
      confirmed: stateData.confirmed,
      active: stateData.active,
      recovered: stateData.recovered,
      deaths: stateData.deaths,
    }));
  } catch (error) {
    return error;
  }
};
export const fetchData = async (country) => {
  let changeableUrl = URL;
  if (country) {
    changeableUrl = `${URL}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${URL}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${URL}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
