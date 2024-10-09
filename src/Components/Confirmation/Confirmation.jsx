import React, { useEffect, useState, useRef } from 'react';
import "./Confirmation.css";
import { useLocation } from 'react-router-dom';

import Header from '../Essentials/Header';
import Footer from '../Essentials/Footer'
;
export default function Confirmation() {
  const location = useLocation();
  const { address, patients } = location.state || {};

  const [startRemoval, setStartRemoval] = useState(false); // Track when to start fading out
  const [isRemoved, setIsRemoved] = useState(false); // Track when to completely remove the div
  const lowerDivRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger fade-out animation when lower div is in view
            setStartRemoval(true);

            // Wait for the animation to finish before removing the div from the DOM
            setTimeout(() => {
              setIsRemoved(true);
            }, 500); // Match this duration with the CSS animation time
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (lowerDivRef.current) {
      observer.observe(lowerDivRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (lowerDivRef.current) {
        observer.unobserve(lowerDivRef.current);
      }
    };
  }, []);

  if (!address || !patients) {
    return <div>No data available. Please go back and submit the form again.</div>;
  }

  return (
    <div>
      {/* Conditionally render with animation */}
      {!isRemoved && (
        <div className={`confirmation-container ${startRemoval ? 'fade-out' : ''}`}>
          <h1 className="confirmation-header">Congratulations on Your Booking!</h1>
          <p className="confirmation-message">The nurse will reach you shortly.</p>
        </div>
      )}

      <div className="confirmed" ref={lowerDivRef}>
      <Header/>
      <hr className="mt-0" />
        <center>
        <div className='p-3 detailsBox'>
        <h1 className="mb-3">Booking Details!</h1>
        <div className="receipt">
          <div className="address-info">
            <div className="patient-info">
              <h3>Patient Details</h3>
              {patients.map((patient, index) => (
                <div key={index} className="patient-details">
                  <h4>Patient {index + 1}</h4>
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Age:</strong> {patient.age}</p>
                  <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                </div>
              ))}
            </div>
            <h3>Address of the Patient</h3>
            <p><strong>Address:</strong> {address.address1}, {address.address2}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>State:</strong> {address.state}</p>
            <p><strong>Zip:</strong> {address.zip}</p>
          </div>
        </div>
        </div>
        </center>

        
        <Footer/>
      </div>
    </div>
  );
}
