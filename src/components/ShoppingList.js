import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const itemsAPI = 'http://localhost:4000/items';

  useEffect(() => {
    fetch(itemsAPI, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(r => r.json())
      .then(items => setItems(items))
  },[]
  )

  function handleAddItem(newItem){
     setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleItemChange(updatedItem){
    const updatedItems = items.map(item =>{
      return (item.id === updatedItem.id) ? updatedItem : item;
    });
    setItems(updatedItems);
  }

  function handleItemRemove(removedItem){
    const updatedItems = items.filter(item => item.id !== removedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onItemChange={handleItemChange} onItemRemove={handleItemRemove}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
