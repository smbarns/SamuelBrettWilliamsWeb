import React, { useState, useEffect } from 'react';
import '../styles/Plays.css'
import '../components/ButtonGroup.js'
import '../components/SearchBar.js'
import '../styles/SearchBar.css'
import SearchBar from '../components/SearchBar'
import ButtonGroup from '../components/ButtonGroup'
import Play from '../components/Play.js'
import playData from '../samples/samplePlays'

export default function Plays() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");

  const plays = playData.map(item => {
    return(
      <Play key = {item.id}
      {...item}
      />
    )
  })

  // const setPlays = plays => {
  //   setFilteredData(plays);
  // }

  // const setActiveProp = (tabname) => {
  //   setActive(tabname);
  // }

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/plays')
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json()
  //       }
  //       throw response;
  //     })
  //     .then(data => {
  //       setData(data);
  //       setFilteredData(data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data: ", error);
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     })
  // }, [])

  // if (loading) return <div className="page">Loading...</div>;
  // if (error) return <div className="page">Error!</div>;

  // const showAll = event => {
  //   setFilteredData(data);
  // }
  
  // const showType = (event, type) => {
  //   var filtered_data = data.filter(data => data.type_play === type);
  //   setFilteredData(filtered_data);
  // }

  // const types = [
  //   {
  //     type: "Full Length",
  //     event: showType
  //   },
  //   {
  //     type: "One Act",
  //     event: showType
  //   },
  //   {
  //     type: "Ten Minute",
  //     event: showType
  //   }];

  return (
    <div className="page">
      {/* <SearchBar setContent={setPlays} showAll={showAll} setActiveProp={setActiveProp} name={"plays"}/>

      <ButtonGroup showAll={showAll} types={types} setActiveProp={setActiveProp} active={active}/>
      {
          filteredData && filteredData.map((data) => (
            <div className="playIcons" key={data.id}>
              Place play icons here
            </div>
          ))
        } */}
        <div className = "plays">
        {plays}
      </div>
    </div>
  );
}
