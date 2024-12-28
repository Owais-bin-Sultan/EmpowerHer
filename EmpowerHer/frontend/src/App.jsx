import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/MarketPlace';
import AddProduct from './pages/AddProduct';
import Learning from './pages/Learning';
import Mentorship from './pages/Mentorship';
import AdminDashboard from './pages/AdminDashboard';
import BecomeMentor from './pages/BecomeMentor';
import ApplyForMentor from './pages/ApplyForMentor';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProducts from './pages/MyProducts';
import MyLearning  from './pages/MyLearning';
import MyMentorship  from './pages/MyMentorship';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import AccountSettings  from './pages/AccountSettings';
import ScheduleMentorship from './pages/ScheduleMentorship';
import ThankYou from './pages/Thankyou';
import EnrollCourse from './pages/EnrollCourse';
import { CartProvider } from './contexts/CartContext';
import { assets } from './assets/frontend_assets/assets';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Register" element={<Register onRegister={handleLogin} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/schedule-mentorship" element={<ScheduleMentorship />} />
        <Route path="/enroll-course" element={<EnrollCourse />} />
        <Route path="/account-settings" element={<AccountSettings  />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/my-trainings" element={<MyLearning />} />
        <Route path="/my-trainings" element={<ThankYou />} />
        <Route path="/my-mentorship" element={<MyMentorship />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/mentorship/become-mentor" element={<BecomeMentor />} />
        <Route path="/mentorship/apply" element={<ApplyForMentor />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;

