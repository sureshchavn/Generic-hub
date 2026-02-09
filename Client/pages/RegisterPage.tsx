import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { EyeIcon, EyeOffIcon } from '../components/icons';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.username) newErrors.username = 'Username is required.';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    // Phone validation
    if (!formData.phone) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits.';
    }

    // Age validation
    if (!formData.age) {
        newErrors.age = 'Age is required.';
    } else if (isNaN(parseInt(formData.age, 10)) || parseInt(formData.age, 10) < 18) {
        newErrors.age = 'You must be 18 or older to create an account.';
    }
    
    // Password validation
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!passRegex.test(formData.password)) {
      newErrors.password = 'Password must be 8+ characters and include uppercase, lowercase, number, and special character.';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (validate()) {
      const { success, message } = register({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          age: parseInt(formData.age, 10),
      }, formData.password);

      if (success) {
        // Redirect to login page with a success message
        navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } });
      } else {
        setApiError(message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const labelClass = "text-gray-700 dark:text-gray-300";
  const inputBaseClass = "mt-1 relative block w-full appearance-none rounded-md border px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400";

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <Logo />
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className={labelClass}>Full Name</label>
              <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className={`${inputBaseClass} ${errors.fullName ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
              {errors.fullName && <p className="text-xs text-danger mt-1">{errors.fullName}</p>}
            </div>
             <div>
              <label htmlFor="username" className={labelClass}>Username</label>
              <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} className={`${inputBaseClass} ${errors.username ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
              {errors.username && <p className="text-xs text-danger mt-1">{errors.username}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email address</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={`${inputBaseClass} ${errors.email ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className={`${inputBaseClass} ${errors.phone ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="age" className={labelClass}>Age</label>
              <input id="age" name="age" type="number" required value={formData.age} onChange={handleChange} className={`${inputBaseClass} ${errors.age ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
              {errors.age && <p className="text-xs text-danger mt-1">{errors.age}</p>}
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="password" className={labelClass}>Password</label>
            <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className={`${inputBaseClass} ${errors.password ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
             <button type="button" className="absolute top-8 right-0 px-3 flex items-center text-gray-500 hover:text-primary dark:text-gray-400" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className={`${inputBaseClass} ${errors.confirmPassword ? 'border-danger' : 'border-gray-300 dark:border-gray-600'}`} />
            {errors.confirmPassword && <p className="text-xs text-danger mt-1">{errors.confirmPassword}</p>}
          </div>
          
          {apiError && <p className="text-sm text-danger text-center">{apiError}</p>}

          <div>
            <button type="submit" className="group mt-4 relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2.5 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform duration-300 ease-in-out hover:scale-105">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;