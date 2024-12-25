import React from "react";
import "./css/dashboard.css";
import DashboardList from "./API clone/DashboardList";
import UserUpcoming from "./API clone/UserUpcoming";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="Dashboard-Container">
      <div className="Dashboard-content-left">
        {/* list */}
        <div className="Db-title">
          <h1>statistical</h1>
        </div>
        <div className="db-List">
          {DashboardList.map((item) => {
            return (
              <div className="dashBoard-list" key={item.id}>
                <div className="dashBoard-list-item">
                  <div className="Dli-u">
                    <span className="Dli-Title">{item.text}</span>
                    <span className="Dli-time">Yearly</span>
                  </div>
                  <div className="Dli-d">
                    <h1 className="DliAmount">{item.amount}</h1>
                    <div className="style-rate">
                      <div className="rate">
                        <div className="icon">{item.icon}</div>
                        <span>{item.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* main */}
        <div className="Db-title">
          <h1>Main street resort</h1>
        </div>
        <div className="bd-main">
          <div className="bd-mainContent">
            <div className="main-Title">Virtual Tour</div>
            <div className="main-img">
              <img
                src="https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/032/765/original/e3db2ea50bdf781d6821f98428a31b87/article-england-york-shambles.jpg"
                alt=""
                className="main-Img"
              />
            </div>
            <div className="main-Title">Description</div>
            <p className="main-desc">
              Where the Chesapeake Bay meets the Atlantic Ocean, you’ll find the
              vibrant and bustling coastal city of Virginia Beach. A popular...
            </p>
            <Link>Detail</Link>
          </div>
          <div className="bd-mainContent">
            <div className="main-Title">Virtual Tour</div>
            <div className="main-img">
              <img
                src="https://global-uploads.webflow.com/5e93226606600f15bcd785e2/63a6024280602e86851eced2_jessica-pamp-XiHRIiwq2jY-unsplash-2.jpg"
                alt=""
                className="main-Img"
              />
            </div>
            <div className="main-Title">Description</div>
            <p className="main-desc">
              The Swedish countryside is dotted with thousands of lakes,
              freshwater streams, mountains and rolling hills. Starting up
              north...
            </p>
            <Link>Detail</Link>
          </div>
          <div className="bd-mainContent">
            <div className="main-Title">Virtual Tour</div>
            <div className="main-img">
              <img
                src="https://i0.wp.com/cms.babbel.news/wp-content/uploads/2018/07/Refresh_French_CanadianFrench.png?resize=640%2C360"
                alt=""
                className="main-Img"
              />
            </div>
            <div className="main-Title">Description</div>
            <p className="main-desc">
              Where the Chesapeake Bay meets the Atlantic Ocean, you’ll find the
              vibrant and bustling coastal city of Virginia Beach. A popular...
            </p>
            <Link>Detail</Link>
          </div>
        </div>
      </div>

      {/* right content */}
      <div className="Dashboard-content-right">
        <div className="Db-title">
          <h1>Upcoming Visitors</h1>
        </div>
        {/* user info */}
        <div className="Db-container">
          {UserUpcoming.map((user) => {
            return (
              <div className="Db-visitor" key={user.id}>
                <div className="Visitor">
                  <img
                    src={user.image_user}
                    alt="User Avatar"
                    className="userImg"
                  />
                  <div className="Visitor-n">
                    <span className="Visitor-Name">{user.Name}</span>
                    <span className="Upcoming-date">{user.UpCm}</span>
                  </div>
                </div>
                <div className="Vst-Detail">
                  <Link className="Vst-Detail-L">Details</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
