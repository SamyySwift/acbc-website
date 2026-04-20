import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Users } from 'lucide-react';

const heroImages = [
  '/School.jpg',
  '/lecturers.jpg'
];
import NewsSection from '../components/Home/NewsSection';
import SEO from '../components/SEO/SEO';

const Home: React.FC = () => {
  const [activeAim, setActiveAim] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div>
      <SEO 
        title="Welcome to ACBC | The Apostolic Church Bible College" 
        description="The Apostolic Church Bible College holistically builds the man of God, thoroughly equipping him for every good work to effectively divide the word of truth."
        keywords="bible college, theology, apostolic church, christian education, divinity"
        url="https://acbc.edu.ng/"
      />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-[80px] overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0a192fE6] to-[#0a192fB3] z-[-1]"></div>
        <motion.div className="absolute top-0 left-0 w-full h-[140%] z-[-2]" style={{ y }}>
          <AnimatePresence>
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImages[currentHeroIndex]}')` }}
            />
          </AnimatePresence>
        </motion.div>
        
        <div className="container relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="max-w-[800px] text-white"
          >
            <span className="inline-block font-body uppercase tracking-[2px] text-secondary font-semibold mb-6 border-l-3 border-secondary pl-4">Founded 2012</span>
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] text-white mb-6">Eradicating Mediocrity<br />From the Pulpit.</h1>
            <p className="text-xl opacity-90 mb-10 max-w-[650px]">
              The Apostolic Church Bible College holistically builds the man of God, 
              thoroughly equipping him for every good work to effectively divide the word of truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/admissions" className="btn btn-secondary">Apply Now</Link>
              <Link to="/academics" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">Our Programs</Link>
            </div>
          </motion.div>
        </div>

        {/* Curved Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]">
            <path d="M0,120 C400,20 800,20 1200,120 Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Intro Stats/Features */}
      <section className="bg-white relative z-10 py-24">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="bg-white p-12 lg:p-8 xl:p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-b-3 border-transparent hover:border-secondary" variants={fadeIn}>
              <div className="w-[60px] h-[60px] bg-[#d4af371A] text-secondary rounded-full flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-[1.4rem] mb-4">Rigorous Theology</h3>
              <p className="text-[#666666]">Comprehensive and systematic study of the principles of biblical theology, with applications to moral and spiritual life.</p>
            </motion.div>

            <motion.div className="bg-white p-12 lg:p-8 xl:p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-b-3 border-transparent hover:border-secondary" variants={fadeIn}>
              <div className="w-[60px] h-[60px] bg-[#d4af371A] text-secondary rounded-full flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-[1.4rem] mb-4">Certificate, Diploma & Degrees</h3>
              <p className="text-[#666666]">Offering Certificate, Diploma, and Bachelor of Arts in Theology, Christian Education and Counselling, Divinity & Mission, Biblical Theology, etc.</p>
            </motion.div>

            <motion.div className="bg-white p-12 lg:p-8 xl:p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-b-3 border-transparent hover:border-secondary" variants={fadeIn}>
              <div className="w-[60px] h-[60px] bg-[#d4af371A] text-secondary rounded-full flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-[1.4rem] mb-4">Governed by the Word</h3>
              <p className="text-[#666666]">Supervised by the Field Council of the Apostolic Church Northern Field to maintain sound doctrine and conduct.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Latest News & Events */}
      <NewsSection />

      {/* Aims & Objectives Sticky Scroll */}
      <section className="bg-background relative w-full pt-12 pb-32">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-[10vh] max-w-[800px] mx-auto">
            <h2 className="text-[2.5rem] md:text-[3rem] mb-6">Our Aims & Objectives</h2>
            <p className="text-[1.1rem] text-[#666666]">
              Established primarily to train the ministerial staff of the Apostolic Church and other 
              faithful whose qualification is that of being genuinely Born Again in Christ.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row relative items-start">
            
            {/* Scrollable Text Area (Left) */}
            <div className="w-full lg:w-1/2 lg:pr-12 relative z-10 pb-[10vh]">
              {[ 
                { title: 'Transmitting the Truth of the Gospel', detail: 'Transmitting the truth of the Gospel and doctrine of the Apostolic Church as enshrined in the Church article of faith, via Rules of Beliefs, Rules of Conduct and the Church Tenets.' },
                { title: 'Practical Field Experience', detail: 'Creating an enabling environment for members and non-members of the Apostolic Church to be trained in the right way of dividing the word of truth.' },
                { title: 'Empowering the Brethren', detail: 'Holistically building the man of God, thoroughly equipping him for every good work to effectively minister to congregations worldwide.' }
              ].map((aim, idx) => (
                <motion.div 
                  key={idx}
                  onViewportEnter={() => setActiveAim(idx)}
                  viewport={{ amount: 0.5, margin: "-20% 0px -40% 0px" }}
                  className="mb-[30vh] lg:mb-[40vh] transition-all duration-700 ease-in-out"
                  style={{ opacity: activeAim === idx ? 1 : 0.25, transform: `translateX(${activeAim === idx ? '0px' : '-20px'})` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary text-primary font-heading font-bold text-xl rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary">{aim.title}</h3>
                  </div>
                  <p className="text-lg text-[#666666] leading-relaxed pl-16">
                    {aim.detail}
                  </p>
                </motion.div>
              ))}
              <div className="pl-16">
                 <Link to="/about" className="btn btn-primary">Read Full History</Link>
              </div>
            </div>

            {/* Sticky Image Area (Right) */}
            <div className="w-full lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-[80vh] sticky top-[10vh] flex items-center justify-center p-4 lg:p-0 my-8 lg:my-0">
               <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl before:absolute before:inset-0 before:bg-linear-to-t before:from-[#0a192fB3] before:to-transparent before:z-10">
                 
                 {/* Image 1 */}
                 <img src="/lecturers.jpg" alt="Truth" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${activeAim === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
                 
                 {/* Image 2 */}
                 <img src="/ba.jpg" alt="Experience" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${activeAim === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
                 
                 {/* Image 3 */}
                 <img src="/students.jpg" alt="Empowering" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${activeAim === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />

                 <div className="absolute bottom-8 left-8 right-8 z-20">
                   <div className="bg-secondary text-primary p-6 rounded shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col justify-center max-w-fit">
                     <h3 className="font-heading text-[1.2rem] mb-1 text-primary">"Wisdom Through God's Word"</h3>
                     <span className="text-[0.9rem] font-semibold tracking-wider uppercase font-body">Ps. 19:10-11</span>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
