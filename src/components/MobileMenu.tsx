import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { path: '/', icon: '📊', label: 'Dashboard' },
  { path: '/populacao', icon: '👥', label: 'População' },
  { path: '/economia', icon: '💰', label: 'Economia' },
  { path: '/educacao', icon: '🎓', label: 'Educação' },
  { path: '/saude', icon: '🩺', label: 'Saúde' },
  { path: '/infraestrutura', icon: '🏗️', label: 'Infraestrutura' },
  { path: '/energia', icon: '⚡', label: 'Energia' },
  { path: '/mobilidade', icon: '🚉', label: 'Mobilidade' },
  { path: '/meio-ambiente', icon: '🌱', label: 'Meio Ambiente' },
  { path: '/seguranca', icon: '🛡️', label: 'Segurança' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [location.pathname, onClose, isOpen])

  if (!isOpen) return null

  // Group items in rows of 2
  const menuRows = []
  for (let i = 0; i < navigationItems.length; i += 2) {
    menuRows.push(navigationItems.slice(i, i + 2))
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu */}
      <div className={`absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-800 pt-20 pb-6 px-6 overflow-y-auto transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <h2 id="mobile-menu-title" className="sr-only">Menu de Navegação Principal</h2>
        <div className="space-y-4">
          {menuRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((item) => {
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isActive
                        ? 'bg-primary-600/30 text-primary-200 shadow-lg border border-primary-500/30'
                        : 'bg-dark-800/60 text-gray-300 hover:bg-primary-600/20 hover:text-primary-300 border border-dark-600/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-xl" role="img" aria-label={item.label}>
                      {item.icon}
                    </span>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
