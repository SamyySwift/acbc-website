import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="flex justify-center items-center h-[200px]">
            <div className="w-10 h-10 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-[600px]"
          >
            <span className="text-secondary font-bold uppercase tracking-[2px] text-sm mb-4 block">Updates & Events</span>
            <h2 className="text-[2.5rem] md:text-[3.5rem] leading-tight text-primary font-heading">Latest from <br /><span className="text-secondary">ACBC Ikom</span></h2>
          </motion.div>
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeIn}
          >
            <Link to="/news" className="btn btn-primary flex items-center gap-2">
              View All News <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
              }}
              className="group bg-[#f8f9fa] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image_url || '/placeholder-news.jpg'} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[0.7rem] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    {item.category || 'General'}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <Calendar size={16} className="text-secondary" />
                  {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-heading text-primary mb-4 line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-200/50 flex items-center justify-between">
                  <Link to={`/news/${item.id}`} className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} className="text-secondary" />
                  </Link>
                  <Newspaper size={20} className="text-gray-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
