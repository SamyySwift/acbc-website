import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Lock, Mail, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (loginError) throw loginError;

      if (data.user) {
        // Check if user is actually an admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile?.is_admin) {
          await supabase.auth.signOut();
          throw new Error('Access denied. You do not have administrator privileges.');
        }

        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
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
        <h2 className="text-center text-3xl font-heading text-primary">Admin Access</h2>
        <p className="mt-2 text-center text-gray-600">Sign in to manage college applications</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border-l-4 border-red-500">
                {error}
              </div>
            )}

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

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center gap-2 py-4"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In To Dashboard'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <Link to="/admin/register" className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
                New Admin? Register here
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

export default AdminLogin;
