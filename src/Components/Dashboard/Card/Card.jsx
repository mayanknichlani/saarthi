import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card(props){
    return (
        <div className="card p-3 m-3 d-flex flex-column align-items-center">
            <img src={props.img} style={{height: '12rem'}} className="" />
            <h4 className="mt-4">{props.title}</h4>
            <p style={{textAlign: 'justify'}} className="my-3">{props.content}</p>
            <Link key={props.title} to={`/care/${props.title}`}><button className="btn my-3">More Info</button></Link>
        </div>
    );
}