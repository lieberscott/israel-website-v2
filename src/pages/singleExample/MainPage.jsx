import React, { useState, useEffect } from "react";
import "../../styles/stylesheet.css"; // import the CSS file

import { fetchMonth } from "../../../api/api.js";

import CalendarComponent from "../calendar/Calendar.jsx";
import TweetCarousel from "./TweetCarousel.jsx";


import { claim1, claim2 } from "../../../tweets_new_design_0/claims.js";
import { incident1 } from "../../../tweets_new_design_0/incidents.js";
import { example1, example2, example3, example4 } from "../../../tweets_new_design_0/examples.js";
import { calendarData } from "../../../tweets_new_design_0/calendarData.js";


/*

1. onDateSelect - fetch the examples for that date
- should have a arrow to go through the Examples if there are multiple Examples for one day
- also fetch the number of Examples on each day that month and display them on the calendar; if within the same month as currently disaplyed month, no need to refetch them

2. onNextMonth (user presses arrow to go to next month) - each date in the month has a number for the number of Examples on that day

3. Add Claims at the top of the page (where the current categories are)

4. Keywords should be included in each Example, clickable to display

5. Need a "View next" button that works for All (see next date), for Keywords (see next item in this Keyword), and for Categories (see next item in this Category)

6. Need a submission page that includes entries for everything and an "example" to guide the user
- must also include an email alert for any submissions to review and approve



*/

const data = {
  claim1,
  themTweets: example2.themTweets,
  usTweets: example2.usTweets
}

// Main Page
export default function MainPage() {

  const [displayedDate, setDisplayedDate] = useState("2025-09-30");
  const [summaryData, setSummaryData] = useState({})
  const [monthlyData, setMonthlyData] = useState({});
  const [dayData, setDayData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onDateSelect(displayedDate, false);
  }, []);

  const onDateSelect = async (dateString, summaryOnly) => {
    console.log("dateString :", dateString);

    // Step 1: Check if it's the same month and year (if so, data already here, no need to fetch)
    const [selectedYear, selectedMonth] = dateString.split('-');
    const [displayedYear, displayedMonth] = displayedDate.split('-');
    if (selectedYear === displayedYear && selectedMonth === displayedMonth && loaded) {
      // Find data for new date
      const newData = monthlyData[dateString];
      setDayData(newData);
      setDisplayedDate(dateString);
    }

    else {
      const responseData = await fetchMonth(dateString, summaryOnly);
      if (responseData.error) {
        window.alert("Error")
      }
      if (summaryOnly) {
        setSummaryData(responseData.summaryData)
      }
      else {
        console.log("responseData : ", responseData);
        const newData = responseData.data[dateString];
        console.log("newData.length : ", newData.length);
        setDayData(newData);
        setSummaryData(responseData.summaryData);
        setMonthlyData(responseData.data);
        setDisplayedDate(dateString);
      }
      if (!loaded) {
        setLoaded(true);
      }
    }

  }

  if (!loaded) {
    return <div style={{ color: "white" }}>Loading ...</div>
  }

  return (
    <div className="p-6 space-y-8">

      <CalendarComponent onDateSelect={onDateSelect} displayedDate={ displayedDate } setDisplayedDate={ setDisplayedDate } summaryData={ summaryData } />
      
      <div>
        <p className="font-bold text-gray-700">Claim: { dayData[currentIndex].claimText}</p>
      </div>

      <div>
        <p className="font-bold text-gray-700">Example:</p>
        <p className="pl-6 text-gray-700">{ dayData[currentIndex].exampleText }</p>
      </div>

      <div className="flex-row">
        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Them:</p>
          <TweetCarousel tweets={dayData[currentIndex].themTweets} />
        </div>

        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Us:</p>
          <TweetCarousel tweets={dayData[currentIndex].usTweets} />
        </div>
      </div>
    </div>
  );
}
