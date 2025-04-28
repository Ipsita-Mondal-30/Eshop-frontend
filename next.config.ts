// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'via.placeholder.com',
      'randomuser.me',
      'example.com', // Add the external domain here if you're using images from example.com
      'media.istockphoto.com',
      'images.remotePatterns.com',
    ],
  },
};

export default nextConfig;
