import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const Card = ({item}) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleChat = async (userId) => {
    try {
      const res = await apiRequest.post("/chats", {
        receiverId: userId
      });
      navigate(`/profile?chatId=${res.data.id}&receiverId=${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

    const handleSave = async (postId) => {
    try {
      await apiRequest.post("/users/save", {postId});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fonction pour récupérer les posts sauvegardés de l'utilisateur
    const fetchSavedPosts = async () => {
      try {
        const res = await apiRequest.get("/posts/saved-posts");
        setSavedPosts(res.data.savedPosts);
      } catch (err) {
        console.error("Failed to fetch saved posts:", err);
      }
    };

    if (currentUser) {
      fetchSavedPosts();
    }
  }, [currentUser, savedPosts]);

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div onClick={() => handleSave(item.id)} className="icons">
            <div className="icon" 
              style={{
              backgroundColor: savedPosts.find(post => post.postId === item.id) ? "#fece51" : "white",
            }}>
            <img
              src={savedPosts.find(post => post.postId === item.id) ? "/saved.png" : "/save.png"}
              alt=""
            />
          </div>
            {item.userId === currentUser.id ? (
              <Link to={`/update/${item.id}`} className="icon">
                <img src="/update.png"/>
              </Link> ) : 
              (<div onClick={() => handleChat(item.userId)} className="icon">
                <img src="/chat.png" alt="" />
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card