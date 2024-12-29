import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from "../components/CustomUI";
import { Mail, Phone, MapPin, Calendar, Building, Edit, Award, Package, BookOpen, Users2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserProfile();
    // Show update success message if returning from settings
    if (location.state?.updated) {
      alert('Profile updated successfully!');
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Authentication required');
      }

      // Fetch user profile
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
        throw new Error('Failed to fetch profile');
      }

      const userData = await response.json();
      setUser(userData);

    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/account-settings', { 
      state: { 
        returnTo: '/profile',
        userData: user 
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center relative">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-100 shadow-inner bg-white">
                <img 
                  src={user.profileImage || "/placeholder.svg"} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold text-gray-800">
                {user.name || 'No Name'}
              </CardTitle>
              <p className="text-purple-600 font-medium">
                {user.businessDetails?.name || 'Business Name Not Set'}
              </p>
              <p className="text-sm text-gray-500">
                Member since {formatDate(user.createdAt)}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{user.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{user.address || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                onClick={handleEditProfile}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {/* Business Details Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-6 h-6 text-purple-600" />
                  <span>Business Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {user.businessDetails?.description || 
                     'Add a description of your business to help others understand what you do.'}
                  </p>
                </div>
                {/* Add business metrics/statistics here */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Business Details</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-sm text-gray-900">{user.address || 'Not specified'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact</dt>
                      <dd className="text-sm text-gray-900">{user.phone || 'Not specified'}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <Package className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="text-3xl font-bold">{user.productsCount || 0}</h3>
                  <p className="text-purple-100">Products Listed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <BookOpen className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="text-3xl font-bold">{user.coursesCount || 0}</h3>
                  <p className="text-purple-100">Courses Enrolled</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg">
                <CardContent className="p-6">
                  <Users2 className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="text-3xl font-bold">{user.mentorshipCount || 0}</h3>
                  <p className="text-purple-100">Mentorship Sessions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
