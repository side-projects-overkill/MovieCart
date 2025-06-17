import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//import { CartContext } from "../context/CartContext";
const formFields = [
  { label: "Name", type: "text", name: "name" },
  { label: "Email", type: "email", name: "email" },
  { label: "Phone", type: "number", name: "phone" },
  { label: "Card Number", type: "number", name: "cardNumber" },
  { label: "Expiry Date (MM/YY)", type: "text", name: "expiry" },
  { label: "CVV", type: "number", name: "cvv" },
];

const validationSchema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required(),
  email: yup.string().email("Invalid Email id eg(name@gmail.com)").required(),
  phone: yup.string().matches(/^\d{10}$/, "Enter 10 digit phone number").required(),
  cardNumber: yup.string().matches(/^\d{12}$/, "Enter 12 digit card number").required(),
  expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format").required(),
  cvv: yup.string().matches(/^\d{3}$/, "Enter 3 digit CVV").required(),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
  
    <div className="checkout-container">
      <h2>Checkout</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          toast.success("Checkout successful!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="checkout-form">
            {formFields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                <Field type={field.type} name={field.name} id={field.name} />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="error"
                />
              </div>
            ))}
            <button type="submit" disabled={!(isValid && dirty)}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CheckoutPage;
