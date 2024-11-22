import React, { useState } from "react";
import ReactModal from "react-modal"; // Optional, you can also use plain CSS for a custom modal
import Ecom from './../assets/img/underconstruction.jpg';

// Make sure to bind the modal to your app
ReactModal.setAppElement("#root");

const UnderConstructionPopup = ({visible,setvisible}) => {
  //const [isOpen, setIsOpen] = useState(true); // Initially open the popup

  const handleClose = () => {
    setvisible(false); // Close the modal
  };

  return (
    <ReactModal
      isOpen={visible}
      onRequestClose={handleClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          border: "1px solid #ccc",
          color:"#454545"
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div>
        <img
          src={Ecom} // Replace with your construction image URL
          alt="Under Construction"
          style={{ width: "150px", marginBottom: "15px" }}
        />
        <h2>Under Construction</h2>
        <p>We’re working hard to bring this feature to you soon!</p>
        <button
          onClick={handleClose}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
};

export default UnderConstructionPopup;
