export default function MatchesLoading() {
  return (
    <div className="min-h-screen bg-maroon-deep p-8 md:p-12 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 mb-12">
          <div className="h-8 w-48 bg-maroon/50 rounded" />
          <div className="h-4 w-64 bg-maroon/30 rounded" />
        </div>
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-24 bg-maroon/20 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-maroon/40 rounded-2xl border border-gold/20 overflow-hidden">
              <div className="aspect-[4/3] bg-maroon" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-36 bg-maroon/50 rounded" />
                <div className="h-3 w-24 bg-maroon/30 rounded" />
                <div className="h-3 w-48 bg-maroon/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
