/** Clickable stat cards — count + label + optional icon; doubles as a visual filter control. */
export default function AdminFilterStatCards({ items, active, onSelect, ariaLabel = 'Filter' }) {
  return (
    <div className="admin-filter-stats" role="tablist" aria-label={ariaLabel}>
      {items.map(item => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`admin-filter-stat-card${isActive ? ' is-active' : ''}`}
            style={{ '--stat-accent': item.color }}
            onClick={() => onSelect(item.id)}
          >
            {Icon && (
              <div className="admin-filter-stat-card__icon">
                <Icon size={18} />
              </div>
            )}
            <div className="admin-filter-stat-card__value">{item.value ?? 0}</div>
            <div className="admin-filter-stat-card__label">{item.label}</div>
          </button>
        )
      })}
    </div>
  )
}
