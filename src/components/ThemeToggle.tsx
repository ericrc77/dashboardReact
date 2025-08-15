import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      setDark(stored === 'dark')
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const theme = next ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-lg text-xs font-medium border border-dark-600/40 bg-dark-800/60 hover:bg-dark-700 transition flex items-center gap-2"
      aria-label="Alternar tema"
    >
      <span>{dark ? '🌙' : '☀️'}</span>
      <span>{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
