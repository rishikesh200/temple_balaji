import { Clock, Mail, MapPin, Phone } from "lucide-react"

function Link(props) {
  return <a {...props} />
}

export default function Footer() {
  return (
    <footer className="bg-[#2D1810] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Paruthipattu Balaji Temple</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4A853]" />
                <span className="text-white/80">
                  Paruthipattu Village, Sriperumbudur Taluk,
                  <br />
                  Kancheepuram District, Tamil Nadu – 602105
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">info@paruthipattubalajitemple.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">05:00 AM – 09:00 PM (Daily)</span>
              </div>
            </div>
            <button className="mt-4 border border-[#D4A853] text-[#D4A853] px-4 py-2 rounded-full text-sm hover:bg-[#D4A853] hover:text-[#2D1810] transition-colors">
              Get Directions
            </button>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#D4A853]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-white/80 hover:text-[#D4A853]">
                  History
                </Link>
              </li>
              <li>
                <Link href="/timings" className="text-white/80 hover:text-[#D4A853]">
                  Temple Timings
                </Link>
              </li>
              <li>
                <Link href="/darshan" className="text-white/80 hover:text-[#D4A853]">
                  Darshan & Book
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-white/80 hover:text-[#D4A853]">
                  Rules & Guidelines
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-[#D4A853]">
                  Donate/ಕೊಡುಗೆ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#D4A853]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hrce" className="text-white/80 hover:text-[#D4A853]">
                  HR&CE Department
                </Link>
              </li>
              <li>
                <Link href="/tn-temples" className="text-white/80 hover:text-[#D4A853]">
                  TN Temples
                </Link>
              </li>
              <li>
                <Link href="/online-services" className="text-white/80 hover:text-[#D4A853]">
                  Online Services
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-white/80 hover:text-[#D4A853]">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/80 hover:text-[#D4A853]">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-[#D4A853]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Find Us</h3>
            <div className="rounded-lg overflow-hidden border border-[#D4A853]/30">
              <div className="h-36 bg-[#F5E6D3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAw!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                />
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-[#2D1810] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8B1A1A]" />
                  Paruthipattu Balaji Temple
                </div>
              </div>
              <button className="w-full bg-[#8B1A1A] text-white py-2 text-sm hover:bg-[#6B1414] transition-colors">
                View on Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
            <p>© 2025 Paruthipattu Balaji Temple. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">
              Designed with <span className="text-red-500">♥</span> for Devotees
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

