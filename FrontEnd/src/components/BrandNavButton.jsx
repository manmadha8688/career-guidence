// Shared "← learnforearn" nav brand — matches Missions navbar; color via --section-brand-color on page root.
export default function BrandNavButton({ onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`section-nav-brand${className ? ` ${className}` : ''}`}
      {...props}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      LearnForEarn
    </button>
  )
}
