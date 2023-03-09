import React, { useState, useEffect } from 'react';
import '../styles/Press.css'
import PressComp from '../components/Press.js'
import banner_img from '../assets/press-bg.jpg'

export default function PressPages() {
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const press = data.map(item => {
    return(
      <PressComp key={item.id} {...item} />
    )
  })

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
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  /*useEffect(() => {
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
  }, []);*/

  
  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  return (
    <><div>
        <img className='bannerImg' src={banner_img} />
        <div className="banner">
          PRESS
        </div>
      </div>
    <div className='page'>
      <div className='press'>
        {press}
      </div>
    </div></>
  )
}