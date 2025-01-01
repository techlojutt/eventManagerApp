import {React,useEffect }from 'react'
import { FaEdit, FaTrashAlt,FaMapMarkerAlt } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchEvents } from '../../store/slices/eventSlice';





function EventCard() {

  const events = useSelector((store) => store.eventSlice.events);
  const loading = useSelector((store) => store.eventSlice.loading);
  const error = useSelector((store) => store.eventSlice.error);
  
  const dispatch = useDispatch();
  console.log(events,"event");

  console.log(events,"loading");

  const eventsData = events
  console.log(eventsData,"eventsData");



  
  

  useEffect(() =>{

   // Fetch events from API or Redux Store
    // Replace this with your API call or Redux state fetching logic

    if(eventsData.length === 0){
      dispatch(fetchEvents())
  }
},[])

  

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
       {/* Event Image */}
       <img
         src={event.image}
         className="card-img-top"
         alt="Event Image"
       />

       {/* Card Body */}
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
         <p className="card-text">RSVPs: {event.rsvps}</p>

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
 ))}
</div>


  
}

     
    </div>
  );
};


export default EventCard