import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dummy data for testing
    const dummyUsers = {
      'admin': { phone: 'admin', password: 'admin', role: 'ADMIN', name: 'Admin User' },
      'teknisi': { phone: 'teknisi', password: 'teknisi', role: 'TECHNICIAN', name: 'Teknisi User' }
    };
    
    const user = dummyUsers[phone];
    
    if (user && user.password === password) {
      // Simulate login
      const dummyToken = 'dummy-token-' + Date.now();
      const userData = {
        id: user.role === 'ADMIN' ? '1' : '2',
        name: user.name,
        phone: user.phone,
        role: user.role
      };
      
      localStorage.setItem('token', dummyToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Navigate based on role
      if (user.role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/technician');
      }
    } else {
      setError('Invalid credentials. Use "admin" or "teknisi" for both phone and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login System Laporan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded mt-1" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full border p-2 rounded mt-1" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-700">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Admin: phone=<code>admin</code>, password=<code>admin</code></p>
            <p>Teknisi: phone=<code>teknisi</code>, password=<code>teknisi</code></p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
