import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onToggleMobileMenu: () => void
  isMobileMenuOpen: boolean
}

export default function Header({ onToggleMobileMenu, isMobileMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/95 backdrop-blur-lg border-b border-dark-700/50 shadow-lg' 
        : 'bg-dark-900/90 backdrop-blur-md border-b border-dark-700'
    }`}>
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileMenu}
          className={`lg:hidden p-2 rounded-lg bg-dark-800 border border-dark-600 hover:bg-dark-700 transition-all duration-300 transform hover:scale-105 ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}
          style={{ transitionDelay: '100ms' }}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <div className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-primary-300" />
            ) : (
              <Menu className="w-5 h-5 text-primary-300" />
            )}
          </div>
        </button>

        {/* Logo */}
        <div className={`flex items-center gap-3 transform transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
        style={{ transitionDelay: '200ms' }}>
          <div className="relative group">
            <img 
              src="./images/perfil.jpeg" 
              alt="Eric Campos" 
              className={`w-8 h-8 rounded-full ring-2 ring-primary-500/30 object-cover transition-all duration-300 group-hover:ring-primary-500/60 group-hover:scale-110 ${
                isScrolled ? 'ring-primary-400/40' : ''
              }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzQjgyRjYiLz4KPGR4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCI+RUM8L3RleHQ+Cjwvc3ZnPgo=';
              }}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <h1 className={`font-poppins font-bold text-lg text-white transition-all duration-300 hover:text-primary-300 ${
            isScrolled ? 'text-base' : 'text-lg'
          }`}>
            <span className="bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
              Dados Públicos
            </span>
            <span className={`ml-2 px-2 py-1 text-xs bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-md transition-all duration-300 hover:from-primary-500 hover:to-primary-400 hover:scale-105 ${
              isScrolled ? 'text-xs' : 'text-xs'
            }`}>
              BRASIL
            </span>
          </h1>
        </div>

        {/* Status Indicator */}
        <div className={`lg:hidden flex items-center gap-2 transform transition-all duration-700 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}
        style={{ transitionDelay: '300ms' }}>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Online</span>
          </div>
        </div>

        {/* Desktop Status */}
        <div className={`hidden lg:flex items-center gap-4 transform transition-all duration-700 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center gap-2 px-3 py-1 bg-dark-800/50 rounded-full border border-dark-600/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Sistema Online</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-dark-800/50 rounded-full border border-dark-600/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs text-blue-400 font-medium">
              {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Animated border bottom */}
      <div className={`h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-all duration-500 ${
        isScrolled ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      }`} />
    </header>
  )
}
