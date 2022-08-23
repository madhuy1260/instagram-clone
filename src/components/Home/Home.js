import React from "react";
import { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";
import Post from "../Post/Post";
import ImageUploader from "../ImageUploader/ImageUploader";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  const getPostData = async () => {
    const resp = await fetch("http://localhost:8000/getPosts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    setPosts(data);

    if (resp.status === 404 || !data) {
      console.log("error");
    }
  };

  const token = Cookies.get("JWT_Token");
  if (token === undefined) {
    <Navigate to="/login" />;
  }
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div>
      <ImageUploader />
      <div>
        <div className="app__posts">
          {posts.map((each, id) => (
            <Post
              key={id}
              userName={each.userName}
              caption={each.caption}
              imageUrl={each.imageUrl}
            />
          ))}
        </div>
        <div className="app__postRight">
          <InstagramEmbed
            url="https://instagram.com/p/B_uf9dmAGPw/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
