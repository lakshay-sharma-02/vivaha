export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-maroon-deep p-8 md:p-12 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-maroon/50 rounded" />
          <div className="h-4 w-40 bg-maroon/30 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="h-64 bg-maroon/20 rounded-[2rem] border border-gold/20" />
            <div className="space-y-4">
              <div className="h-6 w-48 bg-maroon/40 rounded" />
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-maroon/40 rounded-2xl border border-gold/20" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="h-48 bg-maroon/40 rounded-[2rem] border border-gold/20" />
            <div className="h-64 bg-maroon/30 rounded-[2rem] border border-gold/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
