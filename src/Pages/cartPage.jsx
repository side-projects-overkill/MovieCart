import React, {useState,useNavigate,useContext} from "react";
import "./addToCart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {userContext} from "./pages/homePage";
const cartPage = () => {
 const user = useContext(userContext);


return (
    <div className="cart-container">
        <h2>CART</h2>
        <div className="cart-items">
         <div className="cart-item">
           <h2>ID: {user.id}</h2>
           <h2>Title: {user.title}</h2>
           <h2>Price: {user.price}</h2>
         </div>
        </div>
    </div>
);
};