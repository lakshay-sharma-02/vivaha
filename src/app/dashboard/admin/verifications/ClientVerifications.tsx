"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, FileText, AlertCircle, RefreshCw } from "lucide-react";
import { getPendingVerifications, approveVerification, rejectVerification } from "@/app/actions/admin";
import { createClient } from "@/shared/lib/supabase/client";

export default function ClientVerifications() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getPendingVerifications();
    if (res.success) {
      setVerifications(res.verifications);
    } else {
      setError(res.error || "Failed to load verifications");
    }
    setLoading(false);
  };

  const handleApprove = async (docId: string, profileId: string) => {
    setActionLoading(docId);
    const res = await approveVerification(docId, profileId);
    if (res.success) {
      setVerifications(prev => prev.filter(v => v.id !== docId));
    } else {
      alert("Error approving: " + res.error);
    }
    setActionLoading(null);
  };

  const handleReject = async (docId: string, profileId: string) => {
    if (!rejectionReason) return;
    setActionLoading(docId);
    const res = await rejectVerification(docId, profileId, rejectionReason);
    if (res.success) {
      setVerifications(prev => prev.filter(v => v.id !== docId));
      setRejectingId(null);
      setRejectionReason("");
    } else {
      alert("Error rejecting: " + res.error);
    }
    setActionLoading(null);
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-4">
          <div className="w-8 h-[1px] bg-[#8C7A6B]/50" />
          <h1 className="text-3xl md:text-5xl text-[#2A2621] font-display tracking-tight leading-tight">
            Verification Queue
          </h1>
          <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase">
            Review and approve member identities
          </p>
        </div>

        <button 
          onClick={fetchData}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C7A6B] hover:text-[#2A2621] transition-colors"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Refresh Queue
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-4 text-red-800">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/50 border border-[#E5D9CC] rounded-2xl h-80" />
          ))}
        </div>
      ) : verifications.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-[#E5D9CC] rounded-2xl">
          <CheckCircle size={48} className="mx-auto text-[#8C7A6B] mb-6" strokeWidth={1} />
          <h3 className="text-xl font-display text-[#2A2621] mb-2">All Caught Up</h3>
          <p className="text-sm text-[#8C7A6B]">There are no pending verifications in the queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {verifications.map((item, idx) => {
              const profile = item.profiles;
              const isRejecting = rejectingId === item.id;
              
              // Resolve image URL
              let imageUrl = item.publicUrl || "";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-[#E5D9CC] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Document Preview */}
                  <div className="relative h-48 bg-[#FDFBF7] border-b border-[#E5D9CC]">
                    {imageUrl ? (
                      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        <Image 
                          src={imageUrl} 
                          alt="ID Document" 
                          fill 
                          className="object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in" 
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#8C7A6B]">
                        <FileText size={32} className="mb-2 opacity-50" />
                        <span className="text-xs font-medium tracking-widest uppercase">No Preview</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2A2621]">
                      {item.document_type || "ID Document"}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#2A2621]">
                        {profile?.first_name} {profile?.last_name}
                      </h3>
                      <div className="text-xs text-[#8C7A6B] mt-2 space-y-1">
                        <p>Phone: {profile?.phone || "N/A"}</p>
                        <p>DOB: {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "N/A"}</p>
                        <p>Submitted: {new Date(item.submitted_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto">
                      {isRejecting ? (
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Reason for rejection..." 
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full text-xs p-3 bg-[#FDFBF7] border border-[#E5D9CC] rounded-lg focus:outline-none focus:border-[#2A2621]"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setRejectingId(null)}
                              className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-[#8C7A6B] hover:bg-[#FDFBF7] rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => handleReject(item.id, item.profile_id)}
                              disabled={actionLoading === item.id || !rejectionReason}
                              className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-red-900/80 hover:bg-red-900 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {actionLoading === item.id ? "..." : "Confirm Reject"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button 
                            onClick={() => setRejectingId(item.id)}
                            disabled={actionLoading === item.id}
                            className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-red-900/70 border border-red-900/20 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                          <button 
                            onClick={() => handleApprove(item.id, item.profile_id)}
                            disabled={actionLoading === item.id}
                            className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-[#2A2621] hover:bg-black rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckCircle size={14} /> Approve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
