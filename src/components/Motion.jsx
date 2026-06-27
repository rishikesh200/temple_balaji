import { motion } from "framer-motion"

// ── Shared viewport config ────────────────────────────────────
const VP = { once: true, amount: 0.15 }

// ── Fade Up — section headings, cards, general content ────────
export function FadeUp({ children, delay = 0, duration = 0.6, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Blur Reveal — headings, hero text, important titles ────────
export function BlurReveal({ children, delay = 0, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Fade Left — left-side text content ────────────────────────
export function FadeLeft({ children, delay = 0, duration = 0.6, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Fade Right — right-side images, cards ─────────────────────
export function FadeRight({ children, delay = 0, duration = 0.6, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Fade Down — hero badges, top labels ───────────────────────
export function FadeDown({ children, delay = 0, duration = 0.6, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Zoom In — hero bg image, feature images ───────────────────
export function ZoomIn({ children, delay = 0, duration = 0.8, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Zoom Out — large bg panels, banners ───────────────────────
export function ZoomOut({ children, delay = 0, duration = 0.8, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger Container — wraps a grid of cards ─────────────────
export function StaggerContainer({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger Item — each card inside StaggerContainer ──────────
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Scale Pop — buttons, badges, small icons ──────────────────
export function ScalePop({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={VP}
      className={className}
    >
      {children}
    </motion.div>
  )
}
