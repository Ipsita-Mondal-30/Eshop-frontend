'use client';

import React from 'react';
import Image from 'next/image';
import { updateCartItem, removeCartItem } from '@/services/cartService';
import { getSessionId } from '@/utils/sessionId';

const CartItems = ({ cartItems, onCartUpdate }) => {
  const handleQuantityChange = async (productId, quantity) => {
    try {
      const sessionId = getSessionId();
      await updateCartItem(sessionId, productId, quantity);
      onCartUpdate();
    } catch (error) {
      console.error('Error updating cart item:', error);
      alert('Failed to update cart item');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const sessionId = getSessionId();
      await removeCartItem(sessionId, productId);
      onCartUpdate();
    } catch (error) {
      console.error('Error removing cart item:', error);
      alert('Failed to remove cart item');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                Subtotal
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-500">
            {cartItems.map((item) => (
              <tr key={item.productId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 mr-4">
                      <Image
                        src={item.imageUrl || '/images/placeholder.jpg'}
                        alt={item.productName}
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  ${item.price?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleQuantityChange(item.productId, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-500 rounded-l"
                    >
                      -
                    </button>
                    <span className="w-10 text-center border-t border-b border-gray-400 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-400 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItems;
//hii