import "./searchItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [code_destination, setCodeDestination] = useState(
    location.state?.code_destination || ""
  );
  const [date, setDate] = useState(location.state?.date || {});
  const [options, setOptions] = useState(location.state?.options || {});
  const [room, setRoom] = useState(location.state?.options?.room || 1);

  const [openDate, setOpenDate] = useState(false);
  const [hotel, setHotel] = useState([]);

  const handleSearch = (hotelId) => {
    navigate(`/hotels/${hotelId}`, {
      state: { destination, date, options, code_destination },
    });
  };

  // Fetch data
  useEffect(() => {
    const fetchSearch = async (code_destination, room) => {
      try {
        const response = await axios.get(
          `http://localhost:3030/v2/api/hotel?code=${code_destination}&num_of_room=${room}`
        );

        setHotel(response.data.metadata.hotel);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      }
    };

    if (code_destination && room) {
      fetchSearch(code_destination, room);
    }
  }, [code_destination, room]);

  return (
    <div>
      {Array.isArray(hotel) &&
        hotel.map((item) => (
          <div className="searchItem" key={item._id}>
            <img
              src={item.HotelImages[0]?.image_url}
              alt=""
              className="siImg"
            />
            <div className="siDesc">
              <h1 className="siTitle" onClick={() => handleSearch(item._id)}>
                {item.hotel_name}
              </h1>
              <span className="siDistrict">
                {item.Ward.District.Province.full_name}
              </span>
              <span className="siDistance">0,6km from center</span>
              <span className="siSubtitle">
                Looking for hotels? Take a look at Oriental Central Hotel,
                Family-friendly hotel, staying here will help you explore
                Destroy Hanoi easily. You will enjoy the room with tv Flat
                screen, air conditioning and refrigerator, and you're sure will
                be connected to the internet during this time by Oriental
                Central Hotel offers guests free wifi. The hotel is still
                available offers a 24 hour front desk, room service and
                concierge guest. Furthermore, Oriental Central Hotel offers
                breakfast Relaxing moments to escape a busy day. With guests
                Paid public parking is available nearby.
              </span>
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>Excellent</span>
                <button>9.0</button>
              </div>
              <div className="siDetailTexts">
                <button
                  className="siCheckButton"
                  onClick={() => handleSearch(item._id)}
                >
                  See availabitity
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchItem;
