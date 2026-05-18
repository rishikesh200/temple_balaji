import React, { useEffect, useRef, useState } from "react"
import { CheckCircle, Sparkles, X } from "lucide-react"
import { donationCauses } from "../../../data/donationCauses"
import { paymentAPI, loadRazorpayScript } from "../../../services/api"

export default function DonateFormSection({ selectedCause, selectedAmount }) {
  const [cause, setCause] = useState(selectedCause || donationCauses[0]?.id || "general")
  const [amount, setAmount] = useState(selectedAmount || "")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [donationRef, setDonationRef] = useState("")
  const [amountPaid, setAmountPaid] = useState(0)
  const formRef = useRef(null)

  useEffect(() => {
    if (selectedCause) {
      setCause(selectedCause)
    }
  }, [selectedCause])

  useEffect(() => {
    setAmount(selectedAmount || "")
  }, [selectedAmount])

  useEffect(() => {
    if (formRef.current && (selectedCause || selectedAmount)) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedCause, selectedAmount])

  const selectedCauseLabel = donationCauses.find((item) => item.id === cause)?.title || "Temple Donation"

  const handleSubmit = async () => {
    const parsedAmount = Number(amount)
    if (!parsedAmount || parsedAmount < 1) {
      window.alert("Please enter a valid donation amount.")
      return
    }

    if (!donorName.trim()) {
      window.alert("Please enter your name.")
      return
    }

    if (!donorEmail.trim()) {
      window.alert("Please enter your email.")
      return
    }

    if (!donorPhone.trim() || donorPhone.trim().length < 10) {
      window.alert("Please enter a valid mobile number.")
      return
    }

    setIsProcessing(true)

    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        window.alert("Unable to load payment checkout. Please try again.")
        return
      }

      const order = await paymentAPI.createDonationOrder({
        donorName,
        donorEmail,
        donorPhone,
        amount: parsedAmount,
        cause,
        message,
      })

      if (!order.success) {
        window.alert(order.message || order.error || "Unable to create donation order.")
        return
      }

      const options = {
        key: order.data.razorpayKeyId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: donorName,
        description: message || selectedCauseLabel,
        order_id: order.data.orderId,
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        notes: {
          paymentType: "donation",
          donationId: order.data.donationId,
          cause,
        },
        theme: {
          color: "#8B1A1A",
        },
        handler: async (response) => {
          const verify = await paymentAPI.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            paymentType: "donation",
          })

          if (verify.success) {
            setDonationRef(response.razorpay_payment_id)
            setAmountPaid(parsedAmount)
            setDonationSuccess(true)
            window.scrollTo({ top: 0, behavior: "smooth" })
          } else {
            window.alert(verify.message || "Donation verification failed.")
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      window.alert("Unable to complete donation at this time.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section id="donation-form" ref={formRef} className="py-16 md:py-20 bg-white border-t border-b border-[#E5D5C5]/60">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#FDF8F3] border border-[#E5D5C5] rounded-3xl p-8 shadow-sm">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-widest text-[#8B1A1A] mb-3">Dedicated Donation</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810]">Donate with your details</h2>
            <p className="text-[#6B4423] max-w-2xl mx-auto mt-4 text-sm font-medium">
              Choose a cause, fill in your contact details, and complete the secure Razorpay donation checkout.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-[#6B4423]">Select Cause</span>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
              >
                {donationCauses.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[#6B4423]">Amount (₹)</span>
              <input
                type="number"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <label className="block">
              <span className="text-xs font-semibold text-[#6B4423]">Full Name</span>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[#6B4423]">Email</span>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="Your email"
                className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[#6B4423]">Mobile</span>
              <input
                type="tel"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                placeholder="Mobile number"
                className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
              />
            </label>
          </div>

          <label className="block mt-6">
            <span className="text-xs font-semibold text-[#6B4423]">Message (optional)</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Add a note for the temple"
              className="mt-2 w-full bg-white border border-[#E5D5C5] rounded-3xl py-3 px-4 text-sm text-[#2D1810] focus:outline-none focus:border-[#8B1A1A]"
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`mt-8 w-full inline-flex items-center justify-center gap-3 rounded-3xl bg-[#8B1A1A] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#6B1414] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? "Processing…" : "Proceed to Donate"}
          </button>
        </div>
      </div>

      {donationSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden border-2 border-[#D4A853] shadow-2xl relative animate-scale-up max-h-[90vh] flex flex-col">
            <div className="bg-[#8B1A1A] text-white p-6 text-center border-b-2 border-dashed border-[#D4A853] relative">
              <button
                type="button"
                onClick={() => setDonationSuccess(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-md border border-[#D4A853]">
                <CheckCircle className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wide">Donation Confirmed</h3>
              <p className="text-[#E8C86A] text-xs font-semibold uppercase tracking-widest mt-1">Thank you for supporting the temple</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-[#FDF8F3]/50">
              <div className="bg-white border border-[#E5D5C5] rounded-3xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#6B4423]">Donation Reference</p>
                    <p className="font-mono text-sm font-bold text-[#8B1A1A]">{donationRef}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold border border-green-200">Success</span>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm text-[#6B4423]">
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-widest text-[#8B1A1A]">Cause</span>
                    <p className="font-semibold text-[#2D1810]">{selectedCauseLabel}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-widest text-[#8B1A1A]">Amount Paid</span>
                    <p className="font-semibold text-[#2D1810]">₹ {amountPaid.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-widest text-[#8B1A1A]">Donor</span>
                    <p className="font-semibold text-[#2D1810]">{donorName}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E5D5C5] bg-white p-5 text-[#6B4423] text-sm leading-relaxed shadow-sm">
                <div className="flex items-center gap-2 text-[#8B1A1A] font-semibold mb-3">
                  <Sparkles className="w-4 h-4" /> Confirmation
                </div>
                <p>Your donation has been successfully processed. Please save the reference below for your records.</p>
              </div>
            </div>

            <div className="bg-[#8B1A1A]/5 border-t-2 border-dashed border-[#D4A853] p-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setDonationSuccess(false)
                  setCause(donationCauses[0]?.id || "general")
                  setAmount("")
                  setDonorName("")
                  setDonorEmail("")
                  setDonorPhone("")
                  setMessage("")
                }}
                className="flex-1 bg-[#8B1A1A] text-white py-3.5 rounded-xl font-bold text-xs md:text-sm border border-[#D4A853] hover:bg-[#6B1414] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
