import React from 'react';
import './Policy.css';

function Policy() {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Privacy Policy</h1>
      
      <section className="policy-section">
        <h2>1. Introduction</h2>
        <p>Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal information.</p>
      </section>

      <section className="policy-section">
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal information (name, email, contact details)</li>
          <li>Usage data and analytics</li>
          <li>Cookies and tracking information</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Communicate with you about updates</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="contact-info">email@example.com</p>
      </section>
    </div>
  );
}

export default Policy;