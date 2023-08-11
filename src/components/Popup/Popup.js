import React from "react";

const Popup = (props) => {
  function closePopup() {
    props.setPopup(false);
    props.setFormPopup(false);
  }
  return (
    <section className={`modal ${props.isPopupOpen ? "modal_visible" : ""}`}>
      <div className={`popup ${props.isPopupOpen ? "popup_visible" : ""}`}>
        <div className="popup__container">
          <i className="popup__exit" onClick={closePopup}></i>
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default Popup;
