import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const Academics: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const programs = [
    {
      title: "Certificate in Theology",
      duration: "2 Year Program",
      icon: <Award size={32} />,
      desc: "A foundational program designed for lay leaders and those seeking basic theological understanding for ministry."
    },
    {
      title: "Diploma in Theology",
      duration: "2 Year Program",
      icon: <BookOpen size={32} />,
      desc: "For those preparing for pastoral ministry, focusing on deepened biblical knowledge and practical ministry skills."
    },
    {
      title: "Bachelor of Arts",
      duration: "2 Year Program",
      icon: <GraduationCap size={32} />,
      desc: "Comprehensive degree options in Theology, Christian Education, Divinity & Mission, and Biblical Theology."
    }
  ];

  const courses = [
    "Dynamic of Prayer and Fasting",
    "Bible Survey",
    "Christian Ethics",
    "Christian Doctrine",
    "Christian Theology",
    "Homiletics",
    "Theology of God",
    "Guidance and Counselling",
    "Discipleship",
    "Marriage and Family Counselling",
    "Computer Science and Computer Application",
    "Ministerial Ethics ",
    "Carnality and Spirituality",
    "Typology",
    "Use of English",
    "Research Methods",
    "Sunday School Administration",
    "Church in History",
    "Old Testament Survey",
    "Major and Minor Prophets",
    "Roman Epistle",
    "Eschatology",
    "Mission",
    "Doctrine of Holiness",
    "Church (Ecclessiasology)",
    "Bible Background"
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Academics & Programs | The Apostolic Church Bible College"
        description="Explore our rigorous theological programs including Certificate, Diploma, and Bachelor of Arts in Theology, Divinity, and Biblical Studies."
        keywords="theology degree, bible college academics, diploma in theology, christian education programs"
        url="https://acbcikom.com/academics"
      />
      <header className="page-header relative overflow-hidden bg-primary text-white pt-[calc(10rem+80px)] pb-48 text-center z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0a192fF2] to-[#0a192fCC] z-[-1]"></div>
        <motion.div className="absolute top-0 left-0 w-full h-[140%] bg-cover bg-center z-[-2]" style={{ backgroundImage: "url('/lecturers.jpg')", y }}></motion.div>
        
        <div className="container relative z-10">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn}>Academics</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
            Rigorous study of the Word designed to eradicate mediocrities from the pulpit.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]">
            <path d="M0,120 C400,20 800,20 1200,120 Z" className="fill-white"></path>
          </svg>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2>Our Programs</h2>
            <p className="text-[1.2rem] text-[#666666] max-w-[700px] mx-auto">
              We offer structured admission for qualified students across three levels of academic pursuit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((prog, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-10 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-t-4 border-transparent hover:border-secondary hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="w-[60px] h-[60px] bg-[#d4af371A] text-secondary rounded-full flex justify-center items-center mb-6">
                  {prog.icon}
                </div>
                <div className="inline-block px-3 py-1 bg-background text-primary text-[0.85rem] font-bold uppercase tracking-[1px] rounded mb-3">
                  {prog.duration}
                </div>
                <h3 className="text-2xl mb-4">{prog.title}</h3>
                <p className="text-[#666666] mb-6">{prog.desc}</p>
                <a href="/admissions" className="flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors duration-300">
                  Admission Requirements <ArrowRight size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              className="bg-primary text-white p-10 lg:p-14 rounded-2xl relative overflow-hidden shadow-[0_20px_40px_rgba(10,25,47,0.15)]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <BookOpen size={48} className="text-secondary mb-6 relative z-10" />
              <h2 className="text-3xl text-white mb-6 relative z-10">Qualifications & Entry</h2>
              <ul className="space-y-5 relative z-10">
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-secondary shrink-0 mt-1" />
                  <p className="text-[#e2e8f0] text-[1.05rem] leading-relaxed">The school admits male and female students with at least a First School Leaving Certificate (FSLC).</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-secondary shrink-0 mt-1" />
                  <p className="text-[#e2e8f0] text-[1.05rem] leading-relaxed">The school admits candidates with any higher academic qualification.</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-secondary shrink-0 mt-1" />
                  <p className="text-[#e2e8f0] text-[1.05rem] leading-relaxed">Other qualifications include a "very stubborn faith" and belief in our Lord Jesus Christ, and in basic Christian doctrine.</p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] aspect-4/3 group"
            >
               <div className="absolute inset-0 bg-primary/20 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
               <img src="/students.jpg" alt="Academic Requirements" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] grayscale-50 group-hover:grayscale-0 group-hover:scale-105" />
            </motion.div>
          </div>

          <div className="text-center mb-16 pt-12 border-t border-[#e5e5e5]">
            <h2>Course Highlights</h2>
            <p className="text-[1.2rem] text-[#666666] max-w-[700px] mx-auto">
              A glimpse into the expansive coursework designed to ground our students in truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div 
                key={idx}
                className="bg-white px-6 py-4 rounded shadow-[0_5px_15px_rgba(0,0,0,0.02)] border border-[#eeeeee] flex items-center gap-4 transition-transform duration-300 hover:translate-x-2 hover:border-secondary hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] cursor-default"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0"></span>
                <span className="font-medium text-[#444] text-[1.1rem]">{course}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
