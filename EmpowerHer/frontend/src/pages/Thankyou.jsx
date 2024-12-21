import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-800">Thank You for Your Order!</h1>
      <p className="text-xl mb-8">Your order has been successfully placed. We'll send you an email with the order details shortly.</p>
      <Link
        to="/"
        className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors inline-block"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ThankYou;

