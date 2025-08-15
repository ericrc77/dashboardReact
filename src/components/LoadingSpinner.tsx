interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'text-primary-500',
  text = 'Carregando...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Spinner principal */}
        <div className={`${sizeClasses[size]} border-2 border-gray-700 border-t-primary-500 rounded-full animate-spin`} />
        
        {/* Efeito de glow */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-primary-400 rounded-full animate-spin opacity-50 blur-sm`}
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      
      {text && (
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${color} animate-pulse`}>
            {text}
          </span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      )}
    </div>
  )
}
