import React, { useState, useEffect } from "react";
import "./styles.css";

function AddModal({ isOpen, onClose, children }) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`modal-overlay ${isClosing ? "fade-out" : ""}`}>
      <div className={`modal-content ${isClosing ? "fade-out" : ""}`}>
        <h2>Add Item</h2>
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default AddModal;
