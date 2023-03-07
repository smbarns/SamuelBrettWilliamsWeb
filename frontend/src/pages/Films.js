import React, { useState, useEffect } from 'react';
import '../styles/Films.css'
import '../components/SearchBar.js'
import '../components/ButtonGroup.js'
import '../styles/SearchBar.css'
import Film from '../components/Film.js'
import SearchBar from '../components/SearchBar'
import ButtonGroup from '../components/ButtonGroup'
import filmData from '../samples/sampleFilms'
import banner_img from '../assets/films_background.png'
import '../styles/Banner.css'

export default function Films() {
    
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");

  const films = filmData.map(item => {
    return(
      <Film key = {item.id}
      {...item}
      />
    )
  })

   const setFilms = films => {
     setFilteredData(films);
   }

   const setActiveProp = (tabname) => {
     setActive(tabname);
   }

   useEffect(() => {
     fetch('http://localhost:3000/api/films')
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
     var filtered_data = data.filter(data => data.type_film === type);
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
    <><div>
        <img className='bannerFilms' src={banner_img} />
        <div className="banner">
          FILMS
        </div>
    </div>
    <div className='page'>
       <SearchBar setContent={setFilms} showAll={showAll} setActiveProp={setActiveProp} name={"films"}/>

      <ButtonGroup showAll={showAll} types={types} setActiveProp={setActiveProp} active={active}/>
        {
          filteredData && filteredData.map((data) => (
            <div className="filmIcons" key={data.id}>
              Place film icons here
            </div>
          ))
        }
      <div className = "films">
        {films}
      </div>
    </div></>

    
  );
}