import { useEffect, useState, useRef } from "react";
import "../styles/styles.css";

import TweetMainData from "./tweetMainData.jsx";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 80500;

export default function RotatingCarousel() {
  const [index, setIndex] = useState(0);
  const [json, setJson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    (async() => {
      const data = await fetch(`../home_images/moving_pro_israel_speeches.json`);
      const importedJson = await data.json();
      console.log("importedJson.length. ", importedJson.length);

      setIndex(0);
      setJson(importedJson);
      setLoaded(true);
    })()
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === json.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
     { loaded ? <><div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
          {json.map((item, i) => (
            <div className="slide">
              <TweetMainData key={ item.id } item={item} />
            </div>
          ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
          </div></> : [] }
    </div>
  );
}