import React from "react";
import "./FoodCard.css";

const FoodCard = (props) => {
  return (
    <li className="food-card">
      <img
        className="food-card__image"
        src={props.card.image}
        alt={props.card.title}
      />
      <div className="food-card__info-container">
        <div className="food-card__info">
          <p className="food-card__date">{props.card.date}</p>
          <p className="food-card__location">{props.card.location}</p>
        </div>
        <h3 className="food-card__title">{props.card.title}</h3>
        <p className="food-card__details">{props.card.details}</p>
      </div>
    </li>
  );
};

export default FoodCard;
