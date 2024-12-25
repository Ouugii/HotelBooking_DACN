import "./ofer.css";


const Offer = () => {
    return(
      <div className="container-fluid m-0 p-0 px-0 ">
        <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 left">
            <div className="adv-offer">
                <img className="offer-img" src="/IMG/Home/offer_l.jpg" alt="" />
                <div className="offer-content">
                    <h1 className="content-hd">Seize the moment</h1>
                    <p className="dsc">Save 15% or more when you book and stay before 1 October 2024</p>
                </div>
            </div>
            <div></div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 right">
            <div className="adv-offer">
                <img className="offer-img" src="/IMG/Home/offer_r.jpg" alt="" />
                <div className="offer-content">
                    <h1 className="content-hd">New year, new adventures</h1>
                    <p className="dsc">Save 15% or more when you book and stay before 1 April 2024</p>
                </div>
            </div>
            <div></div>
        </div>
        </div>
      </div>
    )
}

export default Offer