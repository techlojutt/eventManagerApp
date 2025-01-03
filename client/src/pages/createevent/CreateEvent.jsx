import{React,useState,useEffect }from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createEvent,updateEvent,resetUpdateEventId } from '../../store/slices/eventSlice'
import { optionValuesOfCategories } from '../../constants/constants'



function CreateEvents() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [visibility, setVisibility] = useState("")
  const dispatch = useDispatch()

  const updateEventById = useSelector((store) => store.eventSlice.updateEvents)
  if(updateEventById){
    console.log(updateEventById,"updateEventById");
  }
  // console.log(updateEventById._id,"updatedEventById");

  useEffect(() => {
    if (updateEventById) {
      setTitle(updateEventById.title)
      setDescription(updateEventById.description)
      setImage(updateEventById.image)
      setCategory(updateEventById.category)
      setLocation(updateEventById.location)
      setVisibility(updateEventById.visibility)
    }
    else {
      setTitle("")
      setDescription("")
      setImage("")
      setCategory("")
      setLocation("")
      setVisibility("")
    }



  }, [updateEvent])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if(updateEventById) {

    let updatedEvent = {
      title,
      description,
      image,
      category,
      location,
      visibility,
      id:updateEventById._id
    }
    dispatch(updateEvent(updatedEvent))
  }
   else{

    let event = {
      title,
      description,
      image,
      category,
      location,
      visibility, 
    }
    
    console.log(event)
    dispatch(createEvent(event))

   }



   setTitle(""),
   setDescription(""),
   setImage(""),
   setCategory(""),
   setLocation(""),
   setVisibility("")
   dispatch(resetUpdateEventId())

  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
  }

  
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5% 0% 5% 0%' }}>
    <div className="event-form-container p-5 bg-white rounded shadow-lg w-75">
    <h2 className="text-center text-primary mb-4">Create Event</h2>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Title and Location (Two Fields in One Row) */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Enter event description"
          required
        ></textarea>
      </div>

      {/* Visibility and Category (Two Fields in One Row) */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="visibility" className="form-label">
            Visibility
          </label>
          <select
            className="form-select"
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          >
            <option value="" disabled> Select a visibility</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
           { optionValuesOfCategories?.map((category,index) => {
            return <option key={index} value={category}>{category}</option>
            })}
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          {updateEventById?'Update':'Upload'} Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={handleImageChange}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          {updateEventById?'Update':'Create'} Event
        </button>
      </div>
    </form>
  </div>
  </div>
  )
}

export default CreateEvents