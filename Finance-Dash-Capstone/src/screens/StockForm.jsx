import React, { useState, useContext } from "react";
import { StockContext } from "./StockContext.jsx";

const StockForm = ({ onAddStock }) => {
  const { setStocks } = useContext(StockContext);
  const [symbol, setSymbol] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStock = {
      symbol,
      purchasePrice: parseFloat(purchasePrice),
      quantity: parseInt(quantity, 10),
    };
    setStocks(prevStocks => [...prevStocks, newStock]);
    setSymbol("");
    setPurchasePrice("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Stock Symbol"
        required
      />
     
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
       <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="Purchase Price"
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;
