import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Alert, AlertDescription, AlertTitle } from "../components/CustomUI";
import { Loader2 } from 'lucide-react';

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = location.state?.isEditing;
  const editProduct = location.state?.product;

  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    category: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && editProduct) {
      setProduct(editProduct);
    }
  }, [isEditing, editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    
    try {
      const url = isEditing 
        ? `http://localhost:5000/api/products/${editProduct._id}`
        : 'http://localhost:5000/api/products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) throw new Error('Failed to save product');
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/my-products');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Product {isEditing ? 'updated' : 'added'} successfully! Redirecting...</AlertDescription>
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
                value={product.name}
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
                value={product.description}
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
                value={product.price}
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
                value={product.category}
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
              <Label htmlFor="image">Product Image URL</Label>
              <Input
                type="text"
                name="image"
                id="image"
                required
                value={product.image}
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
                value={product.stock}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : (isEditing ? 'Update Product' : 'Add Product')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/my-products')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
