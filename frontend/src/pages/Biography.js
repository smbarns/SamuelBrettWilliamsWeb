import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/Biography.css'
import banner_img from '../assets/biography_background.jpeg'
import '../styles/Banner.css'

export default function Biography() {

  const [data, setData] = useState(null);
  const [pic, setPic] = useState();
  const [des, setDes] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/biopage')
      .then((res) => res.json())
      .then((data) => {
        setDes(data[0].bio_des);
        setPic(data[0].client_photo);
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

  return (

    <><div>
        <img className='bannerImg' src={banner_img} />
        <div className="banner">
          BIOGRAPHY
        </div>
      </div>
      <div className='page'>
        <div className="bioBody">
          <img className='bioImg' src={pic} />
          <span>
            {des}
          </span>
        </div>
      </div></>
  )
}