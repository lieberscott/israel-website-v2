import { useEffect, useState } from "react";
import "../styles/styles.css";


import TweetsThread from "./tweetsThread.jsx";
import TweetsHTML from "./tweetsHTML.jsx";
import Buttons from "./buttons.jsx";

export default function CategoryPage(props) {
    
  const [json, setJson] = useState([{}, {}, {}, {}, { image_urls: [], video: false, reply: false, thread: false }]);
  const [pageNum, setPageNum] = useState(31);
  const [index, setIndex] = useState(79);
  const [loaded, setLoaded] = useState(false);
    
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    // console.log(`pageNum ${pageNum}, index ${index}`);
  }, [index]);
  
  const loadData = async () => {
    const data = await fetch(`../tweets_by_category/${props.params.cat}.json`);
    const importedJson = await data.json();

    setIndex(0);
    setJson(importedJson);
    setLoaded(true);
  }
  
  
  return (
    <div className="tweetMainWrapper">
      
      
      { false ? <div className="topExplanation">Anti-Semitism is progressing at an alarming rate ...</div> : [] }
      <div className="tweetMain">
        <a className="link" href={loaded ? json[index].tweet_url : ""} target="_blank">
        {/* Check if thread/reply or single tweet */ }
        { loaded && (json[index].thread || json[index].thread_arr.length) ?
          json[index].thread_arr.map((item, i, arr) => arr.length === i + 1 ? <TweetsHTML key={json[index].tweet_id} tweetData={json[index]} /> : <TweetsThread key={item.id} tweetData={item} profile_image_url={json[index].user.profile_image_url} verified={json[index].user.verified} verified_type={json[index].user.verified_type} screen_name={json[index].user.screen_name} name={json[index].user.name} hide_bottom_bar={arr.length !== i + 1} /> )  :
          loaded && json[index].reply ? ["", ""].map((item, i, arr) => arr.length === i + 1 ? <TweetsHTML key={json[index].tweet_id} tweetData={json[index]} quoting={ json[index].quoting} /> : <TweetsThread key={ json[index].in_reply_to_data.id} tweetData={json[index].in_reply_to_data} profile_image_url={json[index].in_reply_to_data.user.profile_image_url} verified={json[index].in_reply_to_data.user.verified} verified_type={json[index].in_reply_to_data.user.verified_type} screen_name={json[index].in_reply_to_data.user.screen_name} name={json[index].in_reply_to_data.user.name} hide_bottom_bar={arr.length !== i + 1} /> )  :
          loaded ? <div className="tweetBorder"><TweetsHTML tweetData={json[index]} /></div> : [] }  
        </a>
                
      </div>
    </div>
  )
}


/*
    

*/