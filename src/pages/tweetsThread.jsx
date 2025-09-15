import * as React from "react";
import "../styles/styles.css";

import TopBar from "./topBar.jsx";
import TweetsImages from "./tweetsImages.jsx";
import TweetsVideo from "./tweetsVideo.jsx";
import Tweet from "./tweet.jsx";


export default function TweetsThread(props) {
  
  
  const { tweetData, profile_image_url, verified, verified_type, screen_name, name } = props;
    
  const twitterCheck = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png";
  const twitterGoldCheck = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/goldCheck.png?v=1706644710338";
  const twitterGrayCheck = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/grayCheck.png?v=1707167370773";
  const xLogo = "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png";

  
  return (
    <div className="tweetsThreadOutline">
      <div className="topBar">
        <div className="verticalLine"/>

        <div className="profileImgDivThread">
          <img className="profileImg" src={profile_image_url} />
        </div>
        <div>
          <div className="tweetTextThread">
            {name}
            { verified && verified_type === "blue" ? <img className="blueCheck" src={twitterCheck} /> :
              verified && verified_type === "business" ? <img className="blueCheck" src={twitterGoldCheck} /> :
              verified && verified_type === "government" ? <img className="blueCheck" src={twitterGrayCheck} /> :
            [] }
          </div>
          <div className="twitterHandle">
            { screen_name}
          </div>
          
          <Tweet tweetData={ tweetData } hide_bottom_bar={ props.hide_bottom_bar } />
          
        </div>
      </div>
    </div>
  )
}