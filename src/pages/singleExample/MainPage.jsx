import React, { useState } from "react";
import "../../styles/stylesheet.css"; // import the CSS file

import { fetchDate } from "../../../api/api.js";

import CalendarComponent from "../calendar/Calendar.jsx";
import TweetCarousel from "./TweetCarousel.jsx";


import { claim1, claim2 } from "../../../tweets_new_design_0/claims.js";
import { incident1 } from "../../../tweets_new_design_0/incidents.js";
import { example1, example2, example3, example4 } from "../../../tweets_new_design_0/examples.js";
import { calendarData } from "../../../tweets_new_design_0/calendarData.js";

const data = {
  claim1,
  themTweets: example2.themTweets,
  usTweets: example2.usTweets
}

// Main Page
export default function MainPage() {

  const [selectedDate, setSelectedDate] = useState("2025-01-01");

  const onDateSelect = (key) => {
    console.log("key :", key);
  }

  const dataForDate = calendarData.findIndex(item => item.date === selectedDate) === -1 ? { themTweets: [], usTweets: [] } : { themTweets: calendarData[0].themTweets, usTweets: calendarData[0].usTweets };

  return (
    <div className="p-6 space-y-8">

      <CalendarComponent onDateSelect={onDateSelect} dataForDate={ dataForDate } />
      
      <div>
        <p className="font-bold text-gray-700">Claim: <div className="font-bold text-gray-700">{ claim1.claimText}</div></p>
        {/* <p className="pl-6 text-gray-700">This is the claim text, indented.</p> */}
      </div>

      <div>
        <p className="font-bold text-gray-700">Example:</p>
        <p className="pl-6 text-gray-700">{ example2.exampleText }</p>
      </div>

      <div className="flex-row">
        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Them:</p>
          <TweetCarousel tweets={dataForDate.themTweets} />
        </div>

        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Us:</p>
          <TweetCarousel tweets={data.usTweets} />
        </div>
      </div>
    </div>
  );
}
