export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="glass p-12 rounded-3xl text-center max-w-xl">
        <h1 className="text-4xl font-playfair font-semibold mb-4 text-foreground">
          Welcome to the Inner Circle
        </h1>
        <p className="text-muted-foreground">
          Your application is currently under review by the Vivaha curation committee.
          We will notify you via email once your profile has been approved for full access.
        </p>
      </div>
    </div>
  )
}
