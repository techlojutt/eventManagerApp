import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';




function EventCard() {

  const events = useSelector((store) => store.eventSlice.events);
  console.log(events);

  useEffect(() =>{

    // Fetch events from API or Redux Store
    // Replace this with your API call or Redux state fetching logic

  },[])
  return (


    <div className="container mt-4">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div className="col">
        <div className="card p-4 shadow-sm">
          {/* Event Image */}
          <img src="" className="card-img-top" alt="Event Image" />

          {/* Card Body */}
          <div className="card-body">
            <h2 className="h5 card-title font-weight-bold">Tech Meetup</h2>
            <p className="card-text">Date: Jan 5, 2025</p>
            <p className="card-text">Location: Faisalabad</p>
            <p className="card-text">RSVPs: 20</p>

            {/* RSVP Button */}
            <button className="btn btn-success mt-4">RSVP</button>

            {/* Update and Delete Icons */}
            <div className="mt-3 d-flex justify-content-end">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => alert("Update functionality here")}
              >
                <FaEdit /> Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => alert("Delete functionality here")}
              >
           <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default EventCard