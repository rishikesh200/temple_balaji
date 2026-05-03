function toCssLength(value, fallbackPx) {
  if (value == null) return fallbackPx
  if (typeof value === "number") return `${value}px`
  return value
}

export function getConcaveCornerStyle(borderRadius, concave) {
  const c = toCssLength(concave, "15px")
  const br = toCssLength(borderRadius, "18px")
  const maskImage = `
    radial-gradient(circle at 0% 0%, transparent ${c}, black ${c}),
    radial-gradient(circle at 100% 0%, transparent ${c}, black ${c}),
    radial-gradient(circle at 0% 100%, transparent ${c}, black ${c}),
    radial-gradient(circle at 100% 100%, transparent ${c}, black ${c})
  `.trim()

  return {
    borderRadius: br,
    maskImage,
    maskSize: "51% 51%",
    maskRepeat: "no-repeat",
    maskPosition: "top left, top right, bottom left, bottom right",
    WebkitMaskImage: maskImage,
    WebkitMaskSize: "51% 51%",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "top left, top right, bottom left, bottom right",
  }
}

export default function Concave({
  borderRadius = "18px",
  concave = "15px",
  className,
  style,
  children,
  ...rest
}) {
  const concaveStyle = getConcaveCornerStyle(borderRadius, concave)

  return (
    <div className={className} style={{ ...concaveStyle, ...style }} {...rest}>
      {children}
    </div>
  )
}
