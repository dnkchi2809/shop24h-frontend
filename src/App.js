import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom"

import "./App.css"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductInfo from "./pages/ProductInfo";
import Admin from "./pages/Admin";
import OrderList from "./pages/OrderList";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/orders" element={<OrderList />}></Route>
        <Route exact path="/products" element={<ProductList />}></Route>
        <Route exact path="/products/:productId" element={<ProductInfo />}></Route>
        <Route exact path="*" element={<Home />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
      </Routes>
    </>

  );
}

export default App;
