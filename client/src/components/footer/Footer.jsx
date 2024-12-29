import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
   <div className='footer'>
      <h4 className='text-center'>
        All Right Reserved &copy; Techlojutt
      </h4>
      <p className='text-center mt-3'> 
        <Link to='/policy' >Policy</Link>
      </p>
   </div>
  )
}

export default Footer