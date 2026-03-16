import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { ExternalLink, Database, Server, Component } from 'lucide-react';

export function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            About FranklyFX
          </h1>
          <p className="text-lg text-gray-600">
            A transparent, open-source foreign exchange tracker with a clean architectural design.
          </p>
        </div>

        <Card title="Project Overview">
          <p className="text-gray-600 leading-relaxed mb-4">
            FranklyFX is built to provide developers and users with a production-ready system for tracking real-time FX quotes.
            It calculates custom transaction quotes—incorporating margins and flat fees—based on live data.
          </p>
          <a
            href="https://github.com/sandeshsalunkhegh/FranklyFX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View on GitHub <ExternalLink size={16} className="ml-1" />
          </a>
        </Card>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Component size={24} />
            </div>
            <h3 className="font-semibold text-gray-900">React Frontend</h3>
            <p className="text-sm text-gray-500 mt-2">Built with Vite, React, Tailwind CSS, and TypeScript.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600">
              <Server size={24} />
            </div>
            <h3 className="font-semibold text-gray-900">FastAPI Backend</h3>
            <p className="text-sm text-gray-500 mt-2">Clean architecture, domain-driven design in Python.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600">
              <Database size={24} />
            </div>
            <h3 className="font-semibold text-gray-900">Free Market Data</h3>
            <p className="text-sm text-gray-500 mt-2">Real-time interbank rates sourced via the Frankfurter API.</p>
          </div>
        </div>

        <Card title="Legal Disclaimer" className="bg-gray-50 border-gray-200">
          <p className="text-sm text-gray-500 leading-relaxed">
            All data displayed on FranklyFX is provided for informational purposes only and does not constitute financial advice.
            The exchange rates are indicative interbank rates and may not reflect the precise execution price of real transactions.
            FranklyFX is an open-source demonstration application.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
