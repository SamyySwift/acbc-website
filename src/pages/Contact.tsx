import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { supabase } from '../lib/supabaseClient';

const Contact: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message?: string} | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('contact-email', {
        body: formData,
      });

      if (!error && data?.success) {
        setSubmitStatus({ success: true, message: 'Thank you for reaching out! Your message has been sent to the registrar.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data?.error || error?.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: 'Failed to connect to the server. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Contact Us | The Apostolic Church Bible College"
        description="Get in touch with ACBC Ikom. Contact our registrar office for questions about admissions, programs, and general inquiries."
        keywords="contact acbc, acbc ikom, bible college contact, theology school enquries"
        url="https://acbcikom.com/contact"
      />
      <header className="page-header relative overflow-hidden bg-primary text-white pt-[calc(10rem+80px)] pb-48 text-center z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0a192fF2] to-[#0a192fCC] z-[-1]"></div>
        <motion.div className="absolute top-0 left-0 w-full h-[140%] bg-cover bg-center z-[-2]" style={{ backgroundImage: "url('/School.jpg')", y }}></motion.div>
        
        <div className="container relative z-10">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn}>Contact Us</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
            We're here to answer any questions you have about admissions, programs, or visiting ACBC Ikom.
          </motion.p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]">
            <path d="M0,120 C400,20 800,20 1200,120 Z" className="fill-background"></path>
          </svg>
        </div>
      </header>

      <section className="section bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-10 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-t-4 border-secondary mb-8">
                <h2 className="text-[1.8rem] mb-8">Get In Touch</h2>
                
                <div className="flex gap-5 mb-8 items-start">
                  <div className="w-[50px] h-[50px] bg-[#d4af371A] rounded-full flex justify-center items-center flex-shrink-0 mt-1 text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 font-body text-primary font-bold">Location</h3>
                    <p className="text-[#666666] leading-relaxed">Office of the Rector<br/>The Apostolic Church Bible College<br/>No. 35 Obudu Road Ikom,<br/>Cross River State, Nigeria</p>
                  </div>
                </div>

                <div className="flex gap-5 mb-8 items-start">
                  <div className="w-[50px] h-[50px] bg-[#d4af371A] rounded-full flex justify-center items-center flex-shrink-0 mt-1 text-secondary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 font-body text-primary font-bold">Call Us</h3>
                    <p className="text-[#666666] leading-relaxed">Registrar: 08140173941 <br/>Rector: 07010117854/08029755239</p>
                  </div>
                </div>

                <div className="flex gap-5 mb-8 items-start">
                  <div className="w-[50px] h-[50px] bg-[#d4af371A] rounded-full flex justify-center items-center flex-shrink-0 mt-1 text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 font-body text-primary font-bold">Email</h3>
                    <p className="text-[#666666] leading-relaxed">acbcikom@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex gap-5 mb-8 items-start">
                  <div className="w-[50px] h-[50px] bg-[#d4af371A] rounded-full flex justify-center items-center flex-shrink-0 mt-1 text-secondary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 font-body text-primary font-bold">Office Hours</h3>
                    <p className="text-[#666666] leading-relaxed">Monday - Friday: 8:00 AM - 4:00 PM<br/>Saturday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white p-10 lg:p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#eeeeee]">
                <h2 className="text-[2rem] mb-2">Send an Enquiry</h2>
                <p className="text-[#666666] mb-8 text-[1.1rem]">Fill out the form below and our staff will get back to you shortly.</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="w-full relative">
                      <label htmlFor="name" className="block mb-2 font-medium text-primary font-body uppercase tracking-[1px] text-[0.85rem]">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-[#e0e0e0] rounded bg-[#fcfcfc] text-base transition-all duration-300 focus:outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] resize-y"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="w-full relative">
                      <label htmlFor="email" className="block mb-2 font-medium text-primary font-body uppercase tracking-[1px] text-[0.85rem]">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-[#e0e0e0] rounded bg-[#fcfcfc] text-base transition-all duration-300 focus:outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] resize-y"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="w-full relative">
                      <label htmlFor="phone" className="block mb-2 font-medium text-primary font-body uppercase tracking-[1px] text-[0.85rem]">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-[#e0e0e0] rounded bg-[#fcfcfc] text-base transition-all duration-300 focus:outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] resize-y"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="w-full relative">
                      <label htmlFor="subject" className="block mb-2 font-medium text-primary font-body uppercase tracking-[1px] text-[0.85rem]">Enquiry Subject</label>
                      <select 
                        id="subject" 
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-[#e0e0e0] rounded bg-[#fcfcfc] text-base transition-all duration-300 focus:outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] resize-y"
                      >
                        <option value="">Select a subject...</option>
                        <option value="Admission">Admission Process</option>
                        <option value="Programs">Programs & Courses</option>
                        <option value="Fees">Tuition & Fees</option>
                        <option value="Other">Other Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full relative mb-8">
                    <label htmlFor="message" className="block mb-2 font-medium text-primary font-body uppercase tracking-[1px] text-[0.85rem]">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-[#e0e0e0] rounded bg-[#fcfcfc] text-base transition-all duration-300 focus:outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] resize-y"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn btn-primary py-4 text-lg flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} 
                    {!isSubmitting && <Send size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </button>
                  
                  {submitStatus && (
                    <div className={`mt-4 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
