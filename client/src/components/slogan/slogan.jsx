import "./slogan.css"

const Slogan = () => {
    return (
        <div className="slogan">
            <div className="slItem">
                <img src="/IMG/Home/sl1.jpg" alt="" className="slImg" />
                <div className="slCont">
                <h1 className="slName">No hidden fees</h1>
                <h2 className="slDesc">The price you see is the price you pay</h2>
                </div>
            </div>

            <div className="slItem">
                <img src="/IMG/Home/sl2.jpg" alt="" className="slImg" />
                <div className="slCont">
                <h1 className="slName">Instant confirmation</h1>
                <h2 className="slDesc">Most stays can be booked instantly</h2>
            </div></div>

            <div className="slItem">
                <img src="/IMG/Home/sl3.jpg" alt="" className="slImg" />
                <div className="slCont">
                <h1 className="slName">Flexibility</h1>
                <h2 className="slDesc">Many properties offer free cancellation</h2>
            </div></div>
        </div>
    )
}

export default Slogan