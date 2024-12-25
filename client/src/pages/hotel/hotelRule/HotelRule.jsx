import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChild } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "./hotelrule.css";
const HotelRule = () => {
  return (
    <div className="hotel-rule">
      <h1 style={{ fontSize: "25px", paddingTop: "10px" }}>General rules</h1>
      <h1 style={{ fontSize: "12px", fontWeight: "400" }}>
        take special requests - add in the next step!
      </h1>
      <div className="rule-table">
        <div className="rule-content">
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>Check in</span>
          </div>
          <div className="rule-content-Content">
            <span>Từ 14:00 - 00:00</span>
          </div>
        </div>

        <div className="rule-content">
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Check out</span>
          </div>
          <div className="rule-content-Content">
            <span>Từ 01:00 - 12:00</span>
          </div>
        </div>

        <div className="rule-content">
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faInfo} />
            <span>Cancel /Prepay</span>
          </div>
          <div className="rule-content-Content">
            <span>
              Cancellation and prepayment policies vary based on type
              accommodation. Please enter the dates of stay and check the terms
              conditions of the room you choose.
            </span>
          </div>
        </div>

        <div className="rule-content">
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faChild} />
            <span>Children and beds</span>
          </div>
          <div className="rule-content-Content">
            <span style={{ fontWeight: "700" }}>Children policy</span>
            <span>
              Suitable for all children. To view price and condition information
              Exact room availability, please add number and age of children
              children in your group when searching.
            </span>
            <span style={{ fontWeight: "700" }}>Crib and extra bed policy</span>
            <span>This property does not have cribs or extra beds.</span>
          </div>
        </div>

        <div className="rule-content">
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faPerson} />
            <span>age limit</span>
          </div>
          <div className="rule-content-Content">
            <span>There is no age requirement at check-in</span>
          </div>
        </div>

        <div
          className="rule-content"
          style={{ borderBottom: "none", paddingBottom: "none" }}
        >
          <div className="rule-content-title">
            <FontAwesomeIcon icon={faPaw} />
            <span>Pet</span>
          </div>
          <div className="rule-content-Content">
            <span>Pets are not allowed.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRule;
