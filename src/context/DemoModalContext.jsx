import { createContext, useCallback, useContext, useState } from 'react'
import { BookDemoModal } from '../components/BookDemoModal'

const DemoModalContext = createContext({ openDemo: () => {} })

export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openDemo = useCallback(() => setOpen(true), [])
  const closeDemo = useCallback(() => setOpen(false), [])

  return (
    <DemoModalContext.Provider value={{ openDemo }}>
      {children}
      <BookDemoModal open={open} onClose={closeDemo} />
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  return useContext(DemoModalContext)
}
