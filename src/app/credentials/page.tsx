"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";

const STEPS = [
  { id: 1, title: "Your Portrait", desc: "Every meaningful connection begins with a genuine portrait. Please provide a clear, recent photograph." },
  { id: 2, title: "Identity Verification", desc: "To maintain the integrity of the estate, please provide a government-issued ID (e.g. Aadhar)." },
];

export default function CredentialsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Helper to handle the "upload" to backend contracts
  const handleComplete = async () => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const supabase = createClient();
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("You must be authenticated to upload documents.");

      // 1. Upload Portrait to profile_media bucket
      if (portraitFile) {
        const fileExt = portraitFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile_media')
          .upload(fileName, portraitFile);
          
        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          throw new Error(`Storage Error (profile_media): ${uploadError.message}`);
        }
        
        const { error: dbError } = await supabase.from('profile_media').insert({ 
          profile_id: user.id,
          type: 'image',
          bucket_path: uploadData.path, 
          is_primary: true 
        });
        
        if (dbError) {
          console.error("Database insert error:", dbError);
          throw new Error(`Database Error (profile_media): ${dbError.message}`);
        }
      }

      // 2. Upload ID to verification_documents bucket
      if (idFile) {
        const fileExt = idFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('verification_documents')
          .upload(fileName, idFile); // Removed private/ subfolder
          
        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          throw new Error(`Storage Error (verification_documents): ${uploadError.message}`);
        }
        
        const { error: dbError } = await supabase.from('verification_documents').insert({ 
          profile_id: user.id,
          document_type: 'aadhar',
          bucket_path: uploadData.path, 
          status: 'pending' 
        });
        
        if (dbError) {
          console.error("Database insert error:", dbError);
          throw new Error(`Database Error (verification_documents): ${dbError.message}`);
        }
      }

      // Redirect to dashboard (The Estate)
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.message || "Failed to upload secure documents.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const DropzoneUI = ({ 
    file, 
    setFile, 
    label 
  }: { 
    file: File | null, 
    setFile: (f: File | null) => void,
    label: string 
  }) => (
    <div className="relative w-full h-64 border-[1px] border-dashed border-[#8C7A6B]/40 hover:border-[#2A2621] transition-colors flex flex-col items-center justify-center bg-transparent group cursor-pointer">
      <input 
        type="file" 
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      {file ? (
        <div className="text-center">
          <p className="text-xs text-[#2A2621] font-bold uppercase tracking-widest">{file.name}</p>
          <p className="text-[10px] text-[#8C7A6B] mt-2">Click to replace</p>
        </div>
      ) : (
        <div className="text-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-8 h-[1px] bg-[#2A2621]/30 mx-auto mb-4" />
          <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.2em]">{label}</p>
        </div>
      )}
    </div>
  );

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      
      {/* ENVIRONMENT: The Architecture */}
      <div className="relative w-full h-[35vh] md:h-screen">
        {/* We reuse the register image here due to image generation quotas, but it perfectly fits the secure desk aesthetic */}
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivah Secure Upload"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ARCHITECTURAL SURFACE: The Document Canvas */}
      <div className="w-full min-h-[65vh] md:h-screen flex flex-col px-6 py-12 md:p-12 lg:p-24 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full justify-center">
          
          {/* Header */}
          <div className="mb-16">
            <div className="w-8 h-[1px] bg-[#8C7A6B]/30 mb-6" />
            <h1 className="text-2xl md:text-3xl text-[#2A2621] font-display tracking-tight leading-tight">
              {STEPS[currentStep - 1].title}
            </h1>
            <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
              {STEPS[currentStep - 1].desc}
            </p>
          </div>

          {/* Upload Area */}
          <div className="flex-1 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {currentStep === 1 && (
                  <DropzoneUI 
                    file={portraitFile} 
                    setFile={setPortraitFile} 
                    label="Place Photograph Here" 
                  />
                )}

                {currentStep === 2 && (
                  <DropzoneUI 
                    file={idFile} 
                    setFile={setIdFile} 
                    label="Place Government ID Here" 
                  />
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
              
              {currentStep === 1 ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!portraitFile}
                  className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30"
                >
                  <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                    Continue
                  </span>
                  <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleComplete}
                  disabled={!idFile || isSubmitting}
                  className="group flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30"
                >
                  <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
                    {isSubmitting ? 'Securing...' : 'Enter Estate'}
                  </span>
                  <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
                </button>
              )}
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-12">
              {[1, 2].map(step => (
                <div key={step} className={`h-[2px] transition-all duration-500 ${step === currentStep ? 'w-6 bg-[#2A2621]' : 'w-2 bg-[#8C7A6B]/20'}`} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
    </main>
  );
}
