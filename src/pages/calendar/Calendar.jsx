import React, { useState, useMemo } from "react";
import "../../styles/calendarStyles.css"; // import the CSS file

const Calendar = ({ onDateSelect, summaryData, displayedDate, calendarDate, setCalendarDate }) => {
  // const [calendarDate, setCalendarDate] = useState(new Date(displayedDate));


  // Move to previous month
  const prevMonth = () => {
    const newYear = calendarDate.getFullYear();
    const newMonth = calendarDate.getMonth() - 1;
    
    setCalendarDate(new Date(newYear, newMonth, 1));

    // need to add +1 back to the month, because new Date() (above) is 0-indexed, so January is 0 and September is 8.
    // But for the onDateSelect, we want the actual months 1-indexed, so January is 01 and September is 09
    // So if we're in September and we want the previous month (August), we want it to be an 8
    // calendar.getMonth() == 8 (September), then above we subtract 1 from it to make it 7, but we want 8 so we add 1 back to it
    onDateSelect(`${newYear}-${newMonth + 1}-1`, true); // get summaryOnly of prevMonth's records
  };

  // Move to next month
  const nextMonth = () => {
    const newYear = calendarDate.getFullYear();
    const newMonth = calendarDate.getMonth() + 1;
    setCalendarDate(new Date(newYear, newMonth, 1));

    // need to add +1 to the month, because new Date() (above) is 0-indexed, so January is 0 and September is 8.
    // But for the onDateSelect, we want the actual months 1-indexed, so January is 1 and September is 9
    // So if we're in September and we want the next month (October), we want it to be a 10
    // calendar.getMonth() == 8 (September), then above we add 1 to it to make it 9, but we want 10 so we add another 1 to it
    onDateSelect(`${newYear}-${newMonth + 1}-1`, true); // get summaryOnly of nextMonth's records
  };

  // Get all days in the current month
  const getDateKey = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      const key = getDateKey(date);
      const count = summaryData[key] || 0;
      days.push({ label: date.getDate(), key, count });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const days = useMemo(() => getDaysInMonth(year, month), [year, month, summaryData]);

  const handleDateClick = (key) => {
    onDateSelect(key, false);
  };

  // const year = calendarDate.getFullYear();
  // const month = calendarDate.getMonth();
  // const days = getDaysInMonth(year, month);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span style={{color: "white" }}>
          {calendarDate.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      <div className="horizontal-calendar">
        {days.map((day) => (
          <button
            key={day.key}
            className={`day-button 
              ${summaryData[day.key] > 0 ? "has-data" : ""} 
              ${displayedDate === summaryData[day.key] ? "selected" : ""}
            `}
            onClick={() => handleDateClick(day.key)}
          >
            <div className="day-number">{day.label}</div>
            {day.count > 0 && <div className="day-count">{day.count}</div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
