import { useCallback, useMemo, useState } from 'react'

export default function useAdminSelection(allIds = []) {
  const [selected, setSelected] = useState(() => new Set())

  const idSet = useMemo(() => new Set(allIds), [allIds])

  const toggle = useCallback(id => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleAll = useCallback(() => {
    setSelected(prev => {
      if (prev.size === idSet.size && idSet.size > 0) return new Set()
      return new Set(idSet)
    })
  }, [idSet])

  const clear = useCallback(() => setSelected(new Set()), [])

  const isSelected = useCallback(id => selected.has(id), [selected])

  const selectedIds = useMemo(() => [...selected].filter(id => idSet.has(id)), [selected, idSet])

  const allSelected = idSet.size > 0 && selectedIds.length === idSet.size
  const someSelected = selectedIds.length > 0 && !allSelected

  return {
    selectedIds,
    count: selectedIds.length,
    allSelected,
    someSelected,
    toggle,
    toggleAll,
    clear,
    isSelected,
  }
}
