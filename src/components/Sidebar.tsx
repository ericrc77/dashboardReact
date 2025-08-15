import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface SidebarProps {
  className?: string
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

export default function Sidebar({ className = '' }: SidebarProps) {
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-dark-900/90 backdrop-blur-sm border-r border-dark-700 overflow-y-auto ${className}`}>
      {/* Header do Sidebar */}
      <div className={`p-6 border-b border-dark-700/50 transform transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Categorias
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600/20 to-primary-500/10 text-primary-300 border border-primary-500/20 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800/50 hover:border-dark-600'
              } border border-transparent ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 50 + 100}ms`
              }}
            >
              <span 
                className={`text-lg mr-3 transition-all duration-300 ${
                  isActive ? 'scale-110 rotate-12' : 'group-hover:scale-105'
                }`}
                role="img" 
                aria-label={item.label}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              
              {/* Indicador ativo */}
              {isActive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-primary-500 rounded-full animate-pulse" 
                       style={{ animationDelay: '0.5s' }} />
                </div>
              )}
              
              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isActive ? 'opacity-100' : ''
              }`} />
            </Link>
          )
        })}
      </nav>

      {/* Footer do Sidebar */}
      <div className={`p-4 border-t border-dark-700/50 mt-auto transform transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: '800ms' }}>
        <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-600/30">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">📊</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                Dashboard Dados Brasil
              </p>
              <p className="text-xs text-gray-400 truncate">
                Versão 2.0
              </p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Online</span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
