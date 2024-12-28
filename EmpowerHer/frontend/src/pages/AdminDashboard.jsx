import React, { useState, useEffect } from 'react';
import { Button } from "../components/CustomUI";
import { Card, CardContent, CardHeader, CardTitle } from "../components/CustomUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/CustomUI";
import { Badge } from "../components/CustomUI";
import { CheckCircle, XCircle } from 'lucide-react';
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
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Users fetched:', response.data);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId, approve) => {
    try {
      console.log(`Updating approval status for user ${userId} to ${approve}`);
      const response = await axios.put(`http://localhost:5000/api/admin/users/${userId}/approve`, 
        { approved: approve },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Approval update response:', response.data);
      fetchUsers();
    } catch (err) {
      console.error('Error updating approval:', err);
      setError(err.response?.data?.message || 'Error updating user approval');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.approved ? "success" : "warning"}>
                    {user.approved ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {!user.approved ? (
                    <Button 
                      onClick={() => handleApproval(user._id, true)} 
                      size="sm" 
                      className="mr-2"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleApproval(user._id, false)} 
                      size="sm" 
                      variant="destructive"
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;

