import { useState, useEffect } from "react";
import "../styles/styles.css";


export default function TopBar(props) {
  
  const { user } = props;
  
  const twitterBlueCheck = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/blueCheck.png?v=1705678687383";
  const twitterGoldCheck = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/goldCheck.png?v=1706644710338";
  const xLogo = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/xLogo.png?v=1705678634285";

  
  return (
    <div className="topBar" key={user.screen_name}>
      <div className="profileImgDiv">
        <img className="profileImg" src={ user.profile_image_url } />
      </div>
      <div>
        <div className="twitterName">
          {user.name}
          { user.verified && user.verified_type === "blue" ? <img className="blueCheck" src={twitterBlueCheck} /> : [] }
          { user.verified && user.verified_type === "business" ? <img className="blueCheck" src={twitterGoldCheck} /> : [] }
        </div>
        <div className="twitterHandle">
          @{ user.screen_name }
        </div>
      </div>
      <div className="xLogoDiv">
        <img className="xLogo" src={xLogo} />            
      </div>
    </div>
  );
}
