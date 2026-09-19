import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SchemeSathi Uncaught Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('schemesathi_schemes_db');
      localStorage.removeItem('schemesathi_saved');
      localStorage.removeItem('schemesathi_notified_deadlines');
      localStorage.removeItem('schemesathi_browsing_history');
      localStorage.removeItem('schemesathi_category_clicks');
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold font-serif">Something went wrong</h2>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                SchemeSathi encountered a temporary display error. Your saved bookmarks and progress are safe.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-stone-100 dark:bg-stone-800/60 rounded-xl text-left text-xs font-mono text-stone-700 dark:text-stone-300 max-h-32 overflow-auto">
                <span className="font-semibold text-rose-600 dark:text-rose-400">Error: </span>
                {this.state.error.message || 'Unknown component error'}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload SchemeSathi</span>
              </button>

              <button
                onClick={this.handleResetCache}
                className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset Local Cache &amp; Recover</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 dark:text-stone-500">
              SchemeSathi • Verified Indian Government Schemes &amp; Scholarships Portal
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
