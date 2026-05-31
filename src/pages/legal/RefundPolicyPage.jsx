import { RefreshCw } from "lucide-react"
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

function PolicyTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5D5C5]">
      <table className="w-full text-sm">
        <thead className="bg-[#8B1A1A] text-white">
          <tr>
            {rows[0].map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#FDF8F3]'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Hero */}
      <div className="bg-[#8B1A1A] text-white py-14 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
          <RefreshCw className="w-7 h-7 text-[#D4A853]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Refund &amp; Cancellation Policy</h1>
        <p className="text-white/70 text-sm">Effective Date: {DATE}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        <Section title="1. Overview">
          <p>
            {TEMPLE} is a religious and charitable institution. This policy outlines the conditions under which
            cancellations and refunds are processed for darshan bookings, pooja / seva bookings, and donations.
            Please read this policy carefully before making any payment.
          </p>
          <p>
            By completing a payment on our website, you acknowledge and agree to the terms of this Refund &amp; Cancellation Policy.
          </p>
        </Section>

        <Section title="2. Donations">
          <p><strong>Donations are generally non-refundable</strong> once processed, as they are voluntary
          contributions made to a registered temple trust for charitable and religious purposes.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Once a donation is confirmed and a receipt is issued, it cannot be reversed</li>
            <li>In the rare event of a technical error resulting in a duplicate charge, a full refund of the
            duplicate amount will be processed within <strong>7–10 business days</strong></li>
            <li>Refund requests for technical errors must be reported within <strong>48 hours</strong> of the transaction</li>
          </ul>
        </Section>

        <Section title="3. Darshan Booking — Cancellation &amp; Refund">
          <PolicyTable rows={[
            ['Cancellation Timing', 'Refund Amount', 'Processing Time'],
            ['More than 48 hours before slot', '100% refund', '5–7 business days'],
            ['24–48 hours before slot',        '50% refund',  '5–7 business days'],
            ['Less than 24 hours before slot', 'No refund',   '—'],
            ['No-show (did not attend)',        'No refund',   '—'],
          ]} />
          <p className="mt-3">
            <strong>Temple-initiated cancellations:</strong> If the Temple cancels or reschedules a slot due to
            special occasions, festivals, maintenance, or other temple exigencies, a <strong>full refund</strong> will
            be processed automatically within 5–7 business days, or the booking may be rescheduled at your preference.
          </p>
        </Section>

        <Section title="4. Pooja / Seva Booking — Cancellation &amp; Refund">
          <PolicyTable rows={[
            ['Cancellation Timing', 'Refund Amount', 'Processing Time'],
            ['More than 72 hours before seva', '100% refund', '5–7 business days'],
            ['48–72 hours before seva',        '75% refund',  '5–7 business days'],
            ['24–48 hours before seva',        '50% refund',  '5–7 business days'],
            ['Less than 24 hours before seva', 'No refund',   '—'],
            ['No-show / did not report on time','No refund',  '—'],
          ]} />
          <p className="mt-3">
            <strong>Special note:</strong> Sevas involving physical preparation by priests (e.g., Abhishekam,
            Kalyanotsavam) may have a stricter non-refundable window. This will be indicated at the time of booking.
          </p>
          <p>
            <strong>Temple-initiated cancellations:</strong> Full refund or complimentary rescheduling offered.
          </p>
        </Section>

        <Section title="5. Nerthikadan (Vow-Fulfilling Offerings)">
          <ul className="list-disc ml-5 space-y-1">
            <li>Bookings for Nerthikadan sevas (Thulabaram, Mottai, Kadhukuthu, Mavilakku) may be cancelled
            up to <strong>48 hours before</strong> the scheduled date for a <strong>100% refund</strong></li>
            <li>Cancellations within 48 hours: <strong>50% refund</strong></li>
            <li>Same-day cancellations or no-shows: <strong>No refund</strong></li>
          </ul>
        </Section>

        <Section title="6. How to Request a Cancellation or Refund">
          <p>To cancel a booking or request a refund, please:</p>
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Email us at{" "}
              <a href={`mailto:${EMAIL}`} className="text-[#8B1A1A] underline">{EMAIL}</a>{" "}
              with subject: <strong>"Cancellation / Refund Request"</strong>
            </li>
            <li>Include your <strong>booking reference number</strong>, registered mobile number or email, and reason for cancellation</li>
            <li>Our team will acknowledge your request within <strong>1 business day</strong></li>
          </ol>
          <p>Alternatively, call our temple helpdesk during office hours (9:00 AM – 5:00 PM, Mon–Sat).</p>
        </Section>

        <Section title="7. Refund Processing">
          <ul className="list-disc ml-5 space-y-1">
            <li>Approved refunds are credited to the <strong>original payment method</strong> used during booking</li>
            <li>Razorpay / bank processing may take <strong>5–10 business days</strong> after approval</li>
            <li>Refunds are not issued in cash</li>
            <li>UPI refunds typically reflect within 2–3 business days; card refunds within 5–7 business days depending on the issuing bank</li>
          </ul>
        </Section>

        <Section title="8. Non-Refundable Situations">
          <p>No refund will be issued in the following situations:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Devotee was denied entry due to not adhering to dress code or temple rules</li>
            <li>Devotee arrived late and missed the booked seva slot</li>
            <li>Booking was cancelled within the non-refundable window as stated above</li>
            <li>Services were rendered as confirmed (seva was performed on behalf of the devotee)</li>
            <li>Voluntary donations once a receipt has been issued</li>
          </ul>
        </Section>

        <Section title="9. Payment Failures &amp; Duplicate Charges">
          <p>
            In the event your account is debited but you do not receive a booking confirmation, please wait
            <strong> 30 minutes</strong> as transactions may take time to reflect. If the issue persists:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Do <strong>not</strong> attempt the payment again immediately</li>
            <li>Contact us with your transaction ID / bank reference number</li>
            <li>We will investigate and issue a refund within <strong>7 business days</strong> if the charge was erroneous</li>
          </ul>
        </Section>

        <Section title="10. Contact for Refund Queries">
          <div className="bg-white border border-[#E5D5C5] rounded-xl p-4">
            <p className="font-semibold text-[#2D1810]">{TEMPLE}</p>
            <p>Paruthipattu, Avadi, Chennai, Tamil Nadu – 602105</p>
            <p>Email: <a href={`mailto:${EMAIL}`} className="text-[#8B1A1A] underline">{EMAIL}</a></p>
            <p className="text-xs text-gray-500 mt-1">Response time: within 1 business day</p>
          </div>
        </Section>

        <div className="flex flex-wrap gap-4 text-sm text-[#8B1A1A] pt-4 border-t border-[#E5D5C5]">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
