import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr] gap-10 lg:gap-16 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <BookOpen size={32} className="text-secondary" />
              <h2 className="text-white text-3xl mb-0">ACBC Ikom</h2>
            </div>
            <p className="text-[#a0aec0] mb-8 max-w-[400px]">
              The Apostolic Church Bible College (ACBC) Ikom is dedicated to building the 
              man of God holistically and equipping him thoroughly for every good work, 
              eradicating mediocrity from the pulpit.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex justify-center items-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-secondary hover:text-primary hover:-translate-y-1" aria-label="Facebook"><Facebook size={20} /></a>

            </div>
          </div>

          <div>
            <h3 className="text-secondary text-lg mb-6 font-body uppercase tracking-[1px]">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-[#a0aec0] transition-colors duration-300 hover:text-secondary">About Us</Link></li>
              <li><Link to="/academics" className="text-[#a0aec0] transition-colors duration-300 hover:text-secondary">Programs & Courses</Link></li>
              <li><Link to="/admissions" className="text-[#a0aec0] transition-colors duration-300 hover:text-secondary">Admissions</Link></li>
              <li><Link to="/contact" className="text-[#a0aec0] transition-colors duration-300 hover:text-secondary">Contact Support</Link></li>
              <li><Link to="/admin/login" className="text-[#a0aec0] transition-colors duration-300 hover:text-secondary border-t border-white/5 pt-2 mt-2 block">Admin Staff Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary text-lg mb-6 font-body uppercase tracking-[1px]">Contact Us</h3>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 items-start text-[#a0aec0]">
                <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                <span>Office of the Rector, ACBC Ikom<br />No. 35 Obudu Road Ikom, Cross River</span>
              </li>
              <li className="flex gap-4 items-start text-[#a0aec0]">
                <Phone size={20} className="text-secondary flex-shrink-0 mt-1" />
                <span>08029755239, 07010117854</span>
              </li>
              <li className="flex gap-4 items-start text-[#a0aec0]">
                <Mail size={20} className="text-secondary flex-shrink-0 mt-1" />
                <span>acbcikom@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[#718096] text-sm gap-4 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} The Apostolic Church Bible College (ACBC) Ikom. All rights reserved.</p>
          <p className="italic text-secondary-light">Motto: Wisdom Through God's Word (Ps. 19:10-11)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
