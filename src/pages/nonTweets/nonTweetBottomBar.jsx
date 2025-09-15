import { useState, useEffect } from "react";
import "../../styles/styles.css";


export default function NonTweetBottomBar(props) {
  
  const { user } = props;
  
  const xLogo = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/xLogo.png?v=1705678634285";

  
  return (
    <div className="nonTweetBottomBar">
      — Written by {user.name} @{ user.screen_name } on <div><img className="nonTweetXLogo" src={xLogo} /></div>
    </div>
  );
}
