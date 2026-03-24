import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useDirection } from '../../hooks/useDirection';

export const Layout: React.FC = () => {
  useDirection();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
