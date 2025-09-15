import { useState, useEffect } from "react";
import parse from 'html-react-parser';
import "../styles/styles.css";


export default function BottomBar(props) {
  
  const { created_at } = props;
    
  const { likes, commentCount, linkToTweet } = props;

  
  
  return (
    <div className="bottomBarMain">
      <span className="bottomBarDateText">{new Date(created_at).toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit'})} · { new Date(created_at).toLocaleString('default', { month: 'short' })}. {new Date(created_at).getDate()}, {new Date(created_at).getFullYear()}</span>
      <div className="bottomBarWrapper">
        <div className="bottomBar">
          <a className="heartImgDiv">
            <img className="heartImg" src="https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/heart.png?v=1705770424381" />
            <span className="bottomBarText">125</span>
          </a>

          <a className="commentImgDiv">
            <img className="commentImg" src="https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/comment.png?v=1705771783621" />
            <span className="bottomBarText">Reply</span>
          </a>
        </div>
        <div className="readRepliesText">
          <a target="_blank">
            Read 1 reply
          </a>
        </div>
      </div>
    </div>
  );
}
