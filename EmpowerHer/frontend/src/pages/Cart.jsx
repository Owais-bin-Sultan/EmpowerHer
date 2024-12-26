import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty. <Link to="/marketplace" className="text-purple-600 hover:underline">Continue shopping</Link>
        </p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Rs. {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="w-16 p-1 border rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <p className="text-xl font-bold">Total: Rs. {total}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
