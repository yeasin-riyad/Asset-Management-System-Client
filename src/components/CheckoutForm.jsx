import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosSecure from "./AxiosSecure";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import axiosPublic from "./AxiosPublic";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ pay }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        setPaymentSuccess(null);
        setLoading(false);
        return;
      }

      // Send payment method to the server to create payment intent
      const {
        data: { clientSecret },
      } = await axiosPublic.post("/create-payment-intent", {
        amount: pay,
      });

      // Confirm the payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,

          receipt_email:currentUser?.email,
        });

      if (confirmError) {
        setPaymentError(confirmError.message);
        setPaymentSuccess(null);
      } else {
        setPaymentSuccess(paymentIntent);
        setPaymentError(null);
        
        const { data } = await axiosPublic.post(
          `/Payment_Collection/${userEmail}`,
          { email:currentUser?.email,amount:pay,name:currentUser?.displayName,
            transactionId:paymentIntent.payment_method}
        );

        if (data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setPaymentError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="border p-2 rounded-lg" />
        </div>
        {paymentError && <div className="text-red-500">{paymentError}</div>}
        {paymentSuccess && (
          <div className="text-green-500">Payment successful!</div>
        )}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
