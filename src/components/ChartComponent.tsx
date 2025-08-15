import SimpleChart from './SimpleChart'

interface ChartData {
  name: string
  value: number
  change?: number
  color?: string
}

interface ChartComponentProps {
  type: 'line' | 'bar' | 'pie'
  data: ChartData[]
  title: string
  description?: string
  height?: number
}

export default function ChartComponent({
  type,
  data,
  title,
  description,
  height = 300
}: ChartComponentProps) {
  return (
    <div className="card-gradient rounded-xl p-6 border border-dark-600/30">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div className="w-full">
        <SimpleChart 
          type={type}
          data={data}
          title={title}
          description={description}
          height={height}
        />
      </div>
    </div>
  )
}
