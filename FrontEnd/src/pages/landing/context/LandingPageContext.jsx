import { createContext, useContext } from 'react'

const LandingPageContext = createContext(null)

export function LandingPageProvider({ value, children }) {
  return (
    <LandingPageContext.Provider value={value}>
      {children}
    </LandingPageContext.Provider>
  )
}

export function useLanding() {
  const ctx = useContext(LandingPageContext)
  if (!ctx) throw new Error('useLanding must be used within LandingPageProvider')
  return ctx
}
