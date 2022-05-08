import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { PDFViewer } from "@react-pdf/renderer";
import { useForm } from "react-hook-form";
import HomeScreen from "./components/Home";
import "./App.css";
import ProductScreen from "./components/ProductScreen";
import CartScreen from "./components/CartScreen";
import Delivery from "./components/Delivery";
import PDFDocument from "./components/PdfDocument";
import DeliveryDetails from "./components/DeliveryDetails";
import EditDelivery from "./components/EditDelivery";

const App = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route
            path="/delivery/generate"
            element={
              <DeliveryDetails />
            }
          />
          <Route
            path="/delivery/edit/:id"
            element={
              <EditDelivery />
            }
          />
        </Routes>
      </Router>
      <>
        {/* React Fragment */}
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
        )}
        {/* &#8679; is used to create the upward arrow */}
      </>
    </div>
  );
};

export default App;
