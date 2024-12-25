import "./buss.css";
import { useNavigate } from "react-router-dom";

const Buss = () => {
  const navigate = useNavigate();

  const handleBusiness = () => {
    navigate("/Business");
  };

  return (
    <div className="fp">
      <div className="bussCtn">
        <div className="buss1">
          <h3>The ultimate tool for business travel</h3>
          <p>
            MidmoonBooking.com for Business is an easy-to-use business travel
            platform, where you can book and manage trips for free.
          </p>
          <p>
            njoy exclusive business rates, earn loyalty points, and benefit from
            complimentary 24/7 support from leading travel management company
            CWT.
          </p>
          <button onClick={handleBusiness}> Explore now</button>
        </div>
        <div className="buss2">
          <img src="/IMG/Home/busines.png" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Buss;
