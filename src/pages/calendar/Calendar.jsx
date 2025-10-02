import React, { useState } from "react";
import "../../styles/calendarStyles.css"; // import the CSS file

const Calendar = ({ onDateSelect, dataForDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Move to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Move to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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
        hasData: !!dataForDate
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
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
            className={`day-button ${day.hasData ? "has-data" : ""}`}
            onClick={() => onDateSelect(day.key)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
