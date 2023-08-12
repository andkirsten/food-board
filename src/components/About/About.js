import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/FoodShareImage.png";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <img src={image} alt="foodshare" className="image" />
        <h1>Food Share</h1>
      </div>
      <div className="about-body">
        <h2>What is Food Share?</h2>
        <p>
          Food Share is a platform for sharing excess food with your community.
          It is a place where you can post food that you have to share with
          others, or find food that others don't need.
        </p>
        <h2>What is Food Insecurity?</h2>
        <p>
          Food insecurity persists in the US, despite its affluence, affecting
          millions. Socioeconomic factors like poverty and limited access to
          nutritious food contribute. Consequences include health issues and
          hindered child development. Government aid programs like SNAP help but
          fall short. Food banks and charities alleviate, yet demand exceeds
          supply. Addressing this requires comprehensive policies targeting
          poverty, improved food access, and stronger social safety nets.
          Raising awareness and community engagement are vital for ensuring all
          Americans have consistent access to nourishing food.
        </p>
        <h2>How do I get started?</h2>
        <p>
          Create an account and start sharing food with your community! Once you
          have an account you can create posts when you have food to share. In
          the post you will include a description of the food and the location
          where it can be picked up. After the food is claimed, you will mark
          the post as claimed.
        </p>
      </div>
      <div className="about-footer">
        <Link className="footer-link" to="/">
          Visit the food board
        </Link>
      </div>
    </div>
  );
};

export default About;
