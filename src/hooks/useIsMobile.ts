import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  )

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setIsMobile(entry.contentRect.width < breakpoint)
    })
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [breakpoint])

  return isMobile
}
