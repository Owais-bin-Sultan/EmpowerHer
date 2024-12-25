import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/CustomUI";
import { PlusCircle, Edit, Trash2, Loader } from 'lucide-react';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const initialProductState = { name: '', description: '', price: '', stock: '', image: '', category: '' };
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch('http://localhost:5000/api/products/my-products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const product = editingProduct ? editingProduct : newProduct;
    const updatedValue = name === 'price' || name === 'stock' ? 
      Math.max(0, parseFloat(value)) : value;

    if (editingProduct) {
      setEditingProduct({ ...product, [name]: updatedValue });
    } else {
      setNewProduct({ ...product, [name]: updatedValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const product = editingProduct ? editingProduct : newProduct;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const url = editingProduct ? 
        `http://localhost:5000/api/products/${editingProduct._id}` :
        'http://localhost:5000/api/products';

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      const result = await response.json();
      
      if (editingProduct) {
        setProducts(products.map(p => p._id === result._id ? result : p));
        setEditingProduct(null);
      } else {
        setProducts([...products, result]);
        setNewProduct(initialProductState);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const renderProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={editingProduct?.name || newProduct.name} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input 
          id="description" 
          name="description" 
          value={editingProduct?.description || newProduct.description} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="price">Price (Rs.)</Label>
        <Input 
          id="price" 
          name="price" 
          type="number" 
          min="0"
          step="0.01"
          value={editingProduct?.price || newProduct.price} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input 
          id="stock" 
          name="stock" 
          type="number" 
          min="0"
          value={editingProduct?.stock || newProduct.stock} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          name="image" 
          type="url" 
          value={editingProduct?.image || newProduct.image} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input 
          id="category" 
          name="category" 
          value={editingProduct?.category || newProduct.category} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">
          {editingProduct ? (
            <><Edit className="w-4 h-4 mr-2" /> Update Product</>
          ) : (
            <><PlusCircle className="w-4 h-4 mr-2" /> Add Product</>
          )}
        </Button>
        {editingProduct && (
          <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Products</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products List</TabsTrigger>
          <TabsTrigger value="add">Add Product</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500">No products found. Add your first product!</p>
            ) : (
              products.map((product) => (
                <Card key={product._id}>
                  <CardHeader>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = 'placeholder-image-url';
                        e.target.onerror = null;
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-gray-600">Price: Rs. {product.price}</p>
                    <p className="text-gray-600">Stock: {product.stock}</p>
                    <p className="text-gray-600">Category: {product.category}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderProductForm()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProducts;