import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛕</div>
          <h1 className="font-serif text-2xl font-bold text-[#2D1810] mb-3">
            Something went wrong
          </h1>
          <p className="text-[#6B4423] text-sm mb-6">
            An unexpected error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-colors"
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && (
            <details className="mt-6 text-left bg-red-50 border border-red-200 rounded-lg p-4 text-xs text-red-800">
              <summary className="cursor-pointer font-semibold mb-2">Dev: Error details</summary>
              <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
