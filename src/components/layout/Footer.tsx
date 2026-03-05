import { Link } from 'react-router-dom'
import { Droplets, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Team', path: '/about' },
  { name: 'Careers', path: '/about' },
  { name: 'News & Press', path: '/blog' },
]

const supportLinks = [
  { name: 'Contact Us', path: '/contact' },
  { name: 'FAQ', path: '/contact' },
  { name: 'Shipping & Returns', path: '/contact' },
  { name: 'Privacy Policy', path: '/' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-darkest text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-7 h-7 text-primary" />
              <span className="font-display font-bold text-2xl text-white">Hydra Drop</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Redefining purity, one drop at a time. Join us in our mission for cleaner, healthier hydration for the world.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Hydrated */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Hydrated</h4>
            <p className="text-sm mb-4">Subscribe for updates and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary hover:bg-emerald-600 text-white px-4 py-2.5 rounded-r-lg font-semibold text-sm transition-colors">
                Go
              </button>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>Kolkata, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+91 6291212441</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <span>info@hydradrop.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 Hydra Drop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
