interface ChartData {
  name: string
  value: number
  color?: string
}

interface SimpleChartProps {
  type: 'bar' | 'line' | 'pie'
  data: ChartData[]
  title: string
  description?: string
  height?: number
}

export default function SimpleChart({
  type,
  data,
  title,
  description,
  height = 300
}: SimpleChartProps) {
  if (!Array.isArray(data)) {
    return <div className="text-xs text-gray-500">Dados inválidos</div>
  }
  const safe = data.filter(d => typeof d.value === 'number')
  if (!safe.length) {
    return <div className="text-xs text-gray-500">Sem dados</div>
  }
  const maxValue = Math.max(...safe.map(d => d.value))

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-full space-x-2 px-4">
  {safe.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md relative group cursor-pointer transition-all duration-300 hover:from-primary-500 hover:to-primary-300"
            style={{
              height: `${(item.value / maxValue) * 80}%`,
              minHeight: '8px'
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {item.value}
            </div>
          </div>
          <span className="text-xs text-gray-400 mt-2 text-center">{item.name}</span>
        </div>
      ))}
    </div>
  )

  const renderLineChart = () => {
    const points = safe.map((item, index) => {
      const x = (index / (safe.length - 1)) * 100
      const y = 100 - ((item.value / maxValue) * 80)
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#374151"
              strokeWidth="0.2"
              strokeDasharray="1,1"
            />
          ))}
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={points}
          />
          
          {/* Points */}
          {safe.map((item, index) => {
            const x = (index / (safe.length - 1)) * 100
            const y = 100 - ((item.value / maxValue) * 80)
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#3B82F6"
                className="hover:r-3 cursor-pointer transition-all"
              />
            )
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {safe.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </div>
    )
  }

  const renderPieChart = () => {
  const total = safe.reduce((sum, item) => sum + item.value, 0)
    let cumulativeAngle = 0
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {safe.map((item, index) => {
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
                <path
                  key={index}
                  d={pathData}
                  fill={item.color || colors[index % colors.length]}
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              )
            })}
          </svg>
          
          {/* Legend */}
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 space-y-2">
            {safe.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || colors[index % colors.length] }}
                />
                <span className="text-xs text-gray-400">{item.name}</span>
                <span className="text-xs text-white font-semibold">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-gradient rounded-xl p-6 border border-dark-600/30">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div style={{ height: `${height}px` }}>
        {type === 'bar' && renderBarChart()}
        {type === 'line' && renderLineChart()}
        {type === 'pie' && renderPieChart()}
      </div>
    </div>
  )
}
