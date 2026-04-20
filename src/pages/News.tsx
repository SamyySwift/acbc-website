import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';

const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="News & Updates | The Apostolic Church Bible College"
        description="Stay informed with the latest happenings, events, and announcements at Apostolic Church Bible College Ikom."
        keywords="acbc news, apostolic church events, bible college updates"
        url="https://acbcikom.com/news"
      />
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center pt-[80px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/95 z-[-1]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30 z-[-2]" style={{ backgroundImage: "url('/study.jpg')" }}></div>
        <div className="container relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading mb-4">News & Updates</h1>
            <p className="text-xl opacity-90 max-w-[600px]">Stay informed with the latest happenings at Apostolic Church Bible College Ikom.</p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6">
          {loading ? (
             <div className="flex justify-center items-center h-[200px]">
                <div className="w-10 h-10 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
             </div>
          ) : news.length === 0 ? (
             <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400 italic">No news articles found. Check back later!</h3>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image_url || '/placeholder-news.jpg'} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-[0.75rem] font-bold rounded-full uppercase tracking-widest shadow-lg">
                        {item.category || 'General'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Calendar size={16} className="text-secondary" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                    
                    <h3 className="text-2xl font-heading text-primary mb-4 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <Link to={`/news/${item.id}`} className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                        Read Story <ArrowRight size={16} className="text-secondary" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
