import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/CustomUI";
import { Loader } from "lucide-react";

const AccountSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    businessDescription: '',
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Get user ID from localStorage if you stored it during login
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData); // For debugging
      
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        businessName: userData.businessName || '',
        businessDescription: userData.businessDescription || '',
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) throw new Error("Authentication required");

      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedData = await response.json();
      setUser(prev => ({
        ...prev,
        ...updatedData
      }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) throw new Error("Authentication required");

      const response = await fetch(`http://localhost:5000/api/users/${userId}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert("Password updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of your component remains the same...

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="business">Business Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="business">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                value={user.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                value={user.businessDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Describe your business"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;