import { useEffect, useState } from "react";
import "../styles/styles.css";

import TweetMainData from "./tweetMainData.jsx";
import NonTweetMainData from "./nonTweets/nonTweetMainData.jsx";

const buttons = ["#0088FE", "#00C49F"];
const delay = 80500;

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [json, setJson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  
  useEffect(() => {
    (async() => {
      const data = await fetch(`../tweets_by_category/${props.params.cat}.json`);
      const importedJson = await data.json();
      console.log("importedJson.length. ", importedJson.length);

      setIndex(0);
      setJson(importedJson);
      setLoaded(true);
    })()
  }, [props.params.cat]);


  return (
    <div className="slideshow">
     { loaded ? <><div
        className="slideshowSlider"
        style={{ transform: [`translate3d(${-index * 60}%, 0, 0)`] }}
      >
          {json.map((item, i) => (
            <div className="slide">
              { props.params.cat === "pro_palestine_lies" || props.params.cat === "hamas_lies" ? <TweetMainData key={ item.id } item={item} scale={ index === i } /> : <NonTweetMainData key={ item.id } item={item} scale={ index === i } /> }
            </div>
          ))}
      </div>

      <div className="slideshowDots">
        {buttons.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${""}`}
            onClick={() => {
              setIndex(prev => {
                if (idx === 0 && prev <= 0) {
                  return 0;
                }
                else if (idx === 1 && prev >= json.length) {
                  return json.length;
                }
                else if (idx === 0) {
                  return prev - 1;
                }
                else if (idx === 1) {
                  return prev + 1;
                }
                else {
                  return prev;
                }
              });
            }}
          ></div>
        ))}
          </div></> : [] }
    </div>
  );
}