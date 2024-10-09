import React, { useEffect, useState } from "react";
import './Care.css';
import search from '../../assets/svg/search.svg';
import Card from "./Companion/Card";
import { Outlet, useParams, Link } from "react-router-dom";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";

export default function Care() {
    const params = useParams();
    const title = params.type;

    // State to store the fetched services
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch services from the API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/service`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data); // Assume the API returns an array of services
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <Header />
            <hr className="mt-0"/>
            <div className="p-4">
                <div className="topbar d-flex justify-content-between">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />
                        <button className="btn"><img src={search} alt="" /></button>
                    </div>

                    <button className="btn register-btn">
                        <Link key={title} to={`/register/${title}`}>Register Service</Link>
                    </button>
                </div>

                <div className="companions pt-2">
                    <h1 className="mb-4">{title}</h1>
                    <div className="list d-flex flex-wrap justify-content-around">
                        {loading && <p>Loading services...</p>}
                        {error && <p>{error}</p>}
                        {!loading && services.length === 0 && <p>No services available.</p>}
                        {!loading && services.map(service => (
                            <Card
                                key={service._id}
                                id={service._id}
                                img='https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?uid=R136664623&ga=GA1.1.2089377494.1724692086&semt=ais_hybrid'
                                name={service.name}
                                experience={`${service.degree}`} // Adjust as needed
                                bio={`Address: ${service.address}, ${service.city}, ${service.state}, ${service.zip}`} // Customize bio
                                gender='Not specified' // Update if gender is included in the service data
                                location={service.city} // Use city or other location data
                                type={title}
                            />
                        ))}
                    </div>
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
