"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Image as ImageIcon, Heart, Lock, Bell, 
  ShieldCheck, Crown, BadgeCheck, Settings, AlertTriangle, CheckCircle, Trash2, X, FileDown 
} from "lucide-react";
import { updateProfileSettings, updatePreferencesSettings, deactivateAccount } from "@/app/actions/settings";
import Image from "next/image";
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";

// --- Decorative Background ---
const SunlightRays = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-start fixed">
    <motion.div 
      className="absolute top-[-10%] w-[800px] h-[600px] bg-gradient-radial from-[#FDF5E6]/40 via-[#FDF5E6]/5 to-transparent blur-[60px]"
      animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.05, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const AbstractArch = () => (
  <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none z-0 opacity-[0.05] flex justify-end transform translate-x-1/3 -translate-y-1/3 fixed">
    <div className="w-full h-full border-[1.5px] border-[#8C7A6B] rounded-full relative">
      <div className="absolute inset-4 border border-[#8C7A6B]/50 rounded-full" />
    </div>
  </div>
);

type Tab = "profile" | "photos" | "preferences" | "privacy" | "notifications" | "security" | "membership" | "verification" | "account";

export default function ClientSettings({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const TABS: { id: Tab, label: string, icon: any }[] = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "photos", label: "Photos", icon: ImageIcon },
    { id: "preferences", label: "Partner Preferences", icon: Heart },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "membership", label: "Membership", icon: Crown },
    { id: "verification", label: "Verification", icon: BadgeCheck },
    { id: "account", label: "Account", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#2A2621] relative overflow-hidden flex flex-col md:flex-row">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none fixed" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <SunlightRays />
      <AbstractArch />

      {/* LEFT NAVIGATION */}
      <nav className="w-full md:w-[280px] shrink-0 border-r border-[#E6D5C3]/60 bg-[#FBF9F6]/50 backdrop-blur-md relative z-10 p-6 md:h-screen md:sticky md:top-0 md:overflow-y-auto hidden-scrollbar">
        <div className="mb-12 pt-6">
          <h2 className="font-serif text-2xl text-[#2A2621] tracking-wide">Settings</h2>
          <p className="text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mt-2">Manage your journey</p>
        </div>
        <ul className="space-y-1">
          {TABS.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm tracking-wide ${activeTab === tab.id ? 'bg-white shadow-sm border border-[#E6D5C3]/40 text-[#2A2621]' : 'text-[#8C7A6B] hover:bg-[#FDF5E6]/50 hover:text-[#2A2621]'}`}
              >
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} className={activeTab === tab.id ? "text-[#8C7A6B]" : ""} />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT PANEL */}
      <main className="flex-1 relative z-10 p-6 md:p-12 h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-32">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "profile" && <ProfileSection data={initialData.profile} onSave={() => showToast("Profile updated successfully")} />}
              {activeTab === "photos" && <PhotosSection media={initialData.media} onSave={() => showToast("Gallery updated")} />}
              {activeTab === "preferences" && <PreferencesSection data={initialData.preferences} onSave={() => showToast("Preferences updated")} />}
              {activeTab === "privacy" && <PrivacySection isPaused={initialData.profile.is_paused} onSave={() => showToast("Privacy settings saved")} />}
              {activeTab === "notifications" && <NotificationsSection data={initialData.notificationPrefs} onSave={() => showToast("Notification preferences updated")} />}
              {activeTab === "security" && <SecuritySection onSave={() => showToast("Security updated")} />}
              {activeTab === "membership" && <MembershipSection membership={initialData.membership} />}
              {activeTab === "verification" && <VerificationSection status={initialData.profile.verification_status} />}
              {activeTab === "account" && <AccountSection />}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* Global Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#2A2621] text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 font-serif text-sm tracking-widest uppercase"
          >
            <CheckCircle size={16} className="text-[#E6D5C3]" />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------
// SECTIONS
// ------------------------------------------------

function ProfileSection({ data, onSave }: { data: any, onSave: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    bio: data.bio || "",
    education: data.education || "",
    profession: data.profession || "",
    company: data.company || "",
    income_range: data.income_range || "",
    height_cm: data.height_cm || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateProfileSettings(form);
    setLoading(false);
    onSave();
  };

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">My Profile</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Update your personal information and biography.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">First Name</label>
              <input type="text" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Last Name</label>
              <input type="text" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
          </div>
          
          <div>
            <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Biography</label>
            <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors resize-none" placeholder="Write a thoughtful introduction..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Education</label>
              <input type="text" value={form.education} onChange={e => setForm({...form, education: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Profession</label>
              <input type="text" value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Company</label>
              <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Height (cm)</label>
              <input type="number" value={form.height_cm} onChange={e => setForm({...form, height_cm: e.target.value})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B] transition-colors" />
            </div>
          </div>

          <div className="pt-6">
            <button disabled={loading} type="submit" className="bg-[#2A2621] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PhotosSection({ media, onSave }: { media: any[], onSave: () => void }) {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile_media')
        .upload(fileName, file);
        
      if (uploadError) throw new Error(uploadError.message);
      
      const { error: dbError } = await supabase.from('profile_media').insert({ 
        profile_id: user.id,
        type: 'image',
        bucket_path: uploadData.path, 
        is_primary: media.length === 0 
      });
      
      if (dbError) throw new Error(dbError.message);
      
      onSave();
      router.refresh();
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  const handleDelete = async (mediaId: string, path: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const supabase = createClient();
      await supabase.from('profile_media').delete().eq('id', mediaId);
      await supabase.storage.from('profile_media').remove([path]);
      onSave();
      router.refresh();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6 flex justify-between items-end">
          <div>
            <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Photo Gallery</h3>
            <p className="text-[#8C7A6B] font-light text-sm">Upload and arrange your portfolio. Premium members get full gallery access.</p>
          </div>
          <div className="relative">
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
              disabled={uploading}
            />
            <button disabled={uploading} className="bg-[#FDF5E6] border border-[#E6D5C3] text-[#8C7A6B] hover:text-[#2A2621] px-5 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-sm disabled:opacity-50 pointer-events-none">
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {media.length > 0 ? media.map((m, i) => (
            <div key={m.id} className="aspect-[3/4] bg-[#FBF9F6] rounded-xl border border-[#E6D5C3] relative overflow-hidden group">
              <Image src={m.bucket_path} alt="Gallery" fill className="object-cover" />
              <div className="absolute inset-0 bg-[#2A2621]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => handleDelete(m.id, m.bucket_path)} className="w-10 h-10 rounded-full bg-white text-[#8C7A6B] flex items-center justify-center hover:text-red-500 shadow-xl transition-colors"><Trash2 size={16} /></button>
              </div>
              {i === 0 && <span className="absolute top-3 left-3 bg-[#2A2621] text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">Cover</span>}
            </div>
          )) : (
            <div className="col-span-3 text-center py-20 border-2 border-dashed border-[#E6D5C3] rounded-xl bg-[#FBF9F6]">
              <ImageIcon size={40} className="mx-auto text-[#E6D5C3] mb-4" />
              <p className="font-serif text-lg text-[#8C7A6B]">No photos yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreferencesSection({ data, onSave }: { data: any, onSave: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    min_age: data.min_age || 20,
    max_age: data.max_age || 35,
    min_height_cm: data.min_height_cm || 150,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updatePreferencesSettings(form);
    setLoading(false);
    onSave();
  };

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Partner Preferences</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Fine-tune your recommendations.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Min Age</label>
              <input type="number" value={form.min_age} onChange={e => setForm({...form, min_age: Number(e.target.value)})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B]" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Max Age</label>
              <input type="number" value={form.max_age} onChange={e => setForm({...form, max_age: Number(e.target.value)})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B]" />
            </div>
            <div>
              <label className="block text-[#8C7A6B] text-[10px] uppercase tracking-widest font-semibold mb-2">Min Height (cm)</label>
              <input type="number" value={form.min_height_cm} onChange={e => setForm({...form, min_height_cm: Number(e.target.value)})} className="w-full bg-[#FBF9F6] border border-[#E6D5C3] rounded-xl px-4 py-3 text-[#2A2621] font-light focus:outline-none focus:border-[#8C7A6B]" />
            </div>
          </div>
          <div className="pt-6">
            <button disabled={loading} type="submit" className="bg-[#2A2621] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PrivacySection({ isPaused, onSave }: { isPaused: boolean, onSave: () => void }) {
  const [paused, setPaused] = useState(isPaused);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await updateProfileSettings({ is_paused: paused });
    setLoading(false);
    onSave();
  };

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Privacy</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Control your visibility on Vivaha.</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 border border-[#E6D5C3] rounded-xl bg-[#FBF9F6]">
            <div>
              <h4 className="font-serif text-lg text-[#2A2621]">Hide Profile (Incognito)</h4>
              <p className="text-[#8C7A6B] text-xs font-light mt-1">Your profile will be hidden from matches, but you can still message accepted connections.</p>
            </div>
            <button onClick={() => setPaused(!paused)} className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${paused ? 'bg-[#2A2621]' : 'bg-[#E6D5C3]'}`}>
              <motion.div animate={{ x: paused ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
          </div>
          
          <div className="pt-6">
            <button disabled={loading} onClick={handleSubmit} className="bg-[#2A2621] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
              {loading ? "Saving..." : "Save Privacy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection({ data, onSave }: { data: any, onSave: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email_enabled: data?.email_enabled ?? true,
    push_enabled: data?.push_enabled ?? true,
    in_app_enabled: data?.in_app_enabled ?? true,
    messages_enabled: data?.messages_enabled ?? true,
    interests_enabled: data?.interests_enabled ?? true,
    payments_enabled: data?.payments_enabled ?? true,
    announcements_enabled: data?.announcements_enabled ?? true,
    weekly_digest_enabled: data?.weekly_digest_enabled ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { updateNotificationPreferences } = await import("@/app/actions/settings");
    await updateNotificationPreferences(form);
    setLoading(false);
    onSave();
  };

  const Toggle = ({ label, desc, field }: { label: string, desc: string, field: keyof typeof form }) => (
    <div className="flex items-center justify-between p-4 border border-[#E6D5C3]/40 rounded-xl hover:bg-[#FDF5E6]/30 transition-colors">
      <div>
        <h4 className="font-serif text-[#2A2621]">{label}</h4>
        <p className="text-[#8C7A6B] text-[10px] font-light mt-0.5 uppercase tracking-widest">{desc}</p>
      </div>
      <button 
        type="button"
        onClick={() => setForm({ ...form, [field]: !form[field] })} 
        className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${form[field] ? 'bg-[#2A2621]' : 'bg-[#E6D5C3]'}`}
      >
        <motion.div animate={{ x: form[field] ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Notifications</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Fine-tune how and when we reach you.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Delivery Channels</h4>
            <div className="space-y-3">
              <Toggle label="In-App Notifications" desc="The bell icon and toasts while browsing" field="in_app_enabled" />
              <Toggle label="Email Notifications" desc="Receive updates at your registered email" field="email_enabled" />
              <Toggle label="Push Notifications" desc="Mobile and browser push alerts" field="push_enabled" />
            </div>
          </div>

          <div>
            <h4 className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Event Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Toggle label="Messages" desc="When someone writes to you" field="messages_enabled" />
              <Toggle label="Interests" desc="New matches and accepted requests" field="interests_enabled" />
              <Toggle label="Payments" desc="Receipts and subscription updates" field="payments_enabled" />
              <Toggle label="System Announcements" desc="Important platform updates" field="announcements_enabled" />
              <Toggle label="Weekly Digest" desc="Curated matches delivered every Sunday" field="weekly_digest_enabled" />
            </div>
          </div>

          <div className="pt-6 border-t border-[#E6D5C3]/40">
            <button disabled={loading} type="submit" className="bg-[#2A2621] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#1A1815] transition-all font-serif tracking-widest uppercase text-xs flex items-center justify-center gap-2">
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SecuritySection({ onSave }: { onSave: () => void }) {
  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Security</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Protect your account.</p>
        </div>
        <div className="space-y-4 text-center py-20 text-[#8C7A6B] font-light">
          <ShieldCheck className="mx-auto text-[#E6D5C3] mb-4" size={40} />
          <p>Password reset and session management are handled via Supabase Auth email magic links securely.</p>
        </div>
      </div>
    </div>
  );
}

function MembershipSection({ membership }: { membership: any }) {
  const isActive = membership?.is_active && (membership?.tier === "premium" || membership?.tier === "elite");
  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Membership</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Manage your premium access.</p>
        </div>
        {isActive ? (
          <div className="bg-gradient-to-br from-[#FDF5E6] to-[#FBF9F6] border border-[#E6D5C3] rounded-[1.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4"><Crown className="text-[#8C7A6B] opacity-50" size={60} /></div>
            <h4 className="font-serif text-2xl text-[#2A2621] mb-2">Lifetime Premium</h4>
            <p className="text-[#8C7A6B] text-xs tracking-widest uppercase font-semibold mb-8">Active Member</p>
            <div className="flex gap-4">
              <button className="bg-[#2A2621] text-white px-6 py-2.5 rounded-lg text-xs font-serif tracking-widest uppercase shadow-md flex items-center gap-2"><FileDown size={14}/> Receipt</button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FBF9F6] border border-[#E6D5C3] rounded-[1.5rem] p-8 text-center">
            <Crown className="mx-auto text-[#E6D5C3] mb-4" size={40} />
            <h4 className="font-serif text-xl text-[#2A2621] mb-2">Free Account</h4>
            <p className="text-[#8C7A6B] font-light text-sm mb-6">Upgrade to unlock complete profiles and messaging.</p>
            <a href="/premium" className="inline-block bg-[#2A2621] text-white px-8 py-3 rounded-xl font-serif text-xs uppercase tracking-widest shadow-md">Upgrade Now</a>
          </div>
        )}
      </div>
    </div>
  );
}

function VerificationSection({ status }: { status: string }) {
  return (
    <div className="bg-white rounded-[2rem] p-10 border border-[#E6D5C3]/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-[#E6D5C3]/40 pb-6">
          <h3 className="font-serif text-3xl text-[#2A2621] tracking-wide mb-2">Trust & Verification</h3>
          <p className="text-[#8C7A6B] font-light text-sm">Verify your identity to stand out.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#FBF9F6] border border-[#E6D5C3] rounded-2xl p-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === 'verified' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-[#E6D5C3]/20 text-[#8C7A6B]'}`}>
            {status === 'verified' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#2A2621]">Status: <span className="capitalize">{status || "Unverified"}</span></h4>
            <p className="text-[#8C7A6B] text-sm font-light mt-1">Verified profiles get 3x more interest requests.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountSection() {
  const handleDeactivate = async () => {
    if (confirm("Are you sure you want to deactivate your account? Your profile will be hidden from everyone.")) {
      await deactivateAccount();
      alert("Account deactivated.");
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-10 border border-red-100 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10 border-b border-red-100 pb-6">
          <h3 className="font-serif text-3xl text-red-900 tracking-wide mb-2">Danger Zone</h3>
          <p className="text-red-700/60 font-light text-sm">Irreversible account actions.</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg text-[#2A2621]">Deactivate Account</h4>
              <p className="text-[#8C7A6B] text-xs font-light mt-1">Temporarily hide your profile and pause interactions.</p>
            </div>
            <button onClick={handleDeactivate} className="bg-transparent border border-[#2A2621] text-[#2A2621] hover:bg-[#2A2621] hover:text-white px-6 py-2.5 rounded-lg text-xs font-serif tracking-widest uppercase transition-colors">
              Deactivate
            </button>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-red-50">
            <div>
              <h4 className="font-serif text-lg text-red-600">Delete Account</h4>
              <p className="text-red-900/60 text-xs font-light mt-1">Permanently erase all data, messages, and photos.</p>
            </div>
            <button onClick={() => alert("Contact support to request permanent deletion.")} className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-lg text-xs font-serif tracking-widest uppercase transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
