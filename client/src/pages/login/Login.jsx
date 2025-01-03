import {React,useState} from 'react'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../store/slices/authSlice'
import { Link } from 'react-router'

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()

  const handleSubmit=(e)=>{

      e.preventDefault()
     let user={
      email , password}
      dispatch(loginUser(user))

      setEmail('')
      setPassword('')
  }
  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    }}
  >
    <div className="login-container p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 text-primary">Login</h2>

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

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        {/* Sign-up Link */}
        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register" className="text-primary">Sign up</Link>
        </p>
      </form>
    </div>
  </div>
  

  )
}

export default Login