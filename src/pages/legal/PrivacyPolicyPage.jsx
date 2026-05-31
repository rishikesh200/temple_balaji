import { Shield } from "lucide-react"
import { Link } from "react-router-dom"

const TEMPLE = "Paruthipattu Balaji Temple"
const EMAIL  = "info@paruthipattubalajitemple.org"
const ADDR   = "Paruthipattu, Avadi, Chennai, Tamil Nadu – 602105"
const DATE   = "1 June 2025"

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-bold text-[#2D1810] mb-3 pb-2 border-b border-[#E5D5C5]">{title}</h2>
      <div className="text-[#4A3728] text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Hero */}
      <div className="bg-[#8B1A1A] text-white py-14 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
          <Shield className="w-7 h-7 text-[#D4A853]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/70 text-sm">Effective Date: {DATE}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        <Section title="1. Introduction">
          <p>
            {TEMPLE} ("Temple", "we", "us", or "our") is committed to protecting your personal information and
            your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our online services such as darshan booking,
            pooja seva booking, and donations.
          </p>
          <p>
            By accessing our website and using our services, you agree to the terms of this Privacy Policy.
            If you disagree with any part, please discontinue use of our services.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect information you voluntarily provide when you:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Book a darshan slot or pooja seva</li>
            <li>Make a donation through our website</li>
            <li>Contact us through our contact form</li>
            <li>Subscribe to temple updates</li>
          </ul>
          <p>This information may include:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Personal details:</strong> Full name, email address, mobile number</li>
            <li><strong>Address:</strong> For tax receipt / certificate purposes</li>
            <li><strong>PAN number:</strong> Only when 80G tax exemption certificate is requested</li>
            <li><strong>Payment information:</strong> Processed securely by Razorpay; we do not store card or UPI details</li>
            <li><strong>Gotra / Nakshatra:</strong> For personalised pooja archana — stored only for booking purposes</li>
          </ul>
          <p>We also automatically collect certain technical data (IP address, browser type, pages visited) via standard web server logs for analytics and security.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Process and confirm darshan, pooja, and donation transactions</li>
            <li>Send booking confirmation emails and WhatsApp / SMS notifications</li>
            <li>Issue official donation receipts and 80G tax certificates</li>
            <li>Respond to your enquiries and support requests</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations under Indian law</li>
          </ul>
          <p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </Section>

        <Section title="4. Payment Processing">
          <p>
            All online payments are processed through <strong>Razorpay</strong>, a PCI DSS-compliant payment gateway.
            Your card details, UPI IDs, and net banking credentials are entered directly on Razorpay's secure
            platform and are never transmitted to or stored on our servers.
          </p>
          <p>
            Razorpay's privacy policy is available at{" "}
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer"
              className="text-[#8B1A1A] underline">razorpay.com/privacy</a>.
          </p>
        </Section>

        <Section title="5. Sharing of Information">
          <p>We may share your information only in these limited circumstances:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Service providers:</strong> Razorpay (payments), Twilio (WhatsApp / SMS notifications), email service providers — bound by confidentiality agreements</li>
            <li><strong>Legal compliance:</strong> When required by law, court order, or government authority</li>
            <li><strong>Temple trust administration:</strong> For maintaining official records and donation registers as required by temple trust regulations</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy,
            and as required by applicable Indian laws (including the Income Tax Act for donation records — typically
            7 years). Booking records are retained for a minimum of 2 years.
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience.
            These include session cookies (deleted when you close the browser) and preference cookies.
            You can disable cookies through your browser settings, though some features may not function correctly.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            We implement appropriate technical and organisational security measures including SSL/TLS encryption,
            secure server infrastructure, and access controls to protect your personal data. However, no method of
            internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Under applicable Indian data protection laws, you have the right to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Withdraw consent for non-essential communications</li>
          </ul>
          <p>To exercise these rights, please contact us at <a href={`mailto:${EMAIL}`} className="text-[#8B1A1A] underline">{EMAIL}</a>.</p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            Our services are not directed to children under 18 years of age. We do not knowingly collect personal
            data from minors. If you believe a child has provided us personal information, please contact us and
            we will delete it promptly.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by a revised
            "Effective Date" at the top of this page. We encourage you to review this policy periodically.
            Continued use of the website after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>If you have any questions or concerns about this Privacy Policy, please contact:</p>
          <div className="bg-white border border-[#E5D5C5] rounded-xl p-4 mt-2">
            <p className="font-semibold text-[#2D1810]">{TEMPLE}</p>
            <p>{ADDR}</p>
            <p>Email: <a href={`mailto:${EMAIL}`} className="text-[#8B1A1A] underline">{EMAIL}</a></p>
          </div>
        </Section>

        {/* Footer links */}
        <div className="flex flex-wrap gap-4 text-sm text-[#8B1A1A] pt-4 border-t border-[#E5D5C5]">
          <Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link>
          <Link to="/refund-policy" className="hover:underline">Refund &amp; Cancellation Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
