import React, { Suspense, useContext, useEffect, useState } from 'react'
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const profilePage = () => {
  const { search } = useLocation(); // Lire les paramètres de l'URL
  const queryParams = new URLSearchParams(search);
  const chatId = queryParams.get('chatId'); // Obtenir l'ID du chat depuis l'URL
  const data = useLoaderData();
  const {currentUser, updateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        try {
          const chatData = await apiRequest("/chats/" + chatId);
          setChat(chatData);
        } catch (err) {
          console.error("Failed to fetch chat:", err);
        }
      }
    };

    fetchChat();
  }, [chatId]);
 
  const handleLogout = async () =>{
    try{
      await apiRequest.post("/auth/logout");
      updateUser(null)
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update"><button>Update Profile</button></Link>
          </div>
          <div className="info">
            <span>
              Avatar:
               <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add"><button>Create New Post</button></Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts}/>
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} newChat={chat} />
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default profilePage