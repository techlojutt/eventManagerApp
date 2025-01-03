import {React,useEffect }from 'react'
import { FaEdit, FaTrashAlt,FaMapMarkerAlt } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import {useNavigate} from 'react-router';
import { fetchEvents,deleteEvent,userRsvpRequest,updateEventById} from '../../store/slices/eventSlice';

function EventCard() {
  const user = useSelector((store) => store.authSlice.user);
  const events = useSelector((store) => store.eventSlice.events);
  const loading = useSelector((store) => store.eventSlice.loading);
  const error = useSelector((store) => store.eventSlice.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventsData = events
  const userId = user.data.id

  useEffect(() =>{
    if(eventsData.length === 0){
      dispatch(fetchEvents())
    }
  },[])

  const onClickDeleteHandler = (eventId)=>{
    dispatch(deleteEvent(eventId))
  }

  const rsvpClickHandler = (eventId)=>{
    const rsvpIds = {
      eventId: eventId,
      userId: userId
    }
    dispatch(userRsvpRequest(rsvpIds))
  }

  const onClickUpdateHandler = (eventId)=>{
    dispatch(updateEventById(eventId))
    navigate('/createevent')
  }

  return (
    <div className="container mt-4 mb-5">
      {loading? 
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div> 
      :  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {eventsData && eventsData?.map((event) => (
            <div className="col" key={event._id}>
              <div className="card p-4 shadow-sm">
                <img
                  src={event.image}
                  className="card-img-top"
                  alt="Event Image"
                />
                <div className="card-body">
                  <h2 className="h5 card-title font-weight-bold">
                    {event.title}
                  </h2>
                  <p className="card-text">Date: {moment(event.createdAt).format("MMMM Do, YYYY")}</p>
                  <h6 className="card-text">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    Location: &nbsp;
                    <a style={{textDecoration: "none", color:"inherit"}}
                      onMouseOver={(e) => (e.target.style.color = "red")}
                      onMouseOut = {(e) => (e.target.style.color = "blue")}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {event.location}
                    </a>
                  </h6>
                  <p className="card-text">RSVPs: {event.rsvpCount}</p>
                  {
                    event.createdBy===userId?null:
                    <button className="btn btn-success mt-4"
                      onClick={()=>rsvpClickHandler(event._id)}
                    >RSVP</button>
                  }
                  {event.createdBy===userId?
                    <div className="mt-3 d-flex justify-content-end">
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={()=>onClickUpdateHandler(event._id)}
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={()=>onClickDeleteHandler(event._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>:null
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default EventCard