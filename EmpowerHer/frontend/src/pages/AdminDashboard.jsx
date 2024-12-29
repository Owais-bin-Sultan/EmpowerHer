import React, { useState, useEffect } from "react";
import { Button } from "../components/CustomUI";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/CustomUI";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/CustomUI";
import { Badge } from "../components/CustomUI";
import { CheckCircle, XCircle, Users, RefreshCw, Package } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else {
      fetchProducts();
    }
  }, [activeTab]);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token found");
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        getAuthConfig()
      );
      console.log("Users fetched:", response.data);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId, approve) => {
    try {
      console.log(`Updating approval status for user ${userId} to ${approve}`);
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/approve`,
        { approved: approve },
        getAuthConfig()
      );

      // Update local state instead of fetching again
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, approved: approve } : user
        )
      );
    } catch (err) {
      console.error("Error updating approval:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setError("Error updating user approval");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/products",
        getAuthConfig()
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setError("Error fetching products");
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
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Error Occurred
              </h3>
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

  const TabButton = ({ tab, currentTab, icon: Icon, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-8 py-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
        currentTab === tab
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
          : "bg-white hover:bg-indigo-50"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${
          currentTab === tab ? "text-white" : "text-indigo-600"
        } mr-3`}
      />
      <div className="flex flex-col items-start">
        <span
          className={`font-semibold ${
            currentTab === tab ? "text-white" : "text-gray-800"
          }`}
        >
          {label}
        </span>
        <span
          className={`text-sm ${
            currentTab === tab ? "text-indigo-100" : "text-indigo-600"
          }`}
        >
          {count} {label.toLowerCase()}
        </span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
      <Card className="w-full max-w-7xl mx-auto shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 border border-indigo-100">
        <CardHeader className="flex flex-col space-y-6 p-8 border-b border-indigo-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                {activeTab === "users" ? (
                  <Users className="w-8 h-8 text-indigo-600" />
                ) : (
                  <Package className="w-8 h-8 text-indigo-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </CardTitle>
                <p className="text-gray-600">Manage users and products</p>
              </div>
            </div>
            <Button
              onClick={activeTab === "users" ? fetchUsers : fetchProducts}
              variant="outline"
              size="sm"
              className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
          </div>

          <div className="flex space-x-6 mt-4">
            <TabButton
              tab="users"
              currentTab={activeTab}
              icon={Users}
              label="Users"
              count={users.length}
            />
            <TabButton
              tab="products"
              currentTab={activeTab}
              icon={Package}
              label="Products"
              count={products.length}
            />
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {activeTab === "users" ? (
            users.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-20 h-20 mx-auto text-gray-400 mb-6 animate-pulse" />
                <p className="text-gray-500 text-2xl font-medium">No users found</p>
                <p className="text-gray-400 mt-2">User data will appear here once available</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-indigo-100 shadow-lg bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50/50">
                      <TableHead className="font-bold text-indigo-900 py-5 px-6">Name</TableHead>
                      <TableHead className="font-bold text-indigo-900 px-6">Email</TableHead>
                      <TableHead className="font-bold text-indigo-900 px-6">Status</TableHead>
                      <TableHead className="font-bold text-indigo-900 px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        className="hover:bg-indigo-50/30 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-900 py-4 px-6">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-gray-600 px-6">{user.email}</TableCell>
                        <TableCell className="px-6">
                          <Badge
                            variant={user.approved ? "success" : "warning"}
                            className="px-4 py-1.5 rounded-full font-medium text-sm"
                          >
                            {user.approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6">
                          {!user.approved ? (
                            <Button
                              onClick={() => handleApproval(user._id, true)}
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleApproval(user._id, false)}
                              size="sm"
                              variant="destructive"
                              className="bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
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
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-bold text-gray-700 py-5 px-6">Product</TableHead>
                    <TableHead className="font-bold text-gray-700 px-6">Price</TableHead>
                    <TableHead className="font-bold text-gray-700 px-6">Category</TableHead>
                    <TableHead className="font-bold text-gray-700 px-6">Seller</TableHead>
                    <TableHead className="font-bold text-gray-700 px-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20">
                        <Package className="w-20 h-20 mx-auto text-gray-400 mb-6" />
                        <p className="text-gray-500 text-2xl font-medium">No products found</p>
                        <p className="text-gray-400 mt-2">Products will appear here once available</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow
                        key={product._id}
                        className="hover:bg-gray-50/80 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-900 py-4 px-6">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-gray-600 px-6">
                          <span className="font-semibold">${product.price}</span>
                        </TableCell>
                        <TableCell className="text-gray-600 px-6">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600 px-6">
                          {product.user?.name || "Unknown"}
                        </TableCell>
                        <TableCell className="px-6">
                          <Badge
                            variant={product.stock > 0 ? "success" : "destructive"}
                            className="px-4 py-1.5 rounded-full font-medium text-sm"
                          >
                            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
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
