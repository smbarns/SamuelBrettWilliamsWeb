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
import PlusIcon from '../assets/add-icon.png';
import AddFilmsPopup from '../components/AddFilmsPopup'
import '../styles/Banner.css'

export default function Films() {
    
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");
  const [addFilmsPopup, addFilmsPopupOpen] = useState(false);

  const films = filteredData && filteredData.map(item => {
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
         setData(data.reverse());
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
    <div className='page'>
      <img className='bannerFilms' src={banner_img} />
      <div className="banner">FILMS</div>
      <div className='page-container'>
        <SearchBar setContent={setFilms} showAll={showAll} setActiveProp={setActiveProp} name={"films"} className = 'search'/>

        <ButtonGroup showAll={showAll} types={types} setActiveProp={setActiveProp} active={active} />
        {
          <div className = "films">
            {films}
            <div className = "addFilms">
              <button className = "addButton" onClick={() => addFilmsPopup(true)}>
                <img src = {PlusIcon}></img>
              </button> 
            </div>
          </div>
        }
      </div>
    </div>
  );
}