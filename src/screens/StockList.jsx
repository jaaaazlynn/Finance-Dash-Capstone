import React, { useEffect, useContext, useState, useCallback } from "react";
import { StockContext } from "./StockContext.jsx";

const StockList = () => {
  const { stocks } = useContext(StockContext);
  const [stockData, setStockData] = useState([]);

  const fetchStockData = useCallback(async () => {
    const results = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=76VXK7J7RUNLYN2X`
          );
          const data = await response.json();
          const globalQuote = data["Global Quote"];

          if (globalQuote) {
            const currentValue = parseFloat(globalQuote["05. price"]);
            return {
              ...stock,
              currentValue,
            };
          } else {
            return { ...stock, currentValue: null };
          }
        } catch (error) {
          console.error("Error fetching stock data:", error);
          return { ...stock, currentValue: null };
        }
      })
    );
    setStockData(results);
  }, [stocks]);

  useEffect(() => {
    fetchStockData();
  }, [stocks, fetchStockData]);

  const calculateProfitLoss = (purchasePrice, currentValue, quantity) => {
    if (currentValue === null) return "N/A";
    const profitLoss = (currentValue - purchasePrice) * quantity;
    return profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);
  };
  return (
    <div style={{ width: "100%" }}>
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {stockData.map((stock, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ margin: "5px 0" }}>
                <strong>Symbol:</strong> {stock.symbol}
              </p>
              <p style={{ margin: "3px 0" }}>Quantity: {stock.quantity}</p>
              <p style={{ margin: "3px 0" }}>
                Purchase Price: ${stock.purchasePrice.toFixed(2)}
              </p>
              <p style={{ margin: "3px 0" }}>
                Current Price: $
                {stock.currentValue !== null
                  ? stock.currentValue.toFixed(2)
                  : "N/A"}
              </p>
              <p style={{ margin: "3px 0" }}>
                <span style={{ color:
                      calculateProfitLoss(
                        stock.purchasePrice,
                        stock.currentValue,
                        stock.quantity
                      ) >= 0
                        ? "#008000"
                        : "#FF0000",
                    fontWeight: "bold", }}>Profit/Loss: </span>
                <span
                  style={{
                    color:
                      calculateProfitLoss(
                        stock.purchasePrice,
                        stock.currentValue,
                        stock.quantity
                      ) >= 0
                        ? "#008000"
                        : "#FF0000",
                    fontWeight: "bold",
                  }}
                >
                  {calculateProfitLoss(
                    stock.purchasePrice,
                    stock.currentValue,
                    stock.quantity
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockList;
