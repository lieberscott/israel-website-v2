import React, { useState, useEffect } from "react";
import "../../styles/stylesheet.css"; // import the CSS file

import { fetchMonth, fetchNext } from "../../../api/api.js";

import CalendarComponent from "../calendar/Calendar.jsx";
import Claims from "../claims/Claims.jsx";
import TweetCarousel from "./TweetCarousel.jsx";

/*


1. Figure out what you want to do about the fact that the page always lands on 09-30-2025.

2. Add to Heroku

3. Add manual Tweet cards (not using the Twitter widget and TweetIds, but having all the data stored in a database) and then displaying it

*/


const defaultDayData = [
  {
    usTweets: [ { id: "id1" }],
    themTweets: [{id: "id1"}],
    claimText: "",
    text: "",
    keywordIds: []
  }
]


// Main Page
export default function MainPage() {

  const [viewState, setViewState] = useState({
    displayedDate: "2025-02-02",
    summaryData: {},
    monthlyData: {},
    dayData: {},
    currentIndex: 0,
    calendarDate: new Date("2025-02-02"),
    usTweetsIndex: 0,
    themTweetsIndex: 0
  })


  const [loaded, setLoaded] = useState(false);
  const [keywordId, setKeywordId] = useState(null);
  const [claimId, setClaimId] = useState(null);


  useEffect(() => {
    onDateSelect(viewState.displayedDate, false);
  }, []);

  const onDateSelect = async (dateString, summaryOnly, keywordId, newClaimId, findNext, findPrev, findFirst) => {

    console.log("claimId : ", claimId);
    console.log("newClaimId : ", newClaimId);
    // Step 1: Check if it's the same month and year (if so, data already here, no need to re-fetch)
    const [selectedYear, selectedMonth] = dateString.split('-');
    const [displayedYear, displayedMonth] = viewState.displayedDate.split('-');

    if (selectedYear === displayedYear && selectedMonth === displayedMonth && claimId == newClaimId && loaded) {
      // If there's no data for the selected date, use an Object with keywords but no data to prevent errors
      if (!viewState.monthlyData[dateString]) {

        setViewState(prev => ({
          ...prev,
          dayData: defaultDayData,
          displayedDate: dateString,
          themTweetsIndex: 0,
          usTweetsIndex: 0,
          currentIndex: 0
        }));

      }
      else {
        // Update data for new date

        setViewState(prev => ({
          ...prev,
          dayData: prev.monthlyData[dateString],
          displayedDate: dateString,
          themTweetsIndex: 0,
          usTweeetsIndex: 0,
          currentIndex: 0
        }));

      }
    }


    else {
      const responseData = await fetchMonth(dateString, summaryOnly, keywordId, newClaimId, findNext, findPrev, findFirst);
      if (responseData.error) {
        window.alert("Error")
      }
      else if (summaryOnly) {
        setViewState(prev => ({
          ...prev,
          summaryData: responseData.summaryData
        }));
      }
      else {
        console.log("responseData : ", responseData);
        if (!responseData.data[dateString]) {

          setViewState(prev => ({
            ...prev,
            dayData: defaultDayData,
            summaryData: responseData.summaryData,
            monthlyData: responseData.data,
            displayedDate: dateString,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: 0
          }));

          setClaimId(newClaimId);
        }
        else {
          const newData = responseData.data[dateString];

          setViewState(prev => ({
            ...prev,
            dayData: newData,
            summaryData: responseData.summaryData,
            monthlyData: responseData.data,
            displayedDate: dateString,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: 0
          }));

          setClaimId(newClaimId);
        }
      }
      if (!loaded) {
        setLoaded(true);
      }
    }
  }

  const prevExample = async () => {

    const [hasPrev, prevDate] = checkForNextDatesData(false);

    if (viewState.currentIndex > 0) {
      setViewState(prev => ({
            ...prev,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: prev.currentIndex - 1
          }));
    }

    else if (hasPrev) {

      setViewState(prev => ({
            ...prev,
            dayData: prev.monthlyData[prevDate],
            displayedDate: prevDate,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: 0,
            calendarDate: new Date(prevDate)
          }));
    }
    
    else {
      try {
        const findNext = false;
        const findPrev = true;
        const summaryOnly = false;
        const responseData = await fetchNext(viewState.displayedDate, summaryOnly, keywordId, claimId, findNext, findPrev);
        if (responseData.noTarget) {
          if (findNext) {
            window.alert("No later examples, check previous dates");
          }
          else {
            window.alert("No previous examples, check later dates");
          }
        }
        else if (responseData.error) {
          window.alert("Error")
        }
        else {
          console.log("responseData : ", responseData);
          const newDate = responseData.nextDate; // both next or previous dates, depending on which direction we're going
          const newData = responseData.data[newDate];

          setViewState(prev => ({
            ...prev,
            dayData: newData,
            summaryData: responseData.summaryData,
            monthlyData: responseData.data,
            displayedDate: newDate,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: 0,
            calendarDate: new Date(newDate)
          }));

        }
      }

      catch (e) {
        console.log("Error : ", e);
        window.alert("Error : ", e);
      }
    }
  }

  const nextExample = async () => {

    const [hasNext, nextDate] = checkForNextDatesData(true);
    console.log("hasNext : ", hasNext);
    console.log("nextDate : ", nextDate);
    console.log("currentIndex : ", viewState.currentIndex);
    console.log("dayData.length - 1 : ", viewState.dayData.length - 1)

    if (viewState.currentIndex < viewState.dayData.length - 1) {
      setViewState(prev => ({
        ...prev,
        themTweetsIndex: 0,
        usTweetsIndex: 0,
        currentIndex: prev.currentIndex + 1
      }));

    }

    else if (hasNext) {

      setViewState(prev => ({
        ...prev,
        dayData: prev.monthlyData[nextDate],
        displayedDate: nextDate,
        themTweetsIndex: 0,
        usTweetsIndex: 0,
        currentIndex: 0,
        calendarDate: new Date(nextDate)
      }));

    }

    else {
      try {
        const findNext = true;
        const findPrev = false;
        const summaryOnly = false;
        const responseData = await fetchNext(viewState.displayedDate, summaryOnly, keywordId, claimId, findNext, findPrev);
        if (responseData.noTarget) {
          if (findNext) {
            window.alert("No later examples, check previous dates");
          }
          else {
            window.alert("No previous examples, check later dates");
          }
        }
        else if (responseData.error) {
          window.alert("Error")
        }
        else {
          console.log("responseData : ", responseData);
          const newDate = responseData.nextDate; // both next or previous dates, depending on which direction we're going
          const newData = responseData.data[newDate];


          setViewState(prev => ({
            ...prev,
            dayData: newData,
            summaryData: responseData.summaryData,
            monthlyData: responseData.data,
            displayedDate: newDate,
            themTweetsIndex: 0,
            usTweetsIndex: 0,
            currentIndex: 0,
            calendarDate: new Date(newDate)
          }));

        }
      }

      catch (e) {
        console.log("error : ", e);
        window.alert("Error : ", e);
      }
    }

  }

  // claimId will be a string or "" (if none)
  const onClaimSelect = async (claimIdSelected) => {
    console.log("claim Select");
    const newClaimId = claimIdSelected === "" ? null : claimIdSelected;
    const summaryOnly = false;
    const keywordId = null;
    const findNext = false;
    const findPrev = false;
    const findFirst = true;
    await onDateSelect(viewState.displayedDate, summaryOnly, keywordId, newClaimId, findNext, findPrev, findFirst);

  } 

  // next is a boolean of whether you're checking for the next date or previous date
  const checkForNextDatesData = (next) => {
    const dates = Object.keys(viewState.monthlyData).sort(); // sorted chronologically (YYYY-MM-DD format)
    const index = dates.indexOf(viewState.displayedDate);


    if (next) {
      const hasNext = index < dates.length - 1;
      const nextDate = hasNext ? dates[index + 1] : null;
      return [hasNext, nextDate];
    }
    else {
      const hasPrev = index > 0;
      const prevDate = hasPrev ? dates[index - 1] : null;
      return [hasPrev, prevDate];
    }
  }


  const handleCalendarDate = (newDate) => {
    setViewState(prev => ({
      ...prev,
      calendarDate: newDate
    }));
  }

  const handleThemTweetIndex = (index) => {
    setViewState(prev => ({
      ...prev,
      themTweetIndex: index
    }));
  }

  const handleUsTweetIndex = (index) => {
    setViewState(prev => ({
      ...prev,
      usTweetIndex: index
    }));
  }

  if (!loaded) {
    return <div style={{ color: "white" }}>Loading ...</div>
  }

  return (
    <div className="p-6 space-y-8">

      <CalendarComponent onDateSelect={onDateSelect} displayedDate={ viewState.displayedDate } summaryData={ viewState.summaryData } calendarDate={ viewState.calendarDate } handleCalendarDate={ handleCalendarDate } />
      
      <Claims onClaimSelect={ onClaimSelect } />

      <div>
        <p className="font-bold text-gray-700">Claim: { viewState.dayData[viewState.currentIndex].claimText}</p>
      </div>

      <div>
        <p className="font-bold text-gray-700">{new Date(`${viewState.displayedDate}T00:00:00Z`).toLocaleString("default",{
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC"
        })}:
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>{viewState.dayData[0].text === "" ? "0" : viewState.currentIndex + 1} of {viewState.dayData[0].text === "" ? "0" : viewState.dayData.length}</span>
          <button onClick={prevExample}>&lt;</button>
          <button onClick={nextExample}>&gt;</button>
        </p>
        {/* <p className="font-bold text-gray-700">{dayData[currentIndex].keywordIds.map((item, i) => <span key={item}>{item}, </span>)}</p> */}
        <p className="pl-6 text-gray-700">{ viewState.dayData[viewState.currentIndex].text }</p>
      </div>

      <div className="flex-row">
        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Them:</p>
          <TweetCarousel tweets={viewState.dayData[viewState.currentIndex].themTweets} displayedDate={ viewState.displayedDate } currentIndex={ viewState.currentIndex } tweetIndex={viewState.themTweetsIndex} handleTweetIndex={handleThemTweetIndex} />
        </div>

        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Us:</p>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>{viewState.currentIndex + 1} of {viewState.dayData.length}</span>
          <TweetCarousel tweets={viewState.dayData[viewState.currentIndex].usTweets} displayedDate={ viewState.displayedDate } currentIndex={ viewState.currentIndex } tweetIndex={viewState.usTweetsIndex} handleTweetIndex={handleUsTweetIndex} />
        </div>
      </div>
    </div>
  );
}
