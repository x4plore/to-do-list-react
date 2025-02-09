import React, { useState } from "react";
import Header from "./Header.jsx";
import Buttons from "./Buttons.jsx";
import Footer from "./Footer.jsx";
import ItemTable from "./ItemTable.jsx";
import "./styles.css";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Buttons addItem={addItem} clearItems={clearItems} />
        <ItemTable items={items} setItems={setItems} removeItem={removeItem} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
