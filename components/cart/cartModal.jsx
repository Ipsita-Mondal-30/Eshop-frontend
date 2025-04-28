'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

import PropTypes from 'prop-types';

const CartItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  salePrice: PropTypes.number.isRequired,
  quantity: PropTypes.number,
});

const CartModal = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    }

    if (showCart) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCart]);

  // Cart total calculation
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.salePrice * (item.quantity || 1));
  }, 0);

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <>
      {/* Cart toggle button */}
      <button 
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center justify-center p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Open Cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
          >
            <motion.div
              ref={cartRef}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
              variants={modalVariants}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart content */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                      <ShoppingCart className="w-full h-full" />
                    </div>
                    <p className="text-lg text-gray-500">Your cart is empty</p>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y">
                    {cartItems.map(item => (
                      <li key={item.id} className="py-4 flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.salePrice * (item.quantity || 1)).toFixed(2)}</p>
                          </div>

                          <div className="flex items-end justify-between text-sm mt-2">
                            <div className="text-gray-500 flex items-center border rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                className="px-2 py-1 border-r hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity || 1}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                className="px-2 py-1 border-l hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowCart(false)}
                      className="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-500"
                    >
                      Continue Shopping
                    </button>
                    <button
                      className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartModal;
