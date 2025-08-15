import React from 'react'

interface Props { children: React.ReactNode }
interface State { hasError: boolean; error?: any }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, info: any) {
    console.error('[ErrorBoundary]', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div className="text-6xl mb-4" role="img" aria-label="erro">💥</div>
          <h1 className="text-2xl font-bold text-white mb-2">Ocorreu um erro inesperado</h1>
          <p className="text-gray-400 mb-4 max-w-md">Tente recarregar a página ou voltar ao dashboard.</p>
          <div className="flex gap-3">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white text-sm">Recarregar</button>
            <a href="/" className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-white text-sm">Dashboard</a>
          </div>
          {this.state.error && (
            <details className="mt-6 p-4 text-left text-xs bg-dark-800 rounded-lg max-w-xl overflow-auto border border-dark-600/40 whitespace-pre-wrap">
              {String(this.state.error?.message || this.state.error)}
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
