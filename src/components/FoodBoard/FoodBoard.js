import React from "react";
import { firestore } from "../../Firebase";
import { collection, orderBy } from "firebase/firestore";
import "./FoodBoard.css";
import FoodCard from "../FoodCard/FoodCard";
import { query, getDocs } from "firebase/firestore";

const FoodBoard = () => {
  const [cards, setCards] = React.useState([]);
  const [originalCards, setOriginalCards] = React.useState([]);

  const fetchPosts = async () => {
    await getDocs(query(collection(firestore, "posts"), orderBy("date")))
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(data);
        setOriginalCards(data);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  cards.sort(function (a, b) {
    return a.claimed > b.claimed ? 1 : -1;
  });

  // const searchBar = document.getElementById("searchBar");
  // console.log(searchBar);
  // searchBar.addEventListener("keyup", (e) => {
  //   console.log(e.target.value);
  // });

  const handleSearch = (e) => {
    const userSearch = e.target.value;
    const filteredFoods = originalCards.filter((food) => {
      return (
        food.title.toUpperCase().includes(userSearch.toUpperCase()) ||
        food.details.toUpperCase().includes(userSearch.toUpperCase()) ||
        food.foodType.toUpperCase().includes(userSearch.toUpperCase()) ||
        food.pickupLocation.toUpperCase().includes(userSearch.toUpperCase())
      );
    });
    setCards(filteredFoods);
    if (userSearch) {
      setCards(filteredFoods);
    } else {
      setCards(originalCards);
    }
  };

  return (
    <div>
      <h2 className="foodboard__title">FoodBoard</h2>
      <div id="searchContainer">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Search for food"
          onChange={handleSearch}
          className="foodboard__search_bar"
        ></input>
      </div>
      <ul className="food-card-list__container">
        {cards.map((card, i) => (
          <FoodCard card={card} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default FoodBoard;
