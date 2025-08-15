interface TestPageProps {
  title: string
  icon: string
  description: string
}

export default function TestPage({ title, icon, description }: TestPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-300 mt-2">{description}</p>
          </div>
        </div>

        {/* Test Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-2">Teste 1</h3>
            <p className="text-2xl font-bold text-green-400">100%</p>
            <p className="text-sm text-gray-400">Funcionando</p>
          </div>
          
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-2">Teste 2</h3>
            <p className="text-2xl font-bold text-blue-400">200</p>
            <p className="text-sm text-gray-400">OK</p>
          </div>
          
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-2">Teste 3</h3>
            <p className="text-2xl font-bold text-yellow-400">300</p>
            <p className="text-sm text-gray-400">Ativo</p>
          </div>
          
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-2">Teste 4</h3>
            <p className="text-2xl font-bold text-red-400">400</p>
            <p className="text-sm text-gray-400">Status</p>
          </div>
        </div>

        {/* Simple Chart Area */}
        <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Gráfico de {title}</h2>
          <div className="h-64 bg-dark-700 rounded flex items-center justify-center">
            <p className="text-gray-400">Área do gráfico para {title}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-green-400 font-semibold">✅ Página {title} carregada com sucesso!</p>
        </div>
      </div>
    </div>
  )
}
