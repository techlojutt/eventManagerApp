import React from 'react'
import { Link } from 'react-router'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        {/* Quick Links Section */}
        <div className='footer-section'>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to='/events'>Events</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/policy'>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className='footer-section'>
          <h5>Contact Us</h5>
          <p>Email: info@eventmanager.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Event Street, City, Country</p>
        </div>

        {/* Social Media Section */}
        <div className='footer-section'>
          <h5>Follow Us</h5>
          <div className='social-links'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Event Manager. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer