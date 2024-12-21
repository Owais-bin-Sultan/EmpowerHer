import React from 'react';
import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle } from "../components/CustomUI";
import { ShoppingBag, Book, Users } from 'lucide-react';

const Profile = () => {
  const user = {
    name: 'Fatima Bibi',
    email: 'fatima.bibi@example.com',
    phone: '+92 300 1234567',
    address: 'Lahore, Pakistan',
    businessName: "Fatima's Organic Spices",
    businessDescription: 'Authentic Pakistani spices sourced from local farmers',
    joinDate: 'January 2023',
    productsListed: 15,
    coursesEnrolled: 3,
    mentorshipSessions: 5,
  };

  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8">
      <div className="w-full md:w-1/2">
        <Card className="container flex flex-col items-center justify-center mx-auto px-4 py-8">
          <CardHeader>
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
              <img src="/placeholder.svg?height=128&width=128" alt={user.name} className="w-full h-full object-cover" />
            </div>
            <CardTitle className="text-center mt-4">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 mb-4">{user.businessName}</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Location:</strong> {user.address}</p>
              <p><strong>Member since:</strong> {user.joinDate}</p>
            </div>
            <Button className="w-full mt-4">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
