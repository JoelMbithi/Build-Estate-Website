import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import newRequest from '../utils/newRequest';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      const res = await newRequest.post("/auth/login", data);
      
      // Store auth data
      localStorage.setItem('userId', res.data.user.id); 
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('token', res.data.token);
      console.log("User data",res.data.user)
      // Redirect without reload
      if (res.data.user.role === 'admin') {
        navigate('/admin', { replace: true });
        window.location.reload();
      } else {
        navigate('/', { replace: true });
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-md w-full max-w-md'>
        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <h2 className='text-2xl font-bold text-center'>Login</h2>
          
          {error && (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
              {error}
            </div>
          )}

          <div>
            <label className='block font-medium mb-1'>Email:</label>
            <input
              name="email"
              type="email"
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div>
            <label className='block font-medium mb-1'>Password:</label>
            <input
              name="password"
              type="password"
              className='w-full p-2 border rounded'
              required
              minLength="4"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white p-2 rounded ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div className='text-center pt-2'>
          <Link to="/register" className='text-blue-600 hover:underline'>
             Forgot Password
            </Link>
          </div>
          <div className='text-center pt-4'>
            
            <Link to="/register" className='text-blue-600 hover:underline'>
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;