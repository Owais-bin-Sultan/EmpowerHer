import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useCart } from "../contexts/CartContext.jsx";


// Static product data
const staticProducts = [
  {
    id: 1,
    name: "Handwoven Shawl",
    description: "Beautiful handwoven shawl made with traditional techniques",
    price: 2500,
    image: "/images/shawl.jpg",
    category: "Textiles"
  },
  {
    id: 2,
    name: "Organic Spice Mix",
    description: "A blend of organic spices perfect for traditional Pakistani cuisine",
    price: 350,
    image: "/images/spices.jpg",
    category: "Food"
  },
  {
    id: 3,
    name: "Embroidered Cushion Cover",
    description: "Intricately embroidered cushion cover showcasing Pakistani craftsmanship",
    price: 800,
    image: "/images/cushion-cover.jpg",
    category: "Home Decor"
  },
  {
    id: 4,
    name: "Traditional Jewelry Set",
    description: "Elegant jewelry set inspired by traditional Pakistani designs",
    price: 3500,
    image: "/images/jewelry-set.jpg",
    category: "Jewelry"
  },
  {
    id: 5,
    name: "Hand-painted Ceramic Vase",
    description: "Beautifully hand-painted ceramic vase with intricate patterns",
    price: 1200,
    image: "/images/ceramic-vase.jpg",
    category: "Home Decor"
  },
  {
    id: 6,
    name: "Leather Handbag",
    description: "Handcrafted leather handbag with traditional motifs",
    price: 4000,
    image: "/images/leather-handbag.jpg",
    category: "Accessories"
  },
  {
    id: 7,
    name: "Handmade Soap Set",
    description: "Set of natural, handmade soaps with Pakistani herbs and fragrances",
    price: 600,
    image: "/images/soap-set.jpg",
    category: "Beauty"
  },
  {
    id: 8,
    name: "Traditional Wall Art",
    description: "Hand-painted wall art featuring traditional Pakistani scenes",
    price: 2800,
    image: "/images/wall-art.jpg",
    category: "Home Decor"
  }
];

const Marketplace = () => {
  const [products] = useState(staticProducts);
  const [filteredProducts, setFilteredProducts] = useState(staticProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addToCart } = useCart();

  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(staticProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, priceRange, selectedCategory, products]);

  const filterProducts = () => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">EmpowerHer Marketplace</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center gap-4">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block mb-2 font-semibold text-gray-700">Price Range (Rs.)</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <span className="text-gray-600">to</span>
          <input
            type="number"
            className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-purple-800">{product.name}</h3>
              <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-purple-600 font-bold">Rs. {product.price}</span>
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No products found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default Marketplace;

