import { useEffect, useState, useRef } from "react";
import "../styles/styles.css";

import TweetMainData from "./tweetMainData.jsx";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 80500;

export default function RotatingCarouselArrow(props) {
  
  const handleClick = () => {
   console.log("props.side : ", props.side);
    
  }


  return (
    <div onPress={() => handleClick()} className="arrowWrapper">
     <div className="textWhite">{ props.side === "left" ? "<" : ">" }</div>
    </div>
  );
}