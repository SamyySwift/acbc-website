import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  User, 
  BookOpen, 
  Heart, 
  Users,
  Check
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface ApplicationFormProps {
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Program Info', icon: <BookOpen size={20} /> },
  { id: 2, title: 'Personal Info', icon: <User size={20} /> },
  { id: 3, title: 'Next of Kin & Health', icon: <Heart size={20} /> },
  { id: 4, title: 'Education', icon: <BookOpen size={20} /> },
  { id: 5, title: 'References & Photo', icon: <Users size={20} /> }
];

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<any>({
    form_no: '',
    programme: '',
    department: '',
    application_date: new Date().toISOString().split('T')[0],
    surname: '',
    other_names: '',
    permanent_address: '',
    contact_address: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    sex: '',
    nationality: 'Nigerian',
    state_of_origin: '',
    lga: '',
    occupation: '',
    church_affiliation: '',
    next_of_kin_name: '',
    next_of_kin_relationship: '',
    next_of_kin_occupation: '',
    next_of_kin_address: '',
    is_healthy: true,
    health_problems: '',
    primary_school: { name: '', place: '', from: '', to: '', certificate: '' },
    secondary_school: { name: '', place: '', from: '', to: '', certificate: '' },
    o_level_results: Array(9).fill({ subject: '', grade: '' }),
    other_institutions: [],
    sponsor_name: '',
    sponsor_address: '',
    referees: [
      { name: '', address: '', position: '' },
      { name: '', address: '', position: '' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (category: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleArrayInputChange = (category: string, index: number, field: string, value: any) => {
    const newArray = [...formData[category]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, [category]: newArray }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Prevent submission if not on the last step
    if (currentStep < steps.length) return;
    
    setLoading(true);
    // ... rest of the logic

    try {
      let photoUrl = '';

      // 1. Upload Photo if exists
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `candidates/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('passport-photos')
          .upload(filePath, photoFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('passport-photos')
          .getPublicUrl(filePath);
        
        photoUrl = publicUrlData.publicUrl;
      }

      // 2. Submit Data
      const { error: insertError } = await supabase
        .from('applications')
        .insert([{ ...formData, passport_photo_url: photoUrl }]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting application:', error.message);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-heading mb-4 text-primary">Application Submitted!</h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your application for admission has been successfully received. We will contact you soon via email or phone.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-[1000px] w-full mx-auto my-4 flex flex-col max-h-[92vh] md:max-h-[85vh]">
      {/* Header */}
      <div className="bg-primary p-8 text-white relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Plus className="rotate-45" size={24} />
        </button>
        <h2 className="text-2xl md:text-3xl font-heading mb-2">Application for Admission</h2>
        <p className="opacity-80">The Apostolic Church Bible College, Ikom</p>
        
        {/* Progress Bar */}
        <div className="mt-8 flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></motion.div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id ? 'bg-secondary text-primary' : 'bg-primary border-2 border-white/30 text-white/50'
                }`}
              >
                {currentStep > step.id ? <Check size={20} /> : step.icon}
              </div>
              <span className="hidden md:block text-xs mt-2 font-medium uppercase tracking-wider opacity-80">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <AnimatePresence mode="wait">
          {/* Step 1: Program Info */}
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold border-b pb-4 mb-6">Course Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label>Programme:</label>
                  <select 
                    className="form-input"
                    value={formData.programme}
                    onChange={(e) => handleInputChange('programme', e.target.value)}
                    required
                  >
                    <option value="">Select Programme</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="B. A. Theology">Bachelor of Arts (Theology)</option>
                    <option value="Christian Education">Christian Education</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Department:</label>
                  <select 
                    className="form-input"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Biblical Studies">Biblical Studies</option>
                    <option value="Theology">Theology</option>
                    <option value="Christian Education">Christian Education</option>
                    <option value="Missions & Evangelism">Missions & Evangelism</option>
                    <option value="Pastoral Ministry">Pastoral Ministry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date:</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={formData.application_date}
                    onChange={(e) => handleInputChange('application_date', e.target.value)}
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold border-b pb-4 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="form-group">
                  <label>Surname:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Other Names:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.other_names}
                    onChange={(e) => handleInputChange('other_names', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>E-mail:</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Sex:</label>
                  <select 
                    className="form-input"
                    value={formData.sex}
                    onChange={(e) => handleInputChange('sex', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nationality:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>State of Origin:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.state_of_origin}
                    onChange={(e) => handleInputChange('state_of_origin', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>LGA:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.lga}
                    onChange={(e) => handleInputChange('lga', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Occupation:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label>Permanent Address:</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={formData.permanent_address}
                    onChange={(e) => handleInputChange('permanent_address', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label>Contact/Business Address:</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={formData.contact_address}
                    onChange={(e) => handleInputChange('contact_address', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label>Church Affiliation/Address:</label>
                  <textarea 
                    className="form-input h-16"
                    value={formData.church_affiliation}
                    onChange={(e) => handleInputChange('church_affiliation', e.target.value)}
                  ></textarea>
                </div>
              </div>

            </motion.div>
          )}

          {/* Step 3: Next of Kin & Health */}
          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold border-b pb-4 mb-6">Next of Kin Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group md:col-span-2">
                  <label>Next of Kin Name:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.next_of_kin_name}
                    onChange={(e) => handleInputChange('next_of_kin_name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Relationship with you:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.next_of_kin_relationship}
                    onChange={(e) => handleInputChange('next_of_kin_relationship', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Occupation:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.next_of_kin_occupation}
                    onChange={(e) => handleInputChange('next_of_kin_occupation', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label>Address:</label>
                  <textarea 
                    className="form-input h-20"
                    value={formData.next_of_kin_address}
                    onChange={(e) => handleInputChange('next_of_kin_address', e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <h3 className="text-xl font-semibold border-b pb-4 mt-8 md:col-span-2">Health Record</h3>
                <div className="form-group md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-secondary" 
                      checked={formData.is_healthy}
                      onChange={(e) => handleInputChange('is_healthy', e.target.checked)}
                    />
                    <span className="text-lg">Are you healthy?</span>
                  </label>
                </div>
                {!formData.is_healthy && (
                  <div className="form-group md:col-span-2">
                    <label>If No, Mention your problem:</label>
                    <textarea 
                      className="form-input h-24"
                      value={formData.health_problems}
                      onChange={(e) => handleInputChange('health_problems', e.target.value)}
                      placeholder="Describe any health conditions..."
                    ></textarea>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Education */}
          {currentStep === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">1</div>
                  Primary Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group md:col-span-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Primary School Attended"
                      value={formData.primary_school.name}
                      onChange={(e) => handleNestedInputChange('primary_school', 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Place"
                      value={formData.primary_school.place}
                      onChange={(e) => handleNestedInputChange('primary_school', 'place', e.target.value)}
                    />
                  </div>
                  <div className="form-group flex gap-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="From"
                      value={formData.primary_school.from}
                      onChange={(e) => handleNestedInputChange('primary_school', 'from', e.target.value)}
                    />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="To"
                      value={formData.primary_school.to}
                      onChange={(e) => handleNestedInputChange('primary_school', 'to', e.target.value)}
                    />
                  </div>
                  <div className="form-group md:col-span-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Certificate Obtained"
                      value={formData.primary_school.certificate}
                      onChange={(e) => handleNestedInputChange('primary_school', 'certificate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">2</div>
                  Secondary Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group md:col-span-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Secondary School Attended"
                      value={formData.secondary_school.name}
                      onChange={(e) => handleNestedInputChange('secondary_school', 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Place"
                      value={formData.secondary_school.place}
                      onChange={(e) => handleNestedInputChange('secondary_school', 'place', e.target.value)}
                    />
                  </div>
                  <div className="form-group flex gap-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="From"
                      value={formData.secondary_school.from}
                      onChange={(e) => handleNestedInputChange('secondary_school', 'from', e.target.value)}
                    />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="To"
                      value={formData.secondary_school.to}
                      onChange={(e) => handleNestedInputChange('secondary_school', 'to', e.target.value)}
                    />
                  </div>
                  <div className="form-group md:col-span-2">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Certificate Obtained"
                      value={formData.secondary_school.certificate}
                      onChange={(e) => handleNestedInputChange('secondary_school', 'certificate', e.target.value)}
                    />
                  </div>
                </div>
              </div>


              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">O Level Subjects and Grades</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="hidden md:block font-bold p-2 bg-gray-100/50 uppercase text-[0.65rem] tracking-wider rounded">Subject</div>
                  <div className="hidden md:block font-bold p-2 bg-gray-100/50 uppercase text-[0.65rem] tracking-wider rounded">Grade</div>
                  <div className="hidden md:block font-bold p-2 bg-gray-100/50 uppercase text-[0.65rem] tracking-wider rounded">Subject</div>
                  <div className="hidden md:block font-bold p-2 bg-gray-100/50 uppercase text-[0.65rem] tracking-wider rounded">Grade</div>
                  
                  {formData.o_level_results.map((res: any, idx: number) => (
                    <React.Fragment key={idx}>
                      <input 
                        type="text" 
                        className="form-input text-sm py-1.5 px-3" 
                        placeholder={`Subject ${idx+1}`}
                        value={res.subject}
                        onChange={(e) => handleArrayInputChange('o_level_results', idx, 'subject', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-input text-sm py-1.5 px-3" 
                        placeholder="Grade"
                        value={res.grade}
                        onChange={(e) => handleArrayInputChange('o_level_results', idx, 'grade', e.target.value)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* Step 5: References & Photo */}
          {currentStep === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3 className="text-xl font-semibold border-b pb-4 mb-6">Reference & Others</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group md:col-span-2">
                  <label>Name of Sponsor:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.sponsor_name}
                    onChange={(e) => handleInputChange('sponsor_name', e.target.value)}
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label>Sponsor Address:</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={formData.sponsor_address}
                    onChange={(e) => handleInputChange('sponsor_address', e.target.value)}
                  />
                </div>

                
                <h4 className="font-semibold text-lg md:col-span-2 mt-4">Two Referees (Senior Ministers)</h4>
                {formData.referees.map((ref: any, idx: number) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-lg space-y-4 md:col-span-2">
                    <h5 className="font-medium text-primary">Referee {idx + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Name"
                        value={ref.name}
                        onChange={(e) => handleArrayInputChange('referees', idx, 'name', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Address"
                        value={ref.address}
                        onChange={(e) => handleArrayInputChange('referees', idx, 'address', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Position"
                        value={ref.position}
                        onChange={(e) => handleArrayInputChange('referees', idx, 'position', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <h4 className="font-semibold text-lg md:col-span-2 mt-8">Passport Photograph</h4>
                <div className="md:col-span-2 flex flex-col items-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:border-secondary transition-all cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                  {photoPreview ? (
                    <div className="relative">
                      <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPhotoPreview(null); setPhotoFile(null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white text-gray-400 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:text-secondary group-hover:scale-110 transition-all">
                        <Upload size={32} />
                      </div>
                      <p className="text-gray-600 font-medium">Click to upload passport photo</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG or JPEG (Max 2MB)</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div className="mt-12 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">declaration</p>
                <p className="text-gray-700 italic">
                  I solemnly declare that the above information which I have given are to the best of my knowledge true and correct and that I will be responsible for any wrong information given.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        
        {/* Form Actions (Sticky Footer) */}
        <div className="px-8 py-6 bg-gray-50/50 border-t flex justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            className={`btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2 ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-secondary flex items-center gap-2"
            >
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="btn btn-primary flex items-center gap-2 min-w-[180px] justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Submit Application <Check size={20} /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
