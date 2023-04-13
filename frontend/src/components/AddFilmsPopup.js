import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import '../styles/UpcomingAdd.css';

function AddFilmsPopup(props) {
    const [filmTitle, setFilmTitle] = useState("");
    const [filmDirector, setFilmDirector] = useState("");
    const [filmScreenplay, setFilmScreenplay] = useState("");
    const [filmStars, setFilmStars] = useState("");
    const [filmDesc, setFilmDesc] = useState("");
    const [filmStatus, setFilmStatus] = useState("");
    const [type_film, setTypeFilm] = useState("");
    const [secondTrigger, setSecondTrigger] = useState(false);
    const [posterUrl, setPosterUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef(null);

    const toggleTrigger = () => {
        
        props.setTrigger(!props.trigger);
        props.setAddFilmPop(false);
        setFilmTitle('');
        setFilmDirector('');
        setFilmScreenplay('');
        setFilmStars('');
        setFilmDesc('');
        setFilmStatus('');
        setTypeFilm('');
        
    }

    const toggleSecondTrigger = () => {
        setSecondTrigger(!secondTrigger);
        props.setAddFilmPop(false);
        setFilmTitle('');
        setFilmDirector('');
        setFilmScreenplay('');
        setFilmStars('');
        setFilmDesc('');
        setFilmStatus('');
        setTypeFilm('');
    };

    const handleFilmTitleChange = (e) => {
     setFilmTitle(e.target.value);
   }
   const handleFilmDirectorChange = (e) => {
     setFilmDirector(e.target.value);
   }
   const handleFilmScreenplayChange = (e) => {
     setFilmScreenplay(e.target.value);
   }
   const handleFilmStarsChange = (e) => {
     setFilmStars(e.target.value);
   }
   const handleFilmDescChange = (e) => {
     setFilmDesc(e.target.value);
   }
   const handleFilmStatusChange = (e) => {
     setFilmStatus(e.target.value);
   }
   const handleTypeFilmChange = (e) => {
     setTypeFilm(e.target.value);
   }


        const handleSubmit = (event) => {
            event.preventDefault();
            if (filmTitle === '') {
                return alert('Please enter a title for the film.')
            } 
            else if (type_film === '') {
                return alert('Please select a film type.');
            }
    
            for (let i = 0; i < props.data.length; i++) {
                if (filmTitle === props.data[i].title) {
                  setFilmTitle('');
                  return alert('A film with that title already exists!');
                }
            }
    
        fetch('http://localhost:3000/api/films', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: filmTitle,
                photo: "https://s3-us-west-2.amazonaws.com/samuel-brett-williams/1680048013900-no-poster-avaliable.png",
                director: filmDirector,
                screenplay: filmScreenplay,
                stars: filmStars,
                description: filmDesc,
                status: filmStatus,
                type_film: type_film
            })
        })
        .then(response => response.json())
        .then(data => {
            setFilmDirector('');
            setFilmScreenplay('');
            setFilmStars('');
            setFilmDesc('');
            setFilmStatus('');
            setTypeFilm('');
            props.setTrigger(false);
            setSecondTrigger(true);
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            return alert('Error: Film data could not be saved!');
        });
    }

    const handlePosterUrlChange = (event) => {
        setPosterUrl(event.target.value);
    };

    const handleUrlSubmit = (event) => {
        event.preventDefault();

        if (posterUrl === "") {
            return alert('Please enter a poster link.');
        }

        fetch('http://localhost:3000/api/plays/photo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                photo: posterUrl,
                title: filmTitle
            })
        })
        .then(response => response.json())
        .then(data => {
            setPosterUrl('');
            setFilmTitle('');
            setSecondTrigger(!secondTrigger);
            console.log('Success:', data);
            return alert('Poster URL updated successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            return alert('Error: Poster URL could not be updated!');
        });
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
          return alert('Please upload a video.');
        }
    
        const formData = new FormData();
        formData.append('files', selectedFile);
    
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
    
        setLoading(true);
        fetch('http://localhost:3000/api/upload/files', {
            method: 'POST',
            body: formData,
            signal: abortController.signal
        })
        .then(response => response.json())
        .then(data => {
          fetch('http://localhost:3000/api/films/photo', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            photo: data[0],
            title: filmTitle
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.photo);
            setFilmTitle('');
            setLoading(false);
            setSecondTrigger(!secondTrigger);
            console.log('Success:', data);
            return alert('Poster uploaded and updated successfully!');
          })
          .catch(error => {
            console.error('Error:', error);
            return alert('Error: Poster could not be updated!');
          });
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
          return alert('Error: File could not be uploaded!');
        });
    };

    const handleCancelUpload = () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
    };

    return (
        <div>
            {props.trigger ? (
                <div>
                    {props.addFilmPop && (
                        <div className = "popup">
                            <div className = "popup-inner-upcomingAdd">
                                <button className = "close-btn" onClick ={() => toggleTrigger()} >{<FontAwesomeIcon icon={faXmark} size="xl" />} </button>
                                <div className="popup-header">
                                    <h2>ENTER FILM DETAILS</h2>
                                </div>
                                <div className="popup-content">
                                <form onSubmit={handleSubmit}>
                                    <div className = 'filmDetailsPopup'>
                                    <label htmlFor = "film-title">Title:</label> 
                                        <input type = "text" value = {filmTitle} name = "film-title" id = "film-title" placeholder = "Enter the film's title" onChange = {handleFilmTitleChange} />
                                    
                                    <label htmlFor = "film-director">Director:</label> 
                                        <input type = "text" value = {filmDirector} name = "film-director" id = "film-director" placeholder = "Enter the film's director(s)" onChange = {handleFilmDirectorChange} />
                                    
                                    <label htmlFor = "film-screenplay">Screenplay:</label>  
                                        <input type = "text" value = {filmScreenplay} name = "film-screenplay" id = "film-screenplay" placeholder = "Enter the film's screenplay(s)" onChange = {handleFilmScreenplayChange} />
                                    
                                    <label htmlFor = "film-title">Stars:</label>  
                                        <input type = "text" value = {filmStars} name = "film-stars" id = "film-stars" placeholder = "Enter the film's stars" onChange = {handleFilmStarsChange} />
                                    
                                    
                                    <label htmlFor = "film-desc">Synopsis:</label>  
                                        <input type = "text" value = {filmDesc} name = "film-desc" id = "film-desc" placeholder = "Enter the film's synopsis" onChange = {handleFilmDescChange} />
                                    

                                    <label htmlFor = "film-status">Status:</label>  
                                        <select value = {filmStatus} name = "film-status" id = "film-status" onChange = {handleFilmStatusChange}>
                                            <option value = "placeholder">--Select Status of Film--</option>
                                            <option value = "released">Released</option>
                                            <option value = "soon">Coming Soon</option>
                                            <option value = "script">Script</option>
                                        </select>
                                    

                                    <label htmlFor = "type-film">Film Type:</label>  
                                        <select value = {type_film} name = "type-film" id = "type-film" onChange = {handleTypeFilmChange}>
                                            <option value = "placeholder">--Select Film Type--</option>
                                            <option value = "featured">Featured</option>
                                            <option value = "short">Short</option>
                                        </select>
                                    

                                    </div>      
        
                                    <button className="button-submitUpcoming" type="submit" >Submit</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {secondTrigger && (
                        <div className = "popup">
                            <div className = "popup-inner-upcomingAdd">
                                <button className = "close-btn" onClick ={() => toggleSecondTrigger()} >{<FontAwesomeIcon icon={faXmark} size="xl" />} </button>
                                <div className="popup-header">
                                    <h2>ENTER THE FILM'S POSTER URL</h2>
                                </div>
                                <div className="popup-content">
                                    <label htmlFor="poster-url">Enter poster URL:</label>
                                    <form onSubmit={handleUrlSubmit}>
                                        <input type="text" id="poster-url" name="poster-url" value={posterUrl} placeholder="Enter the URL of the play's poster" onChange={handlePosterUrlChange} />
                                        <button className="button-submitUpcoming" type="submit" disabled={loading}>Submit</button>
                                    </form>
                                </div>
                                <div className="popup-header">
                                    <h2>OR UPLOAD A POSTER</h2>
                                </div>
                                <div className="popup-content">
                                    <label htmlFor="files">Select a file to upload:</label>
                                    <form onSubmit={handleFileSubmit}>
                                        <input className="upload-content" type="file" id="files" onChange={handleFileSelect} />
                                        <button className="button-submitUpcoming" type="submit" disabled={loading}>Upload</button>
                                        {loading && 
                                            <div className = "popup">
                                                <div className = "popup-inner-upcomingAdd">
                                                    <div className="popup-header">
                                                        <h2>Uploading file...</h2>
                                                    </div>
                                                    <label>This may take a while</label>
                                                    <div className="popup-content">
                                                        <div className="loader"></div>
                                                    </div>
                                                    <button className="cancel-upload" onClick={handleCancelUpload}>Cancel</button>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AddFilmsPopup;