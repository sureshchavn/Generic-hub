import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { EyeIcon, EyeOffIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(usernameOrEmail, password, rememberMe);
    if (success) {
      // Determine redirect path after successful login
      const from = location.state?.from?.pathname;
      const isAdmin = usernameOrEmail === 'admin' || usernameOrEmail === 'admin@generichub.com';
      const targetPath = from || (isAdmin ? '/admin' : '/');
      navigate(targetPath, { replace: true });
    } else {
      setError('Invalid username/email or password.');
    }
  };

  const inputClass = "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400";

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <Logo />
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link to="/register" className="font-medium text-primary hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="usernameOrEmail" className="sr-only">Username or Email</label>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                autoComplete="email"
                required
                className={inputClass}
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password"className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className={inputClass}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                onClick={() => setPasswordVisible(!passwordVisible)}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-blue-500">
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && <p className="text-sm text-danger text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2.5 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>
         <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
            <p className="font-semibold">Demo Credentials:</p>
            <p>Admin: <span className="font-mono">admin</span> / <span className="font-mono">admin123</span></p>
            <p>Register any other account for customer view.</p>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;