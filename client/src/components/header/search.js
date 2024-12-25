import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSearch = (destination) => {
  const [search, setSearch] = useState([]);

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

    if (destination) {
      fetchSearch(destination);
    }
  }, [destination]);

  return search;
};

export default useFetchSearch;
