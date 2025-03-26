import { useState, useEffect } from "react";

interface CalendarProps {
  setNewDate: (date: Date) => void;
}

export default function Calendar({ setNewDate }: CalendarProps) {
  const getWeekDays = () => {
    const formatter = new Intl.DateTimeFormat("default", { weekday: "short" });
    const weekDays = [];
    const referenceDate = new Date(2023, 0, 2);
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        formatter.format(new Date(referenceDate.getTime() + i * 86400000))
      );
    }
    return weekDays;
  };

  const days = getWeekDays();

  const [actualDate, setActualDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    actualDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    actualDate.getFullYear()
  );
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    setFirstDayOfMonth(firstDay === 0 ? 6 : firstDay - 1);
  }, [selectedMonth, selectedYear]);

  const toggleSelectedMonth = (direction: "prev" | "next") => () => {
    if (direction === "prev") {
      setSelectedMonth((prevMonth) => {
        const newMonth = prevMonth - 1;
        if (newMonth < 0) {
          setSelectedYear((prevYear) => prevYear - 1);
          return 11;
        }
        return newMonth;
      });
    }
    if (direction === "next") {
      setSelectedMonth((prevMonth) => {
        const newMonth = prevMonth + 1;
        if (newMonth > 11) {
          setSelectedYear((prevYear) => prevYear + 1);
          return 0;
        }
        return newMonth;
      });
    }
  };

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const selectDay = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newDate);
    setNewDate(newDate);
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const emptyDays = firstDayOfMonth;
    const calendarDays = [];

    for (let i = 0; i < emptyDays; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      calendarDays.push(
        <button
          disabled={
            i < actualDate.getDate() &&
            selectedMonth === actualDate.getMonth() &&
            selectedYear === actualDate.getFullYear()
          }
          onClick={() => selectDay(i)}
          key={i}
          className={`day ${
            i == actualDate.getDate() &&
            selectedMonth === actualDate.getMonth() &&
            selectedYear === actualDate.getFullYear()
              ? "today"
              : ""
          } ${
            selectedMonth === actualDate.getMonth() &&
            selectedYear === actualDate.getFullYear() &&
            i < actualDate.getDate()
              ? ""
              : "selectable"
          } ${
            selectedDate &&
            i === selectedDate.getDate() &&
            selectedMonth === selectedDate.getMonth() &&
            selectedYear === selectedDate.getFullYear()
              ? "selected"
              : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return calendarDays;
  };

  return (
    <>
      <div className="calendar-header">
        {selectedMonth === actualDate.getMonth() &&
        selectedYear === actualDate.getFullYear() ? (
          <span></span>
        ) : (
          <button onClick={toggleSelectedMonth("prev")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ width: "16px", height: "16px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        <p className="month-info">
          {new Intl.DateTimeFormat("default", { month: "long" }).format(
            new Date(selectedYear, selectedMonth)
          )}{" "}
          {selectedYear}
        </p>
        <button onClick={toggleSelectedMonth("next")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={{ width: "16px", height: "16px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="calendar-body">
        {days.map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </>
  );
}
