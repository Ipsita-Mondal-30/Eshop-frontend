'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/products/ProductList';
import { getAllProducts, searchProducts } from '@/services/productService';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingBag, AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for category in URL query params
    const category = searchParams.get('category');
    if (category) {
      document.title = `E-Shop | ${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    }

    const loadProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchTerm.trim()) {
          data = await searchProducts(searchTerm);
        } else {
          data = await getAllProducts();
        }
        
        // Apply sorting if needed
        if (sortBy !== 'default' && data.length > 0) {
          data = sortProducts(data, sortBy);
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm, sortBy, searchParams]);

  const sortProducts = (products, sortOption) => {
    const productsCopy = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'name-a-z':
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-z-a':
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return productsCopy;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is triggered by the useEffect that depends on searchTerm
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Determine page title based on URL category or search term
  let pageTitle = "All Products";
  const category = searchParams.get('category');
  if (category) {
    pageTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
  } else if (searchTerm) {
    pageTitle = `Search Results: "${searchTerm}"`;
  }

  return (
    <motion.div 
      className="space-y-6 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Banner */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-lg relative overflow-hidden"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Animated background circles */}
        <motion.div 
          className="absolute -right-16 -top-16 w-64 h-64 bg-white opacity-10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -left-10 -bottom-16 w-48 h-48 bg-white opacity-5 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl font-bold mb-3 drop-shadow-md"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {pageTitle}
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-xl leading-relaxed"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {searchTerm 
              ? `Showing results for "${searchTerm}"`
              : category 
                ? `Browse our selection of ${category} products`
                : 'Discover our wide range of high-quality products at great prices'
            }
          </motion.p>
        </div>
      </motion.div>
      
      {/* Filters and Search */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-5 mb-8 border border-gray-100"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <form onSubmit={handleSearch} className="flex flex-1 max-w-md relative">
            <motion.div 
              className={`flex items-center flex-1 border-2 rounded-lg overflow-hidden transition-all duration-300 ${isSearchFocused ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 px-4 py-3 focus:outline-none bg-transparent"
              />
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </form>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">Sort by:</label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none border-2 border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-blue-500 font-medium text-gray-800 bg-gray-50 transition-all cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Results */}
      {loading ? (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-block h-16 w-16 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-0 h-full w-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 h-full w-full border-4 border-t-blue-600 rounded-full"></div>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-600 mt-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Finding amazing products...
          </motion.p>
        </motion.div>
      ) : error ? (
        <motion.div 
          className="bg-red-50 text-red-600 p-8 rounded-xl text-center shadow-md border border-red-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AlertCircle className="h-16 w-16 mx-auto mb-4" />
          </motion.div>
          <motion.p 
            className="text-2xl font-bold mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Oops! Something went wrong
          </motion.p>
          <motion.p
            className="text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {error}
          </motion.p>
          <motion.button
            className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      ) : products.length === 0 ? (
        <motion.div 
          className="bg-gray-100 text-center py-20 rounded-xl shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <ShoppingBag className="h-20 w-20 mx-auto mb-4 text-gray-400 stroke-1" />
          </motion.div>
          <motion.h3 
            className="text-2xl font-semibold text-gray-700 mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            No products found
          </motion.h3>
          <motion.p 
            className="text-gray-500 max-w-md mx-auto text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {searchTerm 
              ? `We couldn't find any products matching "${searchTerm}". Try a different search term or browse our categories.`
              : 'There are no products available at the moment. Please check back later.'}
          </motion.p>
          <motion.button
            className="mt-6 bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Categories
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-semibold">{products.length}</span> products
            </p>
            <div className="flex items-center gap-2 bg-blue-50 py-1 px-3 rounded-full text-blue-600 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Results updated</span>
            </div>
          </motion.div>
          
          {/* Modified this part to ensure products are visible */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductList products={products} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}