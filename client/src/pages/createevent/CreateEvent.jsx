import{React,useState }from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createEvent } from '../../store/slices/eventSlice'
import { optionValuesOfCategories } from '../../constants/constants'


function CreateEvents() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState('')
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [visibility, setVisibility] = useState("")
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()

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

    setTitle(""),
    setDescription(""),
    setImage(null),
    setCategory(""),
    setLocation(""),
    setVisibility("")
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
            <option value="music">Music</option>
           { optionValuesOfCategories?.map((category,index) => {
            return <option key={index} value={category}>{category}</option>
            })}
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Upload Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </div>
    </form>
  </div>
  </div>
  )
}

export default CreateEvents