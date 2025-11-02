import React, { useState, useEffect } from "react";
import "../../styles/stylesheet.css"; // import the CSS file

import { fetchMonth, fetchNext } from "../../../api/api.js";

import CalendarComponent from "../calendar/Calendar.jsx";
import Claims from "../claims/Claims.jsx";
import TweetCarousel from "./TweetCarousel.jsx";


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

  const [displayedDate, setDisplayedDate] = useState("2025-09-30");
  const [summaryData, setSummaryData] = useState({})
  const [monthlyData, setMonthlyData] = useState({});
  const [dayData, setDayData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keywordId, setKeywordId] = useState(null);
  const [claimId, setClaimId] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date(displayedDate));


  useEffect(() => {
    onDateSelect(displayedDate, false);
  }, []);

  const onDateSelect = async (dateString, summaryOnly, keywordId, claimId, findNext, findPrev, findFirst) => {

    // Step 1: Check if it's the same month and year (if so, data already here, no need to re-fetch)
    const [selectedYear, selectedMonth] = dateString.split('-');
    const [displayedYear, displayedMonth] = displayedDate.split('-');

    if (selectedYear === displayedYear && selectedMonth === displayedMonth && loaded) {
      // If there's no data for the selected date, use an Object with keywords but no data to prevent errors
      if (!monthlyData[dateString]) {
        setDayData(defaultDayData);
        setDisplayedDate(dateString);
        setCurrentIndex(0);
      }
      else {
        // Update data for new date
        const newData = monthlyData[dateString];
        setDayData(newData);
        setDisplayedDate(dateString);
        setCurrentIndex(0);
      }
    }


    else {
      const responseData = await fetchMonth(dateString, summaryOnly, keywordId, claimId, findNext, findPrev, findFirst);
      if (responseData.error) {
        window.alert("Error")
      }
      else if (summaryOnly) {
        setSummaryData(responseData.summaryData);
      }
      else {
        console.log("responseData : ", responseData);
        if (!responseData.data[dateString]) {
          setDayData(defaultDayData);
          setDisplayedDate(dateString);
          setCurrentIndex(0);
        }
        else {
          const newData = responseData.data[dateString];
          setDayData(newData);
          setSummaryData(responseData.summaryData);
          setMonthlyData(responseData.data);
          setDisplayedDate(dateString);
          setCurrentIndex(0);
        }
      }
      if (!loaded) {
        setLoaded(true);
      }
    }
  }

  const prevExample = async () => {

    const [hasPrev, prevDate] = checkForNextDatesData(false);

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }

    else if (hasPrev) {
      const newData = monthlyData[prevDate];
      setDayData(newData);
      setDisplayedDate(prevDate);
      setCurrentIndex(0);
      setCalendarDate(new Date(prevDate));
    }
    
    else {
      try {
        const findNext = false;
        const findPrev = true;
        const summaryOnly = false;
        const responseData = await fetchNext(displayedDate, summaryOnly, keywordId, claimId, findNext, findPrev);
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
          setDayData(newData);
          setSummaryData(responseData.summaryData);
          setMonthlyData(responseData.data);
          setDisplayedDate(newDate);
          setCurrentIndex(0);
          setCalendarDate(new Date(newDate));
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

    if (currentIndex < dayData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }

    else if (hasNext) {
      const newData = monthlyData[nextDate];
      setDayData(newData);
      setDisplayedDate(nextDate);
      setCurrentIndex(0);
      setCalendarDate(new Date(nextDate));
    }

    else {
      try {
        const findNext = true;
        const findPrev = false;
        const summaryOnly = false;
        const responseData = await fetchNext(displayedDate, summaryOnly, keywordId, claimId, findNext, findPrev);
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
          setDayData(newData);
          setSummaryData(responseData.summaryData);
          setMonthlyData(responseData.data);
          setDisplayedDate(newDate);
          setCurrentIndex(0);
          setCalendarDate(new Date(newDate));
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
    const claimId = claimIdSelected === "" ? null : claimIdSelected;
    const summaryOnly = false;
    const keywordId = null;
    const findNext = false;
    const findPrev = false;
    const findFirst = true;
    await onDateSelect(displayedDate, summaryOnly, keywordId, claimId, findNext, findPrev, findFirst);

  } 

  // next is a boolean of whether you're checking for the next date or previous date
  const checkForNextDatesData = (next) => {
    const dates = Object.keys(monthlyData).sort(); // sorted chronologically (YYYY-MM-DD format)
    const index = dates.indexOf(displayedDate);


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

  if (!loaded) {
    return <div style={{ color: "white" }}>Loading ...</div>
  }

  return (
    <div className="p-6 space-y-8">

      <CalendarComponent onDateSelect={onDateSelect} displayedDate={ displayedDate } setDisplayedDate={ setDisplayedDate } summaryData={ summaryData } calendarDate={ calendarDate } setCalendarDate={ setCalendarDate } />
      
      <Claims onClaimSelect={ onClaimSelect } />

      <div>
        <p className="font-bold text-gray-700">Claim: { dayData[currentIndex].claimText}</p>
      </div>

      <div>
        <p className="font-bold text-gray-700">{new Date(`${displayedDate}T00:00:00Z`).toLocaleString("default",{
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC"
        })}:
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>{dayData[0].text === "" ? "0" : currentIndex + 1} of {dayData[0].text === "" ? "0" : dayData.length}</span>
          <button onClick={prevExample}>&lt;</button>
          <button onClick={nextExample}>&gt;</button>
        </p>
        <p className="font-bold text-gray-700">{dayData[currentIndex].keywordIds.map((item, i) => <span key={item}>{item}, </span>)}</p>
        <p className="pl-6 text-gray-700">{ dayData[currentIndex].text }</p>
      </div>

      <div className="flex-row">
        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Them:</p>
          <TweetCarousel tweets={dayData[currentIndex].themTweets} displayedDate={ displayedDate } currentIndex={ currentIndex } />
        </div>

        <div className="flex-1">
          <p className="font-bold mb-2 text-gray-700">Us:</p>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>{currentIndex + 1} of {dayData.length}</span>
          <TweetCarousel tweets={dayData[currentIndex].usTweets} displayedDate={ displayedDate } currentIndex={ currentIndex } />
        </div>
      </div>
    </div>
  );
}
