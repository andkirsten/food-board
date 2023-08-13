import React from "react";
import "./Popup.css";
import Modal from "react-bootstrap/Modal";

const Popup = (props) => {
  function closePopup() {
    props.setPopup(false);
    props.setFormPopup(false);
  }
  return (
    <Modal size="xl" show={props.isPopupOpen} onHide={closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default Popup;
