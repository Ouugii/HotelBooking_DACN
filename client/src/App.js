import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/list/List";
import Login from "./pages/Access/login";
import Register from "./pages/Access/register";
import Admin from "./pages/Admin/admin";
import Hotels from "./pages/hotel/Hotel";
import HotelManage from "./pages/HotelManage/hotelManage";
import Registerhotels from "./pages/Access/registerHotels";
import AboutUs from "./components/aboutUs/AboutUs";
import Createpost from "./pages/HotelManage/CreatePost";
import Dashboard from "./pages/HotelManage/Dashboard";
import Room from "./pages/HotelManage/Room";
import Profile from "./pages/HotelManage/profile";
import Ordered from "./pages/HotelManage/Ordered";
import Profile_ht from "./pages/HotelManage/Profile_ht";
import Test from "./pages/test";
import User from "./pages/User/User";
import Business from "./components/business/BusinessPost";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotels />} />
          <Route path="/lg" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerHotels" element={<Registerhotels />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/test" element={<Test />} />
          <Route path="/User/order" element={<User />} />
          <Route path="/Business" element={<Business />} />
          {/* hotel manager */}
          <Route path="/hotel-manage/*" element={<HotelManage />}>
            <Route path="create-post" element={<Createpost />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Room" element={<Room />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Ordered" element={<Ordered />} />
            <Route path="Profile_ht" element={<Profile_ht />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
