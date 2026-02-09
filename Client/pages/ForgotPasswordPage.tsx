import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const ForgotPasswordPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { getUserByUsernameOrEmail } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    // In a real app, this would trigger an email.
    // For this demo, we'll retrieve the password from our simulated storage.
    const account = getUserByUsernameOrEmail(identifier);
    
    if (account && account.password) {
      setMessage(`Password for '${account.user.username}' is: ${account.password}`);
      setIsError(false);
    } else {
      setMessage('No account found with that username or email.');
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
        <Logo />
        <div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your username or email and we'll help you recover your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="identifier" className="sr-only">Username or Email</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>
          
          {message && (
            <p className={`text-sm text-center ${isError ? 'text-danger' : 'text-accent'}`}>
              {message}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Retrieve Password
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
            <Link to="/login" className="font-medium text-primary hover:text-blue-500">
              &larr; Back to Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;