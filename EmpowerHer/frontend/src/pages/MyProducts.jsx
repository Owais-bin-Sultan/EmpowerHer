import React, { useState, useEffect } from 'react';
import { Button } from "../components/CustomUI";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/CustomUI";
import { Input } from "../components/CustomUI";
import { Label } from "../components/CustomUI";
// import AddProduct from './pages/AddProduct';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/CustomUI";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  
  // ...existing code...

  const handleNavigateToAdd = () => {
    navigate('/add-product');
  };
  const handleProductsUpdate = (productArray) => {
    if (!Array.isArray(productArray)) {
      console.error('Expected array of products');
      setProducts([]);
      return;
    }
  
    setProducts(productArray);
    console.log('Products updated:', productArray);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("Starting fetch with userId:", userId);

      const response = await fetch(
        `http://localhost:5000/api/products/my-products?user=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log("API Response:", data);
      localStorage.setItem("products", JSON.stringify(data));

      // Ensure we're getting an array
      const productArray = Array.isArray(data) ? data : 
                          data.products ? data.products : 
                          [];

      console.log("Processed products array:", productArray);
      setProducts(productArray);

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    image: '', 
    category: '' 
  });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', price: '', stock: '', image: '' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category: product.category || ''
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) throw new Error('Failed to update product');

      const updatedProduct = await response.json();
      setProducts(products.map(p => 
        p._id === editingProduct._id ? updatedProduct : p
      ));
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', stock: '', image: '', category: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', stock: '', image: '', category: '' });
  };

  const handleEditClick = (product) => {
    navigate('/add-product', { 
      state: { 
        isEditing: true,
        product: product 
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array for initial load only

  // Add debug logging
  useEffect(() => {
    console.log('Current products:', products);
  }, [products]);

  // Add debug effect
  useEffect(() => {
    console.log("Products state updated:", products);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id || product.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="p-0">
                <img 
                  src={product.image || '/placeholder-product.png'} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.png';
                  }}
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                <p className="text-gray-600 mb-1">Price: Rs. {product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
              </CardContent>
              <CardFooter className="flex justify-evenly p-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(product)}
                  className="flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteProduct(product._id)}
                  className="flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found</p>
          <Button 
      onClick={handleNavigateToAdd}
      className="bg-purple-600 hover:bg-purple-700 transition-colors"
    >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}
      <TabsContent value="products">
        {editingProduct ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
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
                    value={newProduct.price}
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
                    value={newProduct.stock}
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
                    value={newProduct.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button type="submit">Update Product</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                  <img 
                    src={product.image || '/placeholder-product.png'} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png';
                    }}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                  <p className="text-gray-600 mb-1">Price: Rs. {product.price}</p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                </CardContent>
                <CardFooter className="flex justify-evenly p-4 bg-gray-50 rounded-b-lg">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(product)}
                    className="flex-1 mx-2 items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex-1 mx-2 items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </div>
  );
};

export default MyProducts;
