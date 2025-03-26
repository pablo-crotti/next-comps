import { useEffect, useState, useRef, use } from "react";
import Calendar from "./Calendar";

interface DateSelectorProps {
  isParentDateVisible: boolean;
  onDateChange: (date: Date) => void;
}

export default function DateSelector({
  isParentDateVisible,
  onDateChange,
}: DateSelectorProps) {
  const [isDateVisible, setisDateVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleCitiesVisibility = () => {
    setisDateVisible(!isDateVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setisDateVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isParentDateVisible) {
      setisDateVisible(true);
    } else {
      setisDateVisible(false);
    }
  }, [isParentDateVisible]);

  useEffect(() => {
    if (selectedDate) {
      toggleCitiesVisibility();
      onDateChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="button-container center" ref={containerRef}>
      <button
        className={`label-button ${isDateVisible ? "active" : ""}`}
        onClick={toggleCitiesVisibility}
      >
        Date
        <span>
          {selectedDate ? selectedDate.toLocaleDateString() : "Quand ?"}
        </span>
      </button>
      <div className={`container calendar ${isDateVisible ? "visible" : ""}`}>
        <Calendar setNewDate={setSelectedDate} />
      </div>
    </div>
  );
}
