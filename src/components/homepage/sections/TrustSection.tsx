export function TrustSection() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-surface">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            Verified. Authentic. Secure.
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            We believe that every introduction should be genuine. Our comprehensive verification process ensures that you spend time connecting with real people, not algorithms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Trust Cards will go here. Scaffolded for now. */}
          <div className="p-8 rounded-[var(--radius-lg)] bg-background shadow-[var(--shadow-low)] transition-all duration-[var(--animate-fast)] hover:shadow-[var(--shadow-medium)] flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">1</div>
            <h3 className="text-xl font-semibold text-text-primary">Government ID</h3>
            <p className="text-sm text-text-secondary">Every profile requires official identification.</p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] bg-background shadow-[var(--shadow-low)] transition-all duration-[var(--animate-fast)] hover:shadow-[var(--shadow-medium)] flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">2</div>
            <h3 className="text-xl font-semibold text-text-primary">Education Proof</h3>
            <p className="text-sm text-text-secondary">Academic credentials are independently verified.</p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] bg-background shadow-[var(--shadow-low)] transition-all duration-[var(--animate-fast)] hover:shadow-[var(--shadow-medium)] flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">3</div>
            <h3 className="text-xl font-semibold text-text-primary">Family Trust</h3>
            <p className="text-sm text-text-secondary">Designed to include families in the journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
