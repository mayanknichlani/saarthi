import React, { useState, useEffect } from 'react';
import nursePhoto from '../../../assets/img/WhatsApp Image 2024-09-29 at 22.08.00_c0accd57.jpg';
import './Nurse.css';
import Header from '../../Essentials/Header';
import Footer from '../../Essentials/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NurseProfile = () => {
  const [nurseData, setNurseData] = useState(null);
  const [error, setError] = useState(null);
  const { currNurseName, currNurseAddress, currNurseDegree } = useSelector(store => store.user);
  const navigate = useNavigate();
  const params = useParams(); 
  const nurseId = params.id  

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/service/${nurseId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNurseData(data);
      } catch (error) {
        console.error('Error fetching nurse data:', error);
        setError('Could not load nurse data. Please try again later.');
      }
    };

    fetchNurseData();
  }, [nurseId]);

  if (error) return <div>{error}</div>;
  if (!nurseData) return <div>Loading...</div>;

  function bookCompanion() {
    localStorage.setItem("nurseData", JSON.stringify(nurseData));
    navigate("/booking");
  }

  console.log(nurseData)

  return (
    <div>
      <Header />
      <hr className="mt-0" />
      <div className="container nurse-profile-container row p-2">
        <div className='nursePhoto col'>
          <img src={nursePhoto} alt="Nurse profile" />
        </div>
        <div className="nurse-info col">
          <h1>{nurseData.name}</h1>
          <p><strong>Address:</strong> {nurseData.address}</p>
          <p><strong>Degree:</strong> {nurseData.degree}</p>
          <div className="documents-section">
            <h2>Documents</h2>
            <ul>
              {Array.isArray(nurseData.documents) && nurseData.documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <h2>Previous Reviews</h2>
          <div className="reviews-section">
            {Array.isArray(nurseData.reviews) && nurseData.reviews.map((review) => (
              <div key={review.id} className="review">
                <strong>{review.reviewer}</strong>
                <p>{review.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <center>
        <button className='btn m-5 book-btn' onClick={bookCompanion}>Book companion</button>
      </center>
      <Footer />
    </div>
  );
};

export default NurseProfile;
