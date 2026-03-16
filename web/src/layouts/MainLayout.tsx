import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Activity size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                FranklyFX
              </span>
            </Link>
            <nav className="flex space-x-6 text-sm font-medium text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Quote</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FranklyFX Open Source FX Tracker.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/about" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <a href="https://github.com/sandeshsalunkhegh/FranklyFX" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
