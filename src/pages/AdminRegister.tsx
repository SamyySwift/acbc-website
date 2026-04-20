import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ShieldCheck, Mail, Lock, User, Key, ArrowLeft, Loader2 } from 'lucide-react';

const AdminRegister: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    activationCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isAdmin = formData.activationCode === 'ADMIN';

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            is_admin: isAdmin
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        alert('Registration successful! Please login.');
        navigate('/admin/login');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 pt-[120px]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center shadow-xl">
            <ShieldCheck size={32} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-heading text-primary">Admin Registration</h2>
        <p className="mt-2 text-center text-gray-600">Create an account for college staff</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border-l-4 border-red-500">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input
                  name="fullName"
                  type="text"
                  required
                  className="form-input pl-10"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="form-input pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@acbc.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  className="form-input pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
              <label className="block text-sm font-semibold text-primary uppercase tracking-wider mb-2">Admin Activation Code</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Key size={18} />
                </span>
                <input
                  name="activationCode"
                  type="text"
                  className="form-input pl-10 border-secondary/30 focus:border-secondary shadow-sm"
                  value={formData.activationCode}
                  onChange={handleChange}
                  placeholder="Enter activation code"
                />
              </div>
              <p className="mt-2 text-[0.75rem] text-primary/60 italic font-medium">Required for full administrative access to student data.</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center gap-2 py-4"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Admin Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <Link to="/admin/login" className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
                Already have an account? Login
              </Link>
              <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
