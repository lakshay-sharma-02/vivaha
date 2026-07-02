"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { saveOnboardingData, OnboardingData } from "@/app/actions/onboarding";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, title: "The Basics", desc: "Let's begin with the fundamentals of who you are." },
  { id: 2, title: "Where You Belong", desc: "Tell us where your life is currently rooted." },
  { id: 3, title: "Your Heritage", desc: "Understanding the cultural background that shaped you." },
  { id: 4, title: "Your Family", desc: "Because a meaningful connection involves those who matter most." },
  { id: 5, title: "Your Path", desc: "Your education, career, and a few words about yourself." },
];

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<OnboardingData>();

  const onSubmit = async (data: OnboardingData) => {
    setServerError(null);
    const result = await saveOnboardingData(data);
    
    if (!result.success) {
      setServerError(result.error || "An error occurred.");
    } else {
      router.push("/dashboard"); // Or wherever the inside of the estate is
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const InputField = ({ label, name, placeholder, type = "text" }: { label: string, name: keyof OnboardingData, placeholder?: string, type?: string }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">{label}</label>
      <input 
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
      <div className="w-full md:w-1/2 h-[30vh] md:h-full relative">
        <Image 
          src="/images/architecture/interview.jpg"
          alt="Vivaha Study Room"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ARCHITECTURAL SURFACE: The Application Desk (Right 50%) */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-8 md:px-16 lg:px-24 py-12 md:py-24 z-10 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col h-full">
          
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
            <div className="flex-1 relative">
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
                      <InputField label="Phone Number" name="phone" placeholder="+91 98765 43210" />
                      <div className="flex gap-6">
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Gender</label>
                          <select {...register("gender")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <InputField label="Height (cm)" name="height" placeholder="e.g. 175" type="number" />
                        </div>
                      </div>
                      <InputField label="Date of Birth" name="dateOfBirth" type="date" />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <InputField label="Country" name="country" placeholder="e.g. India" />
                      <div className="flex gap-6">
                        <div className="flex-1"><InputField label="State" name="state" placeholder="e.g. Maharashtra" /></div>
                        <div className="flex-1"><InputField label="City" name="city" placeholder="e.g. Mumbai" /></div>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <InputField label="Religion" name="religion" placeholder="e.g. Hindu" />
                      <InputField label="Community / Caste" name="community" placeholder="e.g. Brahmin" />
                      <div className="flex gap-6">
                        <div className="flex-1"><InputField label="Mother Tongue" name="motherTongue" placeholder="e.g. Hindi" /></div>
                        <div className="flex-1"><InputField label="Gotra" name="gotra" placeholder="e.g. Kashyap" /></div>
                      </div>
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <InputField label="Father's Occupation" name="fatherOccupation" placeholder="e.g. Business Owner" />
                      <InputField label="Mother's Occupation" name="motherOccupation" placeholder="e.g. Homemaker" />
                      <div className="flex gap-6">
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Family Type</label>
                          <select {...register("familyType")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
                            <option value="">Select...</option>
                            <option value="Nuclear">Nuclear</option>
                            <option value="Joint">Joint</option>
                          </select>
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">Family Values</label>
                          <select {...register("familyValues")} className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium focus:outline-none focus:border-[#2A2621] cursor-pointer">
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
                      <InputField label="Highest Qualification" name="highestQual" placeholder="e.g. MBA" />
                      <div className="flex gap-6">
                        <div className="flex-1"><InputField label="Occupation" name="occupation" placeholder="e.g. Product Manager" /></div>
                        <div className="flex-1"><InputField label="Company" name="company" placeholder="e.g. Google" /></div>
                      </div>
                      <div className="space-y-2 pt-4">
                        <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">A few words about you</label>
                        <textarea 
                          {...register("bio")}
                          className="w-full bg-transparent border-b border-[#2A2621]/20 pb-2 text-sm text-[#2A2621] font-medium placeholder-[#8C7A6B]/40 focus:outline-none focus:border-[#2A2621] transition-colors resize-none h-20"
                          placeholder="What values are most important to you?"
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation & Submit */}
            <div className="pt-12 mt-auto">
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
                
                {currentStep < 5 ? (
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
                {[1, 2, 3, 4, 5].map(step => (
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
