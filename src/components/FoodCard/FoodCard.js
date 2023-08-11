import React from "react";
import "./FoodCard.css";
import Card from "react-bootstrap/Card";
import Produce from "../../defaultImages/produce.png";

const FoodCard = (props) => {
  return (
    <Card style={{ width: "18em" }}>
      <Card.Header>{props.card.title}</Card.Header>
      <Card.Img
        variant="top"
        src={props.card.photoUrl ? props.card.photoUrl : Produce}
        alt={props.card.title}
      />
      <Card.Body>
        <Card.Title>{props.card.date}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.card.foodType}
        </Card.Subtitle>
        <Card.Text>{props.card.details}</Card.Text>
        <Card.Link variant="primary">Mark Claimed</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
