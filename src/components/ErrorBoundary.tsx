import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold border border-red-500/20">
              ⚠️
            </div>
            <h1 className="text-xl font-bold mb-2">Bir şeyler yanlış gitti</h1>
            <p className="text-slate-400 text-sm mb-6">
              Uygulama yüklenirken beklenmeyen bir hata oluştu. Lütfen tarayıcı önbelleğinizi temizleyip yeniden deneyin.
            </p>
            {this.state.error && (
              <div className="bg-slate-900/80 p-3 rounded-lg text-xs font-mono text-red-300 mb-6 text-left overflow-auto max-h-32 border border-slate-800">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = window.location.pathname;
              }}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-teal-900/30 text-sm"
            >
              Uygulamayı Sıfırla ve Yeniden Başlat
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
