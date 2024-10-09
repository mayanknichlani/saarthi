import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store/user";
import { useDispatch } from "react-redux";

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = () => {
    dispatch(userActions.handleCardClicked({currNurseName : props.name , currNurseAddress : props.bio.Address , currNurseDegree : props.degree}));
    navigate(`/care/${props.type}/${props.id}`);
  }

  return (
    <div className="profile-card p-4 my-3" onClick={handleClick}>
      <img src={props.img} alt="Nurse" className="nurse-photo mb-1" />
      <h2 className="mt-3">{props.name}</h2>
      <p className="mt-3" style={{textAlign: 'justify'}}> {props.bio} </p>
      <p>
        <strong>Experience:</strong> {props.experience}
      </p>
      <p>
        <strong>Gender:</strong> {props.gender}
      </p>
      <p>
        <strong>Location:</strong> {props.location}
      </p>
    </div>
  );
}
