import React from "react";
import { firestore } from "../../Firebase";
import { collection, orderBy } from "firebase/firestore";
import "./FoodBoard.css";
import FoodCard from "../FoodCard/FoodCard";
import { query, getDocs } from "firebase/firestore";

const FoodBoard = () => {
  const [cards, setCards] = React.useState([]);

  const fetchPosts = async () => {
    await getDocs(query(collection(firestore, "posts"), orderBy("date")))
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCards(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  cards.sort(function (a, b) {
    return a.claimed > b.claimed ? 1 : -1;
  });

  return (
    <div>
      <h2 className="foodboard__title">FoodBoard</h2>
      <ul className="food-card-list__container">
        {cards.map((card, i) => (
          <FoodCard card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default FoodBoard;
