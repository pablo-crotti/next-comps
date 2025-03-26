import { useEffect, useState, useRef, use } from "react";
import Calendar from "./Calendar";

interface DurationSelectorProps {
  isParentDurationVisible: boolean;
  onDurationChange: (start: number, duration: number) => void;
}

export default function DurationSelector({
  isParentDurationVisible,
  onDurationChange,
}: DurationSelectorProps) {
  const [isDurationVisible, setIsDurationVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDuration, setHoveredDuration] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const MAX_DURATION = 3;

  const toggleDurationVisibility = () => {
    setIsDurationVisible(!isDurationVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDurationVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isParentDurationVisible) {
      setIsDurationVisible(true);
    } else {
      setIsDurationVisible(false);
    }
  }, [isParentDurationVisible]);

  useEffect(() => {
    if (selectedDuration && selectedHour) {
      toggleDurationVisibility();
      onDurationChange(selectedHour, selectedDuration);
    }
  }, [selectedDuration, selectedHour]);

  return (
    <div className="button-container center" ref={containerRef}>
      <button
        className={`label-button ${isDurationVisible ? "active" : ""}`}
        onClick={toggleDurationVisibility}
      >
        Durée
        <span>
          {selectedDuration && selectedHour
            ? selectedDuration % 1 === 0
              ? `${selectedHour}h00 à ${selectedHour + selectedDuration}:00`
              : `${selectedHour}h00 à ${
                  selectedHour + selectedDuration - 0.5
                }:30`
            : "De quand à quand ?"}
        </span>
      </button>
      <div
        className={`container duration ${isDurationVisible ? "visible" : ""}`}
      >
        <select
          className={`${selectedHour ? "filled" : ""}`}
          onChange={(e) => setSelectedHour(Number(e.target.value))}
        >
          <option>Here de départ</option>
          <option value="11">11h00</option>
          <option value="12">12h00</option>
          <option value="13">13h00</option>
          <option value="14">14h00</option>
          <option value="15">15h00</option>
        </select>
        <div className="duration-container">
          {Array.from(
            { length: (MAX_DURATION - 0.5) * 2 + 0.5 },
            (_, i) => i * 0.5 + 1
          ).map((duration) => (
            <button
              key={duration}
              onMouseEnter={() => setHoveredDuration(duration)}
              onMouseLeave={() => setHoveredDuration(null)}
              onClick={() => setSelectedDuration(duration)}
              className={`duration-option ${
                hoveredDuration !== null && duration <= hoveredDuration
                  ? "hovered"
                  : ""
              } ${
                selectedDuration !== null &&
                duration <= selectedDuration &&
                (hoveredDuration === null || duration <= hoveredDuration)
                  ? "selected"
                  : ""
              }`}
            >
              <p>
                {duration % 1 === 0 ? `${duration}:00` : `${duration - 0.5}:30`}
              </p>
              <span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
