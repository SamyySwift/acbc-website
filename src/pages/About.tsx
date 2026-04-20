import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, MapPin } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const About: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-white">
      <SEO 
        title="About Us | The Apostolic Church Bible College"
        description="Learn about the history, mission, vision and academic leaders of The Apostolic Church Bible College, established in 2012."
        keywords="about acbc, bible college history, ikom, apostolic church, theological seminary"
        url="https://acbcikom.com/about"
      />
      <header className="page-header relative overflow-hidden bg-primary text-white pt-[calc(10rem+80px)] pb-48 text-center z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#0a192fF2] to-[#0a192fCC] z-[-1]"></div>
        <motion.div className="absolute top-0 left-0 w-full h-[140%] bg-cover bg-center z-[-2]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80')", y }}></motion.div>
        
        <div className="container relative z-10">
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn}>About ACBC</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
            Building the man of God holistically and thoroughly equipping him for every good work.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-[2.5rem] mb-8">Our History</h2>
              <p className="mb-6 text-[1.1rem] text-[#666666]">
                The school was conceived by the Field Council of the Apostolic Church Northern Field, 
                under the able chairmanship of the Field Superintendent Pastor Johnson Okpa Arikpo (Rtd) 
                in the year of the Lord 2011 and birthed finally in 2012.
              </p>
              <p className="mb-6 text-[1.1rem] text-[#666666]">
                It took off at No. 35 Obudu Road Ikom, in March 2012 with initial pioneering students 
                of 10 in numbers.
              </p>
              <p className="mb-6 text-[1.1rem] text-[#666666]">
                The institution is governed by the Field Council who also plays the supervising role 
                of the school, taking care of its maintenance and ensuring it adheres to the sound doctrine 
                and core values of the Apostolic Church.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[300px] lg:h-[400px] bg-background rounded-lg relative flex justify-center items-center shadow-[inset_0_0_50px_rgba(0,0,0,0.02)] bg-cover bg-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white/70 before:backdrop-blur-[5px] before:rounded-lg" style={{ backgroundImage: "url('/logo.jpeg')" }}>
                <div className="relative bg-primary text-white w-[180px] h-[180px] rounded-full flex flex-col justify-center items-center shadow-[0_15px_35px_rgba(10,25,47,0.2)] border-4 border-secondary">
                  <span className="font-body uppercase tracking-[2px] text-[0.9rem] mb-2 text-secondary-light">Founded</span>
                  <strong className="font-heading text-[3.5rem] leading-none">2012</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-secondary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Target size={48} className="text-secondary mb-4" />
              <h2 className="text-2xl my-4">Mission Statement</h2>
              <p className="text-[#666666] text-[1.1rem]">
                The College in its entirety is wit and holistically builds the man of God 
                and thoroughly equipped him for every good work (2 Timothy 3:17).
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-12 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-secondary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Eye size={48} className="text-secondary mb-4" />
              <h2 className="text-2xl my-4">Vision Statement</h2>
              <p className="text-[#666666] text-[1.1rem]">
                To eradicate and completely eliminates all forms of mediocrities from our 
                pulpit, and platforms, by the grace of God. While the trainee will be able to 
                effectively divide the word of truth, and thereby pulling the people from the 
                pit of hell to eternal bliss with the Father of lights.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl mb-2">Our Aims & Objectives</h2>
            <p className="text-lg md:text-xl text-[#666666]">Established primarily with a view to</p>
          </div>
          
          <div className="max-w-[800px] mx-auto flex flex-col gap-8">
            <motion.div 
              className="flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 md:p-8 bg-background rounded-lg transition-transform duration-300 hover:translate-x-2 hover:bg-white hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-[50px] h-[50px] bg-primary text-secondary rounded-full flex justify-center items-center text-[1.5rem] font-bold font-heading">1</div>
              <p className="text-[1.1rem] text-[#666666] pt-2"><strong className="text-primary">Train the ministerial staff</strong> of the Apostolic Church and other faithful whose qualification is that of genuine Born Again in Christ.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 md:p-8 bg-background rounded-lg transition-transform duration-300 hover:translate-x-2 hover:bg-white hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex-shrink-0 w-[50px] h-[50px] bg-primary text-secondary rounded-full flex justify-center items-center text-[1.5rem] font-bold font-heading">2</div>
              <p className="text-[1.1rem] text-[#666666] pt-2"><strong className="text-primary">Transmitting from the college</strong> person to person the truth of the Gospel and doctrine of the Apostolic Church as enshrine in the Church article of faith, Via Rules of Beliefs, Rules of Conduct and the Church Tenets which is treated as an expansive course work.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 md:p-8 bg-background rounded-lg transition-transform duration-300 hover:translate-x-2 hover:bg-white hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex-shrink-0 w-[50px] h-[50px] bg-primary text-secondary rounded-full flex justify-center items-center text-[1.5rem] font-bold font-heading">3</div>
              <p className="text-[1.1rem] text-[#666666] pt-2"><strong className="text-primary">Creating an enabling environment</strong> for members and non-members of the Apostolic Church to be trained in the right way of dividing the word of truth etc.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-background pt-20 pb-20">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Academic Leaders
            </motion.h2>
            <motion.p 
              className="text-[1.2rem] text-[#666666] max-w-[700px] mx-auto mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Meet the dedicated minds shaping the future of our ministry.
            </motion.p>
          </div>

          {/* Pioneer Staff */}
          <div className="mb-20">
            <h3 className="text-2xl text-primary font-heading border-b border-[#e5e5e5] pb-4 mb-10">Inaugural Pioneer Staff</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[800px]">
              {[
                { name: "Pastor Johnoson O. Arikpo", role: "Founder", image: "/J-Arikpo.jpeg" },
                { name: "Pastor (Dr.) B. J. Eteng JP LDA (RTD)", role: "Pioneer Staff (Late)", image: "/Eteng.jpeg" },
                { name: "Pastor Bassey I. Ekwe", role: "Pioneer Staff", image: "/Ekwe.jpeg" }
              ].map((staff, idx) => (
                <motion.div 
                  key={idx}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <div className="relative w-full aspect-3/4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#0a192f00] to-[#0a192f66] z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <img src={staff.image} alt={staff.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
                  </div>
                  <div className="p-7 relative bg-white z-20 transition-transform duration-500 border-t-4 border-transparent group-hover:border-secondary">
                    <h3 className="text-[1.2rem] lg:text-[1.3rem] mb-1 text-primary font-bold transition-colors duration-300 line-clamp-2">{staff.name}</h3>
                    <p className="text-[#666666] text-[0.85rem] font-body uppercase tracking-[1px] font-medium mt-2">{staff.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Subsequent Staff */}
          <div>
            <h3 className="text-2xl text-primary font-heading border-b border-[#e5e5e5] pb-4 mb-10">Subsequent Leaders & Lecturers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[
                { name: "Pastor (Dr) Sunday A. Obaje (AMACTS)", role: "Rector", image: "/Obaje.jpg" },
                { name: "Pastor Francis E. Bessong", role: "Lecturer", image: "/Bessong.jpg" },
                { name: "Pastor Abraham O. Edokor", role: "Lecturer", image: "/Edokor.jpg" },
                { name: "Pastor Dr. Clement U. E. Arikpo", role: "Lecturer", image: "/Arikpo.jpg" },
                { name: "Pastor Ibor A. Inyang", role: "Lecturer", image: "Inyang.jpg" },
                { name: "Pastor Charles E. Ukam", role: "Lecturer", image: "/Ukam.jpg" },
                { name: "Pastor Mark U. Nnana", role: "Registrar", image: "/nnana.jpg" },
                { name: "Pastor Patrick O. Abang", role: "Lecturer", image: "/Abang.jpg" },
                { name: "Pastor O. O. Eze", role: "Lecturer", image: "/eze.jpg" },
                { name: "Pastor O. E. Onawu", role: "Lecturer", image: "/onawu.jpeg" },
                { name: "Mr. Lawrence Achu Eshua", role: "Lecturer", image: "/Lawrence.jpg" },
                { name: "Rev E. C. Eshiet", role: "Lecturer", image: "/Eshiet.jpg" },
                { name: "Pastor Vincent E. Etop", role: "Lecturer", image: "/vincent.jpg" },
                { name: "Elder Ebunta Matthew", role: "ICT Unit Head", image: "/Matthew.jpg" }
              ].map((staff, idx) => (
                <motion.div 
                  key={idx}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx % 4) * 0.15 }}
                >
                  <div className="relative w-full aspect-3/4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#0a192f00] to-[#0a192f66] z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <img src={staff.image} alt={staff.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
                  </div>
                  <div className="p-7 relative bg-white z-20 transition-transform duration-500 border-t-4 border-transparent group-hover:border-secondary">
                    <h3 className="text-[1.15rem] mb-1 text-primary font-bold transition-colors duration-300 leading-tight">{staff.name}</h3>
                    <p className="text-[#666666] text-[0.8rem] font-body uppercase tracking-[1px] font-medium mt-2">{staff.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section" id="location">
        <div className="container">
          <div className="max-w-[900px] mx-auto">
            <motion.div 
              className="bg-white p-10 lg:p-14 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#e5e5e5] text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <MapPin size={48} className="text-secondary mb-6 mx-auto" />
              <h2 className="text-4xl text-primary mb-8 border-b-2 border-secondary/20 pb-6 inline-block">Our Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 text-left">
                <div className="bg-background p-8 rounded-xl border border-[#eeeeee] transition-all hover:shadow-md hover:border-secondary/30">
                  <h4 className="text-xl font-bold text-secondary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-sm">1</span>
                    Hostel Temporary Site
                  </h4>
                  <p className="text-[#666666] leading-relaxed text-[1.1rem]">
                    Situated at the Apostolic Church Nigeria, Northern Field Headquarters, 35 Obudu Road, 
                    in Four Corners, Ikom - a very strategic position.
                  </p>
                </div>
                
                <div className="bg-background p-8 rounded-xl border border-[#eeeeee] transition-all hover:shadow-md hover:border-secondary/30">
                  <h4 className="text-xl font-bold text-secondary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-sm">2</span>
                    Permanent Site
                  </h4>
                  <p className="text-[#666666] leading-relaxed text-[1.1rem]">
                    Otere Village, off Obudu Road Four Corners, Ikom.
                    <br /><br />
                    Currently operates with a standard story building.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
