"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, FileText, User, Calendar, Phone, ExternalLink } from "lucide-react"
import { approveVerification, rejectVerification } from "@/app/actions/admin"
import { toast } from "sonner"
import Image from "next/image"

interface VerificationData {
  id: string
  profile_id: string
  document_type: string
  bucket_path: string
  status: string | null
  submitted_at: string | null
  profiles: {
    id: string
    first_name: string
    last_name: string
    verification_status: string | null
    phone: string | null
    date_of_birth: string | null
  } | null
}

export default function VerificationAdminClient({ verifications }: { verifications: VerificationData[] }) {
  const [selectedVerification, setSelectedVerification] = React.useState<VerificationData | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [rejectionReason, setRejectionReason] = React.useState("")
  const [showRejectModal, setShowRejectModal] = React.useState(false)
  const [localVerifications, setLocalVerifications] = React.useState(verifications)

  const getDocumentUrl = (bucketPath: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/verification_documents/${bucketPath}`
  }

  const handleApprove = async (verification: VerificationData) => {
    setIsProcessing(true)
    const result = await approveVerification(verification.id, verification.profile_id)

    if (result.success) {
      toast.success(`Verified ${verification.profiles.first_name} ${verification.profiles.last_name}`)
      setLocalVerifications(prev => prev.filter(v => v.id !== verification.id))
      setSelectedVerification(null)
    } else {
      toast.error(result.error || "Failed to approve verification")
    }
    setIsProcessing(false)
  }

  const handleReject = async (verification: VerificationData) => {
    setIsProcessing(true)
    const result = await rejectVerification(verification.id, verification.profile_id, rejectionReason)

    if (result.success) {
      toast.success(`Rejected verification for ${verification.profiles.first_name} ${verification.profiles.last_name}`)
      setLocalVerifications(prev => prev.filter(v => v.id !== verification.id))
      setSelectedVerification(null)
      setShowRejectModal(false)
      setRejectionReason("")
    } else {
      toast.error(result.error || "Failed to reject verification")
    }
    setIsProcessing(false)
  }

  const calculateAge = (dob: string | null) => {
    if (!dob) return null
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
    return age
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-medium mb-2">Verification Admin</h1>
          <p className="text-white/60">Review and manage user verification requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-primary mb-1">{localVerifications.length}</div>
            <div className="text-sm text-white/60">Pending Reviews</div>
          </div>
        </div>

        {/* Verifications List */}
        {localVerifications.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No pending verifications</h3>
            <p className="text-white/60">All verification requests have been reviewed.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {localVerifications.map((verification) => (
              <motion.div
                key={verification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {verification.profiles.first_name[0]}{verification.profiles.last_name[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {verification.profiles.first_name} {verification.profiles.last_name}
                        </h3>
                        <p className="text-sm text-white/60">
                          Submitted {new Date(verification.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {verification.profiles.phone && (
                        <div className="flex items-center gap-2 text-white/60">
                          <Phone className="w-4 h-4" />
                          {verification.profiles.phone}
                        </div>
                      )}
                      {verification.profiles.date_of_birth && (
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar className="w-4 h-4" />
                          Age: {calculateAge(verification.profiles.date_of_birth)}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-white/60">
                        <FileText className="w-4 h-4" />
                        {verification.document_type}
                      </div>
                    </div>
                  </div>

                  {/* Document Preview */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedVerification(verification)}
                      className="relative w-48 h-32 bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
                    >
                      <Image
                        src={getDocumentUrl(verification.bucket_path)}
                        alt="Document"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                    </button>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(verification)}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVerification(verification)
                          setShowRejectModal(true)
                        }}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Document Modal */}
        <AnimatePresence>
          {selectedVerification && !showRejectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedVerification(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVerification(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full h-[600px]">
                  <Image
                    src={getDocumentUrl(selectedVerification.bucket_path)}
                    alt="Verification Document"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-medium mb-1">
                        {selectedVerification.profiles.first_name} {selectedVerification.profiles.last_name}
                      </h3>
                      <p className="text-white/60 text-sm">{selectedVerification.document_type}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(selectedVerification)}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
                      >
                        <Check className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reject Modal */}
        <AnimatePresence>
          {showRejectModal && selectedVerification && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setShowRejectModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-medium mb-4">Reject Verification</h3>
                <p className="text-white/60 mb-4">
                  Provide a reason for rejecting {selectedVerification.profiles.first_name}'s verification (optional):
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g., Document is blurry, photo doesn't match profile, etc."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 resize-none mb-4"
                  rows={4}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRejectModal(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReject(selectedVerification)}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
