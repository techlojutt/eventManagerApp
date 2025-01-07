import React from 'react'
import { Link } from 'react-router'
import './PageNotFound.css'

function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="home-button">
        Go Back Home
      </Link>
    </div>
  )
}

export default PageNotFound