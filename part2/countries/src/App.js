import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const newSearch = event.target.value;
    setSearch(newSearch);
    const countriesSearched = countries.filter((country) =>
      country.name.common.toLowerCase().includes(newSearch.toLowerCase())
    );
    setFilteredSearch(countriesSearched);
  };

  return (
    <>
      <Display loading={loading} search={search} onChange={handleChange} />
      <Results
        countries={filteredSearch}
        setSearch={setSearch}
        setFilteredSearch={setFilteredSearch}
      />
    </>
  );
}

const Results = ({ countries, setSearch, setFilteredSearch }) => {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  } else if (countries.length > 10) {
    return "Too many matches, specify another filter";
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setSearch(country.name.common);
                setFilteredSearch([country]);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

const Display = (props) => {
  if (props.loading) {
    return "loading data...";
  } else {
    return (
      <>
        find countries <input value={props.search} onChange={props.onChange} />
      </>
    );
  }
};

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      capital: {country.capital}
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </>
  );
};
export default App;
