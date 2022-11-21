import React, { useState, useEffect } from 'react';
import '../styles/Plays.css'
import '../styles/FilterButtons.css'
import '../components/SearchBar.js'
import '../styles/SearchBar.css'
import SearchBar from '../components/SearchBar';

export default function Plays() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");

  useEffect(() => {
    fetch('http://localhost:3000/api/plays')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  const showAll = event => {
    setFilteredData(data);
  }
  
  const showType = (event, type) => {
    var filtered_data = data.filter(data => data.type_film === type);
    setFilteredData(filtered_data);
  }

  const types = [
    {
      type: "Full Length",
      event: showType
    },
    {
      type: "One Act",
      event: showType
    },
    {
      type: "Ten Minute",
      event: showType
    }];

  function ButtonGroup() {
    return (
        <div className="filterButtons">
          <button
              key={"All"}
              className={active === "All" ? "active fbutton": "fbutton" }
              onClick={() => { showAll(); setActive("All");}}
            >
              {"ALL"}
          </button>
          {types.map((typeObject) => (
            <button
              key={typeObject.type}
              className={active === typeObject.type ? "active fbutton": "fbutton"}
              onClick={e => { typeObject.event(e, typeObject.type); setActive(typeObject.type);}}
            >
              {typeObject.type.toUpperCase()}S
            </button>
          ))}
        </div>
    );
  }

  return (
    <div className="page">
      <SearchBar placeholder="search"/>
      <ButtonGroup/>
      {
          filteredData && filteredData.map((data) => (
            <div className="playIcons" key={data.id}>
              Place play icons here
            </div>
          ))
        }
    </div>
  );
}