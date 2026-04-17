import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { EyeIcon, EyeOffIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth(); // ✅ USE CONTEXT
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(usernameOrEmail, password, rememberMe);

    if (success) {
      // 🔥 IMPORTANT (fresh user read)
      const storedUser = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user")!
      );

      if (storedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setError("Invalid username/email or password ❌");
    }
  };

  const inputClass = "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2.5 text-gray-900";

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <Logo />

        <h2 className="text-center text-2xl font-bold">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className={inputClass}
          />

          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-2"
            >
              {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>

        <p className="text-center text-sm">
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;