import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

function Navbar({ isLoggedIn, onLogout }) {
  // const { cart } = useCart();
  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5 font-medium">
          <Link to="/">
            <img src={assets.logo} className="w-36" alt="EmpowerHer" />
          </Link>
          <ul className="flex gap-5 text-sm text-gray-200">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-white">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white">
                <img src={assets.cart_icon} className="w-5" alt="Cart" />
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/mentorship" className="hover:text-white">
                    Mentorship
                  </Link>
                </li>
                <li>
                  <Link to="/learning" className="hover:text-white">
                    Training
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-white">
                    <img src={assets.cart_icon} className="w-5" alt="Cart" />
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-white">
                    <img
                      src={assets.profile_icon}
                      className="w-5"
                      alt="Profile"
                    />
                  </Link>
                </li>
                <li>
                  <button onClick={onLogout} className="hover:text-white">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
