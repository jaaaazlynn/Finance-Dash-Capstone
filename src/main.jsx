import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StockProvider } from "./screens/StockContext.jsx";

ReactDOM.render(
  <StockProvider>
    <App />
  </StockProvider>,
  document.getElementById("root")
);
