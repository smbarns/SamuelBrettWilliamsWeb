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
import Authenticate from '../components/Authenticate.js';
import UpcomingAddPopup from '../components/UpcomingAddPopup'

export default function Films() {
    
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");
  const [authenticated, setAuthenticated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [addFilm, setAddFilm] = useState(false);
  const [addFilmPop, setAddFilmPop] = useState(false);

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

     const handleDelete = (id) => {
      fetch(`http://localhost:3000/api/films/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
          // Update the data state to remove the deleted film
          setData(prevData => prevData.filter(film => film.id !== id));
          // Update the filteredData state to remove the deleted film
          setFilteredData(prevData => prevData.filter(film => film.id !== id));
        } else {
          throw new Error("Failed to delete film");
        }
      })
      .catch(error => {
        console.error("Error deleting film: ", error);
        setError(error);
      });
    };

    function addFilmsPopup(){
      setAddFilm(true);
      setAddFilmPop(true);
    }

    const handleConfirm = () => {
      setShowConfirm(false);
      handleDelete();
    };
  
    const handleCancel = () => {
      setShowConfirm(false);
    };


  return (
    <div className='page'>
      <div className='banner-container'>
        <div className='banner-name'>
          <div className="banner">FILMS</div>
        </div>
        <img className='bannerFilms' src={banner_img} />
      </div>
      <div className='page-container'>
        <div className='filterSearch-container'>
          <ButtonGroup showAll={showAll} types={types} setActiveProp={setActiveProp} active={active} />
          <SearchBar setContent={setFilms} showAll={showAll} setActiveProp={setActiveProp} name={"films"} className = 'search'/>
        </div>

        <Authenticate setAuthen={setAuthenticated}/> 
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