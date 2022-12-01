import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.css';

function SearchBar({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    
    const handleFilter = (event) =>{
        const enteredWord = event.target.value;
        setSearchWord(enteredWord);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(enteredWord.toLowerCase());
        });

        if(enteredWord === ""){
            setFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setSearchWord("");
    }

    return(
        <div className="search">
            <div className="searchInput">
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    value = {searchWord} 
                    onChange={handleFilter}
                />
                <div className = "searchIcon">
                    {filteredData.length === 0 ? (
                        <FontAwesomeIcon icon={faMagnifyingGlass} width="25"/>
                    ):(
                        <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={clearInput} size="1x"/> 
                    )}
                </div>
            </div>
            {filteredData.data != 0 && (
            <div className="dataResult">
                {filteredData.slice(0,15).map((value, key) => {
                    return( 
                    <a className="dataItem"> 
                        <p>{value.title} </p>
                    </a>
                    );
                })}
            </div>
            )}
        </div>
    );
}

export default SearchBar;