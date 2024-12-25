import Navbars from "../navbar/navBar";
import "./buss.css";
import Header from "../../components/header/Header";
import MailList from "../mailList/Mail.List";
import Footer from "../footer/Footer";
const Business = () => {
  return (
    <div>
      <Navbars />
      <Header type="list" />
      <div className="homeContainer">
        <div style={{ position: "relative" }}>
          <div className="busL">
            <ul>
              <li>Về MidmoonBooking.com™</li>
              <li>legal</li>
              <li>Digital Services Act</li>
              <li>Terms & Conditions</li>
              <li>How We Work</li>
              <li>Offices Worldwide</li>
              <li>Contact Us</li>
              <li>Press Center</li>
              <li>Career Opportunities</li>
              <li>Sustainability</li>
              <li>Add Your Property</li>
              <li>Extranet Log-in</li>
              <li>Supplier Code of Conduct</li>
              <li>Become an Affiliate</li>
            </ul>
          </div>
          <div>
            <h1 className="homeTitle">Start Business with us</h1>
            <p className="homeDecrip">
              Have a hotel travel business website that you want to promote? You
              may have to focus on using effective promotional strategies. The
              basics of promoting any website are still the same. You promote
              the website so you can generate more income. Hotel and travel
              businesses are competitive niche markets and so you need to take
              additional attention to get good search engine ranking and
              traffic.
            </p>
            <p className="homeDecrip">
              To beat competitions in hospitality and travelling services you
              need to follow some steps like competitor's websites analysis.
              After completing the website audit, start work accordingly. Update
              websites on a regular basis because in these niche markets there
              can be many options to get updates. For example: Birthday /
              marriage / anniversary etc. party in the hotel or any foreign or
              domestic group staying in the hotel, so you can write about it in
              brief and can add it to the blog or event section of the website.
              Same like in tour travel you can update websites with new pictures
              and destinations on a regular basis.
            </p>
            <p className="homeDecrip">
              People also promote their hotel travel business websites so they
              can target more potential leads. You should always get started by
              looking around for cost-effective promotional strategies and
              strategies.
            </p>
            <ul className="homeDecrip" style={{ listStyleType: "disc" }}>
              <li>The hotel travel industry is highly competitive</li>
              <li>
                If your strategies are not effective then it can be an expensive
                mistake
              </li>
              <li>You have to focus on both long and short term goals</li>
            </ul>

            <p className="homeDecrip">
              The best option would be to get involved with the best SEO team. A
              professional digital marketing team can help in selecting the
              right strategy to{" "}
              <span style={{ fontWeight: "600" }}>
                promote your hotel / travel website online.
              </span>
            </p>
            <p className="homeDecrip">
              A professional digital marketing team may not be advisable to
              over-invest in the promotional campaign. They will keep guiding
              you in the right direction so you can effectively promote your
              hotel business and / or travel website. In the case of online
              marketing not only digital marketing affects business status,
              there are many other factors like website designing, user
              experience (UX), structures etc. and if you are choosing any
              professional team for SEO link building services then they will
              advise you for all these factors.
            </p>
            <p>
              There are other tips and tricks as well that you can follow. These
              are listed below as points,
            </p>

            <div>
              <h1 className="homeTitle">1. Open the register for hotel page</h1>
              <div style={{ maxWidth: "1024px" }}>
                <img src="/IMG/Home/register.png" alt="" />
              </div>
              <ul className="homeDecrip" style={{ listStyleType: "disc" }}>
                <li>
                  following the Router{" "}
                  <span style={{ fontWeight: "600" }}>'/registerHotels'</span>
                </li>
                <li>
                  Enter your Email and password{" "}
                  <span style={{ color: "red" }}>(Require)</span>
                </li>
                <li>Give more information about your hotel</li>
                <li>Enter</li>
              </ul>
            </div>

            <div>
              <h1 className="homeTitle">
                2. Login to admin system admin by your account
              </h1>
              <p className="homeDecrip">
                This is the interface of your hotel admin screen,following the
                step
              </p>
              <div style={{ maxWidth: "1024px" }}>
                <img src="/IMG/Home/hotelAdmin.png" alt="" />
              </div>
              <p
                className="homeDecrip"
                style={{ color: "red", fontWeight: "600" }}
              >
                You need to create a room and post images of the hotel so that
                the hotel can be displayed on the user's page
              </p>
              <ul className="homeDecrip" style={{ listStyleType: "disc" }}>
                <li>Enter the Room page and create room for your hotel</li>
                <li>
                  Enter the Order page to check all your order, you can add room
                  for the order or cancel it
                </li>
                <li>
                  Enter the Profile Hotel, you can add more information for your
                  hotel and upload Images for your hotel
                </li>
              </ul>
              <div style={{ maxWidth: "1024px" }}>
                <img src="/IMG/Home/profileHotel.png" alt="" />
              </div>
            </div>

            <div style={{ paddingTop: "10px" }}>
              <h1 className="homeTitle">
                3. Now your hotel is ready for Business
              </h1>
              <div style={{ maxWidth: "1024px" }}>
                <img src="/IMG/Home/ready.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};
export default Business;
