import React, {useState,useEffect,useContext} from "react";
import "./cartPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {userContext} from "./HomePage";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
 
const { cartItems } = useContext(userContext);
const navigate = useNavigate();
const [items,setCartItems] = useState([]);

useEffect(() => {
    setCartItems(cartItems);
}, [cartItems]);

const removeItem = (movie) => {
    const updatedCart = cartItems.filter( (item) => item.id !== movie.id);
    setCartItems(updatedCart);
    toast.success("Item removed from cart successfully!");
}
return (
    <div className="cart-container">
        <h2>CART</h2>
        <div className="left-cart">
            {
               items.length == 0 ? (
                <h2>Your cart is empty</h2>
               ):(
                items.map((movie) => (                    
                <div className="card" key={movie.id}>
                        <h2>ID: {movie.id}</h2>
                        <h2>Title: {movie.title}</h2>
                        <h2>Price: {movie.price}</h2>
                <div className="card-buttons">
                    <button onClick={() => navigate("/checkoutPage")}>Checkout</button>
                    <button onClick={() => removeItem(movie)}>Remove</button>
                </div>
                </div>
                ))
               )
            }
        </div>
        <div className="right-cart">
            <h2>Cart Summary</h2>
            <div className="cart-summary">
                <h3>Total Items: {items.length}</h3>
                <h3>Total Price: {items.reduce((total,item) => total + item.price,0)}</h3>
            </div>
            <button className="card-buttons" onClick={() => navigate("/checkoutPage")}>Proceed to Checkout</button>
            <ToastContainer />
        </div>  
    </div>
);
};
export default CartPage;