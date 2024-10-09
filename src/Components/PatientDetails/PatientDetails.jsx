import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";
import "./PatientDetails.css"

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, patients } = location.state || {};

  const handleConfirm = () => {
    navigate("/confirmation", { state: { address, patients } });
  };

  if (!address || !patients) {
    return (
      <div>No data available. Please go back and submit the form again.</div>
    );
  }

  const nurseData = JSON.parse(localStorage.getItem("nurseData"));
  console.log(nurseData);

  return (
    <div>
      <Header />
      <hr className="mt-0" />
      <div className="d-flex conatiner p-2" style={{width: "100%"}}>
      <div className="p-3 detailsBox">
        <h1>Patient Details</h1>

        <h3>Address</h3>
        <p>
          {address.address1}, {address.address2}
        </p>
        <p>
          {address.city}, {address.state}, {address.zip}
        </p>

        <h3>Patients</h3>
        {patients.map((patient, index) => (
          <div key={index} role="region" aria-labelledby={`patient-${index}`}>
            <h4 id={`patient-${index}`}>Patient {index + 1}</h4>
            <p>
              <strong>Name:</strong> {patient.name}
            </p>
            <p>
              <strong>Age:</strong> {patient.age}
            </p>
            <p>
              <strong>Diagnosis:</strong> {patient.diagnosis}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 detailsBox">
        <h1>Nurse Details</h1>

        <h3>Name</h3>
        <p>
          {nurseData.name}
        </p>

        <h3>Degree</h3>
        <p>
          {nurseData.degree}
        </p>

        <h3>Documents</h3>
        <ul>
          {nurseData.documents.map((doc) => {
            <li>{doc}</li>
          })}
        </ul>
      </div>
      </div>

      <center>
      <button className="btn btn-primary mt-3 ms-3  " onClick={handleConfirm}>Confirm Booking</button>
      </center>
      
      <Footer />
    </div>
  );
};

PatientDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      address: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        address2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
      }),
      patients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          age: PropTypes.number.isRequired,
          diagnosis: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }),
};

export default PatientDetails;
