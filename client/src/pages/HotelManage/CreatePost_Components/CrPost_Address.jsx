import React, { useEffect } from "react";
import "../css/crPost_Address.css";
import SelectAddress from "./SelectAddress";
import {
  apiGetPublicDistrict,
  apiGetPublicProvince,
  apiGetPublicWard,
} from "../../redux/apiRequest";
import InputReadOnly from "./InputReadOnly";
const CrPost_Address = () => {
  const { useState } = require("react");
  const [stre, setStre] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    hotel_name: "",
    house_number: "",
    street_name: "",
    ward_code: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const provinceResponse = await apiGetPublicProvince();
      setStre(provinceResponse.data.metadata.province);
      console.log(provinceResponse);
      if (province) {
        const districtResponse = await apiGetPublicDistrict(province);
        setDistricts(districtResponse.data.metadata.district);
      }
    };

    fetchData();
  }, [province]);

  // DistrictAPI
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      try {
        if (province) {
          const response = await apiGetPublicDistrict(province);
          setDistricts(response.data.metadata.district);
        } else {
          setDistricts([]); // Clear districts if province is not selected
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchPublicDistrict();
  }, [province]);

  // DistrictWardAPI
  useEffect(() => {
    setWard(null);
    const fetchPublicDistrictWard = async () => {
      const response = await apiGetPublicWard(district);
      setWards(response.data.metadata.ward);
    };
    province && fetchPublicDistrictWard();
  }, [district]);

  // testLog
  console.log(province, district, ward);

  return (
    <div>
      <h2 className="Address_title">Địa chỉ cho thuê</h2>
      <div className="Address_Content">
        <div className="Address_sl">
          <SelectAddress
            value={province}
            setValue={setProvince}
            options={stre}
            label="Thành Phố / Tỉnh"
          />
          <SelectAddress
            value={district}
            setValue={setDistrict}
            options={districts}
            label="Quận / Huyện"
          />
          <SelectAddress
            value={ward}
            setValue={setWard}
            options={wards}
            label="Phường / Xã"
          />
        </div>
      </div>
    </div>
  );
};

export default CrPost_Address;
