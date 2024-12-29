import {React,useState} from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../store/slices/authSlice'
import { Link } from 'react-router'


function Register() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [image,setImage]=useState('')
    const dispatch=useDispatch()

    const handleSubmit=(e)=>{

      // Add a check to ensure the image is in a valid format before uploading it.

      // For the purpose of this demo, we'll just check if the image is a JPEG or PNG file.

      

        e.preventDefault()
        console.log(image,"submit")
       let user={
        name,email,password,image}
        
        console.log(user.image,'user')
        dispatch(registerUser(user))
        setName('')
        setEmail('')
        setPassword('')
        setImage('')
    }
  return (
    

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      }}
    >
      <div className="signup-container p-4 bg-white rounded shadow">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-center mb-4 text-primary">Sign Up</h2>

          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Profile Picture Field */}
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>

  )
}

export default Register