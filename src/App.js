import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom"

import "./App.css"
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductInfo from "./pages/ProductInfo";


function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="*" element={<Home />}></Route>
        <Route exact path="/products" element={<ProductList />}></Route>
        <Route exact path="/products/:productId" element={<ProductInfo />}></Route>
      </Routes>
      <FooterComponent />
    </>

  );
}

export default App;
