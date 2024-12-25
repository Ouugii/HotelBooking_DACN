import "./hotel.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/Mail.List";
import Footerr from "../../components/footer/Footer";
import React, { useState, useEffect } from "react";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import HotelRule from "./hotelRule/HotelRule";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
const Hotels = () => {
  const location = useLocation();
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const accessToken = state?.metadata.accessToken;

  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [price, setPrice] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);
  //lay gia tien cua phong cap nhat len form data
  const handleRoomSelection = (selectedPrice) => {
    setSelectedRoomPrice(selectedPrice);
  };

  //lay du lieu order
  const sendFormDataToAPI = async () => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    try {
      const numberOfDays = differenceInDays(endDate, startDate);
      const totalPrice = numberOfDays * selectedRoomPrice;

      const searchData = {
        id_hotel: hotel._id,
        start_day: format(startDate, "yyyy-MM-dd"),
        end_day: format(endDate, "yyyy-MM-dd"),
        total_price: totalPrice,
        total_room: options.room,
        total_person: options.quantity,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        "http://localhost:3030/v2/api/user/order/make-order",
        searchData,
        { headers }
      );

      console.log("Gui du lieu thanh cong:", response.data);
      alert("Đặt phòng thành công");
    } catch (error) {
      alert("Đăng nhập hoặc đăng ký trước khi đặt phòng");
      console.error("Error sending form data to API:", error);
    }
  };

  useEffect(() => {
    // Check if selectedRoomPrice is valid (not 0) before sending form data
    if (selectedRoomPrice !== 0) {
      sendFormDataToAPI();
    }
  }, [selectedRoomPrice]);

  //Lấy dữ liệu ks
  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/v2/api/hotel/detail/${id}`
        );
        setHotel(response.data.metadata.hotel);
        setPrice(response.data.metadata.avgPrice);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách sạn:", error);
      }
    };

    fetchHotelDetail(id);
  }, [id]);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const hotelImages = hotel.HotelImages
    ? hotel.HotelImages.slice(0, 6).map((image) => ({
        src: image.image_url,
        _id: image._id,
      }))
    : [];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  //js chuyen hinh qua lai
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div className="a">
      <Navbar />
      <Header type="list" />
      {Object.keys(hotel).length > 0 && (
        <div className="hotelContainer" key={hotel._id}>
          {open && (
            <div className="slider" onClick={() => setOpen(false)}>
              <FontAwesomeIcon
                icon={faXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faLeftLong}
                className="arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove("l");
                }}
              />
              <div className="sliderWrapper">
                <img
                  src={hotelImages[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faRightLong}
                className="arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove("r");
                }}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Book now!</button>
            <h1 className="hotelTitle">{hotel.hotel_name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.full_address}</span>
            </div>

            <div className="hotelImages">
              {hotelImages.map((photo, i) => (
                <div className="hotelImgWrapper" key={photo._id}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in heart</h1>
                <p className="hotelDesc">
                  Hotel welcomes guests with fresh orange juice cool and located
                  far from The Huc Bridge as well as the beautiful Hoan Kiem
                  Lake painting just 3 minutes walk. This elegant hotel delivers
                  24-hour front desk service and free WiFi in all areas. Located
                  in the heart of Hanoi's Old Quarter, the property is for sale
                  Just a 5-minute drive from historic attractions such as Ba
                  Dinh Square and President Ho Chi Minh Mausoleum. Airport Noi
                  Bai International is a 45-minute drive away.
                  <br></br>
                  <br></br>
                  Blending traditional décor with modern amenities Modern,
                  air-conditioned rooms come with cable TV flat screen, seating
                  area and electric kettle. Room The private bathroom comes with
                  free toiletries and a hairdryer. Guests can easily tour around
                  the area with Bicycle and car rental services. Office and desk
                  service Tour bookings are among the property's amenities.
                  Delivery service Airport pickup is also available for an
                  additional fee Convenient for guests.
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Highlights of the property</h1>
                <span>
                  Top locations: Highly rated by recent guests (8.9 points)
                </span>
                <span>Free private parking is available at this hotel</span>
                <button>Book now!</button>
              </div>
            </div>
            <div className="hotelUbility">
              <h1 style={{ fontSize: "15px" }}>Most popular amenities</h1>
              <div className="Ubility-content">
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquareParking}
                    style={{ color: "green" }}
                  />
                  <span style={{ fontWeight: "500", fontSize: "12px" }}>
                    Free parking
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faWifi} style={{ color: "green" }} />
                  <span style={{ fontWeight: "500", fontSize: "12px" }}>
                    Wifi free
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hotel-Available">
            <h1 style={{ fontSize: "25px", paddingTop: "10px" }}>Book room</h1>
            <div className="ht-table">
              <div className="table-Content-title">
                <span style={{ flex: "2" }}>Room detail</span>
                <span style={{ flex: "2", textAlign: "center" }}>
                  Type room
                </span>
                <span style={{ flex: "2", textAlign: "center" }}>Price</span>
                <span style={{ flex: "1" }}></span>
              </div>

              {price.map((price) => (
                <div key={price.type_name} className="table-Content">
                  <span style={{ flex: "2" }}>
                    {price.type_name === "VIP" && (
                      <>
                        <p style={{ color: "#0071c2", fontWeight: "500" }}>
                          Deluxe double bed in room with balcony
                        </p>
                        <p>an extra large double bed</p>
                      </>
                    )}
                    {price.type_name === "STD" && (
                      <>
                        <p style={{ color: "#0071c2", fontWeight: "500" }}>
                          Standard double room
                        </p>
                        <p>one double bed</p>
                      </>
                    )}
                  </span>
                  {/* Room type */}
                  <span
                    style={{
                      flex: "2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {price.type_name}
                  </span>
                  {/* Room price */}
                  <span
                    style={{
                      flex: "2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {price.avg_price} VNĐ
                  </span>
                  {/* Button to select room */}
                  <span
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        padding: "10px",
                        backgroundColor: "#0071c2",
                        color: "white",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRoomSelection(price.avg_price)}
                    >
                      Đặt ngay
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <HotelRule />

          <MailList />
          <Footerr />
        </div>
      )}
    </div>
  );
};

export default Hotels;
