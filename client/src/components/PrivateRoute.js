import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem('userToken') !== null; // Replace this with your own authentication logic
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
