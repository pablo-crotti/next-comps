import "./style.css";
import Block from "./Block";
import { useState } from "react";

export default function DnamicBooking({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="dynamic-booking">
      <div className="desktop">
        <Block />
      </div>
      <div className="mobile">
        <button className="modal-btn" onClick={() => setIsModalOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={{ width: "24px", height: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <span>Aventure sur mesure</span>
        </button>
        {isModalOpen && (
          <div className="modal">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="block-container">
              <Block />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
