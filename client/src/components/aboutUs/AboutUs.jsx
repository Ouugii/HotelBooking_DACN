import About from "../about/About";
import Header from "../header/Header";
import Navbars from "../navbar/navBar";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Navbars />
      <Header />
      <div className="homeContainer">
        <About />
        <div className="about-usCT" style={{ paddingTop: "30px" }}>
          <h1>Reach a unique global customer base</h1>
          <div className="HuloveRM">
            <div className="Ct_content">
              <h1>2/3</h1>
              <p>of vacation rental guests return to book with us again</p>
            </div>
            <div className="Ct_content">
              <h1>48%</h1>
              <p>
                of nights booked on Booking.com in 2022 were for international
                stays
              </p>
            </div>
            <div className="Ct_content">
              <h1>33%</h1>
              <p>
                of vacation rental customers are Genius loyalty level 2 or 3 who
                tend to spend more per booking
              </p>
            </div>
          </div>
        </div>
        <div className="about-usCT" style={{ backgroundColor: "white" }}>
          <div
            className="HuloveRM"
            style={{
              padding: "40px 10px 40px 0px",
              border: "black 1px solid",
              borderRadius: "5px",
            }}
          >
            <div className="ABct-right">
              <img
                src="/IMG/Home/smile.png"
                alt=""
                className="ABCT-right-img"
              />
            </div>
            <div className="ABct-left">
              <h1>Get quality bookings quickly</h1>
              <ul>
                <li>
                  Your review scores on other travel websites are converted and
                  displayed on your property page until you receive your first
                  Booking.com guest review
                </li>
                <li>
                  Stand out in search results with the "New to Booking.com"
                  label on your property
                </li>
                <li>
                  Our listing strength checklist helps you complete your
                  property set-up to attract more guests
                </li>
                <li>
                  Get discovered quickly with our innovative{" "}
                  <span style={{ color: "blue" }}>Quality Rating system</span>
                </li>
                <li>
                  Sell up to 30% more nights with the{" "}
                  <span style={{ color: "blue" }}>
                    Smart Flex Reservations program
                  </span>
                  , which adds flexibility to some of your existing cancellation
                  policies to attract more guests. If a guest cancels, we’ll
                  look for a replacement
                </li>
              </ul>
            </div>
          </div>

          <div className="HuloveRM" style={{ padding: "40px 0px 40px 0px" }}>
            <div className="ABct-left1">
              <h1>Start saving more on business travel</h1>
              <ul>
                <li>
                  Enjoy reduced business rates and earn loyalty points with your
                  favourite hotels, airlines and car rental companies
                </li>
                <li>
                  Access complimentary travel support from CWT via email or
                  phone, whenever you need it
                </li>
                <li>
                  Get up to 20% off standard rates with the Genius loyalty
                  programme
                </li>
                <li>Choose stays with a flexible cancellation policy</li>
              </ul>
            </div>
            <div className="ABct-right1">
              <img
                src="/IMG/Home/abou2.png"
                alt=""
                className="ABCT-right-img2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- */}
      <div className="imgbg">
        <img src="/IMG/Home/world.jpg" alt="" className="imgbg-img" />
      </div>
    </div>
  );
};

export default AboutUs;
