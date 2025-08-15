import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useAnimations'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, hasIntersected } = useIntersectionObserver(0.3)

  useEffect(() => {
    if (!hasIntersected) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function para animação mais suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = easeOutQuart * end
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, hasIntersected])

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('pt-BR')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={hasIntersected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}{formattedCount}{suffix}
    </motion.div>
  )
}
