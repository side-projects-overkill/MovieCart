import React,{useState,useNavigate, use} from "react";
import "./CheckoutPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CheckoutPage = () => {

 const [form,setForm] = useState({
    name:"",
    email:"",
    phone:"",
    cardNumber: "",
    expiry: "",
    cvv: "",
 });
 const navigate = useNavigate();
 const [errors,setErrors] = useState({});
 const validate = () => {
    const newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
        newErrors.name = "Please enter a valid name(min 3 characters)";
    }
    if (!/^[A-Za-z0-9._]+@[A-Za-z0-9._]+\.[A-Za-z]{2,3}$/.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(form.phone)) {
        newErrors.phone = "Please enter a valid phone number";
    }
    if (!/^\d{12}$/.test(form.cardNumber)) {
        newErrors.cardNumber = "Please enter a valid card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    }
    if (!/^\d{3}$/.test(form.cvv)) {
        newErrors.cvv = "Please enter a valid CVV (3 digits)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
 }
 const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
 }
 const handleSubmit = (e) =>{
    e.preventDefault();
    if(validate()) {
    toast.success("Form submitted successfully!");
     setForm({
        name: "",
        email: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    }
    navigate("/HomePage");
  // Reset errors after successful submission
  };

    return(
      <div className="checkout-container">
        <h2>Checkout Form </h2>
        <div className="checkout-card">
        <form onSubmit={handleSubmit}>
            <label>Name
            <input 
              type="text"
              name = "name"
              value = {form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
            </label>

            <label>Email
            <input 
              type="text"
              name = "email"
              value = {form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            </label>

            <label>Phone no.
            <input 
              type="text"
              name = "phone"
              value = {form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
            </label>

            <h3>Payment Method</h3>
            <label>Card Number
            <input 
              type="text"
              name = "cardNumber"
              value = {form.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </label>

            <label>Expiry Date (MM/YY)
            <input 
              type="text"
              name = "expiry"
              value = {form.expiry}
              onChange={handleChange}
            />
            {errors.expiry && <span className="error">{errors.expiry}</span>}
            </label>

            <label>CVV
            <input 
              type="password"
              name = "cvv"
              value = {form.cvv}
              onChange={handleChange}
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
            </label>

            <button type="submit">Submit</button>
        </form>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
};
export default CheckoutPage;