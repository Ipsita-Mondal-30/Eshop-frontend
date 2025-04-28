'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShoppingCart, Heart, Tag, Percent, Gift, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function DealsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showFavNotification, setShowFavNotification] = useState(false);
  const [showAllFlashDeals, setShowAllFlashDeals] = useState(false);
  const [showAllWeeklyDeals, setShowAllWeeklyDeals] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [countdownTime, setCountdownTime] = useState({
    days: 2,
    hours: 7,
    minutes: 23,
    seconds: 41
  });

  useEffect(() => {
    setIsLoaded(true);

    // Load cart items and favorites from localStorage
    const savedCart = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdownTime(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                days = 2;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save to localStorage when cart or favorites change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle cart notification
  useEffect(() => {
    if (showCartNotification) {
      const timer = setTimeout(() => {
        setShowCartNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCartNotification]);

  // Handle favorite notification
  useEffect(() => {
    if (showFavNotification) {
      const timer = setTimeout(() => {
        setShowFavNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFavNotification]);

  // Flash deals products
  const flashDeals = [
    {
      id: 'flash1',
      name: 'Wireless Earbuds',
      originalPrice: 99.99,
      salePrice: 59.99,
      discount: 40,
      image: 'https://media.istockphoto.com/id/1646426505/photo/in-ear-headphones-black-wireless-earphones-in-ear-with-charging-case-wireless-earbuds-or.jpg?s=612x612&w=0&k=20&c=8nQvJtdCJV3aCyODf_GGZ80EIeE5pVc8MuaPDFZwSn0=',
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 'flash2',
      name: 'Smart Home Hub',
      originalPrice: 199.99,
      salePrice: 129.99,
      discount: 35,
      image: 'https://media.istockphoto.com/id/1214098172/photo/smart-home-hub-for-home-automation-on-wooden-desktop-with-copyspace.jpg?s=612x612&w=0&k=20&c=q2pbA6n-9vMArLJsg9tgpMBjW8GMc0oibViC94IGsoo=',
      rating: 4.2,
      reviewCount: 89
    },
    {
      id: 'flash3',
      name: 'Fitness Tracker',
      originalPrice: 149.99,
      salePrice: 89.99,
      discount: 40,
      image: 'https://media.istockphoto.com/id/1345812741/photo/white-fitness-tracker.jpg?s=612x612&w=0&k=20&c=JrVEAtnY50pnVtUN_gG4hEExZlOP606kQ7XWTEItzkM=',
      rating: 4.7,
      reviewCount: 215
    },
    {
      id: 'flash4',
      name: 'Portable Bluetooth Speaker',
      originalPrice: 129.99,
      salePrice: 74.99,
      discount: 42,
      image: 'https://media.istockphoto.com/id/1335374517/vector/black-bluetooth-speaker-with-power-blue-lead-on-white-background-eps10-vector-illusration.jpg?s=612x612&w=0&k=20&c=FJHzQf24mszeen0xJJz_NQdrm89sGau_CiYJM-_-y9o=',
      rating: 4.4,
      reviewCount: 176
    },
    {
      id: 'flash5',
      name: 'Noise Cancelling Headphones',
      originalPrice: 249.99,
      salePrice: 159.99,
      discount: 36,
      image: 'https://media.istockphoto.com/id/1289974266/photo/black-headphones-with-white-background-musical-concept.jpg?s=612x612&w=0&k=20&c=BeeykILvP9gqwTE91J4S02x753I8aWS8jtJassh188Q=',
      rating: 4.8,
      reviewCount: 302
    },
    {
      id: 'flash6',
      name: 'Wireless Charging Pad',
      originalPrice: 49.99,
      salePrice: 29.99,
      discount: 40,
      image: 'https://media.istockphoto.com/id/1454417602/photo/wireless-charger-magnetic-charging-modern-equipment-of-mobile-phone.jpg?s=612x612&w=0&k=20&c=Lg_9YELLFz0YKhdTcOLxIy1lTe9Xzh5Ikw3192lDeJA=',
      rating: 4.3,
      reviewCount: 143
    },
    {
      id: 'flash7',
      name: 'Smart Watch',
      originalPrice: 179.99,
      salePrice: 119.99,
      discount: 33,
      image: 'https://media.istockphoto.com/id/481616102/photo/apple-watch-sport.jpg?s=612x612&w=0&k=20&c=uJuuSi9jiwjhAm8lehYQTskuPkrQOJSM9rBrbpn-zQw=',
      rating: 4.6,
      reviewCount: 227
    },
    {
      id: 'flash8',
      name: 'Portable Power Bank',
      originalPrice: 69.99,
      salePrice: 39.99,
      discount: 43,
      image: 'https://media.istockphoto.com/id/1126642401/photo/power-bank-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=FMMhXxZql2guHigJvPDsi6S5Bp_QT6OsfZnD6kqcc3U=',
      rating: 4.5,
      reviewCount: 194
    }
  ];

  // Weekly deals
  const weeklyDeals = [
    {
      id: 'weekly1',
      name: 'Ultra HD Smart TV',
      originalPrice: 899.99,
      salePrice: 699.99,
      discount: 22,
      image: 'https://media.istockphoto.com/id/499046564/photo/ultrahd-smart-tv-with-curved-screen.jpg?s=612x612&w=0&k=20&c=PLdvYh2UmB0nNWr7i_QStOGAS_H03y1yclfek3Tm1Q4=',
      rating: 4.6,
      reviewCount: 183
    },
    {
      id: 'weekly2',
      name: 'Gaming Laptop',
      originalPrice: 1299.99,
      salePrice: 999.99,
      discount: 23,
      image: 'https://media.istockphoto.com/id/511210673/photo/gamer-laptop-with-video-game.jpg?s=612x612&w=0&k=20&c=0FEiel8QJj95RBrb57OJTTVqsr4Zg_1ytZxoGnQMSXo=',
      rating: 4.7,
      reviewCount: 254
    },
    {
      id: 'weekly3',
      name: 'Robot Vacuum Cleaner',
      originalPrice: 349.99,
      salePrice: 249.99,
      discount: 29,
      image: 'https://media.istockphoto.com/id/1063579066/photo/robot-vacuum-cleaner-on-wood-laminate-floor-smart-life-concepts.jpg?s=612x612&w=0&k=20&c=vhboSujEXD6XVjMBbB7hKoMmm9w1Uyr6VYnmRG4K7Hc=',
      rating: 4.4,
      reviewCount: 142
    },
    {
      id: 'weekly4',
      name: 'Espresso Machine',
      originalPrice: 549.99,
      salePrice: 399.99,
      discount: 27,
      image: 'https://media.istockphoto.com/id/158794138/photo/coffee-machine-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=baJPc9zI0hGodO6igPa57bJ9wyR50bI7q2dNZPQeyNA=',
      rating: 4.8,
      reviewCount: 97
    },
    {
      id: 'weekly5',
      name: 'Wireless Keyboard & Mouse',
      originalPrice: 129.99,
      salePrice: 89.99,
      discount: 31,
      image: 'https://media.istockphoto.com/id/487051999/photo/computer-keyboard-and-mouse-isolated.jpg?s=612x612&w=0&k=20&c=-nnvw4SY73jwZC_QTF8-j1macQlECJklpxfLg2mkuH8=',
      rating: 4.4,
      reviewCount: 126
    },
    {
      id: 'weekly6',
      name: 'Air Purifier',
      originalPrice: 229.99,
      salePrice: 174.99,
      discount: 24,
      image: 'https://media.istockphoto.com/id/1209792354/photo/woman-sleep-with-air-purifier-in-cozy-white-bed-room-for-filter-and-cleaning-removing-dust.jpg?s=612x612&w=0&k=20&c=m81UkCvKNRGVxUYpy5oZzvUQ2EoRCZuMs7ZototEzCg=',
      rating: 4.5,
      reviewCount: 108
    },
    {
      id: 'weekly7',
      name: 'Cordless Vacuum Cleaner',
      originalPrice: 299.99,
      salePrice: 219.99,
      discount: 27,
      image: 'https://media.istockphoto.com/id/534309050/photo/female-hand-cleaning-the-sofa-couch.jpg?s=612x612&w=0&k=20&c=powdXjz_bGYJMQxSbLAFRyop66pAUzZ3dnWJGYEn1Ds=',
      rating: 4.6,
      reviewCount: 135
    },
    {
      id: 'weekly8',
      name: 'Food Processor',
      originalPrice: 189.99,
      salePrice: 129.99,
      discount: 32,
      image: 'https://media.istockphoto.com/id/188071969/photo/food-processor.jpg?s=612x612&w=0&k=20&c=63IGl0mLsbtd3S3AzWaSf-5Ps2zwuMz4W3PKHqTW9So=',
      rating: 4.4,
      reviewCount: 89
    },
    {
      id: 'weekly9',
      name: 'Home Security Camera',
      originalPrice: 159.99,
      salePrice: 119.99,
      discount: 25,
      image: 'https://media.istockphoto.com/id/1405489463/photo/three-quarter-view-of-varifocal-surveillance-camera-with-a-house-on-background.jpg?s=612x612&w=0&k=20&c=3YxtJAA4DiOgew23ZFNOgMc6Mmg29_D0oy_RWvNTA2w=',
      rating: 4.7,
      reviewCount: 112
    },
    {
      id: 'weekly10',
      name: 'Stand Mixer',
      originalPrice: 399.99,
      salePrice: 299.99,
      discount: 25,
      image: 'https://media.istockphoto.com/id/1275139572/photo/stand-mixer-isolated.jpg?s=612x612&w=0&k=20&c=mf_mVUg1Tit10cfRxGRHXHDwfBT8-IgqXIEvq22mQrU=',
      rating: 4.9,
      reviewCount: 76
    }
  ];

  // Deal categories
  const dealCategories = [
    { name: 'Tech & Gadgets', discount: 'Up to 40% Off', icon: <Tag size={20} />, color: 'bg-blue-500' },
    { name: 'Home & Kitchen', discount: 'Up to 35% Off', icon: <Percent size={20} />, color: 'bg-green-500' },
    { name: 'Fashion & Apparel', discount: 'Up to 50% Off', icon: <Tag size={20} />, color: 'bg-purple-500' },
    { name: 'Health & Beauty', discount: 'Up to 30% Off', icon: <Gift size={20} />, color: 'bg-pink-500' }
  ];

  // Add to cart function
  interface Product {
    id: string;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    image: string;
    rating: number;
    reviewCount: number;
    quantity?: number;
  }

  const addToCart = (product: Product): void => {
    const existingItem = cartItems.find((item: Product) => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map((item: Product) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setShowCartNotification(true);
  };

  // Toggle favorite
  interface FavoriteProduct {
    id: string;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    image: string;
    rating: number;
    reviewCount: number;
    quantity?: number;
  }

  const toggleFavorite = (product: FavoriteProduct): void => {
    const isFavorite = favorites.some((item: FavoriteProduct) => item.id === product.id);

    if (isFavorite) {
      setFavorites(favorites.filter((item: FavoriteProduct) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
      setShowFavNotification(true);
    }
  };

  // Check if product is in favorites
  const isInFavorites = (productId: string): boolean => {
    return favorites.some((item: FavoriteProduct) => item.id === productId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Star rating component
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  // Product card component for reusability
  const ProductCard: React.FC<{ product: Product; isFlashDeal?: boolean }> = ({ product, isFlashDeal = false }) => {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group"
        variants={itemVariants}
        whileHover={{ y: -8 }}
      >
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{product.discount}%
          </div>
          {isFlashDeal && (
            <div className="absolute top-2 left-2 z-10 bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              FLASH DEAL
            </div>
          )}
          {!isFlashDeal && (
            <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              WEEKLY DEAL
            </div>
          )}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex justify-end space-x-2">
            <motion.button
              className={`p-2 rounded-full shadow-md ${isInFavorites(product.id) ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product);
              }}
            >
              <Heart size={18} fill={isInFavorites(product.id) ? 'white' : 'transparent'} />
            </motion.button>
            <motion.button
              className="bg-white text-teal-500 p-2 rounded-full shadow-md"
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <ShoppingCart size={18} />
            </motion.button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} />
            <span className="text-gray-500 text-sm ml-2">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
              <p className="text-red-500 text-xl font-bold">${product.salePrice.toFixed(2)}</p>
            </div>
            {isFlashDeal && (
              <motion.div
                className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full font-semibold"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 10000,
                  repeat: Infinity
                }}
              >
                FLASH DEAL
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Notification component
  interface NotificationProps {
    show: boolean;
    message: string;
    icon: React.ReactNode;
    bgColor: string;
  }

  const Notification: React.FC<NotificationProps> = ({ show, message, icon, bgColor }) => {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 ${bgColor} text-white p-3 rounded-lg shadow-lg flex items-center z-50`}
          >
            {icon}
            <span className="ml-2">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Cart Modal component
  const CartModal = () => {
    const removeFromCart = (productId: string) => {
      setCartItems(cartItems.filter((item: Product) => item.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
      if (newQuantity < 1) {
        removeFromCart(productId);
        return;
      }
      setCartItems(
        cartItems.map((item: Product) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    };

    const calculateTotal = () => {
      return cartItems
        .reduce((total, item) => total + item.salePrice * (item.quantity || 1), 0)
        .toFixed(2);
    };

    return (
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-teal-500 to-blue-500 flex justify-between items-center">
                <div className="flex items-center">
                  <ShoppingCart size={28} className="text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white p-2 rounded-full hover:bg-white/20"
                  onClick={() => setShowCart(false)}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-600 text-lg">Your cart is empty.</p>
                  <motion.button
                    className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCart(false)}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="p-6 overflow-y-auto">
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {cartItems.map((item: Product) => (
                        <motion.div
                          key={item.id}
                          className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                          variants={itemVariants}
                        >
                          <div className="relative w-24 h-24 mr-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="100px"
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">${item.salePrice.toFixed(2)}</p>
                            <div className="flex items-center mt-2">
                              <motion.button
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              >
                                -
                              </motion.button>
                              <span className="bg-gray-100 px-4 py-1">{item.quantity || 1}</span>
                              <motion.button
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              >
                                +
                              </motion.button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-teal-600">
                              ${(item.salePrice * (item.quantity || 1)).toFixed(2)}
                            </p>
                            <motion.button
                              className="text-red-500 mt-2"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X size={20} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Total:</p>
                      <p className="text-2xl font-bold text-teal-600">${calculateTotal()}</p>
                    </div>
                    <motion.button
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Flash Deals Modal
  const FlashDealsModal = () => {
    return (
      <AnimatePresence>
        {showAllFlashDeals && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllFlashDeals(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-red-500 to-orange-500 flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                    className="text-white mr-3"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Clock size={28} />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">All Flash Deals</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white p-2 rounded-full hover:bg-white/20"
                  onClick={() => setShowAllFlashDeals(false)}
                >
                  <X size={24} />
                </motion.button>
              </div>
              <div className="p-6 overflow-y-auto">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {flashDeals.map(deal => (
                    <ProductCard key={deal.id} product={deal} isFlashDeal={true} />
                  ))}
                </motion.div>
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
                <motion.button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllFlashDeals(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  onClick={() => setShowCart(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  View Cart ({cartItems.length})
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Weekly Deals Modal
  const WeeklyDealsModal = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Electronics', 'Home', 'Kitchen', 'Lifestyle'];

    return (
      <AnimatePresence>
        {showAllWeeklyDeals && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllWeeklyDeals(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-teal-500 to-blue-500 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Browse Weekly Deals</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white p-2 rounded-full hover:bg-white/20"
                  onClick={() => setShowAllWeeklyDeals(false)}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {weeklyDeals.map(deal => (
                    <ProductCard key={deal.id} product={deal} isFlashDeal={false} />
                  ))}
                </motion.div>
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
                <div className="flex items-center text-gray-600">
                  <ChevronLeft size={20} />
                  <span className="mx-2">Page 1 of 3</span>
                  <ChevronRight size={20} />
                </div>

             
                  <motion.button
                    onClick={() => setShowCart(true)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    View Cart ({cartItems.length})
                  </motion.button>
              
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="space-y-12 py-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl">
        <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>

        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Amazing Deals & Discounts
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Shop our best promotions, flash sales, and weekly deals with prices you won't believe!
            </motion.p>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center space-x-4 justify-center"
              >
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <ShoppingCart className="h-5 w-5 mr-2 text-teal-500" />
                  <span className="text-white font-medium">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                  </span>
                </div>
                <motion.button
                  onClick={() => setShowCart(true)}
                  className="bg-white text-teal-600 hover:bg-teal-50 font-medium px-6 py-2 rounded-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Cart
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Flash Deals with Countdown */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <motion.div
                className="text-red-500 mr-3"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <Clock size={28} />
              </motion.div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Flash Deals</h2>
                <p className="text-gray-600">Limited-time offers at incredible prices</p>
              </div>
            </div>

            <div className="flex space-x-3 md:space-x-5">
              <div className="flex flex-col items-center bg-white px-3 py-2 rounded-lg shadow-md">
                <span className="text-xl md:text-2xl font-bold text-gray-800">{String(countdownTime.days).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Days</span>
              </div>
              <div className="flex flex-col items-center bg-white px-3 py-2 rounded-lg shadow-md">
                <span className="text-xl md:text-2xl font-bold text-gray-800">{String(countdownTime.hours).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Hours</span>
              </div>
              <div className="flex flex-col items-center bg-white px-3 py-2 rounded-lg shadow-md">
                <span className="text-xl md:text-2xl font-bold text-gray-800">{String(countdownTime.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Min</span>
              </div>
              <div className="flex flex-col items-center bg-white px-3 py-2 rounded-lg shadow-md">
                <span className="text-xl md:text-2xl font-bold text-gray-800">{String(countdownTime.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-gray-500">Sec</span>
              </div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {flashDeals.slice(0, 4).map((deal) => (
              <ProductCard key={deal.id} product={deal} isFlashDeal={true} />
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllFlashDeals(true)}
            >
              <Tag size={18} />
              <span>View All Flash Deals</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Shop Deals By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find the best savings across all departments</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 cursor-pointer group"
            >
              <div className={`${category.color} p-4 flex justify-between items-center`}>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <motion.div
                  className="bg-white p-2 rounded-full text-teal-500"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.icon}
                </motion.div>
              </div>
              <div className="p-4 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-blue-500/30 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <p className="text-gray-600 mb-2">Save big on everything you need</p>
                <p className="text-lg font-bold text-red-500">{category.discount}</p>
                <motion.button
                  className="mt-3 inline-flex items-center text-teal-500 font-semibold group-hover:text-teal-600"
                  whileHover={{ x: 5 }}
                >
                  Shop now <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Weekly Deals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">New deals every week with amazing discounts</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklyDeals.slice(0, 6).map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  WEEKLY DEAL
                </div>
                <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  -{deal.discount}%
                </div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex justify-end space-x-2">
                  <motion.button
                    className={`p-2 rounded-full shadow-md ${isInFavorites(deal.id) ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(deal);
                    }}
                  >
                    <Heart size={18} fill={isInFavorites(deal.id) ? 'white' : 'transparent'} />
                  </motion.button>
                  <motion.button
                    className="bg-white text-teal-500 p-2 rounded-full shadow-md"
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(deal);
                    }}
                  >
                    <ShoppingCart size={18} />
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{deal.name}</h3>
                <div className="flex items-center mb-2">
                  <StarRating rating={deal.rating} />
                  <span className="text-gray-500 text-sm ml-2">({deal.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm line-through">${deal.originalPrice.toFixed(2)}</span>
                    <p className="text-red-500 text-xl font-bold">${deal.salePrice.toFixed(2)}</p>
                  </div>
                  <motion.button
                    className="bg-teal-500 text-white p-2 rounded-full shadow-md"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(deal)}
                  >
                    <ShoppingCart size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllWeeklyDeals(true)}
          >
            <Tag size={18} />
            <span>Browse All Weekly Deals</span>
          </motion.button>
        </div>
      </section>

      {/* Coupon Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Extra Savings with Coupons</h2>
              <p className="text-lg text-gray-600 mb-6">
                Use these exclusive coupon codes at checkout to save even more on your purchase.
              </p>

              <div className="space-y-4">
                <motion.div
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div>
                    <span className="text-sm text-gray-500">New customers</span>
                    <h3 className="font-bold text-gray-800">15% OFF</h3>
                  </div>
                  <motion.div
                    className="bg-gray-100 px-3 py-2 rounded border border-gray-200 group cursor-pointer"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ width: "auto" }}
                      whileHover={{ width: "100%" }}
                      className="relative overflow-hidden"
                    >
                      <code className="font-mono text-teal-500 font-semibold">WELCOME15</code>
                      <motion.span
                        className="absolute inset-0 bg-teal-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Check size={16} className="mr-1" /> Copied!
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div>
                    <span className="text-sm text-gray-500">Orders over $100</span>
                    <h3 className="font-bold text-gray-800">$20 OFF</h3>
                  </div>
                  <motion.div
                    className="bg-gray-100 px-3 py-2 rounded border border-gray-200 group cursor-pointer"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ width: "auto" }}
                      whileHover={{ width: "100%" }}
                      className="relative overflow-hidden"
                    >
                      <code className="font-mono text-teal-500 font-semibold">SAVE20</code>
                      <motion.span
                        className="absolute inset-0 bg-teal-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Check size={16} className="mr-1" /> Copied!
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center"
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div>
                    <span className="text-sm text-gray-500">Free shipping</span>
                    <h3 className="font-bold text-gray-800">Any order</h3>
                  </div>
                  <motion.div
                    className="bg-gray-100 px-3 py-2 rounded border border-gray-200 group cursor-pointer"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ width: "auto" }}
                      whileHover={{ width: "100%" }}
                      className="relative overflow-hidden"
                    >
                      <code className="font-mono text-teal-500 font-semibold">FREESHIP</code>
                      <motion.span
                        className="absolute inset-0 bg-teal-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Check size={16} className="mr-1" /> Copied!
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-64 md:h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <motion.div
                    className="absolute inset-0 bg-teal-500 rounded-full opacity-20"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute inset-8 bg-teal-500 rounded-full opacity-30"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="bg-white rounded-full h-32 w-32 md:h-40 md:w-40 shadow-lg flex flex-col items-center justify-center p-4"
                      whileHover={{ rotate: [0, -5, 5, -3, 0], scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm text-gray-500">Limited Time</span>
                      <span className="text-2xl md:text-3xl font-bold text-teal-500">25% OFF</span>
                      <span className="text-sm text-gray-500">with code</span>
                      <code className="font-mono text-teal-600 font-semibold text-sm md:text-base">SUMMER25</code>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter with Special Offers */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 py-12 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Get Early Access to Deals</h2>
            <p className="mb-6 max-w-xl mx-auto text-white opacity-90">
              Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
            </p>

            <motion.form
              className="max-w-md mx-auto flex"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <motion.button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-3 rounded-r-full font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Deals
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* My Favorites Section (visible when user has favorites) */}
      {favorites.length > 0 && (
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 md:p-10"
          >
            <div className="flex items-center mb-6">
              <motion.div
                className="text-red-500 mr-3"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <Heart size={28} fill="currentColor" />
              </motion.div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Favorites</h2>
                <p className="text-gray-600">Your saved items for quick access</p>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favorites.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} isFlashDeal={product.id.startsWith('flash')} />
              ))}
            </motion.div>

            {favorites.length > 4 && (
              <div className="text-center mt-6">
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-colors inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={18} />
                  <span>View All Favorites</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* Cart & Favorites Notifications */}
      <Notification
        show={showCartNotification}
        message="Item added to your cart!"
        icon={<ShoppingCart size={18} />}
        bgColor="bg-teal-500"
      />

      <Notification
        show={showFavNotification}
        message="Added to your favorites!"
        icon={<Heart size={18} fill="white" />}
        bgColor="bg-red-500"
      />

      {/* Flash Deals Modal */}
      <FlashDealsModal />

      {/* Weekly Deals Modal */}
      <WeeklyDealsModal />

      {/* Cart Modal */}
      <CartModal />

      {/* Fixed Cart Button (visible when cart has items) */}
      {cartItems.length > 0 && (
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.button
            onClick={() => setShowCart(true)}
            className="bg-teal-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative hover:bg-teal-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        .bg-grid-white\/10 {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}