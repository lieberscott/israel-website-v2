import * as React from "react";
import "../../styles/styles.css";

import TopBar from "../topBar.jsx";
import TweetsImages from "../tweetsImages.jsx";
import TweetsVideo from "../tweetsVideo.jsx";
import NonTweet from "./nonTweet.jsx";


export default function NonTweetsHTML(props) {
    
  
  return (
    <div className={props.quoting ? "tweetHTMLquoting" : "tweetHTML"} key={ props.tweetData.tweet_id }>
      <NonTweet tweetData={ props.tweetData } user={ props.user } hide_bottom_bar={ props.quoting || props.hideBottomBar } />
    </div>

  );
}