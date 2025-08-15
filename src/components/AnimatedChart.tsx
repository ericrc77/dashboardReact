import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useAnimations'

interface ChartData {
  name: string
  value: number
  color?: string
}

interface AnimatedChartProps {
  type: 'bar' | 'line' | 'pie'
  data: ChartData[]
  title: string
  description?: string
  height?: number
}

export default function AnimatedChart({
  type,
  data,
  title,
  description,
  height = 300
}: AnimatedChartProps) {
  const [animatedData, setAnimatedData] = useState<ChartData[]>([])
  const { ref, hasIntersected } = useIntersectionObserver(0.3)
  const maxValue = Math.max(...data.map(d => d.value))

  useEffect(() => {
    if (hasIntersected) {
      // Anima os dados gradualmente
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData(prev => [...prev, item])
        }, index * 200)
      })
    }
  }, [hasIntersected, data])

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-full space-x-2 px-4">
      <AnimatePresence>
        {animatedData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              height: `${(item.value / maxValue) * 80}%`,
              y: 0
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="flex flex-col items-center flex-1"
          >
            <motion.div
              className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md relative group cursor-pointer"
              style={{ minHeight: '8px' }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary-400 rounded-t-md blur-sm opacity-0 group-hover:opacity-50"
                transition={{ duration: 0.3 }}
              />
              
              {/* Tooltip animado */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.value.toLocaleString('pt-BR')}
              </motion.div>
            </motion.div>
            
            <motion.span 
              className="text-xs text-gray-400 mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {item.name}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  const renderLineChart = () => {
    const points = animatedData.map((item, index) => {
      const x = (index / (Math.max(animatedData.length - 1, 1))) * 100
      const y = 100 - ((item.value / maxValue) * 80)
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid lines animadas */}
          {[0, 25, 50, 75, 100].map((y, index) => (
            <motion.line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#374151"
              strokeWidth="0.2"
              strokeDasharray="1,1"
              initial={{ opacity: 0 }}
              animate={{ opacity: hasIntersected ? 0.3 : 0 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
          
          {/* Área sob a linha */}
          {animatedData.length > 1 && (
            <motion.path
              d={`M 0,100 L ${points} L ${(animatedData.length - 1) / Math.max(animatedData.length - 1, 1) * 100},100 Z`}
              fill="url(#gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: hasIntersected ? 0.3 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          )}
          
          {/* Linha principal animada */}
          <motion.polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={points}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: hasIntersected ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Pontos animados */}
          {animatedData.map((item, index) => {
            const x = (index / Math.max(animatedData.length - 1, 1)) * 100
            const y = 100 - ((item.value / maxValue) * 80)
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#3B82F6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                whileHover={{ scale: 1.5 }}
                className="cursor-pointer"
              />
            )
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Labels do eixo X */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {animatedData.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.name}
            </motion.span>
          ))}
        </div>
      </div>
    )
  }

  const renderPieChart = () => {
    const total = animatedData.reduce((sum, item) => sum + item.value, 0)
    let cumulativeAngle = 0
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <AnimatePresence>
              {animatedData.map((item, index) => {
                const angle = (item.value / total) * 360
                const startAngle = cumulativeAngle
                const endAngle = cumulativeAngle + angle
                
                const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)
                const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)
                const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)
                const endY = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)
                
                const largeArcFlag = angle > 180 ? 1 : 0
                
                const pathData = [
                  `M 100 100`,
                  `L ${startX} ${startY}`,
                  `A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                  'Z'
                ].join(' ')
                
                cumulativeAngle += angle
                
                return (
                  <motion.path
                    key={index}
                    d={pathData}
                    fill={item.color || colors[index % colors.length]}
                    stroke="#1F2937"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      filter: "brightness(1.1)"
                    }}
                    className="cursor-pointer"
                  />
                )
              })}
            </AnimatePresence>
          </svg>
          
          {/* Legend animada */}
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 space-y-2">
            {animatedData.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || colors[index % colors.length] }}
                  whileHover={{ scale: 1.2 }}
                />
                <span className="text-xs text-gray-400">{item.name}</span>
                <span className="text-xs text-white font-semibold">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="card-gradient rounded-xl p-6 border border-dark-600/30 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </motion.div>
      
      <div style={{ height: `${height}px` }}>
        {type === 'bar' && renderBarChart()}
        {type === 'line' && renderLineChart()}
        {type === 'pie' && renderPieChart()}
      </div>
    </motion.div>
  )
}
