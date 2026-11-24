import { createContext, useCallback, useContext, useState } from 'react'
import { BookDemoModal } from '../components/BookDemoModal'

const DemoModalContext = createContext({ openDemo: () => {} })

/* The dialog grows out of the button that opened it and shrinks back into it, so `openDemo`
 * keeps where that button was. */
export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState(null)
  const [source, setSource] = useState('')

  const openDemo = useCallback((e, place) => {
    const r = e?.currentTarget?.getBoundingClientRect?.()
    setOrigin(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null)
    setSource(place || '')
    setOpen(true)
  }, [])
  const closeDemo = useCallback(() => setOpen(false), [])

  return (
    <DemoModalContext.Provider value={{ openDemo }}>
      {children}
      <BookDemoModal open={open} origin={origin} source={source} onClose={closeDemo} />
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  return useContext(DemoModalContext)
}
