import React from "react";
import "./FoodBoard.css";
import FoodCard from "../FoodCard/FoodCard";
import savedCards from "../../data";

const FoodBoard = () => {
  const [cards, setCards] = React.useState(savedCards);

  return (
    <div>
      <h2>FoodBoard</h2>
      <ul className="food-card-list__container">
        {cards.map((card, i) => (
          <FoodCard card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default FoodBoard;
