import { useEffect, useState } from "react";
import parse from 'html-react-parser';


import TweetsImages from "../tweetsImages.jsx";
import TweetsVideo from "../tweetsVideo.jsx";
import NonTweetsHTML from "./nonTweetsHTML.jsx";
import Unavailable from "../unavailable.jsx";
import NonTweetBottomBar from "./nonTweetBottomBar.jsx";



export default function NonTweet(props) {
  
  
  const newStr = props.tweetData.text;
    
  // const str = newStr.replace("\n", "<br /><br />");
  const str = newStr.split("\n").join("<br />");
    
  
  return (
    <>
      
      {/* If Tweet includes image(s) */}
      { props.tweetData.image_urls && props.tweetData.image_urls.length ? <TweetsImages image_urls={ props.tweetData.image_urls } note_url={props.tweetData.note_url} /> : [] }

      {/* If quote-tweeting, then render another component here (with the data of the Tweet being quoted) */ }
      { props.tweetData.quoted && props.tweetData.quoted_tweet_data.unavailable ? <Unavailable /> : props.tweetData.quoted ? <NonTweetsHTML tweetData={props.tweetData.quoted_tweet_data } quoting={ true } /> : [] }
      
      {/* If it includes a video */ }
      { props.tweetData.video_html ? <TweetsVideo video_html={ props.tweetData.video_html } /> : [] }
      
      <div className="tweetText">
        { parse(`${str}`) }
      </div>
      
      
      { props.hide_bottom_bar ? [] : <NonTweetBottomBar user={ props.user } /> }
      
            
      
    </>

  );
}
