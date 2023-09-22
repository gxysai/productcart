import "./App.css";
import products from "./data/products";
import { useState } from "react";
import React from "react";

function App() {
  const [itemCartList, setItemCartList] = useState([]);

  const handleAddToCart = (addIndex) => {
    const newProductItemList = [...products];
    const newItemCartList = [...itemCartList];

    if (newItemCartList.includes(newProductItemList[addIndex]) !== true) {
      newProductItemList[addIndex].quantity = 1;
      newItemCartList.push(newProductItemList[addIndex]);
      setItemCartList(newItemCartList);
    }
  };

  const handleDeleteFromCart = (deleteIndex) => {
    const newItemCartList = [...itemCartList];
    newItemCartList.splice(deleteIndex, 1);
    console.log(newItemCartList);
    setItemCartList(newItemCartList);
  };

  const handleAddQuantity = (quantityIndex) => {
    const newItemCartList = [...itemCartList];
    newItemCartList[quantityIndex].quantity += 1;
    console.log(newItemCartList);
    setItemCartList(newItemCartList);
  };

  const handleSubtractQuantity = (quantityIndex) => {
    const newItemCartList = [...itemCartList];
    if (newItemCartList[quantityIndex].quantity > 1) {
      newItemCartList[quantityIndex].quantity -= 1;
      setItemCartList(newItemCartList);
    }
  };

  const totalPrice = itemCartList.reduce((acc, cv) => {
    cv = cv.quantity * cv.price;
    acc += cv;
    return acc;
  }, 0);

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((item, index) => {
            return (
              <div key={index} className="product">
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    handleAddToCart(index);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart Total Price is {totalPrice} Baht</h1>
        <div className="cart-item-list">
          {itemCartList.map((item, index) => {
            return (
              <div key={index} className="cart-item">
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price}</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    handleDeleteFromCart(index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      handleSubtractQuantity(index);
                    }}
                  >
                    -
                  </button>

                  <button
                    className="add-quantity"
                    onClick={() => {
                      handleAddQuantity(index);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
