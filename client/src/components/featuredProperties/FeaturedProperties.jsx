import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  return (
    <div>
      <div className="fp">
        <div className="fpItem">
          <img src="/IMG/Home/new1.jpg" alt="" className="fpImg" />
          {/* <p className="overlay">
            Travel Back to the Regency Era With a Romantic High-Society Stay
            Inspired by the Upcoming Third Season of the Hit Series
          </p> */}
        </div>

        <div className="fpItem">
          <img src="/IMG/Home/new2.jpg" alt="" className="fpImg" />
          <p className="overlay">
            Travel Back to the Regency Era With a Romantic High-Society Stay
            Inspired by the Upcoming Third Season of the Hit Series
          </p>
        </div>

        <div className="fpItem">
          <img src="/IMG/Home/new3.jpg" alt="" className="fpImg" />
          <p className="overlay">
            Latest MiddmoonBooking.com Sustainable Travel Data Reveals Ongoing
            Challenges for Consumers & Highlights a Heightened Opportunity for
            Cross-Industry Collaboration
          </p>
        </div>

        <div className="fpItem">
          <img src="/IMG/Home/new4.jpg" alt="" className="fpImg" />
          <p className="overlay">
            MiddmoonBooking.com Uncovers Family Travel Trends For Summer 2024
          </p>
        </div>
      </div>
      <div className="fp-d">
        <a>Explore more</a>
      </div>
    </div>
  );
};

export default FeaturedProperties;
