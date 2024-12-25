import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
const Header = ({ type, sendDataToHome }) => {
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/lg");
  };

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [search, setSearch] = useState([]);
  const [search2, setSearch2] = useState([]);
  const [destination, setDestination] = useState("");
  const [code_destination, setCodeDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    quantity: 1,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  // search item

  useEffect(() => {
    const fetchSearch = async (destination) => {
      try {
        const response = await axios.get(
          `http://localhost:3030/v2/api/search/place?query=${destination}`
        );

        setSearch([
          ...response.data.metadata.provinces,
          ...response.data.metadata.districts,
        ]);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      }
    };

    fetchSearch(destination);
  }, [destination]);

  const onSearch = (searchTerm, code) => {
    setDestination(searchTerm);
    setCodeDestination(code);
  };

  const onChange = (e) => {
    setDestination(e.target.value);
    const newCodeDestination = getCode(
      search.find(
        (item) => item.name_en.toLowerCase() === e.target.value.toLowerCase()
      ) || {}
    );
    setCodeDestination(newCodeDestination);
  };

  const handleSearch = async () => {
    const startDate = format(date[0].startDate, "MM/dd/yyyy");
    const endDate = format(date[0].endDate, "MM/dd/yyyy");

    try {
      const response = await axios.get(
        `http://localhost:3030/v2/api/search/place?query=${destination}`
      );

      const searchData = {
        destination: destination,
        code: code_destination,
        daystart: startDate,
        dayend: endDate,
        quantity: options.quantity,
        room: options.room,
      };

      const postResponse = await axios.post(
        "http://localhost:3030/v2/api/test/post-method",
        searchData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (postResponse.status === 200) {
        console.log("Data sent successfully", searchData);
        navigate("/hotels", {
          state: {
            destination,
            date,
            options,
            code_destination,
            startDate,
            endDate,
          },
        });
      } else {
        console.error("Failed to send data to the server");
        alert("Tài khoản đã tồn tại");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //lấy code province nếu nó là district
  const getCode = (item) => {
    if (item.hasOwnProperty("province_code")) {
      return item.province_code;
    } else {
      return item.code;
    }
  };

  //gui du lieu san home
  const sendData = () => {
    const startDate = format(date[0].startDate, "MM/dd/yyyy");
    const endDate = format(date[0].endDate, "MM/dd/yyyy");
    const data = {
      destination: destination,
      daystart: startDate,
      dayend: endDate,
      options: options,
      code: code_destination,
      date: date,
    };

    // Gọi hàm sendDataToHome nếu nó tồn tại
    if (typeof sendDataToHome === "function") {
      sendDataToHome(data);
    } else {
      console.error("sendDataToHome is not a function");
    }
  };

  useEffect(() => {
    sendData();
  }, [date, destination, options]);

  return (
    <div>
      {state ? (
        <>
          <div className="header2">
            <div
              className={
                type === "list" ? "headerContainer listMode" : "headerContainer"
              }
            >
              {type !== "list" && (
                <>
                  {" "}
                  <h1 className="headerTitle">Welcome</h1>
                  <p className="headerDesc">
                    Search low prices on hotels, homes and much more...
                  </p>
                  <div className="pd"></div>
                  <div className="headerSearch">
                    <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faBed} className="headerIcon" />
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="headerSearchInput"
                        onChange={(e) => onChange(e)}
                        value={destination}
                      />

                      <div className="dropdown-search">
                        {Array.isArray(search) &&
                          search
                            .filter((item) => {
                              const searchTerm = destination.toLowerCase();
                              const fullName = item.name_en.toLowerCase();
                              return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                              );
                            })
                            .map((item) => (
                              <div
                                onClick={() =>
                                  onSearch(item.name_en, getCode(item))
                                }
                                className="dropdown-row"
                                key={item.id}
                              >
                                {item.name_en}
                              </div>
                            ))}
                      </div>
                    </div>

                    <div className="headerSearchItem">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="headerIcon"
                      />
                      <span
                        onClick={() => setOpenDate(!openDate)}
                        className="headerSearchText"
                      >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                      )}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="date"
                          minDate={new Date()}
                        />
                      )}
                    </div>

                    <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                      <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="headerSearchText"
                      >{`${options.quantity} Quantity - ${options.room} room`}</span>
                      {openOptions && (
                        <div className="options">
                          <div className="optionsItem">
                            <span className="optionText">Quantity</span>
                            <div className="OptionCounter">
                              <button
                                disabled={options.quantity <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("quantity", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.quantity}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("quantity", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="optionsItem">
                            <span className="optionText">Room</span>
                            <div className="OptionCounter">
                              <button
                                disabled={options.room <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.room}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="headerSearchItem">
                      <button className="headerBtn" onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header">
            <div
              className={
                type === "list" ? "headerContainer listMode" : "headerContainer"
              }
            >
              {type !== "list" && (
                <>
                  <h1 className="headerTitle">Find your next stay</h1>
                  <p className="headerDesc">
                    Search low prices on hotels, homes and much more...
                  </p>
                  <button onClick={handleLogin} className="headerBtn">
                    Sign in / Register
                  </button>

                  <div className="headerSearch">
                    <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faBed} className="headerIcon" />
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="headerSearchInput"
                        onChange={(e) => onChange(e)}
                        value={destination}
                      />

                      <div className="dropdown-search">
                        {Array.isArray(search) &&
                          search
                            .filter((item) => {
                              const searchTerm = destination.toLowerCase();
                              const fullName = item.name_en.toLowerCase();
                              return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                              );
                            })
                            .map((item) => (
                              <div
                                onClick={() =>
                                  onSearch(item.name_en, getCode(item))
                                }
                                className="dropdown-row"
                                key={item.id}
                              >
                                {item.name_en}
                              </div>
                            ))}
                      </div>
                    </div>

                    <div className="headerSearchItem">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="headerIcon"
                      />
                      <span
                        onClick={() => setOpenDate(!openDate)}
                        className="headerSearchText"
                      >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                      )}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="date"
                          minDate={new Date()}
                        />
                      )}
                    </div>

                    <div className="headerSearchItem">
                      <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                      <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="headerSearchText"
                      >{`${options.quantity} Quantity -${options.room} room`}</span>
                      {openOptions && (
                        <div className="options">
                          <div className="optionsItem">
                            <span className="optionText">Quantity</span>
                            <div className="OptionCounter">
                              <button
                                disabled={options.quantity <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("quantity", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.quantity}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("quantity", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="optionsItem">
                            <span className="optionText">Room</span>
                            <div className="OptionCounter">
                              <button
                                disabled={options.room <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.room}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="headerSearchItem">
                      <button className="headerBtn" onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
