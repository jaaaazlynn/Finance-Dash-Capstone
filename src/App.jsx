import React from "react";
import StockForm from "./screens/StockForm";
import StockList from "./screens/StockList";
import { useContext } from "react";
import { StockContext } from "./screens/StockContext";
import './App.css';

const App = () => {
  const { stocks, setStocks } = useContext(StockContext);

  const handleAddStock = (newStock) => {
    setStocks([...stocks, newStock]);
  };

  return (
    
      <div className="root-container">
    
        <div className="app-container">
          <div className="header">
            <img src="./finances_1878786.png" alt="Finance Icon" className="header-icon" />
            <h1 className="header-title">Finance Dashboard</h1>
          </div>
          <StockForm />
          <StockList />
        </div>
    
      </div>
    );
  
};

export default App;
