import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/navBar";
import "./list.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faInfo,
  faEarthAmericas,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination);
  const [code_destination, setCodeDestination] = useState(
    location.state?.code_destination
  );
  const [date, setDate] = useState(location.state?.date);
  const [options, setOptions] = useState(location.state?.options);
  const [room, setRoom] = useState(location.state?.options.room);
  const [startDate, setStartDate] = useState(location.state?.startDate);
  const [openDate, setOpenDate] = useState(false);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">
              Search{" "}
              <span style={{ fontSize: "13px", color: "#003580" }}>
                (View Only)
              </span>
            </h1>

            <div className="lsItem">
              <label>Destanation</label>
              <input placeholder={destination} type="text" readOnly />
            </div>
            <div className="lsItem">
              <label className="label-no-margin">Check-in Date</label>
              <span onClick={() => setOpenDate(openDate)}>
                {date &&
                  date.length > 0 &&
                  `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
              </span>

              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Quantity</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options && options.quantity}
                    readOnly
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options && options.room}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="listInfor-box1">
              <span>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </span>{" "}
              <span style={{ textAlign: "justify", fontSize: "14px" }}>
                This table displays all selected options outside the home page.{" "}
                <span style={{ color: "#003B95", cursor: "pointer" }}>
                  Please return to the home page if your options are empty.
                </span>{" "}
              </span>
            </div>
          </div>
          <div className="listResult">
            <SearchItem />
          </div>
          <div className="listInfor">
            <button className="listInfor-btn">
              <FontAwesomeIcon icon={faLeftLong} />
              prev
            </button>
            <div className="listInfor-content">
              <h1 style={{ fontSize: "20px" }}>Contact us</h1>
              <span style={{ fontSize: "14px" }}>
                MidmoonBooking.com Media Relations
              </span>
              <p
                style={{
                  fontSize: "14px",
                  color: "#003580",
                  cursor: "pointer",
                }}
              >
                mediarelations@booking.com
              </p>
            </div>
            <div className="listInfor-box">
              <span>
                <FontAwesomeIcon
                  icon={faInfo}
                  style={{ fontSize: "14px", color: "003580" }}
                />
              </span>
              <br></br>
              <span style={{ textAlign: "justify", fontSize: "14px" }}>
                For more information on permissions to use photos and imagery,
                please contact{" "}
                <span style={{ color: "#003B95", cursor: "pointer" }}>
                  mediarelations@booking.com
                </span>{" "}
                before using on your own platform.
              </span>
            </div>
            <div className="listInfor-content">
              <h1 style={{ fontSize: "20px" }}>Share this page</h1>
              <span style={{ fontSize: "14px" }}>
                Latest MidmoonBooking.com Sustainable Travel Data Reveals
                Ongoing Challenges for Consumers & Highlights a Heightened
                Opportunity for Cross-Industry Collaboration
              </span>
              <div className="listInfor-share">
                <span className="icon-share">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span className="icon-share">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span className="icon-share">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </div>
            </div>
            <div className="listInfor-content">
              <h1 style={{ fontSize: "20px" }}>MidmoonBooking.com</h1>

              <div className="listInfor-share">
                <span className="icon-share">
                  <FontAwesomeIcon icon={faEarthAmericas} />
                </span>
                <span className="icon-share">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span className="icon-share">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
