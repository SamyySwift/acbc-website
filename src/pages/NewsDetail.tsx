import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Tag, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setItem(data);
      } catch (err) {
        console.error('Error fetching news detail:', err);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-white pb-24">
      <SEO 
        title={`${item.title} | ACBC News`}
        description={item.excerpt || "Read the full story at Apostolic Church Bible College."}
        image={item.image_url}
        type="article"
      />
      {/* Header Image */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img 
          src={item.image_url || '/placeholder-news.jpg'} 
          className="w-full h-full object-cover"
          alt={item.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
               <Link to="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors">
                  <ArrowLeft size={18} /> Back to News
               </Link>
               <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-secondary text-primary text-[0.7rem] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    {item.category || 'General'}
                  </span>
                  <span className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <Calendar size={16} className="text-secondary" />
                    {new Date(item.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </span>
               </div>
               <h1 className="text-4xl md:text-6xl text-white font-heading max-w-[900px] leading-tight mb-0">
                  {item.title}
               </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          {/* Main Content */}
          <article className="prose prose-lg prose-headings:font-heading prose-headings:text-primary prose-p:text-gray-600 max-w-none">
            <p className="text-xl font-medium text-primary mb-10 leading-relaxed italic border-l-4 border-secondary pl-6">
              {item.excerpt}
            </p>
            <div className="whitespace-pre-wrap leading-relaxed text-lg">
              {item.content}
            </div>
            
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-bold text-primary transition-all">
                    <Share2 size={16} className="text-secondary" /> Share Article
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-bold text-primary transition-all">
                    <Tag size={16} className="text-secondary" /> {item.category}
                 </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-heading text-primary mb-6 flex items-center gap-2">
                <MessageSquare className="text-secondary" /> Stay Connected
              </h3>
              <p className="text-sm text-gray-500 mb-6">Want to get the latest updates right in your inbox? Subscribe to our newsletter.</p>
              <input type="email" placeholder="Email Address" className="form-input mb-4" />
              <button className="w-full btn btn-primary">Subscribe</button>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden h-80 shadow-xl group">
               <img src="/logo.jpeg" className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700" alt="ACBC" />
               <div className="absolute inset-0 bg-primary/80 p-8 flex flex-col justify-end">
                  <h4 className="text-xl text-white font-heading mb-2">Study at ACBC</h4>
                  <p className="text-white/70 text-sm mb-6">Begin your journey in ministerial training today.</p>
                  <Link to="/admissions" className="text-secondary font-bold text-sm flex items-center gap-2">
                    Apply Online <ArrowLeft size={16} className="rotate-180" />
                  </Link>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
