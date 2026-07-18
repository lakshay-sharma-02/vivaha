export default function ProfilePreviewLoading() {
  return (
    <div className="min-h-screen bg-maroon-deep animate-pulse">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-maroon/40 rounded-[2rem] border border-gold/20 overflow-hidden mb-8">
          <div className="aspect-[3/2] bg-maroon" />
          <div className="p-8 space-y-4">
            <div className="h-8 w-48 bg-maroon/50 rounded" />
            <div className="h-4 w-32 bg-maroon/30 rounded" />
            <div className="h-4 w-64 bg-maroon/30 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-maroon/40 rounded-2xl border border-gold/20" />
          ))}
        </div>
      </div>
    </div>
  )
}
