import React, { useState } from "react";
import "../../styles/calendarStyles.css"; // import the CSS file

const Calendar = ({ onDateSelect, summaryData, setDisplayedDate, displayedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Move to previous month
  const prevMonth = () => {
    const newYear = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() - 1;

    setCurrentDate(new Date(newYear, newMonth, 1));
    onDateSelect(`${newYear}-${newMonth}-1`, true); // get summaryOnly of prevMonth's records
  };

  // Move to next month
  const nextMonth = () => {
    const newYear = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() + 1;
    setCurrentDate(new Date(newYear, newMonth, 1));
    onDateSelect(`${newYear}-${newMonth}-1`, true); // get summaryOnly of nextMonth's records
  };

  // Get all days in the current month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      const dateKey = date.toISOString().split("T")[0];
      days.push({
        label: date.getDate(),
        key: dateKey,
        count: summaryData[dateKey] ? summaryData[dateKey] : 0
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDateClick = (key) => {
    setDisplayedDate(key);
    onDateSelect(key, false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span style={{color: "white" }}>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
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
