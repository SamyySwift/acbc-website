import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SEO from '../components/SEO/SEO';

import ApplicationForm from '../components/Admissions/ApplicationForm';

const Admissions: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [tuitionFees, setTuitionFees] = useState<{ name: string, amount: string }[]>([]);
  const [loadingFees, setLoadingFees] = useState(true);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  // Disable scroll when form is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showForm]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const { data, error } = await supabase
          .from('tuition_fees')
          .select('name, amount')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setTuitionFees(data || []);
      } catch (err) {
        console.error('Error fetching tuition fees:', err);
      } finally {
        setLoadingFees(false);
      }
    };

    fetchFees();
  }, []);


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const reqList1 = [
    "Light brown trousers and white short-sleeves shirt except for Bachelors of Arts students",
    "A pair of brown sandals",
    "Exercise books",
    "Lectures books recommeded from lecturers",
    "Reading books",
  ];

  // const reqList2 = [
  //   "Red Bow Ties (3)",
  //   "Black belt",
  //   "White singlets (2)",
  //   "Black pairs of socks (2)",
  //   "Black cover shoes",
  //   "Sport Wears (2 pairs)",
  //   "Campus Wear, Short sleeves uniform with black skirt or trousers",
  //   "T-shirt (2) for outing"
  // ];

  const hostelReq = [
    "Beddings",
    "Cooking Utensils",
    "Big Broom",
    "2 big size of soft tissues",
    "Detergent",
    "Bucket",
    "Kettle",
    "Cutlass",
    "One mopper"
  ];

  // Fees are now fetched from Supabase

  return (
    <div className="bg-white">
      <SEO 
        title="Admissions & Applications | The Apostolic Church Bible College"
        description="Apply now to Apostolic Church Bible College. View requirements, tuition fees, and complete your online application today."
        keywords="acbc admissions, bible college application, ikom theology school, theology tuition fees"
        url="https://acbc.edu.ng/admissions"
      />
      <header className="page-header relative overflow-hidden bg-primary text-white pt-[calc(10rem+80px)] pb-48 text-center z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0a192fF2] to-[#0a192fCC] z-[-1]"></div>
        <motion.div className="absolute top-0 left-0 w-full h-[140%] bg-cover bg-center z-[-2]" style={{ backgroundImage: "url('/ba.jpg')", y }}></motion.div>
        
        <div className="container relative z-10">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn}>Admissions</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
            Join our next cohort and begin your journey toward spiritual and academic excellence.
          </motion.p>
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn} 
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-secondary text-lg px-10 py-4 shadow-xl"
            >
              Apply Online Now
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]">
            <path d="M0,120 C400,20 800,20 1200,120 Z" className="fill-background"></path>
          </svg>
        </div>
      </header>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center p-4 md:p-12 overflow-y-auto bg-primary/40 backdrop-blur-sm items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl"
            >
              <ApplicationForm onClose={() => setShowForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2>Student Requirements</h2>
            <p className="text-[1.2rem] text-[#666666] max-w-[700px] mx-auto">
              To maintain the standard and discipline of ACBC Ikom, the following items and uniforms are 
              required for admitted students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 lg:p-4">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl mb-6 pb-4 border-b border-[#eeeeee]">General Items</h3>
              <ul className="flex flex-col gap-4">
                {reqList1.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-[#555] font-medium leading-tight">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-[2px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* <motion.div 
              className="bg-white p-8 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl mb-6 pb-4 border-b border-[#eeeeee]">General Items (Cont.)</h3>
              <ul className="flex flex-col gap-4">
                {reqList2.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-[#555] font-medium leading-tight">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-[2px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div> */}

            <motion.div 
              className="bg-white p-8 rounded-lg shadow-[0_10px_30_rgba(0,0,0,0.03)] h-full lg:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl mb-6 pb-4 border-b border-[#eeeeee]">Hostel Requirements</h3>
              <ul className="flex flex-col gap-4">
                {hostelReq.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-[#555] font-medium leading-tight">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-[2px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2>School Fees & Tuition</h2>
            <p className="text-[1.2rem] text-[#666666] max-w-[700px] mx-auto">
              Our tuition structure is designed to be accessible while maintaining academic rigor.
            </p>
          </div>

          <motion.div 
            className="max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              {loadingFees ? (
                <div className="flex flex-col items-center justify-center p-20 gap-4">
                  <Loader2 className="animate-spin text-secondary" size={48} />
                  <p className="text-gray-500 font-medium">Loading tuition details...</p>
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white text-left p-6 font-semibold uppercase tracking-[1px] font-body text-[0.9rem] rounded-tl-lg">Program Level</th>
                      <th className="bg-primary text-white text-left p-6 font-semibold uppercase tracking-[1px] font-body text-[0.9rem] rounded-tr-lg">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionFees.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="p-12 text-center text-gray-400 italic">No tuition information available at the moment.</td>
                      </tr>
                    ) : (
                      tuitionFees.map((fee, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-background'}>
                          <td className="p-6 border-b border-[#eeeeee] text-[1.05rem] font-medium text-[#444]">{fee.name}</td>
                          <td className="p-6 border-b border-[#eeeeee] text-[1.05rem] text-secondary font-bold whitespace-nowrap">{fee.amount}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            
            <div className="mt-8 text-center">
              <p className="text-[#666]">For more information regarding payments, bank details, and payment plans, please contact the Registrar's Office.</p>
              <div className="mt-6 flex justify-center gap-4">
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  Apply Online Now <ChevronDown size={20} className="-rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
