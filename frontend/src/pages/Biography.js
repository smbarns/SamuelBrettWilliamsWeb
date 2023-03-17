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
  const [editDes, setEditDes] = useState(false);
  const [editPic, setEditPic] = useState(false);
  const [newDes, setNewDes] = useState('');
  const [newPic, setNewPic] = useState('');

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

  const handleEditDes = () => {
    setEditDes(true);
    setNewDes(des);
  };

  const handleEditPic = () => {
    setEditPic(true);
    setNewPic(pic);
  };

  const handleSave = () => {
    fetch('http://localhost:3000/api/biopage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio_des: newDes, client_photo: newPic }),
    })
      .then(() => {
        setDes(newDes);
        setPic(newPic);
        setEditDes(false);
        setEditPic(false);
      })
      .catch((error) => {
        console.error('Error updating bio_des/client_photo: ', error);
      });
  };

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  return (
    <>
      <div>
        <img className="bannerImg" src={banner_img} />
        <div className="banner">BIOGRAPHY</div>
      </div>
      <div className="page">
        {editPic || editDes ? (
          <div className="bioBody">
            {editPic && (
              <div>
                <label htmlFor="pic">Client Photo URL:</label>
                <input
                  type="text"
                  id="pic"
                  value={newPic}
                  onChange={(e) => setNewPic(e.target.value)}
                />
              </div>
            )}
            {editDes && (
              <div>
                <label htmlFor="des">Bio Description:</label>
                <textarea
                  id="des"
                  value={newDes}
                  onChange={(e) => setNewDes(e.target.value)}
                ></textarea>
              </div>
            )}
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className="bioBody">
            <img className="bioImg" src={pic} />
            <span>{des}</span>
            <div>
              <button onClick={handleEditPic}>Edit Client Photo</button>
              <button onClick={handleEditDes}>Edit Bio Description</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}