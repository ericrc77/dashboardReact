export default function Ticker() {
  const tickerItems = [
    { symbol: 'USD/BRL', value: 'R$ 5,32', direction: 'up' },
    { symbol: 'EUR/BRL', value: 'R$ 5,78', direction: 'down' },
    { symbol: 'BTC/USD', value: '$44.200', direction: 'up' },
    { symbol: 'ETH/USD', value: '$2.350', direction: 'down' },
    { symbol: 'JPY/BRL', value: 'R$ 0,036', direction: 'up' },
    { symbol: 'GBP/BRL', value: 'R$ 6,45', direction: 'up' },
    { symbol: 'AUD/BRL', value: 'R$ 3,42', direction: 'down' },
    { symbol: 'CAD/BRL', value: 'R$ 3,89', direction: 'up' },
    { symbol: 'CHF/BRL', value: 'R$ 5,95', direction: 'down' },
    { symbol: 'IBOV', value: '126.850', direction: 'up' },
  ]

  // Duplicate items for seamless loop
  const allItems = [...tickerItems, ...tickerItems]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur-sm border-t border-dark-700 overflow-hidden">
      <div className="ticker-track font-mono text-sm sm:text-base font-semibold">
        {allItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 whitespace-nowrap ${
              item.direction === 'up' 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}
          >
            <span>{item.symbol}:</span>
            <span>{item.value}</span>
            <span>{item.direction === 'up' ? '↗' : '↘'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
