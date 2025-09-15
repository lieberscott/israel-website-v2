import { useEffect } from "react";
import parse from 'html-react-parser';
import "../styles/styles.css";

import TopBar from "./topBar.jsx";
import TweetsImages from "./tweetsImages.jsx";

import useScript from "../hooks/useScript.js";



export default function TweetsVideo(props) {
    
  useScript("https://platform.twitter.com/widgets.js");
  
  const { video_html  } = props;
    
  return (
    <div key={video_html}>
      { video_html ? parse(`${video_html}`) : [] }
    </div>
  )
}