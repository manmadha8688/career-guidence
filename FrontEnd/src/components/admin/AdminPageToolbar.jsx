/** Subtitle + actions row — title lives in the navbar only (no duplicate h1). */
export default function AdminPageToolbar({ subtitle, children }) {
  return (
    <div className="admin-page-toolbar">
      {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
      {children && <div className="admin-page-toolbar__actions">{children}</div>}
    </div>
  )
}
