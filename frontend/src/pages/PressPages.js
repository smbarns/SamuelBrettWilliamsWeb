import React, { useState, useEffect } from 'react';
import '../styles/Press.css'
import '../components/ButtonGroup.js'
import PressComp from '../components/Press.js'
import ButtonGroup from '../components/ButtonGroup'
import pressData from '../samples/samplePress'
import banner_img from '../assets/press-bg.jpg'
import SearchBar from '../components/SearchBar'

export default function Press() {
    
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");

  const press = pressData.map(item => {
    return(
      <PressComp key = {item.id}
      {...item}
      />
    )
  })

  const setPress = press => {
    setFilteredData(press);
  }

  const setActiveProp = (tabname) => {
    setActive(tabname);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/press')
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

  const showAll = () => {
    setFilteredData(data);
  }
  
  const showType = (event, type) => {
    var filtered_data = data.filter(data => data.type_press === type);
    setFilteredData(filtered_data);
  }

  const types = [
    {
      type: "Feature Film",
      event: showType
    },
    {
      type: "Short Film",
      event: showType
    }];


  return (
    <><div className='page'>
      {/* <SearchBar setContent={setPress} showAll={showAll} setActiveProp={setActiveProp} name={"press"} /> */}

      <ButtonGroup showAll={showAll} types={types} setActiveProp={setActiveProp} active={active} />
      {filteredData && filteredData.map((data) => (
        <div className="pressIcons" key={data.id}>
          Insert reviews
        </div>
      ))}
      <div className="press">
        {press}
      </div>
    </div><div className="press">
        <div class="test"><img className='bannerImg' src={banner_img} /></div>
        <div className="pressBanner">
          PRESS
        </div>
      </div></>
  )
}