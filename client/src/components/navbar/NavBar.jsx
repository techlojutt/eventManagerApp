import React from 'react'
import { NavLink,Link, useNavigate } from 'react-router';
import { SiEventstore } from "react-icons/si";


function NavBar() {
  const navigate = useNavigate()

 const handleLogout = (e)=>{
   localStorage.removeItem('token')
   navigate('/login')
   
 }
  return (
 
<nav style={{color:'red'}} className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/"  className="navbar-brand" >
        <SiEventstore size={50} color='#009184' style={{
          marginRight: 10,
          marginLeft: 10
        }} />
          Event Manager
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" style={({isActive})=>({borderBottom: isActive ? "2px solid black":""})} className="nav-link" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/createevent" style={({isActive})=>({borderBottom: isActive ? "2px solid black":""})} className="nav-link" aria-current="page">
            Create Event
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" style={({isActive})=>({borderBottom: isActive ? "2px solid black":""})} className="nav-link" >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
           
        <div className="d-flex align-items-center">
      <button
        className="btn btn-danger btn-sm"
        onClick={handleLogout}
        style={{ marginLeft: "10px" }} // Adds a small gap if needed
      >
        Logout
      </button>
    </div>
          
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default NavBar;