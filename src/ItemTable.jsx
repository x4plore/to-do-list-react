import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles.css";

const ItemType = "ITEM";

const DraggableRow = ({ item, index, moveRow, onRemove, className }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <tr
      ref={(node) => ref(drop(node))}
      className={`${isDragging ? "dragging" : ""} ${
        isOver ? "hovering" : ""
      } ${className}`}
    >
      <td className="tasks-column">{item}</td>
      <td className="action-column">
        <button onClick={() => onRemove(index)}>Complete Task</button>
      </td>
    </tr>
  );
};

function ItemTable({ items, setItems, removeItem }) {
  const [removingIndex, setRemovingIndex] = useState(null);

  const moveRow = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const handleRemove = (index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      removeItem(index);
      setRemovingIndex(null);
    }, 200);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table className="item-table">
        <thead>
          <tr>
            <th>Task</th>
            <th className="action-column">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <DraggableRow
              key={index}
              item={item}
              index={index}
              moveRow={moveRow}
              onRemove={handleRemove}
              className={removingIndex === index ? "fade-out" : ""}
            />
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
}

export default ItemTable;
