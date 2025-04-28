import { AppProps } from 'next/app';
import AuthProvider from '@/app/context/authContext';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </AuthProvider>
  );
}

export default MyApp;
