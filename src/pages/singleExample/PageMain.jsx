import { useEffect, useState } from "react";
import "../../styles/styles.css";

import Claim from "./Claim.jsx";
import ExampleText from "./ExampleText.jsx";
import TweetBody from "./TweetBody.jsx";
import TweetsHTML from "./TweetsHTML.jsx";
import TweetsThread from "./TweetsThread.jsx";

import Buttons from "../buttons.jsx";

export default function PageMain(props) {

  const { cat } = props.params;

  const [themTweets, setThemTweets] = useState([]);
  const [usTweets, setUsTweets] = useState([]);
  const [metadata, setMetadata] = useState(-1); // total number of Examples in the given category
  const [loaded, setLoaded] = useState(false);
    
  useEffect(() => {
    loadData(true);
  }, []);
  
  const loadData = async (getCount) => {

    // Step 1: Get category (Example) and count
    const item = await fetch(`http://localhost:5000/fetch_example`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ cat: "hypocrisy", getCount })
    });

    const itemJson = await item.json();

    console.log("itemJson : ", itemJson);

    const themTweetIds = itemJson.item[0].them_tweet_ids;
    const usTweetIds = itemJson.item[0].us_tweet_ids;


    // Step 2: Get Tweets
    const data = await fetch(`http://localhost:5000/fetch_tweets`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ themTweetIds, usTweetIds })
    });

    const dataJson = await data.json();

    console.log("DataJson : ", dataJson);

    const us = dataJson.usTweets;
    const them = dataJson.themTweets;

    console.log("us. ", us);
    console.log("them : ", them);


    setUsTweets(us);
    setThemTweets(them);
    setLoaded(true);
    if (getCount) {
      let metadataJson = itemJson.item[0];
      metadataJson.count = itemJson.count;
      console.log(metadataJson);
      setMetadata(metadataJson);
    }
  }
  
  
  return (
    <div className="tweetMainWrapper">

      { loaded ? <Claim claim={metadata.claim} /> : [] }
      
      { loaded ? <ExampleText example={metadata.example} explanation={ metadata.explanation} /> : [] }

      { loaded ? <TweetBody tweetData={themTweets[0]} /> : [] }
      
    </div>
  )
}
