import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty. <Link to="/marketplace" className="text-purple-600 hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-purple-800">{item.name}</h3>
                <p className="text-gray-600">Rs. {item.price}</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold text-purple-800">Total: Rs. {total}</p>
            <button className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

