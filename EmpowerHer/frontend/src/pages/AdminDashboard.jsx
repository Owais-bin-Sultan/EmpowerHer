import React, { useState, useEffect } from 'react';
import { Button } from "../components/CustomUI";
import { Card, CardContent, CardHeader, CardTitle } from "../components/CustomUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/CustomUI";
import { Badge } from "../components/CustomUI";
import { CheckCircle, XCircle, Users, RefreshCw } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/admin/users');
      console.log('Users fetched:', response.data);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId, approve) => {
    try {
      console.log(`Updating approval status for user ${userId} to ${approve}`);
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/approve`, 
        { approved: approve }
      );
      
      // Update local state instead of fetching again
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, approved: approve } : user
        )
      );
    } catch (err) {
      console.error('Error updating approval:', err);
      setError('Error updating user approval');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-8 bg-red-50/50 border border-red-100">
        <CardContent className="p-8">
          <div className="text-red-500 text-center">
            <XCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Occurred</h3>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={fetchUsers}
              variant="outline"
              size="lg"
              className="mt-6 hover:bg-red-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <p className="text-gray-500 text-sm">Manage user approvals and permissions</p>
            </div>
          </div>
          <Button 
            onClick={fetchUsers}
            variant="outline"
            size="sm"
            className="hover:shadow-md transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.approved ? "success" : "warning"}
                        className="px-3 py-1"
                      >
                        {user.approved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!user.approved ? (
                        <Button 
                          onClick={() => handleApproval(user._id, true)} 
                          size="sm" 
                          className="hover:shadow-md transition-all"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" /> Approve
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleApproval(user._id, false)} 
                          size="sm" 
                          variant="destructive"
                          className="hover:shadow-md transition-all"
                        >
                          <XCircle className="w-4 h-4 mr-2" /> Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;