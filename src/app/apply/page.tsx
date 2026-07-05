"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { saveOnboardingData, OnboardingData } from "@/app/actions/onboarding";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, title: "The Basics", desc: "Let's begin with the fundamentals of who you are." },
  { id: 2, title: "Where You Belong", desc: "Tell us where your life is currently rooted." },
  { id: 3, title: "Your Heritage", desc: "Understanding the cultural background that shaped you." },
  { id: 4, title: "Your Family", desc: "Because a meaningful connection involves those who matter most." },
  { id: 5, title: "Your Path", desc: "Your education and professional journey." },
  { id: 6, title: "Your World", desc: "Your lifestyle, hobbies, and personal story." },
  { id: 7, title: "Your Preferences", desc: "What you are looking for in a partner." },
];

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  
  // We extend the form data slightly to handle string inputs for arrays before submission
  type FormInputs = Omit<OnboardingData, 'lifestyleChips' | 'prefReligionChips'> & {
    lifestyleChipsString?: string;
    prefReligionChipsString?: string;
  };

  const { register, handleSubmit, formState: { isSubmitting }, watch, reset } = useForm<FormInputs>();

  // Caching mechanism for developer testing
  useEffect(() => {
    const saved = localStorage.getItem("vivaha-apply-cache");
    if (saved) {
      try {
        reset(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cached form data");
      }
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("vivaha-apply-cache", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = async (formData: FormInputs) => {
    setServerError(null);
    
    // Process chips
    const submissionData: OnboardingData = {
      ...formData,
      lifestyleChips: formData.lifestyleChipsString 
        ? formData.lifestyleChipsString.split(',').map(s => s.trim()).filter(Boolean) 
        : [],
      prefReligionChips: formData.prefReligionChipsString 
        ? formData.prefReligionChipsString.split(',').map(s => s.trim()).filter(Boolean) 
        : [],
    };

    const result = await saveOnboardingData(submissionData);
    
    if (!result.success) {
      setServerError(result.error || "An error occurred.");
    } else {
      router.push("/credentials");
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const InputField = ({ label, name, placeholder, type = "text" }: { label: string, name: keyof FormInputs, placeholder?: string, type?: string }) => (
    <div className="space-y-2 w-full">
      <label htmlFor={name} className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">{label}</label>
      <input 
        id={name}
        type={type} 
        {...register(name)}
        className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <main className="relative w-full h-screen flex flex-col md:flex-row bg-[#FDFBF7] overflow-hidden">
      
      {/* ENVIRONMENT: The Study Room (Left 50%) */}
      <div className="w-full md:w-1/2 h-[20vh] md:h-full relative">
        <Image 
          src="/images/architecture/interview.jpg"
          alt="Vivah Study Room"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ARCHITECTURAL SURFACE: The Application Desk (Right 50%) */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-8 md:px-16 lg:px-24 py-12 md:py-24 z-10 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full">
          
          {/* Header */}
          <div className="mb-12">
            <div className="w-8 h-[1px] bg-[#8C7A6B]/30 mb-6" />
            <h1 className="text-2xl md:text-3xl text-[#2A2621] font-display tracking-tight leading-tight">
              {STEPS[currentStep - 1].title}
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              {STEPS[currentStep - 1].desc}
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 pb-16">
            <div className="flex-1 relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  {currentStep === 1 && (
                    <>
                      <div className="flex gap-6">
                        <InputField label="First Name" name="firstName" placeholder="Ananya" />
                        <InputField label="Last Name" name="lastName" placeholder="Sharma" />
                      </div>
                      <div className="flex gap-6">
                        <InputField label="Phone" name="phone" placeholder="+91 98765..." />
                        <InputField label="Instagram" name="instagram" placeholder="@username" />
                      </div>
                      <div className="flex gap-6">
                        <div className="flex-1 space-y-2">
                          <label htmlFor="gender" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Gender</label>
                          <select id="gender" {...register("gender")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div className="flex-1"><InputField label="Height (cm)" name="height" placeholder="175" type="number" /></div>
                      </div>
                      <InputField label="Date of Birth" name="dateOfBirth" type="date" />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <InputField label="Country" name="country" placeholder="e.g. India" />
                      <div className="flex gap-6">
                        <InputField label="State" name="state" placeholder="e.g. Maharashtra" />
                        <InputField label="City" name="city" placeholder="e.g. Mumbai" />
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <div className="flex gap-6">
                        <InputField label="Religion" name="religion" placeholder="e.g. Hindu" />
                        <InputField label="Community" name="community" placeholder="e.g. Brahmin" />
                      </div>
                      <InputField label="Mother Tongue" name="motherTongue" placeholder="e.g. Hindi" />
                      <InputField label="Your Gotra" name="gotra" placeholder="e.g. Kashyap" />
                      <div className="flex gap-6">
                        <InputField label="Maternal Gotra" name="maternalGotra" placeholder="Optional" />
                        <InputField label="Grandmother Gotra" name="grandmotherGotra" placeholder="Optional" />
                      </div>
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <InputField label="Father's Occupation" name="fatherOccupation" placeholder="e.g. Business Owner" />
                      <InputField label="Mother's Occupation" name="motherOccupation" placeholder="e.g. Homemaker" />
                      <InputField label="Siblings Information" name="siblings" placeholder="e.g. 1 elder brother (married)" />
                      <div className="flex gap-6">
                        <div className="flex-1 space-y-2">
                          <label htmlFor="familyType" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Family Type</label>
                          <select id="familyType" {...register("familyType")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
                            <option value="">Select...</option>
                            <option value="Nuclear">Nuclear</option>
                            <option value="Joint">Joint</option>
                          </select>
                        </div>
                        <div className="flex-1 space-y-2">
                          <label htmlFor="familyValues" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Family Values</label>
                          <select id="familyValues" {...register("familyValues")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
                            <option value="">Select...</option>
                            <option value="Traditional">Traditional</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Liberal">Liberal</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 5 && (
                    <>
                      <div className="flex gap-6">
                        <InputField label="Highest Qual." name="highestQual" placeholder="e.g. MBA" />
                        <InputField label="University" name="university" placeholder="e.g. IIM" />
                      </div>
                      <div className="flex gap-6">
                        <InputField label="Industry/Profession" name="profession" placeholder="e.g. Technology" />
                        <InputField label="Occupation/Role" name="occupation" placeholder="e.g. Product Manager" />
                      </div>
                      <div className="flex gap-6">
                        <InputField label="Company" name="company" placeholder="e.g. Google" />
                        <InputField label="Annual Income" name="income" placeholder="e.g. 30 LPA" />
                      </div>
                    </>
                  )}

                  {currentStep === 6 && (
                    <>
                      <InputField label="Hobbies (comma separated)" name="hobbies" placeholder="e.g. Reading, Hiking, Photography" />
                      <InputField label="Lifestyle Tags (comma separated)" name="lifestyleChipsString" placeholder="e.g. Early Riser, Vegetarian, Pet Lover" />
                      <div className="space-y-2 pt-4">
                        <label htmlFor="bio" className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Your Personal Story</label>
                        <textarea 
                          id="bio"
                          {...register("bio")}
                          className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors resize-none h-24"
                          placeholder="What values are most important to you? What kind of life do you envision?"
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 7 && (
                    <>
                      <div className="flex gap-6">
                        <InputField label="Min Age" name="minAge" type="number" placeholder="e.g. 25" />
                        <InputField label="Max Age" name="maxAge" type="number" placeholder="e.g. 32" />
                      </div>
                      <div className="flex gap-6">
                        <InputField label="Min Height (cm)" name="minHeight" type="number" placeholder="e.g. 150" />
                        <InputField label="Max Height (cm)" name="maxHeight" type="number" placeholder="e.g. 190" />
                      </div>
                      <InputField label="Preferred Religions (comma separated)" name="prefReligionChipsString" placeholder="e.g. Hindu, Sikh" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation & Submit */}
            <div className="pt-12 mt-8 border-t border-[#8C7A6B]/20">
              {serverError && (
                <div className="mb-6 text-[10px] text-red-900/80 font-bold uppercase tracking-widest bg-red-50/50 p-3 rounded-sm border border-red-900/10 text-center">
                  {serverError}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${currentStep === 1 ? 'text-transparent cursor-default' : 'text-[#8C7A6B] hover:text-[#2A2621]'}`}
                  disabled={currentStep === 1}
                >
                  ← Back
                </button>
                
                {currentStep < 7 ? (
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                      Continue
                    </span>
                    <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50"
                  >
                    <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                      {isSubmitting ? 'Saving...' : 'Complete Profile'}
                    </span>
                    <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                  </button>
                )}
              </div>
              
              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mt-12">
                {[1, 2, 3, 4, 5, 6, 7].map(step => (
                  <div key={step} className={`h-[2px] transition-all duration-500 ${step === currentStep ? 'w-6 bg-[#2A2621]' : 'w-2 bg-[#8C7A6B]/20'}`} />
                ))}
              </div>
            </div>

          </form>
          
        </div>
      </div>
      
    </main>
  );
}
