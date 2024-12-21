import React, { useState } from 'react';
import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger ,Card, CardContent,CardFooter, CardHeader, CardTitle } from "../components/CustomUI";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const MyProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Garam Masala', price: 250, stock: 100, image: '/placeholder.svg?height=100&width=100' },
    { id: 2, name: 'Hand-woven Shawl', price: 1500, stock: 20, image: '/placeholder.svg?height=100&width=100' },
    { id: 3, name: 'Embroidered Cushion Cover', price: 800, stock: 50, image: '/placeholder.svg?height=100&width=100' },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '' });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', price: '', stock: '', image: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Products</h1>
      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="add">Add New Product</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-600">Price: Rs. {product.price}</p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                  <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input id="price" name="price" type="number" value={newProduct.price} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" name="image" type="url" value={newProduct.image} onChange={handleInputChange} required />
                </div>
                <Button type="submit"><PlusCircle className="w-4 h-4 mr-2" /> Add Product</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProducts;

