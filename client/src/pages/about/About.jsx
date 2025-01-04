import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Event Manager</h1>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Event Manager is designed to simplify the way you plan, organize, and
          manage events. Whether you're planning a corporate conference, wedding,
          or community gathering, we provide the tools you need to make your event
          a success.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Intuitive event planning and scheduling</li>
          <li>Guest list management and RSVP tracking</li>
          <li>Budget planning and expense tracking</li>
          <li>Vendor coordination tools</li>
          <li>Real-time collaboration features</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us</h2>
        <p>
          With years of experience in event management, our platform combines
          powerful features with ease of use. We understand the challenges event
          planners face and have built solutions that make event management
          effortless.
        </p>
      </section>

      <section className="about-section contact">
        <h2>Get in Touch</h2>
        <p>
          Have questions? We'd love to hear from you. Send us a message at{' '}
          <a href="mailto:contact@eventmanager.com">contact@eventmanager.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;
