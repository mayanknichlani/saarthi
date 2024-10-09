import React, { useRef, useEffect } from "react";
import "./Dashboard.css"
import Header from "../Essentials/Header";
import Card from "./Card/Card";
import Footer from "../Essentials/Footer";
import services from "./care.json";  // Importing the care.json file

import video from "../../assets/1114523_Arab-man_Man_3840x2160.mp4";
import cardImg from "../../assets/img/healthCare.jpg";
import whyUsImg from '../../assets/img/whyUs.jpg';
import seniorCitizen from '../../assets/img/seniorCitizen.png';
import search from '../../assets/img/search.png';
import planning from '../../assets/img/planning.png';
import companion from '../../assets/img/companion.png';
import followUp from '../../assets/img/followUp.png';

export default function Dashboard() {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="videoContainer">
        <h1 id="tag">Find true companionship that enriches every moment of life.</h1>
        <video ref={videoRef} src={video} autoPlay muted loop />
      </div>

      <div className="categoryCards p-3">
        <h2 className="my-4">Catering to the needs of every parent.</h2>
        <div className="container">
          <div className="row">
            {services.services.slice(0, 3).map((service, index) => (
              <div className="col" key={index}>
                <Card 
                  img={service.img === "cardImg" ? cardImg : service.img} 
                  title={service.title} 
                  content={service.content} 
                />
              </div>
            ))}
          </div>

          <div className="row">
            {services.services.slice(3, 6).map((service, index) => (
              <div className="col" key={index}>
                <Card 
                  img={service.img === "cardImg" ? cardImg : service.img} 
                  title={service.title} 
                  content={service.content} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="benfits container d-flex p-3">
        <div className="left">
          <h2 className="mt-4 pt-3">Why us ?</h2>
          <p className="mt-4">
            In today's world, many people live far from their loved ones due to personal or professional commitments, leaving them with limited time to care for elderly family members.
            This makes it challenging to ensure that the health and daily needs of seniors are met.
            Elders often require constant nursing care, supervision, and companionship, especially when local family support is not available.
            We help you and your loved ones find the perfect "Saarthi" for you.
          </p>
        </div>

        <div className="right d-flex justify-content-end">
          <img src={whyUsImg} alt="Why Us" />
        </div>
      </div>

      <div className="process p-4">
        <h2 className="mt-3 mb-4" style={{color: '#7C9D96'}}>
          <span style={{color: '#E9B384'}}>Elderly</span> Care Process
        </h2>
        <div className="d-flex justify-content-center mt-4 py-2">
          {[{
            img: seniorCitizen, label: 'Senior Citizen', step: 1
          }, {
            img: search, label: 'Search', step: 2
          }, {
            img: planning, label: 'Planning', step: 3
          }, {
            img: companion, label: 'Companionize', step: 4
          }, {
            img: followUp, label: 'Follow Up', step: 5
          }].map((process, index) => (
            <div key={index}>
              <div className="circle mx-5 p-3 ps-4">
                <img src={process.img} alt={process.label} />
                <h1>{process.step}</h1>
              </div>
              <h5 className="mt-3">{process.label}</h5>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
