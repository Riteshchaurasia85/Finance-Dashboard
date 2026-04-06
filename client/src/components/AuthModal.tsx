import React, { useState } from 'react';
import { X, LogIn, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole } = useAppContext();
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      // Handle logout
      setRole('viewer');
      onClose();
    } else {
      // Simulate login
      if (username && password) {
        setRole('admin');
        onClose();
      }
    }
  };

  const handleLogout = () => {
    setRole('viewer');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-bg-primary rounded-2xl w-full max-w-sm p-6 md:p-8 relative border border-border-color shadow-2xl animate">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text-primary flex items-center justify-center p-1 rounded-md hover:bg-bg-tertiary transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
            {role === 'admin' ? <LogOut size={32} /> : <LogIn size={32} />}
          </div>
          <h2 className="text-2xl font-bold">
            {role === 'admin' ? 'Logout' : (isLoginView ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p className="text-text-secondary text-sm mt-1 text-center">
            {role === 'admin' 
              ? 'Are you sure you want to log out of your admin account?' 
              : 'Enter your credentials to access the dashboard.'}
          </p>
        </div>

        {role === 'admin' ? (
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border-color font-medium hover:bg-bg-tertiary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 py-2.5 rounded-xl bg-danger text-white font-medium hover:opacity-90 transition-opacity"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Username</label>
              <input 
                type="text" 
                required
                className="w-full bg-bg-tertiary border border-border-color rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-bg-tertiary border border-border-color rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="mt-2 w-full bg-accent-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </button>
            
            <p className="text-center text-sm text-text-secondary mt-2">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-accent-primary hover:underline font-medium"
              >
                {isLoginView ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
