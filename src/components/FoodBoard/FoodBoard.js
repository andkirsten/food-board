import React from "react";
import { firestore } from "../../Firebase";
import { collection } from "firebase/firestore";
import "./FoodBoard.css";
import FoodCard from "../FoodCard/FoodCard";
import savedCards from "../../data";
import { getDocs } from "firebase/firestore";

const FoodBoard = () => {
  const [cards, setCards] = React.useState(savedCards);

  const fetchPosts = async () => {
    await getDocs(collection(firestore, "posts"))
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCards(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

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
