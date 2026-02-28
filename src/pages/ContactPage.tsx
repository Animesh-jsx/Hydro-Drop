import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, HelpCircle, BookOpen, Facebook, Instagram, Twitter } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import HeroBanner from '../components/common/HeroBanner'
import AnimatedSection from '../components/common/AnimatedSection'

export default function ContactPage() {
  return (
    <PageTransition>
      <HeroBanner
        title="Get in Touch"
        subtitle="We are here to help you with your hydration needs"
      />

      {/* Contact Form + Office Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 shadow-xs">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" placeholder="john@example.com" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" placeholder="Inquiry about..." className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={5} placeholder="How can we help you?" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-primary hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Office Info */}
            <AnimatedSection direction="right">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs space-y-8">
                <h2 className="font-display text-2xl font-bold text-gray-900">Our Office</h2>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-sm text-gray-600">123 Pure Water Lane, Springfield, Mineral Valley, WA 98101, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-sm text-gray-600">support@hydradrop.com</p>
                    <p className="text-sm text-gray-600">business@hydradrop.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-sm text-gray-600">+91 6291212441</p>
                    <p className="text-sm text-gray-500">Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-sm tracking-wider">Follow Us</h4>
                  <div className="flex gap-3">
                    {[Facebook, Instagram, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all">
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-gray-200 relative">
        <iframe
          title="Hydra Drop Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.3!2d-122.332!3d47.604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM2JzE0LjQiTiAxMjLCsDE5JzU1LjIiVw!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* FAQ Links */}
      <section className="py-16 bg-gray-50">
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Have specific questions?</h2>
          <p className="text-gray-600 mb-8">
            You might find the answer you're looking for in our frequently asked questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-6 py-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-xs">
              <HelpCircle size={18} />
              Visit Help Center
            </button>
            <button className="inline-flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-6 py-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-xs">
              <BookOpen size={18} />
              View FAQ
            </button>
          </div>
        </AnimatedSection>
      </section>
    </PageTransition>
  )
}
