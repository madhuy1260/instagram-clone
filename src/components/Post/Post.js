import React from "react";
import "./post.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

function Post({ userName, caption, imageUrl }) {
  const [comments, setComments] = useState(["hellos"]);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const postComment = (e) => {
    e.preventDefault();
    setComments((prev) => [...prev, comment]);
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="username"
          src="https://reactjs.org/logo-og.png"
        ></Avatar>
        <h3>{userName}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{userName} :</strong> {"   "}
        {caption}
      </h4>
      <div className="iconContainer">
        <div className="iconList">
          <button className="iconButton">
            <FavoriteBorderIcon />
            <p>count</p>
          </button>
          <button className="iconButton">
            <CommentIcon />
            <p>count</p>
          </button>
          <button className="iconButton">
            <SendIcon />
            <p>count</p>
          </button>
        </div>
        <div>
          <button className="iconButton">
            <TurnedInNotIcon />
          </button>
        </div>
      </div>

      <div className="post__comments">
        {comments.map((eachComment) => (
          <p>
            <strong>Madhu: User :</strong>
            {"    "}
            {eachComment}
          </p>
        ))}
      </div>
      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a Comment...."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Post;
