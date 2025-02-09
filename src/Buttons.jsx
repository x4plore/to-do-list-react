import React, { useState } from "react";
import AddModal from "./AddModal";
import "./styles.css";

function Buttons({ addItem, clearItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    if (newItem.trim() === "") {
      alert("Item cannot be empty.");
      return;
    }
    addItem(newItem);
    setNewItem("");
    closeModal();
  };

  return (
    <div className="buttons-container">
      <button onClick={openModal}>Add</button>
      <button onClick={clearItems}>Clear All</button>
      <AddModal isOpen={isModalOpen} onClose={closeModal}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="styled-input"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </AddModal>
    </div>
  );
}

export default Buttons;
