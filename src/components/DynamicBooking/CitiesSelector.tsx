import { useEffect, useState, useRef } from "react";

interface CitiesSelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function CitiesSelector({
  cities,
  selectedCity,
  onCityChange,
}: CitiesSelectorProps) {
  const [componentCities, setComponentCities] = useState(cities);
  const [searchingValue, setSearchingValue] = useState("");
  const [isCitiesVisible, setIsCitiesVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchCity = (search: string) => {
    const filteredCities = cities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
    setComponentCities(filteredCities);
  };

  const toggleCitiesVisibility = () => {
    setIsCitiesVisible(!isCitiesVisible);
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setSearchingValue(city);
    setIsCitiesVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsCitiesVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="button-container" ref={containerRef}>
      <label className={`label-button ${isCitiesVisible ? "active" : ""}`}>
        Lieu
        <input
          type="text"
          placeholder="Rechercher un lieu"
          onChange={(e) => {
            searchCity(e.target.value), setSearchingValue(e.target.value);
          }}
          onFocus={toggleCitiesVisibility}
          value={searchingValue}
        />
      </label>
      <div className={`container cities ${isCitiesVisible ? "visible" : ""}`}>
        {componentCities.length === 0 && (
          <div className="no-results">Aucun résultat</div>
        )}
        {componentCities.map((city) => (
          <button
            key={city}
            className={city === selectedCity ? "selected" : ""}
            onClick={() => handleCitySelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
