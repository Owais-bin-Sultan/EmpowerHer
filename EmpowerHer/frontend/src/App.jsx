import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Learning from './pages/Learning';
import Mentorship from './pages/Mentorship';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import UserHome from './pages/UserHome';
import AddProduct from './pages/AddProduct';
import EnrollCourse from './pages/EnrollCourse';
import ScheduleMentorship from './pages/ScheduleMentorship';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(0, newQuantity) } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <UserHome user={user} /> : <Home />} />
          <Route path="/marketplace" element={<Marketplace addToCart={addToCart} />} />
          <Route 
            path="/learning" 
            element={isLoggedIn ? <Learning /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/mentorship" 
            element={isLoggedIn ? <Mentorship /> : <Navigate to="/login" replace />} 
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
          <Route
            path="/add-product"
            element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/enroll-course"
            element={isLoggedIn ? <EnrollCourse /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/schedule-mentorship"
            element={isLoggedIn ? <ScheduleMentorship /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

