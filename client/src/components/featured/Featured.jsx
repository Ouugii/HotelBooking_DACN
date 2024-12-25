import "./featured.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLocationDot,
  faCamera,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
const Featured = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleOpen4 = () => {
    setOpen4(true);
  };
  return (
    <div>
      {open && (
        <div className="Featured-popUp" onClick={() => setOpen(false)}>
          <div
            className="FeaturedWrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="FeaturedWrapper-L">
              <img
                className="FeaturedWrapper-L-img"
                src="/IMG/Home/DalatMt.jpg"
                alt=""
              />
            </div>
            <div className="FeaturedWrapper-R">
              <div className="FeaturedWrapper-R-content">
                <h1>DaLat - VietNam</h1>
                <p>
                  Highlights in Dalat <FontAwesomeIcon icon={faLocationDot} />
                </p>
                <div className="FeaturedWrapper-R-highlight">
                  <span>
                    Dalat, also known as Da Lat, is a beautiful city located in
                    the Central Highlands of Vietnam. Known for its cool
                    climate, stunning landscapes, and colonial architecture,
                    Dalat offers a variety of attractions and activities for
                    visitors. Here are some highlights you should not miss when
                    visiting Dalat: <br></br>
                    <span style={{ fontWeight: "600" }}>
                      1. Xuan Huong Lake{" "}
                    </span>
                    <br></br> Xuan Huong Lake is a large, tranquil lake located
                    in the heart of Dalat. It's a popular spot for walking,
                    jogging, or simply relaxing. You can rent a paddleboat to
                    explore the lake or enjoy a coffee at one of the nearby
                    cafes.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      2. Crazy House (Hang Nga Guesthouse){" "}
                    </span>
                    <br></br> The Crazy House is an unconventional building
                    designed by Vietnamese architect Dang Viet Nga. Its
                    whimsical, maze-like structure is reminiscent of Gaudi's
                    architecture in Barcelona and is a must-see for its unique
                    and bizarre design.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      3. Dalat Flower Gardens
                    </span>
                    <br></br> Known as the "City of Eternal Spring," Dalat is
                    famous for its flowers. The Dalat Flower Gardens showcase a
                    wide variety of blooms, including orchids, roses, and
                    hydrangeas. It's a beautiful place to take a stroll and
                    enjoy the colorful displays.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      4. Datanla Waterfall
                    </span>
                    <br></br> Datanla Waterfall is one of the most accessible
                    waterfalls near Dalat. Visitors can take a thrilling ride on
                    the alpine coaster to reach the falls or opt for a more
                    traditional hike. The waterfall is surrounded by lush
                    greenery, making it a picturesque spot.
                  </span>
                </div>
                <div className="FeaturedWrapper-R-share">
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faCamera} />
                  <FontAwesomeIcon icon={faShop} />
                </div>
                <div className="siRatingd">
                  <button>9.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {open1 && (
        <div className="Featured-popUp" onClick={() => setOpen1(false)}>
          <div
            className="FeaturedWrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="FeaturedWrapper-L">
              <img
                className="FeaturedWrapper-L-img"
                src="/IMG/Home/hochiminhmt.jpg"
                alt=""
              />
            </div>
            <div className="FeaturedWrapper-R">
              <div className="FeaturedWrapper-R-content">
                <h1>HoChiMinh-VietNam</h1>
                <p>
                  Highlights in HoChiMinh{" "}
                  <FontAwesomeIcon icon={faLocationDot} />
                </p>
                <div className="FeaturedWrapper-R-highlight">
                  <span>
                    Ho Chi Minh City, often referred to as Saigon, is a bustling
                    metropolis in Vietnam with a rich history, vibrant culture,
                    and numerous attractions. Here are some highlights you
                    shouldn't miss when visiting: <br></br>
                    <span style={{ fontWeight: "600" }}>
                      1.War Remnants Museum:{" "}
                    </span>
                    <br></br> Provides a sobering look at the Vietnam War from
                    the Vietnamese perspective. Exhibits include photographs,
                    military vehicles, and personal accounts of the war's
                    impact.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      2.Cu Chi Tunnels:{" "}
                    </span>
                    <br></br> An extensive network of underground tunnels used
                    by the Viet Cong during the Vietnam War. Visitors can
                    explore the tunnels and learn about the ingenious tactics
                    employed by the Viet Cong.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      3. Reunification Palace:
                    </span>
                    <br></br> Formerly the Presidential Palace of South Vietnam.
                    Famous for the tank crash through its gates, marking the end
                    of the Vietnam War in 1975. Visitors can tour the historic
                    rooms and underground bunkers.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      4. Notre-Dame Cathedral Basilica of Saigon:
                    </span>
                    <br></br> An impressive French colonial-era cathedral. Built
                    in the late 19th century, it stands as a testament to the
                    city's colonial heritage.
                  </span>
                </div>
                <div className="FeaturedWrapper-R-share">
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faCamera} />
                  <FontAwesomeIcon icon={faShop} />
                </div>
                <div className="siRatingd">
                  <button>9.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {open2 && (
        <div className="Featured-popUp" onClick={() => setOpen2(false)}>
          <div
            className="FeaturedWrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="FeaturedWrapper-L">
              <img
                className="FeaturedWrapper-L-img"
                src="/IMG/Home/hanoimt.jpg"
                alt=""
              />
            </div>
            <div className="FeaturedWrapper-R">
              <div className="FeaturedWrapper-R-content">
                <h1>Ha Noi - VietNam</h1>
                <p>
                  Highlights in Hanoi <FontAwesomeIcon icon={faLocationDot} />
                </p>
                <div className="FeaturedWrapper-R-highlight">
                  <span>
                    Hanoi, the capital of Vietnam, is a city rich in history,
                    culture, and unique attractions. Here are some highlights
                    you shouldn't miss when visiting Hanoi: <br></br>
                    <span style={{ fontWeight: "600" }}>
                      1.Ho Chi Minh Mausoleum:{" "}
                    </span>
                    <br></br> The final resting place of Vietnam's revolutionary
                    leader, Ho Chi Minh. A solemn and important site for
                    Vietnamese people, set in Ba Dinh Square.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      2.Hoa Lo Prison (Hanoi Hilton):{" "}
                    </span>
                    <br></br> A former French colonial prison used during the
                    Vietnam War to house American POWs. Now a museum detailing
                    its history and the resilience of its prisoners.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      3. Temple of Literature (Van Mieu):
                    </span>
                    <br></br> Vietnam’s first national university, dedicated to
                    Confucius. A beautiful example of traditional Vietnamese
                    architecture with serene courtyards and gardens.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      4. One Pillar Pagoda:
                    </span>
                    <br></br> An iconic Buddhist temple built on a single stone
                    pillar, resembling a lotus blossom. Originally constructed
                    in 1049, it’s one of Vietnam's most famous landmarks.
                  </span>
                </div>
                <div className="FeaturedWrapper-R-share">
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faCamera} />
                  <FontAwesomeIcon icon={faShop} />
                </div>
                <div className="siRatingd">
                  <button>9.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {open3 && (
        <div className="Featured-popUp" onClick={() => setOpen3(false)}>
          <div
            className="FeaturedWrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="FeaturedWrapper-L">
              <img
                className="FeaturedWrapper-L-img"
                src="/IMG/Home/danangmt.jpg"
                alt=""
              />
            </div>
            <div className="FeaturedWrapper-R">
              <div className="FeaturedWrapper-R-content">
                <h1>Da nang - VietNam</h1>
                <p>
                  Highlights in DaNang <FontAwesomeIcon icon={faLocationDot} />
                </p>
                <div className="FeaturedWrapper-R-highlight">
                  <span>
                    Da Nang, a coastal city in central Vietnam, is known for its
                    beautiful beaches, cultural landmarks, and modern
                    attractions. Here are some highlights you shouldn't miss
                    when visiting Da Nang: <br></br>
                    <span style={{ fontWeight: "600" }}>1.My Khe Beach: </span>
                    <br></br> One of the most famous beaches in Vietnam, known
                    for its white sand and clear blue water. Ideal for swimming,
                    sunbathing, and water sports.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      2.Marble Mountains:{" "}
                    </span>
                    <br></br> A cluster of five marble and limestone hills named
                    after the five elements (metal, water, wood, fire, and
                    earth). Features caves, tunnels, and Buddhist sanctuaries
                    that can be explored.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      3. Son Tra Peninsula (Monkey Mountain):
                    </span>
                    <br></br> A nature reserve home to the endangered
                    red-shanked douc langur. Offers stunning views, pristine
                    beaches, and the iconic Linh Ung Pagoda with its giant Lady
                    Buddha statue.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      4. Dragon Bridge (Cầu Rồng):
                    </span>
                    <br></br> A stunning bridge that spans the Han River,
                    designed to resemble a dragon. Features a nightly fire and
                    water show, where the dragon breathes fire and water.
                  </span>
                </div>
                <div className="FeaturedWrapper-R-share">
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faCamera} />
                  <FontAwesomeIcon icon={faShop} />
                </div>
                <div className="siRatingd">
                  <button>9.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {open4 && (
        <div className="Featured-popUp" onClick={() => setOpen4(false)}>
          <div
            className="FeaturedWrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="FeaturedWrapper-L">
              <img
                className="FeaturedWrapper-L-img"
                src="/IMG/Home/vungtaumt.jpg"
                alt=""
              />
            </div>
            <div className="FeaturedWrapper-R">
              <div className="FeaturedWrapper-R-content">
                <h1>Vung Tau - VietNam</h1>
                <p>
                  Highlights in VungTau <FontAwesomeIcon icon={faLocationDot} />
                </p>
                <div className="FeaturedWrapper-R-highlight">
                  <span>
                    Vung Tau, a coastal city in southern Vietnam, is known for
                    its beautiful beaches, scenic landscapes, and cultural
                    attractions. Here are some highlights you shouldn't miss
                    when visiting Vung Tau: <br></br>
                    <span style={{ fontWeight: "600" }}>
                      1.Front Beach (Bai Truoc):
                    </span>
                    <br></br> A popular spot for both locals and tourists, known
                    for its calm waters and scenic views. Lined with parks,
                    gardens, and a variety of restaurants and cafes.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      2.Back Beach (Bai Sau):{" "}
                    </span>
                    <br></br> The longest and most popular beach in Vung Tau,
                    famous for its fine sand and strong waves. A favorite
                    destination for swimming, sunbathing, and water sports.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      3. Pineapple Beach (Bai Dua):
                    </span>
                    <br></br> A smaller, quieter beach ideal for relaxation and
                    enjoying the peaceful surroundings. Known for its rocky
                    landscape and clear waters.
                    <br></br>
                    <span style={{ fontWeight: "600" }}>
                      4. Vung Tau Lighthouse:
                    </span>
                    <br></br> Located on Little Mountain (Nui Nho), this
                    historic lighthouse offers stunning views of Vung Tau and
                    the surrounding coastline. A great spot for photography and
                    enjoying the natural beauty.
                  </span>
                </div>
                <div className="FeaturedWrapper-R-share">
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faCamera} />
                  <FontAwesomeIcon icon={faShop} />
                </div>
                <div className="siRatingd">
                  <button>9.0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="featured">
          <div className="featuredItem" onClick={handleOpen}>
            <img src="/IMG/Home/dalat.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da Lat</h1>
            </div>
          </div>

          <div className="featuredItem" onClick={handleOpen1}>
            <img src="/IMG/Home/HoChiMinh.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>HoChiMinh City</h1>
            </div>
          </div>
        </div>

        <div className="featured2">
          <div className="featuredItem" onClick={handleOpen2}>
            <img src="/IMG/Home/Hanoi.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
            </div>
          </div>

          <div className="featuredItem" onClick={handleOpen3}>
            <img src="/IMG/Home/Danang.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da nang</h1>
            </div>
          </div>
          <div className="featuredItem" onClick={handleOpen4}>
            <img src="/IMG/Home/Vungtau.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Vung tau</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
