import { useEffect, useState } from "react";
import "../styles/styles.css";


import TweetsThread from "./tweetsThread.jsx";
import TweetsHTML from "./tweetsHTML.jsx";
import Buttons from "./buttons.jsx";
import TweetMainData from "./tweetMainData.jsx";

export default function TweetMainFetch(props) {
    
  const profileImg = "https://pbs.twimg.com/profile_images/1701963051426103299/A_nIla5__normal.jpg";
  const twitterCheck = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png";
  const xLogo = "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png";

  
  const [json, setJson] = useState([{}, {}, {}, {}, { image_urls: [], video: false, reply: false, thread: false }]);
  const [pageNum, setPageNum] = useState(30);
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
    
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    // console.log(`pageNum ${pageNum}, index ${index}`);
  }, [index]);
  
  const loadData = async () => {
    const data = await fetch(`../tweets_/tweets_${pageNum}.json`);
    const importedJson = await data.json();

    setIndex(73);
    setJson(importedJson);
    setLoaded(true);
  }
  
  
  return (
    <div className="tweetMainWrapper">
      { loaded ? <TweetMainData item={ json[index] } setIndex={ setIndex } pageNum={ pageNum } buttons={ true } /> : [] }
    </div>
  )
}


/*
    

*/