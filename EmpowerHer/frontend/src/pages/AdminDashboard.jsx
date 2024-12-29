import React, { useState, useEffect } from 'react';
import { Button } from "../components/CustomUI";
import { Card, CardContent, CardHeader, CardTitle } from "../components/CustomUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/CustomUI";
import { Badge } from "../components/CustomUI";
import { CheckCircle, XCircle, Users, RefreshCw, Package } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else {
      fetchProducts();
    }
  }, [activeTab]);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No auth token found');
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/admin/users', getAuthConfig());
      console.log('Users fetched:', response.data);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId, approve) => {
    try {
      console.log(`Updating approval status for user ${userId} to ${approve}`);
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/approve`, 
        { approved: approve },
        getAuthConfig()
      );
      
      // Update local state instead of fetching again
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, approved: approve } : user
        )
      );
    } catch (err) {
      console.error('Error updating approval:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Error updating user approval');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products', getAuthConfig());
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-8">
        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/80 shadow-xl rounded-xl">
          <CardContent className="p-12">
            <div className="text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Error Occurred</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <Button 
                onClick={fetchUsers}
                variant="outline"
                size="lg"
                className="mt-6 hover:bg-red-50 transition-all duration-300 ease-in-out"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TabButton = ({ tab, currentTab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
        currentTab === tab 
          ? 'bg-primary text-white shadow-lg' 
          : 'hover:bg-primary/10'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentTab === tab ? 'text-white' : 'text-primary'} mr-2`} />
      <span className={`font-medium ${currentTab === tab ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <Card className="w-full max-w-6xl mx-auto shadow-xl rounded-xl overflow-hidden backdrop-blur-sm bg-white/90">
        <CardHeader className="flex flex-col space-y-4 p-8 border-b bg-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                {activeTab === 'users' ? (
                  <Users className="w-8 h-8 text-primary" />
                ) : (
                  <Package className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </CardTitle>
                <p className="text-gray-500">Manage users and products</p>
              </div>
            </div>
            <Button 
              onClick={activeTab === 'users' ? fetchUsers : fetchProducts}
              variant="outline"
              size="sm"
              className="hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
          </div>
          
          <div className="flex space-x-4">
            <TabButton tab="users" currentTab={activeTab} icon={Users} label="Users" />
            <TabButton tab="products" currentTab={activeTab} icon={Package} label="Products" />
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {activeTab === 'users' ? (
            users.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 mx-auto text-gray-400 mb-4 animate-pulse" />
                <p className="text-gray-500 text-xl font-medium">No users found</p>
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-bold text-gray-700 py-4">Name</TableHead>
                      <TableHead className="font-bold text-gray-700">Email</TableHead>
                      <TableHead className="font-bold text-gray-700">Status</TableHead>
                      <TableHead className="font-bold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow 
                        key={user._id} 
                        className="hover:bg-gray-50/80 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.approved ? "success" : "warning"}
                            className="px-4 py-1 rounded-full font-medium"
                          >
                            {user.approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!user.approved ? (
                            <Button 
                              onClick={() => handleApproval(user._id, true)} 
                              size="sm" 
                              className="hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handleApproval(user._id, false)} 
                              size="sm" 
                              variant="destructive"
                              className="hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Revoke
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          ) : (
            <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-bold text-gray-700 py-4">Product Name</TableHead>
                    <TableHead className="font-bold text-gray-700">Price</TableHead>
                    <TableHead className="font-bold text-gray-700">Category</TableHead>
                    <TableHead className="font-bold text-gray-700">Created By</TableHead>
                    <TableHead className="font-bold text-gray-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg">No products found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow 
                        key={product._id}
                        className="hover:bg-gray-50/80 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          ${product.price}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {product.user?.name || 'Unknown'}
                        </TableCell>
                                            <TableCell>
                        <Badge 
                          variant={typeof product.Stock === 'number' && product.Stock > 0 ? "success" : "destructive"}
                          className="px-4 py-1 rounded-full font-medium"
                        >
                          {typeof product.Stock === 'number' && product.Stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;