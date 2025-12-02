"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/products", label: "Produk", icon: "📦" },
    { href: "/dashboard/simulator", label: "Simulasi", icon: "🎯" },
    { href: "/dashboard/learn", label: "Belajar", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-20">
        <div className="flex flex-col flex-grow border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <h1 className="text-xl font-bold text-emerald-400">Teman Laba</h1>
            </Link>
          </div>
          <p className="px-6 text-xs text-gray-500 mb-6">
            Asisten Keuangan UMKM
          </p>
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 shadow-sm"
                      : "text-gray-400 hover:bg-slate-800/50 hover:text-gray-200"
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="px-6 pt-4 border-t border-slate-800">
            <p className="text-xs text-gray-500">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <h1 className="text-lg font-bold text-emerald-400">Teman Laba</h1>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="px-2 pb-3 space-y-1 border-t border-slate-800 bg-slate-900">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400 hover:bg-slate-800/50 hover:text-gray-200"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Tablet Navigation */}
      <div className="hidden md:block lg:hidden sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2 mb-3">
            <span className="text-xl">💰</span>
            <h1 className="text-lg font-bold text-emerald-400">Teman Laba</h1>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
