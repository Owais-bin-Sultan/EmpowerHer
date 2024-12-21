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
import { assets } from '../assets/frontend_assets/assets';

const Home = ({ isLoggedIn, user }) => {
  return isLoggedIn ? <UserHome user={user} /> : <PublicHome />;
};

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

const PublicHome = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Empowering women</span>{' '}
                  <span className="block text-purple-600 xl:inline">entrepreneurs in Pakistan</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join our community of ambitious women entrepreneurs. Access resources, connect with mentors, and grow your business with EmpowerHer.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/marketplace"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
                    >
                      Explore marketplace
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={assets.hero_img}
            alt="Women entrepreneurs"
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              EmpowerHer provides a comprehensive platform for women entrepreneurs to thrive in the digital economy.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <FeatureCard
                title="Marketplace"
                description="Showcase and sell your products to a global audience. Connect with customers who appreciate your unique offerings."
                icon={<ShoppingBagIcon className="h-6 w-6" />}
              />
              <FeatureCard
                title="Learning Resources"
                description="Access courses and workshops designed to enhance your business skills and knowledge. Stay ahead in the competitive market."
                icon={<AcademicCapIcon className="h-6 w-6" />}
              />
              <FeatureCard
                title="Mentorship"
                description="Connect with experienced mentors who can guide you on your entrepreneurial journey. Gain insights and support to overcome challenges."
                icon={<UserGroupIcon className="h-6 w-6" />}
              />
              <FeatureCard
                title="Community"
                description="Join a supportive community of like-minded women entrepreneurs. Share experiences, collaborate, and grow together."
                icon={<UserIcon className="h-6 w-6" />}
              />
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-purple-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-purple-600">Join EmpowerHer today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50"
              >
                Log in
              </Link>
            </div>
          </div>
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

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">{description}</dd>
    </div>
  );
};

export default Home;

