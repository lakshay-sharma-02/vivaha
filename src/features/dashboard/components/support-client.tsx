"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  MessageCircle, Mail, HelpCircle, ChevronDown, ChevronUp,
  CheckCircle2, Phone, Clock, FileText
} from "lucide-react"

const FAQ = [
  {
    q: "How does the verification process work?",
    a: "After submitting a government-issued ID through the Verification page, our team manually reviews your document within 24-48 hours. You will receive an email notification once approved. Only verified profiles receive the gold checkmark and appear at the top of Discover."
  },
  {
    q: "How do I know if someone has expressed interest in me?",
    a: "You will receive a real-time notification and an email alert when another member sends you an interest request. You can review and respond through the Matches page."
  },
  {
    q: "What happens when there is a mutual match?",
    a: "When both parties accept each other's interest, a mutual match is created. Private contact details (phone and Instagram) are unlocked for both members, visible on the Connections page."
  },
  {
    q: "Is my data shared with other members?",
    a: "Your private contact details (phone, Instagram) are only shared with mutually matched connections. Your government ID is never stored publicly or visible to other members. All data is encrypted at rest and in transit."
  },
  {
    q: "Can I pause or delete my profile?",
    a: "Yes. Visit Settings to temporarily pause your profile (hiding it from Discover) or contact support to initiate a full account deletion per our GDPR-compliant data retention policy."
  },
  {
    q: "How does the payment work?",
    a: "We use Razorpay for secure payment processing. The Premium plan is a one-time ₹5,000 lifetime payment. All transactions are encrypted and we do not store your card details."
  },
]

export default function SupportClient({ userEmail }: { userEmail: string }) {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isSending, setIsSending] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !message) return
    setIsSending(true)
    // In production this would call an API route to send an email via Resend/SendGrid.
    // For now we simulate a 1.5s delay and show success.
    await new Promise((r) => setTimeout(r, 1500))
    setSent(true)
    setIsSending(false)
  }

  return (
    <div className="space-y-16 pb-24 max-w-3xl">
      {/* Header */}
      <section className="pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium">Support Centre</h1>
          <p className="text-white/60 text-lg">
            Our concierge team is here to help. We typically respond within 4 hours.
          </p>
        </motion.div>
      </section>

      {/* Quick Contact Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: Mail,
            label: "Email Us",
            value: "support@vivaha.in",
            sub: "Response within 4 hours",
            color: "text-primary",
            bg: "bg-primary/10 border-primary/20",
          },
          {
            icon: Phone,
            label: "WhatsApp",
            value: "+91 98765 00000",
            sub: "Mon–Sat, 10am–7pm IST",
            color: "text-green-400",
            bg: "bg-green-500/10 border-green-500/20",
          },
          {
            icon: Clock,
            label: "Response Time",
            value: "< 4 Hours",
            sub: "Average first response",
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl border ${card.bg} space-y-3`}
          >
            <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">{card.label}</p>
              <p className={`font-semibold text-sm mt-1 ${card.color}`}>{card.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="font-playfair text-2xl">Frequently Asked Questions</h2>
        </div>
        {FAQ.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-sm pr-4">{item.q}</span>
              {openFaq === i
                ? <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
              }
            </button>
            {openFaq === i && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 pb-5 origin-top"
              >
                <p className="text-sm text-white/60 leading-relaxed">{item.a}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-playfair text-xl">Send a Message</h3>
            <p className="text-xs text-white/40">We will respond to <span className="text-white/60">{userEmail}</span></p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <div>
              <p className="font-medium text-lg font-playfair">Message Sent!</p>
              <p className="text-sm text-white/50 mt-1">Our team will get back to you within 4 hours.</p>
            </div>
            <button
              onClick={() => { setSent(false); setSubject(""); setMessage("") }}
              className="text-xs text-primary hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs text-white/50 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Issue with my verification status"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/50 uppercase tracking-wider">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="Describe your issue in detail..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSending || !subject || !message}
              className="px-8 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {isSending ? "Sending..." : "Submit Ticket"}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
