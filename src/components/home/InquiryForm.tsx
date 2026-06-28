import AnimatedSection from '../common/AnimatedSection'

export default function InquiryForm() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Refresh Your Life</h2>
            <p className="text-gray-600 text-lg">Subscribe to Hydra Drop</p>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Left - Image */}
            <div className="bg-emerald-50 p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="text-center relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500&auto=format&fit=crop&q=80"
                  alt="Hydra Drop Water Bottles"
                  className="max-h-87 w-auto mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-xl"
                />
                <h3 className="font-display font-bold text-3xl mt-8 text-emerald-900">
                  Taste the <span className="text-secondary italic">Difference</span>
                </h3>
              </div>
            </div>

            {/* Right - Form */}
            <div className="p-10 lg:p-14">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 border-b pb-4 border-gray-100">
                Inquire for Bulk or Home Delivery
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" placeholder="you@company.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Requirements</label>
                  <textarea rows={4} placeholder="Tell us about your needs (Home, Office, Event)..." className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-emerald-900/30 transition-all uppercase tracking-wider">
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
