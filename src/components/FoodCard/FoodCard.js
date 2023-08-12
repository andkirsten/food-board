import React from "react";
import "./FoodCard.css";
import Card from "react-bootstrap/Card";
import Produce from "../../defaultImages/produce.png";
import Meat from "../../defaultImages/meat.png";
import Pantry from "../../defaultImages/pantry.png";
import Baby from "../../defaultImages/baby.png";
import Canned from "../../defaultImages/canned.png";
import Misc from "../../defaultImages/misc.png";
import { useAuth } from "../../context/AuthContext";
import { ListGroup } from "react-bootstrap";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../Firebase";

const FoodCard = (props) => {
  // food type names and images for card display
  const foodTypeName = (foodType) => {
    switch (foodType) {
      case "produce":
        return "Produce";
      case "meat":
        return "Meat";
      case "pantry":
        return "Pantry Staples";
      case "baby":
        return "Baby Food or Formula";
      case "canned":
        return "Canned Goods";
      default:
        return "Miscellaneous";
    }
  };
  const defaultImage = (foodType) => {
    switch (foodType) {
      case "produce":
        return Produce;
      case "meat":
        return Meat;
      case "pantry":
        return Pantry;
      case "baby":
        return Baby;
      case "canned":
        return Canned;
      default:
        return Misc;
    }
  };

  // date formatting
  var carddate = new Date(props.card.date);
  let day = carddate.getDate();
  let month = carddate.getMonth() + 1;
  let year = carddate.getFullYear();
  let formatdate = day + "/" + month + "/" + year;

  // mark claimed functionality

  const markClaimed = async () => {
    try {
      await updateDoc(doc(firestore, "posts", props.card.id), {
        claimed: true,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  // import user from auth context
  const { user } = useAuth();
  return (
    <Card
      style={{ width: "19rem" }}
      className={props.card.claimed === false ? "" : "card__claimed"}
    >
      <Card.Img
        variant="top"
        src={
          props.card.photoUrl
            ? props.card.photoUrl
            : defaultImage(props.card.foodType)
        }
        alt={props.card.title}
      />
      <Card.Body>
        <Card.Title>{props.card.title}</Card.Title>

        <Card.Text>{props.card.details}</Card.Text>
        <ListGroup variant="flush" className="list-group-flush">
          <ListGroup.Item>
            Food Type: {foodTypeName(props.card.foodType)}
          </ListGroup.Item>
          <ListGroup.Item>
            Pickup Location: {props.card.pickupLocation}
          </ListGroup.Item>
          <ListGroup.Item>Posted: {formatdate}</ListGroup.Item>
          <ListGroup.Item>
            Status: {props.card.claimed ? "Claimed" : "Available"}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      {user && user.uid === props.card.owner ? (
        <Card.Footer className="text-muted">
          {props.card.claimed ? null : (
            <Card.Link variant="primary" onClick={markClaimed}>
              Mark as Claimed
            </Card.Link>
          )}
        </Card.Footer>
      ) : null}
    </Card>
  );
};

export default FoodCard;
