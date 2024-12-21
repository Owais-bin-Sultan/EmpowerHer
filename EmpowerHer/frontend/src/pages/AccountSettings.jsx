import React, { useState } from "react";
import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from "../components/CustomUI";

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: 'Fatima Bibi',
    email: 'fatima.bibi@example.com',
    phone: '+92 300 1234567',
    address: '123 Main St, Lahore, Pakistan',
    businessName: 'Fatima\'s Organic Spices',
    businessDescription: 'Authentic Pakistani spices sourced from local farmers',
    password: '********',
  });

  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call to update user data)
    console.log('Updated user data:', user);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <Tabs>
        <TabsList>
          <TabsTrigger isActive={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
            Personal Information
          </TabsTrigger>
          <TabsTrigger isActive={activeTab === 'business'} onClick={() => setActiveTab('business')}>
            Business Information
          </TabsTrigger>
          <TabsTrigger isActive={activeTab === 'security'} onClick={() => setActiveTab('security')}>
            Security
          </TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit}>
          <TabsContent isActive={activeTab === 'personal'}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={user.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={user.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={user.phone} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={user.address} onChange={handleChange} />
              </div>
            </div>
          </TabsContent>
          <TabsContent isActive={activeTab === 'business'}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" name="businessName" value={user.businessName} onChange={handleChange} />
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
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent isActive={activeTab === 'security'}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" name="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
              </div>
            </div>
          </TabsContent>
          <Button type="submit" className="mt-6">Save Changes</Button>
        </form>
      </Tabs>
    </div>
  );
};

export default AccountSettings;

