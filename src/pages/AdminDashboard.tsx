import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { 
  Users, 
  Search, 
  ExternalLink, 
  LogOut, 
  Mail, 
  Phone, 
  Calendar, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Download,
  Newspaper,
  Plus,
  Trash2,
  Edit2,
  Save,
  FileEdit
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'applications' | 'news' | 'fees'>('applications');

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isAppEditing, setIsAppEditing] = useState(false);
  const [editingNews, setEditingNews] = useState<any | null>(null);
  const [editingFee, setEditingFee] = useState<any | null>(null);
  const [appEditForm, setAppEditForm] = useState<any | null>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, admitted: 0 });


  
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'General'
  });

  const [feeForm, setFeeForm] = useState({
    name: '',
    amount: '',
    order_index: 0
  });


  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
      
      // Calculate stats
      const pending = data?.filter(app => app.status === 'pending').length || 0;
      const admitted = data?.filter(app => app.status === 'admitted').length || 0;
      setStats({ total: data?.length || 0, pending, admitted });
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const fetchFees = async () => {
    try {
      const { data, error } = await supabase
        .from('tuition_fees')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setFees(data || []);
    } catch (err) {
      console.error('Error fetching fees:', err);
    }
  };


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
    fetchNews();
    fetchFees();
  }, []);


  // ... (rest of the logic remains the same)

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update({ ...newsForm })
          .eq('id', editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news')
          .insert([{ ...newsForm, author_id: user?.id }]);
        if (error) throw error;
      }

      setIsNewsModalOpen(false);
      setEditingNews(null);
      setNewsForm({ title: '', excerpt: '', content: '', image_url: '', category: 'General' });
      fetchNews();
    } catch (err) {
      console.error('Error saving news:', err);
      alert('Failed to save news post');
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news post?')) return;
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      fetchNews();
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this candidate application? This action cannot be undone.')) return;
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (error) throw error;
      fetchApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application');
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state and await full refresh
      await fetchApplications();
      if (selectedApp) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }

    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update application status');
    } finally {
      setLoading(false);
    }
  };

  const handleAppUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ ...appEditForm })
        .eq('id', selectedApp.id);

      if (error) throw error;
      
      setIsAppEditing(false);
      fetchApplications();
      setSelectedApp({ ...appEditForm });
    } catch (err) {
      console.error('Error updating application details:', err);
      alert('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };


  const handleFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFee) {
        const { error } = await supabase
          .from('tuition_fees')
          .update({ ...feeForm })
          .eq('id', editingFee.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tuition_fees')
          .insert([feeForm]);
        if (error) throw error;
      }

      setIsFeeModalOpen(false);
      setEditingFee(null);
      setFeeForm({ name: '', amount: '', order_index: 0 });
      fetchFees();
    } catch (err) {
      console.error('Error saving fee:', err);
      alert('Failed to save tuition fee');
    } finally {
      setLoading(false);
    }
  };

  const deleteFee = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tuition fee item?')) return;
    try {
      const { error } = await supabase.from('tuition_fees').delete().eq('id', id);
      if (error) throw error;
      fetchFees();
    } catch (err) {
      console.error('Error deleting fee:', err);
      alert('Failed to delete tuition fee');
    }
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const filteredApps = applications.filter(app => 
    `${app.surname} ${app.other_names}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.programme?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'admitted': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary text-white transition-transform duration-300 transform lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-lg">
                <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-heading mb-0">ACBC Admin</h2>
                <span className="text-[0.6rem] uppercase tracking-widest text-secondary font-bold">Control Panel</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            <button 
              onClick={() => { setActiveTab('applications'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'applications' ? 'bg-secondary text-primary font-bold shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <Users size={22} />
              <span className="text-sm uppercase tracking-wider">Applications</span>
            </button>
            <button 
              onClick={() => { setActiveTab('news'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'news' ? 'bg-secondary text-primary font-bold shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <Newspaper size={22} />
              <span className="text-sm uppercase tracking-wider">News Management</span>
            </button>
            <button 
              onClick={() => { setActiveTab('fees'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'fees' ? 'bg-secondary text-primary font-bold shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <Calendar size={22} />
              <span className="text-sm uppercase tracking-wider">Tuition & Fees</span>
            </button>

          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut size={22} />
              <span className="text-sm uppercase tracking-wider font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40">
           <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="" className="w-8 h-8 object-contain" />
              <h1 className="font-heading text-primary text-lg">ACBC Admin</h1>
           </div>
           <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-primary hover:bg-gray-50 rounded-lg"
           >
              {mobileMenuOpen ? <XCircle size={24} /> : <MoreVertical size={24} />}
           </button>
        </header>

        <div className="p-6 md:p-10 lg:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading text-primary flex items-center gap-4">
                {activeTab === 'applications' && <div className="p-3 bg-secondary/20 rounded-2xl text-secondary"><Users size={32} /></div>}
                {activeTab === 'news' && <div className="p-3 bg-secondary/20 rounded-2xl text-secondary"><Newspaper size={32} /></div>}
                {activeTab === 'fees' && <div className="p-3 bg-secondary/20 rounded-2xl text-secondary"><Calendar size={32} /></div>}
                
                {activeTab === 'applications' && 'Student Admissions'}
                {activeTab === 'news' && 'Campus News Hub'}
                {activeTab === 'fees' && 'Tuition & Fees'}
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl">
                {activeTab === 'applications' && 'Review, manage and process student applications for the upcoming academic session.'}
                {activeTab === 'news' && 'Broadcast updates, academic calendars and campus highlights to the college website.'}
                {activeTab === 'fees' && 'Manage tuition costs, application fees, and other school-related expenses.'}
              </p>

            </div>
          </div>

        {/* Stats Grid - Only for Applications */}
        {activeTab === 'applications' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Applications</span>
            <div className="text-4xl font-heading text-primary mt-2">{stats.total}</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <span className="text-amber-500 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} /> Pending Review
            </span>
            <div className="text-4xl font-heading text-primary mt-2">{stats.pending}</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <span className="text-green-500 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> Admissions Granted
            </span>
            <div className="text-4xl font-heading text-primary mt-2">{stats.admitted}</div>
          </motion.div>
        </div>
        )}

        {/* Filters & Search - Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search by name, email or program..."
                className="form-input pl-10 bg-gray-50 border-none hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-secondary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none btn bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-2 px-6">
                <Filter size={18} /> Filter
              </button>
              <button className="flex-1 md:flex-none btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2 px-6">
                <Download size={18} /> Export
              </button>
            </div>
          </div>
        )}

        {/* Action Bar - News Tab */}
        {activeTab === 'news' && (
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search news articles..."
                className="form-input pl-10 bg-gray-50 border-none hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-secondary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => {
                setEditingNews(null);
                setNewsForm({ title: '', excerpt: '', content: '', image_url: '', category: 'General' });
                setIsNewsModalOpen(true);
              }}
              className="w-full md:w-auto btn btn-secondary flex items-center gap-2 px-8"
            >
              <Plus size={20} /> Create News Post
            </button>
          </div>
        )}

        {/* Action Bar - Fees Tab */}
        {activeTab === 'fees' && (
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="text-primary font-bold px-2">Total Fee Items: {fees.length}</div>
            <button 
              onClick={() => {
                setEditingFee(null);
                setFeeForm({ name: '', amount: '', order_index: fees.length });
                setIsFeeModalOpen(true);
              }}
              className="w-full md:w-auto btn btn-secondary flex items-center gap-2 px-8"
            >
              <Plus size={20} /> Add Fee Item
            </button>
          </div>
        )}


        {/* Table Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            {activeTab === 'applications' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Candidate</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Programme</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Applied Date</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Status</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="p-8 bg-gray-50/20"></td>
                      </tr>
                    ))
                  ) : filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center text-gray-400 italic">No applications found matching your criteria.</td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#0a192f1A] flex items-center justify-center text-primary font-bold overflow-hidden shadow-sm">
                              {app.passport_photo_url ? (
                                <img src={app.passport_photo_url} className="w-full h-full object-cover" alt="" />
                              ) : (
                                app.surname[0]
                              )}
                            </div>
                            <div>
                               <div className="font-bold text-primary">{app.surname} {app.other_names}</div>
                               <div className="text-sm text-gray-500">{app.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-sm font-medium text-gray-700">{app.programme}</div>
                          <div className="text-xs text-secondary font-bold uppercase mt-0.5">{app.department}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar size={14} /> {new Date(app.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setSelectedApp(app);
                                setAppEditForm({ ...app });
                                setIsAppEditing(false);
                              }}
                              className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                              title="View Details"
                            >

                              <ExternalLink size={20} />
                            </button>
                            <button 
                              onClick={() => deleteApplication(app.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Application"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'news' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">News Post</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Category</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Published</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="p-8 bg-gray-50/20"></td>
                      </tr>
                    ))
                  ) : news.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-400 italic">No news articles published yet.</td>
                    </tr>
                  ) : (
                    news.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-6 max-w-[400px]">
                          <div className="flex items-center gap-4">
                            {item.image_url && (
                              <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-primary truncate">{item.title}</div>
                              <div className="text-xs text-gray-500 line-clamp-1">{item.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-secondary/10 text-secondary text-[0.7rem] font-bold rounded-lg uppercase tracking-wider">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar size={14} /> {new Date(item.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingNews(item);
                                setNewsForm({
                                  title: item.title,
                                  excerpt: item.excerpt,
                                  content: item.content,
                                  image_url: item.image_url || '',
                                  category: item.category || 'General'
                                });
                                setIsNewsModalOpen(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => deleteNews(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'fees' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Fee Description</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Amount</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider">Order</th>
                    <th className="p-6 font-bold text-primary uppercase text-xs tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="p-8 bg-gray-50/20"></td>
                      </tr>
                    ))
                  ) : fees.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-400 italic">No tuition fees configured.</td>
                    </tr>
                  ) : (
                    fees.map((fee) => (
                      <tr key={fee.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-6">
                          <div className="font-bold text-primary">{fee.name}</div>
                        </td>
                        <td className="p-6">
                          <span className="text-secondary font-bold">{fee.amount}</span>
                        </td>
                        <td className="p-6">
                          <div className="text-sm text-gray-500">{fee.order_index}</div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2">
                             <button 
                              onClick={() => {
                                setEditingFee(fee);
                                setFeeForm({
                                  name: fee.name,
                                  amount: fee.amount,
                                  order_index: fee.order_index
                                });
                                setIsFeeModalOpen(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => deleteFee(fee.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-primary/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                <div className="flex gap-6 items-center">
                   <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
                      {selectedApp.passport_photo_url ? (
                        <img 
                          src={selectedApp.passport_photo_url} 
                          className="w-full h-full object-cover"
                          alt="Passport"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Users size={32} />
                        </div>
                      )}
                   </div>
                   <div>
                      {isAppEditing ? (
                        <div className="flex gap-4">
                          <input 
                            type="text"
                            className="text-2xl text-primary font-heading uppercase bg-transparent border-b border-secondary focus:outline-none"
                            value={appEditForm.surname}
                            onChange={(e) => setAppEditForm({ ...appEditForm, surname: e.target.value })}
                            placeholder="Surname"
                          />
                          <input 
                            type="text"
                            className="text-2xl text-primary font-heading uppercase bg-transparent border-b border-secondary focus:outline-none"
                            value={appEditForm.other_names}
                            onChange={(e) => setAppEditForm({ ...appEditForm, other_names: e.target.value })}
                            placeholder="Other Names"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <h2 className="text-3xl text-primary font-heading uppercase">{selectedApp.surname} {selectedApp.other_names}</h2>
                          <span className={`px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest border ${getStatusColor(selectedApp.status)}`}>
                            {selectedApp.status}
                          </span>
                        </div>
                      )}

                      <div className="flex gap-4 mt-2">
                        {isAppEditing ? (
                          <>
                            <input 
                              type="email"
                              className="text-sm text-gray-600 font-medium bg-transparent border-b border-secondary focus:outline-none"
                              value={appEditForm.email}
                              onChange={(e) => setAppEditForm({ ...appEditForm, email: e.target.value })}
                            />
                            <input 
                              type="tel"
                              className="text-sm text-gray-600 font-medium bg-transparent border-b border-secondary focus:outline-none"
                              value={appEditForm.phone_number}
                              onChange={(e) => setAppEditForm({ ...appEditForm, phone_number: e.target.value })}
                            />
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                              <Mail size={16} className="text-secondary" /> {selectedApp.email}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                              <Phone size={16} className="text-secondary" /> {selectedApp.phone_number}
                            </span>
                          </>
                        )}
                      </div>
                   </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (isAppEditing) {
                        setAppEditForm({ ...selectedApp });
                      }
                      setIsAppEditing(!isAppEditing);
                    }}
                    className={`p-2 rounded-full transition-colors ${isAppEditing ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'hover:bg-gray-200 text-gray-400'}`}
                    title={isAppEditing ? "Cancel Editing" : "Edit Application"}
                  >
                    {isAppEditing ? <XCircle size={28} /> : <FileEdit size={28} />}
                  </button>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <XCircle size={28} className="text-gray-400" />
                  </button>
                </div>
              </div>


              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[60vh] overflow-y-auto">
                <div className="space-y-8">
                   <section>
                      <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Academic Selection</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-500 font-medium">Programme</span>
                           {isAppEditing ? (
                              <select 
                                className="text-sm font-bold text-primary bg-gray-50 p-1 rounded"
                                value={appEditForm.programme}
                                onChange={(e) => setAppEditForm({ ...appEditForm, programme: e.target.value })}
                              >
                                <option value="Certificate">Certificate</option>
                                <option value="Diploma">Diploma</option>
                                <option value="B. A. Theology">B. A. Theology</option>
                                <option value="Christian Education">Christian Education</option>
                              </select>
                           ) : (
                              <span className="text-primary font-bold">{selectedApp.programme}</span>
                           )}
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-500 font-medium">Department</span>
                           {isAppEditing ? (
                              <select 
                                className="text-sm font-bold text-primary bg-gray-50 p-1 rounded"
                                value={appEditForm.department}
                                onChange={(e) => setAppEditForm({ ...appEditForm, department: e.target.value })}
                              >
                                <option value="Biblical Studies">Biblical Studies</option>
                                <option value="Theology">Theology</option>
                                <option value="Christian Education">Christian Education</option>
                                <option value="Missions & Evangelism">Missions & Evangelism</option>
                                <option value="Pastoral Ministry">Pastoral Ministry</option>
                              </select>
                           ) : (
                              <span className="text-primary font-bold">{selectedApp.department}</span>
                           )}
                        </div>

                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-500 font-medium">Form No</span>
                           {isAppEditing ? (
                              <input 
                                type="text"
                                className="text-sm font-bold text-primary bg-gray-50 p-1 rounded text-right"
                                value={appEditForm.form_no}
                                onChange={(e) => setAppEditForm({ ...appEditForm, form_no: e.target.value })}
                              />
                           ) : (
                              <span className="text-primary font-bold">{selectedApp.form_no}</span>
                           )}
                        </div>
                      </div>
                   </section>

                   <section>
                      <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Personal Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-xl">
                           <p className="text-[0.6rem] text-gray-400 uppercase font-bold">Gender</p>
                           {isAppEditing ? (
                              <select 
                                className="font-bold text-primary bg-white/50 w-full mt-1"
                                value={appEditForm.sex}
                                onChange={(e) => setAppEditForm({ ...appEditForm, sex: e.target.value })}
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                           ) : (
                              <p className="font-bold text-primary">{selectedApp.sex}</p>
                           )}
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl">
                           <p className="text-[0.6rem] text-gray-400 uppercase font-bold">DOB</p>
                           {isAppEditing ? (
                              <input 
                                type="date"
                                className="font-bold text-primary bg-white/50 w-full mt-1"
                                value={appEditForm.date_of_birth}
                                onChange={(e) => setAppEditForm({ ...appEditForm, date_of_birth: e.target.value })}
                              />
                           ) : (
                              <p className="font-bold text-primary">{selectedApp.date_of_birth}</p>
                           )}
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl col-span-2">
                           <p className="text-[0.6rem] text-gray-400 uppercase font-bold">State / Nationality</p>
                           {isAppEditing ? (
                              <div className="flex gap-2">
                                <input 
                                  type="text"
                                  className="font-bold text-primary bg-white/50 w-full mt-1"
                                  value={appEditForm.state_of_origin}
                                  onChange={(e) => setAppEditForm({ ...appEditForm, state_of_origin: e.target.value })}
                                />
                                <input 
                                  type="text"
                                  className="font-bold text-primary bg-white/50 w-full mt-1"
                                  value={appEditForm.nationality}
                                  onChange={(e) => setAppEditForm({ ...appEditForm, nationality: e.target.value })}
                                />
                              </div>
                           ) : (
                              <p className="font-bold text-primary">{selectedApp.state_of_origin}, {selectedApp.nationality}</p>
                           )}
                        </div>
                      </div>
                   </section>
                </div>

                <div className="space-y-8">
                   <section>
                      <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Information</h4>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                         <p className="text-[0.6rem] text-gray-400 uppercase font-bold mb-1">Permanent Address</p>
                         {isAppEditing ? (
                            <textarea 
                              className="text-sm text-primary font-medium w-full bg-white/50 rounded p-2"
                              value={appEditForm.permanent_address}
                              onChange={(e) => setAppEditForm({ ...appEditForm, permanent_address: e.target.value })}
                            />
                         ) : (
                            <p className="text-sm text-primary font-medium">{selectedApp.permanent_address}</p>
                         )}
                         <div className="h-[1px] bg-gray-200 my-4"></div>
                         <p className="text-[0.6rem] text-gray-400 uppercase font-bold mb-1">Church Affiliation</p>
                         {isAppEditing ? (
                            <textarea 
                              className="text-sm text-primary font-medium w-full bg-white/50 rounded p-2"
                              value={appEditForm.church_affiliation}
                              onChange={(e) => setAppEditForm({ ...appEditForm, church_affiliation: e.target.value })}
                            />
                         ) : (
                            <p className="text-sm text-primary font-medium">{selectedApp.church_affiliation}</p>
                         )}
                      </div>
                   </section>

                   <section>
                      <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Health Status</h4>
                      <div className={`p-4 rounded-2xl border ${isAppEditing ? (appEditForm.is_healthy ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100') : (selectedApp.is_healthy ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100')}`}>
                         <div className="flex items-center gap-3">
                            {isAppEditing ? (
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="checkbox"
                                  checked={appEditForm.is_healthy}
                                  onChange={(e) => setAppEditForm({ ...appEditForm, is_healthy: e.target.checked })}
                                />
                                <span className={`font-bold ${appEditForm.is_healthy ? 'text-green-700' : 'text-red-700'}`}>
                                  {appEditForm.is_healthy ? 'Healthy' : 'Reported Issues'}
                                </span>
                              </label>
                            ) : (
                              selectedApp.is_healthy ? (
                                <><CheckCircle2 className="text-green-500" /> <span className="font-bold text-green-700">Healthy</span></>
                              ) : (
                                <><XCircle className="text-red-500" /> <span className="font-bold text-red-700">Reported Issues</span></>
                              )
                            )}
                         </div>
                         {isAppEditing ? (
                            !appEditForm.is_healthy && (
                              <textarea 
                                className="mt-2 text-sm text-red-600 italic w-full bg-white/50 p-2 rounded"
                                value={appEditForm.health_problems}
                                onChange={(e) => setAppEditForm({ ...appEditForm, health_problems: e.target.value })}
                              />
                            )
                         ) : (
                            !selectedApp.is_healthy && <p className="mt-2 text-sm text-red-600 italic">"{selectedApp.health_problems}"</p>
                         )}
                      </div>
                   </section>

                   <section>
                      <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Next of Kin & Sponsor</h4>
                      <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
                         <div>
                            <p className="text-[0.6rem] text-gray-400 uppercase font-bold mb-1">Next of Kin</p>
                            {isAppEditing ? (
                               <div className="space-y-2">
                                  <input 
                                    type="text"
                                    className="text-sm text-primary font-medium w-full bg-white shadow-sm rounded p-1"
                                    value={appEditForm.next_of_kin_name || ''}
                                    placeholder="Name"
                                    onChange={(e) => setAppEditForm({ ...appEditForm, next_of_kin_name: e.target.value })}
                                  />
                                  <div className="flex gap-2">
                                     <input 
                                       type="text"
                                       className="text-sm text-primary font-medium w-full bg-white shadow-sm rounded p-1"
                                       value={appEditForm.next_of_kin_relationship || ''}
                                       placeholder="Relationship"
                                       onChange={(e) => setAppEditForm({ ...appEditForm, next_of_kin_relationship: e.target.value })}
                                     />
                                     <input 
                                       type="text"
                                       className="text-sm text-primary font-medium w-full bg-white shadow-sm rounded p-1"
                                       value={appEditForm.next_of_kin_phone || ''}
                                       placeholder="Phone"
                                       onChange={(e) => setAppEditForm({ ...appEditForm, next_of_kin_phone: e.target.value })}
                                     />
                                  </div>
                               </div>
                            ) : (
                               <p className="text-sm text-primary font-medium">
                                 {selectedApp.next_of_kin_name} ({selectedApp.next_of_kin_relationship})
                               </p>
                            )}
                         </div>
                         <div className="h-[1px] bg-gray-200"></div>
                         <div>
                            <p className="text-[0.6rem] text-gray-400 uppercase font-bold mb-1">Sponsor Details</p>
                            {isAppEditing ? (
                               <div className="space-y-2">
                                  <input 
                                    type="text"
                                    className="text-sm text-primary font-medium w-full bg-white shadow-sm rounded p-1"
                                    value={appEditForm.sponsor_name || ''}
                                    placeholder="Sponsor Name"
                                    onChange={(e) => setAppEditForm({ ...appEditForm, sponsor_name: e.target.value })}
                                  />
                                  <textarea 
                                    className="text-sm text-primary font-medium w-full bg-white shadow-sm rounded p-1 h-12"
                                    value={appEditForm.sponsor_address || ''}
                                    placeholder="Sponsor Address"
                                    onChange={(e) => setAppEditForm({ ...appEditForm, sponsor_address: e.target.value })}
                                  />
                               </div>
                            ) : (
                               <p className="text-sm text-primary font-medium">
                                 {selectedApp.sponsor_name || 'No sponsor listed'}
                               </p>
                            )}
                         </div>
                      </div>
                   </section>
                </div>

              </div>


              <div className="p-8 bg-gray-50/50 flex gap-4 justify-end">
                  {isAppEditing ? (
                    <button 
                      onClick={handleAppUpdate}
                      disabled={loading}
                      className="btn btn-primary px-10 flex items-center gap-2"
                    >
                      {loading ? <Clock className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => updateApplicationStatus(selectedApp.id, 'rejected')}
                        disabled={loading || selectedApp.status === 'rejected'}
                        className={`btn bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2 ${selectedApp.status === 'rejected' ? 'opacity-50 cursor-not-allowed bg-red-50/50' : ''}`}
                      >
                        {loading ? <Clock className="animate-spin" size={18} /> : (selectedApp.status === 'rejected' ? 'Application Rejected' : 'Reject')}
                      </button>
                      <button 
                        onClick={() => updateApplicationStatus(selectedApp.id, 'admitted')}
                        disabled={loading || selectedApp.status === 'admitted'}
                        className={`btn btn-primary px-10 flex items-center gap-2 ${selectedApp.status === 'admitted' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? <Clock className="animate-spin" size={18} /> : (selectedApp.status === 'admitted' ? 'Student Admitted' : 'Admit Student')}
                      </button>

                    </>
                  )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News Create/Edit Modal */}
      <AnimatePresence>
        {isNewsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-primary/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleNewsSubmit}>
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-2xl text-primary font-heading uppercase">
                    {editingNews ? 'Edit News Post' : 'Create News Post'}
                  </h2>
                  <button 
                    type="button"
                    onClick={() => setIsNewsModalOpen(false)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <XCircle size={28} className="text-gray-400" />
                  </button>
                </div>

                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                    <input 
                      type="text"
                      required
                      className="form-input"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      placeholder="Enter a catchy title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                      <select 
                        className="form-input"
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      >
                        <option value="General">General</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Event">Event</option>
                        <option value="Academic">Academic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
                      <input 
                        type="url"
                        className="form-input"
                        value={newsForm.image_url}
                        onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Excerpt</label>
                    <textarea 
                      required
                      rows={2}
                      className="form-input py-3"
                      value={newsForm.excerpt}
                      onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                      placeholder="A short summary for the card preview..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Content</label>
                    <textarea 
                      required
                      rows={6}
                      className="form-input py-3"
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                      placeholder="Write the full article content here..."
                    />
                  </div>
                </div>

                <div className="p-8 bg-gray-50/50 flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsNewsModalOpen(false)}
                    className="btn bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-primary px-10 flex items-center gap-2"
                  >
                    {loading ? <Clock className="animate-spin" size={18} /> : (editingNews ? 'Update Post' : 'Publish Post')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Fees Create/Edit Modal */}
      <AnimatePresence>
        {isFeeModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-primary/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleFeeSubmit}>
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-2xl text-primary font-heading uppercase">
                    {editingFee ? 'Edit Fee Item' : 'Add Fee Item'}
                  </h2>
                  <button 
                    type="button"
                    onClick={() => setIsFeeModalOpen(false)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <XCircle size={28} className="text-gray-400" />
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Fee Description</label>
                    <input 
                      type="text"
                      required
                      className="form-input"
                      value={feeForm.name}
                      onChange={(e) => setFeeForm({ ...feeForm, name: e.target.value })}
                      placeholder="e.g., Tuition Fees for Diploma"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount</label>
                      <input 
                        type="text"
                        required
                        className="form-input"
                        value={feeForm.amount}
                        onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                        placeholder="e.g., ₦15,000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Index</label>
                      <input 
                        type="number"
                        required
                        className="form-input"
                        value={feeForm.order_index}
                        onChange={(e) => setFeeForm({ ...feeForm, order_index: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50/50 flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsFeeModalOpen(false)}
                    className="btn bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-primary px-10 flex items-center gap-2"
                  >
                    {loading ? <Clock className="animate-spin" size={18} /> : (editingFee ? 'Update Fee' : 'Add Fee')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>

    </div>
  );
};

export default AdminDashboard;
