import React, { useState, useEffect } from 'react';
import '../styles/Press.css'
import '../components/ButtonGroup.js'
import PressComp from '../components/Press.js'
//import pressData from '../samples/samplePress'
import banner_img from '../assets/press-bg.jpg'
import axios from 'axios';

export default function PressPages() {
    
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const press = data.map(item => {
    return(
      <PressComp key={item.id} {...item} />
    )
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/press');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  
  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  return (
    <><div className='page'>
      {/* <SearchBar setContent={setPress} showAll={showAll} setActiveProp={setActiveProp} name={"press"} /> */}

      {filteredData && filteredData.map((data) => (
        <div className="pressIcons" key={data.id}>
          
        </div>
      ))}
      <div className="press">
        {press}
      </div>
    </div><div className="press">
        <div class="test"><img className='bannerImg' src={banner_img} alt=""/></div>
        <div className="pressBanner">
          PRESS
        </div>
      </div></>
  )
}