import React, { useState } from 'react'
import EventCard from '../../components/eventcard/EventCard'
import './home.css'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="arts">Arts</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      
      <EventCard 
        searchTerm={searchTerm}
        category={category}
      />
    </div>
  )
}

export default Home