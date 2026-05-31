import { ScrollText } from "lucide-react"
import { Link } from "react-router-dom"

const TEMPLE = "Paruthipattu Balaji Temple"
const EMAIL  = "info@paruthipattubalajitemple.org"
const DATE   = "1 June 2025"

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-bold text-[#2D1810] mb-3 pb-2 border-b border-[#E5D5C5]">{title}</h2>
      <div className="text-[#4A3728] text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Hero */}
      <div className="bg-[#8B1A1A] text-white py-14 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
          <ScrollText className="w-7 h-7 text-[#D4A853]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
        <p className="text-white/70 text-sm">Effective Date: {DATE}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using the website of {TEMPLE} ("Temple", "we", "us", or "our"), including
            its online booking and donation services, you ("User", "devotee", "you") agree to be bound by
            these Terms &amp; Conditions. If you do not agree, please refrain from using our website and services.
          </p>
          <p>
            These terms apply to all visitors, registered users, and devotees who access or use the services
            offered through this website.
          </p>
        </Section>

        <Section title="2. Services Offered">
          <p>Through this website, the Temple provides the following services:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Darshan Booking:</strong> Online slot reservations for Sarva Darshan, Special Darshan, and VIP Darshan</li>
            <li><strong>Pooja &amp; Seva Booking:</strong> Online booking for daily poojas, special sevas, and nerthikadan rituals</li>
            <li><strong>Donations:</strong> Secure online donations towards various temple causes (Annadanam, Renovation, Goshala, etc.)</li>
            <li><strong>Event Information:</strong> Information about upcoming temple festivals and events</li>
          </ul>
        </Section>

        <Section title="3. User Obligations">
          <p>When using our services, you agree to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Provide accurate, current, and complete information during booking or donation</li>
            <li>Not make false, fraudulent, or speculative bookings</li>
            <li>Arrive at the temple on time for booked slots with a valid ID proof (Aadhaar / Driving Licence / Passport)</li>
            <li>Follow all temple dress code and conduct rules</li>
            <li>Not use the website for any unlawful or prohibited purpose</li>
            <li>Not attempt to disrupt, hack, or misuse the website or payment systems</li>
          </ul>
        </Section>

        <Section title="4. Booking Terms">
          <p><strong>Darshan Bookings:</strong></p>
          <ul className="list-disc ml-5 space-y-1 mb-3">
            <li>Online darshan slots are subject to availability</li>
            <li>A booking confirmation will be sent to your registered email and/or mobile number</li>
            <li>Bookings are non-transferable and valid only for the booked date and time slot</li>
            <li>The Temple reserves the right to cancel or modify slots during special occasions, festivals, or temple exigencies</li>
          </ul>
          <p><strong>Pooja / Seva Bookings:</strong></p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Seva bookings must be made in advance; walk-ins are subject to availability</li>
            <li>The devotee or family must report at least 30 minutes before the scheduled seva time</li>
            <li>All participants must adhere to traditional dress code (Dhoti/Angavastram for men; Saree/Churidar with dupatta for women)</li>
            <li>The Temple provides all necessary puja materials; personal items may not be brought into the sanctum</li>
            <li>Photography and mobile phones are strictly prohibited inside the sanctum sanctorum</li>
          </ul>
        </Section>

        <Section title="5. Payment Terms">
          <ul className="list-disc ml-5 space-y-1">
            <li>All online payments are processed securely through <strong>Razorpay</strong></li>
            <li>Prices shown on the website are inclusive of applicable taxes unless stated otherwise</li>
            <li>Payment must be completed at the time of booking to confirm the reservation</li>
            <li>The Temple is not responsible for any additional charges levied by your bank or payment provider (e.g., transaction fees, currency conversion)</li>
            <li>In the event of a payment failure, please check your bank statement before attempting again to avoid duplicate charges</li>
          </ul>
        </Section>

        <Section title="6. Cancellation &amp; Refund">
          <p>
            Please refer to our dedicated{" "}
            <Link to="/refund-policy" className="text-[#8B1A1A] underline">Refund &amp; Cancellation Policy</Link>{" "}
            for complete details regarding cancellations, modifications, and refunds for all services.
          </p>
        </Section>

        <Section title="7. Donations">
          <ul className="list-disc ml-5 space-y-1">
            <li>All donations are voluntary contributions to {TEMPLE}, a registered Hindu temple trust</li>
            <li>Donations qualify for income tax deduction under Section 80G of the Income Tax Act, 1961 (subject to applicable limits)</li>
            <li>Tax exemption certificates will be issued upon request; PAN number is required for certificates above ₹500</li>
            <li>The Temple will utilise donations for the stated cause; however, allocation may be adjusted based on temple needs</li>
            <li>Donations are generally non-refundable once processed (see Refund Policy)</li>
          </ul>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            All content on this website — including text, images, logos, graphics, audio/video clips, and software —
            is the property of {TEMPLE} or its content suppliers and is protected under applicable Indian copyright
            and intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, transmit, or use any content from this website for commercial
            purposes without prior written permission from the Temple.
          </p>
        </Section>

        <Section title="9. Disclaimer of Warranties">
          <p>
            The website and its services are provided on an "as is" and "as available" basis. The Temple makes no
            warranties — express or implied — regarding the accuracy, reliability, or completeness of the information
            provided, or that the website will be uninterrupted or error-free.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, {TEMPLE} and its trustees, administrators, and volunteers
            shall not be liable for any indirect, incidental, special, or consequential damages arising from:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Use or inability to use our website or services</li>
            <li>Technical failures, server downtime, or payment gateway errors</li>
            <li>Unauthorised access to or alteration of your data</li>
            <li>Any matter beyond our reasonable control</li>
          </ul>
        </Section>

        <Section title="11. Third-Party Links">
          <p>
            Our website may contain links to third-party websites (e.g., Razorpay, Google Maps, HR&amp;CE Department).
            These links are provided for convenience only. We have no control over those sites and accept no
            responsibility for their content or practices.
          </p>
        </Section>

        <Section title="12. Governing Law &amp; Jurisdiction">
          <p>
            These Terms &amp; Conditions are governed by and construed in accordance with the laws of India.
            Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction
            of the courts in Chennai, Tamil Nadu, India.
          </p>
        </Section>

        <Section title="13. Amendments">
          <p>
            The Temple reserves the right to modify these Terms &amp; Conditions at any time. Changes will be
            posted on this page with an updated effective date. Your continued use of the website after any
            changes constitutes your acceptance of the revised terms.
          </p>
        </Section>

        <Section title="14. Contact">
          <div className="bg-white border border-[#E5D5C5] rounded-xl p-4">
            <p className="font-semibold text-[#2D1810]">{TEMPLE}</p>
            <p>Paruthipattu, Avadi, Chennai, Tamil Nadu – 602105</p>
            <p>Email: <a href={`mailto:${EMAIL}`} className="text-[#8B1A1A] underline">{EMAIL}</a></p>
          </div>
        </Section>

        <div className="flex flex-wrap gap-4 text-sm text-[#8B1A1A] pt-4 border-t border-[#E5D5C5]">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/refund-policy" className="hover:underline">Refund &amp; Cancellation Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
