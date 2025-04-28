'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Clock, Shield, RotateCcw } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const demoProducts = [
    {
      id: 'demo1',
      name: 'Premium Headphones',
      price: 149.99,
      image: 'https://media.istockphoto.com/id/1373017594/photo/headphones-on-the-orange-color-background.jpg?s=612x612&w=0&k=20&c=9SEBT-6kUjIBy33Ga-C9n6CQMd7FOUk3yC89mOAa0ts=',
      description: 'Wireless noise-cancelling headphones with premium sound quality.'
    },
    {
      id: 'demo2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://media.istockphoto.com/id/1380063784/photo/smart-watch-close-up-on-a-white-background-3d-render.jpg?s=612x612&w=0&k=20&c=bIPm5Ei3o8VBY9T7X_9rkZbDFRWeCXBYTS6kWE59ITA=',
      description: 'Track your fitness goals and stay connected with this premium smartwatch.'
    },
    {
      id: 'demo3',
      name: 'Wireless Speaker',
      price: 89.99,
      image: 'https://media.istockphoto.com/id/1129572489/photo/portable-bluetooth-speaker.jpg?s=612x612&w=0&k=20&c=IflARVftsd2u72EKUXIBc6GGcKMdLPE0WNa9jEReZrE=',
      description: 'Portable Bluetooth speaker with 20-hour battery life and water resistance.'
    },
    {
      id: 'demo4',
      name: 'X-box',
      price: 699.99,
      image: 'https://media.istockphoto.com/id/1408097308/photo/xbox.jpg?s=612x612&w=0&k=20&c=kRGCwmbmp9Oh-hBwfwurF4-dVD5Pzn-2p4oxVdCSn6Q=',
      description: 'Latest model with advanced games and all-day battery life.'
    },
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', link: '/products', description: 'Latest tech gadgets and electronics' },
    { name: 'Clothing', icon: '👕', link: '/products', description: 'Fashion for all styles and seasons' },
    { name: 'Home & Kitchen', icon: '🏠', link: '/products', description: 'Everything for your modern home' },
    { name: 'Sports', icon: '⚽', link: '/products', description: 'Gear for every sport and activity' },
  ];

  interface SubscribeEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubscribe = (event: SubscribeEvent): void => {
    event.preventDefault();
    if (email.trim() === '') {
      setSubscriptionMessage('Please enter a valid email address.');
      return;
    }
    setSubscriptionMessage('Thank you for subscribing!');
    setEmail('');
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  }

  const handleWishlistToggle = (productId: string): void => {
    if (isInWishlist(productId)) {
      setWishlist(wishlist.filter((id: string) => id !== productId));
      setSubscriptionMessage('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      setSubscriptionMessage('Added to wishlist');
    }
  };

  interface CartProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  }

  const handleAddToCart = (product: CartProduct): void => {
    setSubscriptionMessage(`${product.name} added to cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const scaleOnHover = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-500 rounded-xl">
        <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1], rotate: [0, 10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-10 left-20 w-20 h-20 rounded-full bg-white opacity-10"
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-bold mb-4 text-white">Welcome to <span className="text-yellow-300">E-Shop</span></h1>
              <p className="text-xl mb-8 text-gray-100">
                Discover amazing products at unbeatable prices. Shop now and enjoy free shipping on all orders!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/products" 
                  className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={18} />
                  <span>Shop All Products</span>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-4 transform rotate-12">
                    {demoProducts.slice(0, 4).map((product, idx) => (
                      <motion.div 
                        key={product.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative h-32 w-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="200px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="p-2">
                          <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                          <p className="text-teal-600 text-sm font-bold">${product.price.toFixed(2)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={containerVariants}>
          <motion.h2 className="text-3xl font-bold mb-2 text-center" variants={itemVariants}>
            Shop by Category
          </motion.h2>
          <motion.p className="text-gray-600 text-center mb-8" variants={itemVariants}>
            Browse our wide selection of products by category
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={itemVariants} whileHover={scaleOnHover}>
                <Link
                  href={category.link}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden text-center p-8 block h-full"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Featured Products</h2>
            <p className="text-gray-600 text-center mb-8">Check out our most popular items</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {demoProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -10 }}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.button
                      className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </motion.button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-teal-600 text-xl font-bold">${product.price.toFixed(2)}</p>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products"
              className="inline-block bg-gray-500 text-white px-8 py-3 rounded-full font-semibold transition-colors hover:bg-teal-600 shadow-md hover:shadow-lg"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Why Shop With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We make shopping easy, safe, and enjoyable with our premium service guarantees</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="text-teal-500 mb-4 mx-auto bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Clock size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600">Get your order delivered to your doorstep in 2-3 business days.</p>
          </motion.div>
          <motion.div
            className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="text-teal-500 mb-4 mx-auto bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Shield size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Payments</h3>
            <p className="text-gray-600">Your payment information is always protected with top-level security.</p>
          </motion.div>
          <motion.div
            className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="text-teal-500 mb-4 mx-auto bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <RotateCcw size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Money Back Guarantee</h3>
            <p className="text-gray-600">Not satisfied with your purchase? Get a full refund within 30 days.</p>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Special Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Limited time deals you don't want to miss</p>
        </motion.div>
        <div className="relative overflow-hidden py-4">
          <div className="flex space-x-6 animate-marquee">
            {[...demoProducts, ...demoProducts].map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="250px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    SALE
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-gray-500 text-xs line-through">${(product.price * 1.2).toFixed(2)}</span>
                      <span className="text-red-500 font-bold ml-1">${product.price.toFixed(2)}</span>
                    </div>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Save 20%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-b from-gray-500 to-blue-50 py-16 rounded-xl">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Stay Updated</h2>
          <p className="mb-6 max-w-xl mx-auto text-gray-600">
            Subscribe to our newsletter to receive updates on new products, special offers, and discount information.
          </p>
          <motion.form className="max-w-md mx-auto flex" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-l-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
            <motion.button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-r-full font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
          {subscriptionMessage && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-teal-600">
              {subscriptionMessage}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .bg-grid-white\/10 {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}