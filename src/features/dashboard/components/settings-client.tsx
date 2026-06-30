"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { createClient } from "@/shared/lib/supabase/client"
import { 
  Shield, Bell, Eye, Trash2, LogOut, CheckCircle2, 
  Lock, EyeOff, ToggleLeft, ToggleRight, AlertTriangle
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  user: SupabaseUser
  profile: {
    first_name: string
    last_name: string
    is_paused: boolean | null
    is_active: boolean | null
  } | null
}

export default function SettingsClient({ user, profile }: Props) {
  const router = useRouter()
  const [isPaused, setIsPaused] = React.useState(profile?.is_paused ?? false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [toast, setToast] = React.useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false)

  // Password change
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [pwError, setPwError] = React.useState<string | null>(null)
  const [pwLoading, setPwLoading] = React.useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handlePauseToggle = async () => {
    setIsSaving(true)
    const supabase = createClient()
    const next = !isPaused
    const { error } = await supabase
      .from("profiles")
      .update({ is_paused: next })
      .eq("id", user.id)
    if (!error) {
      setIsPaused(next)
      showToast(next ? "Profile paused — you won't appear in Discover." : "Profile is now visible in Discover.")
    }
    setIsSaving(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError(null)
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.")
      return
    }
    if (newPassword.length < 8) {
      setPwError("Password must be at least 8 characters.")
      return
    }
    setPwLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwError(error.message)
    } else {
      showToast("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    setPwLoading(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const sections = [
    { icon: Lock, label: "Security", color: "text-blue-400" },
    { icon: Eye, label: "Privacy", color: "text-purple-400" },
    { icon: Bell, label: "Notifications", color: "text-amber-400" },
  ]

  return (
    <div className="space-y-12 pb-24 max-w-2xl">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-primary text-black font-medium shadow-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </motion.div>
      )}

      {/* Header */}
      <section className="pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Settings</h1>
          <p className="text-white/60 text-lg">Manage your account security, privacy, and preferences.</p>
        </motion.div>
      </section>

      {/* Change Password */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-playfair text-xl">Change Password</h3>
            <p className="text-xs text-white/40">You are signed in as <span className="text-white/60">{user.email}</span></p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {pwError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{pwError}</div>
          )}
          <div className="space-y-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Min. 8 characters"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Re-enter new password"
            />
          </div>
          <button
            type="submit"
            disabled={pwLoading || !newPassword || !confirmPassword}
            className="px-8 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pwLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* Privacy: Pause Profile */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <EyeOff className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-playfair text-xl">Profile Visibility</h3>
            <p className="text-xs text-white/40">Control whether you appear in the Discover feed.</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
          <div>
            <p className="font-medium text-sm">Pause my profile</p>
            <p className="text-xs text-white/50 mt-1">
              {isPaused ? "Your profile is hidden from Discover." : "You are visible to other members."}
            </p>
          </div>
          <button
            onClick={handlePauseToggle}
            disabled={isSaving}
            className="shrink-0 transition-opacity disabled:opacity-50"
          >
            {isPaused
              ? <ToggleRight className="w-10 h-10 text-primary" />
              : <ToggleLeft className="w-10 h-10 text-white/30" />
            }
          </button>
        </div>
      </section>

      {/* Account Actions */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="font-playfair text-xl">Account Actions</h3>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
        >
          <LogOut className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
          <div>
            <p className="font-medium text-sm">Sign Out</p>
            <p className="text-xs text-white/40 mt-0.5">Sign out from all devices</p>
          </div>
        </button>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors text-left group"
          >
            <Trash2 className="w-5 h-5 text-red-500/60 group-hover:text-red-400 transition-colors" />
            <div>
              <p className="font-medium text-sm text-red-400">Delete Account</p>
              <p className="text-xs text-white/40 mt-0.5">Permanently remove all data. This cannot be undone.</p>
            </div>
          </button>
        ) : (
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 leading-relaxed">
                This will permanently delete your profile, photos, matches, and all data. 
                Please contact <strong>support@vivaha.in</strong> to initiate account deletion per our data retention policy.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
