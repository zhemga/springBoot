import React from "react";
import { Card } from "react-bootstrap";

const Welcome = (props) => {
  return (
    <Card bg="dark" text="light">
      <Card.Header>Welcome to our Animal Hotel!</Card.Header>
      <center>
      <img className = "w-75 rounded m-4" src="https://i.pinimg.com/originals/33/c6/f2/33c6f29e8a03b5cd8cf68e4435986195.jpg"/>
      </center>
    </Card>
  );
};

export default Welcome;
