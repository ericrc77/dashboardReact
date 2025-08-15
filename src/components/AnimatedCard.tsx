import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useAnimations'

interface AnimatedCardProps {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'stable'
  index: number
  icon?: React.ReactNode
  isNumber?: boolean
}

export default function AnimatedCard({
  title,
  value,
  change,
  trend,
  index,
  icon,
  isNumber = false
}: AnimatedCardProps) {
  const { ref, hasIntersected } = useIntersectionObserver(0.2)
  const [isVisible, setIsVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState(isNumber ? 0 : value)

  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, index * 100)

      // Animação do contador se for número
      if (isNumber && typeof value === 'number') {
        let start = 0
        const end = value
        const duration = 2000
        const increment = end / (duration / 16)

        const counter = setInterval(() => {
          start += increment
          if (start >= end) {
            setDisplayValue(end)
            clearInterval(counter)
          } else {
            setDisplayValue(Math.floor(start))
          }
        }, 16)

        return () => {
          clearTimeout(timer)
          clearInterval(counter)
        }
      }

      return () => clearTimeout(timer)
    }
  }, [hasIntersected, index, value, isNumber])

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />
      case 'down':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-yellow-400'
    }
  }

  return (
    <div
      ref={ref}
      className={`card-gradient rounded-xl p-6 border border-dark-600/30 cursor-pointer relative overflow-hidden group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      }}
    >
      {/* Background gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            {icon && (
              <span className={`transform transition-transform duration-1000 ${isVisible ? 'rotate-360' : 'rotate-0'}`}>
                {icon}
              </span>
            )}
            {title}
          </h3>
          
          <div className={`flex items-center gap-1 ${getTrendColor()} transform transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 100 + 300}ms` }}>
            {getTrendIcon()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-2xl font-bold text-white transform transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 100 + 200}ms` }}>
            {isNumber ? (
              <span className="tabular-nums">
                {typeof displayValue === 'number' 
                  ? displayValue.toLocaleString('pt-BR')
                  : displayValue
                }
              </span>
            ) : (
              <span>{value}</span>
            )}
          </div>
          
          <span
            className={`text-sm font-medium ${getTrendColor()} transform transition-all duration-500 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100 + 400}ms` }}
          >
            {change}
          </span>
        </div>
      </div>

      {/* Pulse effect */}
      <div
        className={`absolute inset-0 border border-primary-500/30 rounded-xl transition-all duration-2000 ${
          isVisible ? 'animate-pulse' : ''
        }`}
        style={{ animationDelay: `${index * 100 + 500}ms` }}
      />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-primary-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
