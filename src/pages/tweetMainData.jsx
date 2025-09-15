import { useEffect, useState } from "react";
import "../styles/styles.css";


import TweetsThread from "./tweetsThread.jsx";
import TweetsHTML from "./tweetsHTML.jsx";
import Buttons from "./buttons.jsx";

export default function TweetMainData(props) {
    
  const item = props.item;
  const scale = props.scale;
  
  
  return (
    <div className="tweetMainWrapper" style={{ transform: [`scale(${scale ? 1 : 0.96})`] }}>
      <div className="tweetMain">
        <a className="link" href={item.tweet_url} onClick={() => false} target="_blank">
        {/* Check if thread/reply or single tweet */ }
        { item.thread || item.thread_arr.length ?
          item.thread_arr.map((subtweet, i, arr) => arr.length === i + 1 ? <TweetsHTML key={item.tweet_id} tweetData={item} /> : <TweetsThread key={subtweet.id} tweetData={item} profile_image_url={item.user.profile_image_url} verified={item.user.verified} verified_type={item.user.verified_type} screen_name={item.user.screen_name} name={item.user.name} hide_bottom_bar={arr.length !== i + 1} /> )  :
          item.reply ? ["", ""].map((reply, i, arr) => arr.length === i + 1 ? <TweetsHTML key={"reply1"} tweetData={item} quoting={ item.quoting} /> : <TweetsThread key={ "reply2" } tweetData={item.in_reply_to_data} profile_image_url={item.in_reply_to_data.user.profile_image_url} verified={item.in_reply_to_data.user.verified} verified_type={item.in_reply_to_data.user.verified_type} screen_name={item.in_reply_to_data.user.screen_name} name={item.in_reply_to_data.user.name} hide_bottom_bar={arr.length !== i + 1} /> )  :
          <div className="tweetBorder"><TweetsHTML tweetData={item} /></div> }  

        </a>

        { props.buttons ? <Buttons setIndex={ props.setIndex } pageNum={props.pageNum} tweetData={item} /> : [] }

      </div>
    </div>
  )
}


/*
    

*/