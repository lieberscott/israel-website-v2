import * as React from "react";
// import "../styles/styles.css";

import TopBar from "../topBar.jsx";
import Tweet from "../tweet.jsx";


export default function TweetsHTML(props) {
    
  
  return (
    <div className={props.quoting ? "tweetHTMLquoting" : "tweetHTML"} key={ props.tweetData.tweet_id }>
      <TopBar user={ props.quoting ? props.tweetData.user : props.tweetData.user } />
      <Tweet tweetData={ props.tweetData } hide_bottom_bar={ props.quoting } />
    </div>

  );
}