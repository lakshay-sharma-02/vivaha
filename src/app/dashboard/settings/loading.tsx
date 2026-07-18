export default function SettingsLoading() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen animate-pulse">
      <div className="space-y-2 mb-12">
        <div className="h-8 w-48 bg-maroon/50 rounded" />
        <div className="h-4 w-40 bg-maroon/30 rounded" />
      </div>
      <div className="space-y-8 max-w-2xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-maroon/40 rounded-2xl border border-gold/20" />
        ))}
      </div>
    </div>
  )
}
