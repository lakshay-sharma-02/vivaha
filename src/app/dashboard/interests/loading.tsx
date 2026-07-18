export default function InterestsLoading() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen animate-pulse">
      <div className="space-y-2 mb-12">
        <div className="h-8 w-48 bg-maroon/50 rounded" />
        <div className="h-4 w-40 bg-maroon/30 rounded" />
      </div>
      <div className="flex gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-28 bg-maroon/20 rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-maroon/40 rounded-xl border border-gold/20" />
        ))}
      </div>
    </div>
  )
}
