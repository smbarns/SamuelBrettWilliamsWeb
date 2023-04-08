import React, { useState, useEffect } from "react";
import "../styles/Press.css";
import "../components/ButtonGroup.js";
import PressComp from "../components/Press.js";
import ButtonGroup from "../components/ButtonGroup";
import pressData from "../samples/samplePress";
import banner_img from "../assets/press-bg.jpg";
import Authenticate from "../components/Authenticate.js";
import PlusIcon from "../assets/add-icon.png";
import PressAddPopup from "../components/AddPressPopup.js";

export default function Press() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");
  const [authenticated, setAuthenticated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const press = pressData.map((item) => {
    return <PressComp key={item.id} {...item} />;
  });

  const setPress = (press) => {
    setFilteredData(press);
  };

  const setActiveProp = (tabname) => {
    setActive(tabname);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/press")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  const showAll = () => {
    setFilteredData(data);
  };

  const showType = (event, type) => {
    var filtered_data = data.filter((data) => data.type_press === type);
    setFilteredData(filtered_data);
  };

  function pressAddPopup() {
    setPressAdd(true);
    setPressAddPop(true);
  }

  const types = [
    {
      type: "Feature Film",
      event: showType,
    },
    {
      type: "Short Film",
      event: showType,
    },
  ];

  return (
    <>
      <div>
        <img className="bannerPlays" src={banner_img} />
        <div className="banner">PRESS</div>
      </div>
      <div className="page">
        <SearchBar
          setContent={setPress}
          showAll={showAll}
          setActiveProp={setActiveProp}
          name={"press"}
        />

        <ButtonGroup
          showAll={showAll}
          types={types}
          setActiveProp={setActiveProp}
          active={active}
        />
        {/* <Authenticate setAuthen={setAuthenticated} /> */}
        {
          <div className="press">
            {authenticated ? (
              <div className="imgContainer">
                <div className="blank-add-press">
                  <button className="addButton" onClick={() => pressAddPopup()}>
                    <img src={PlusIcon}></img>
                  </button>
                </div>
              </div>
            ) : null}

            {press}
          </div>
        }

        {authenticated ? (
          <PressAddPopup
            trigger={pressAdd}
            setTrigger={setPressAdd}
            pressAddPop={pressAddPop}
            setPressAddPop={setPressAddPop}
            data={data}
          ></PressAddPopup>
        ) : null}
      </div>
    </>
  );
}
