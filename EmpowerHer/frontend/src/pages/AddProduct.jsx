import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label, Alert, AlertDescription, AlertTitle } from "../components/CustomUI";
import { Loader2 } from 'lucide-react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '', // Added stock
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Sending data without FormData since we no longer have file upload
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Since we're sending JSON
        },
        body: JSON.stringify(productData), // Sending JSON data
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log('Product added:', data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Product added successfully! Redirecting...</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                required
                value={productData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                rows="3"
                required
                value={productData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price (PKR)</Label>
              <Input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                step="0.01"
                value={productData.price}
                onChange={handleChange}
              />
            </div>
           
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                id="category"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="textiles">Textiles</option>
                <option value="handicrafts">Handicrafts</option>
                <option value="food">Food Products</option>
                <option value="jewelry">Jewelry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="imageUrl">Product Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                required
                value={productData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                type="number"
                name="stock"
                id="stock"
                required
                min="0"
                value={productData.stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Add Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
