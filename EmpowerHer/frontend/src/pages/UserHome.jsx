import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  ShoppingCartIcon, 
  BookOpenIcon, 
  UserIcon,
  PlusCircleIcon,
  ChatBubbleLeftRightIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const UserHome = ({ user }) => {
  // Mock user stats (replace with actual data in a real application)
  const userStats = {
    productsListed: 5,
    coursesEnrolled: 2,
    mentorshipSessions: 3
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user.name}!</h1>
          <p className="text-xl mb-6">Here's what you've been up to:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Products Listed" value={userStats.productsListed} />
            <StatCard title="Courses Enrolled" value={userStats.coursesEnrolled} />
            <StatCard title="Mentorship Sessions" value={userStats.mentorshipSessions} />
          </div>
        </div>

        {/* Dashboard Cards */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <DashboardCard
            title="My Products"
            description="Manage your listed products"
            link="/my-products"
            icon={<ShoppingBagIcon className="w-8 h-8" />}
          />
          <DashboardCard
            title="My Trainings"
            description="View your enrolled courses"
            link="/my-trainings"
            icon={<AcademicCapIcon className="w-8 h-8" />}
          />
          <DashboardCard
            title="My Mentorship"
            description="Connect with your mentor"
            link="/my-mentorship"
            icon={<UserGroupIcon className="w-8 h-8" />}
          />
          <DashboardCard
            title="Marketplace"
            description="Explore and shop products"
            link="/marketplace"
            icon={<ShoppingCartIcon className="w-8 h-8" />}
          />
          <DashboardCard
            title="Learning Resources"
            description="Discover new courses"
            link="/learning"
            icon={<BookOpenIcon className="w-8 h-8" />}
          />
          <DashboardCard
            title="Find a Mentor"
            description="Connect with experienced mentors"
            link="/mentorship"
            icon={<UserIcon className="w-8 h-8" />}
          />
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton title="Add New Product" icon={<PlusCircleIcon className="w-6 h-6" />} link="/add-product" />
          <QuickActionButton title="Schedule Mentorship" icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} link="/schedule-mentorship" />
          <QuickActionButton title="Enroll in Course" icon={<AcademicCapIcon className="w-6 h-6" />} link="/enroll-course" />
          <QuickActionButton title="Account Settings" icon={<CogIcon className="w-6 h-6" />} link="/account-settings" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const DashboardCard = ({ title, description, link, icon }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="bg-purple-100 rounded-full p-3 mr-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

const QuickActionButton = ({ title, icon, link }) => {
  return (
    <Link to={link} className="flex items-center justify-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {icon}
      <span className="ml-2 font-medium text-gray-800">{title}</span>
    </Link>
  );
};

export default UserHome;

