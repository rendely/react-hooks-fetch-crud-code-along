import React from "react";

function Item({ item, onItemChange, onItemRemove }) {
  const itemsAPI = 'http://localhost:4000/items';

  function handleCartClick(e){
    e.preventDefault();
    
    const updatedItem = {
      isInCart: !item.isInCart
    }

    fetch(`${itemsAPI}/${item.id}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    })
      .then(r => r.json())
      .then(updatedItem => {
        onItemChange(updatedItem);
      })
  }
  
  function handleDeleteClick(e){
    e.preventDefault();
    fetch(`${itemsAPI}/${item.id}`,{
      method: "DELETE"})
      .then(r => r.json())
      .then(() => {
        onItemRemove(item);
      })
    
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
              onClick={handleCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
