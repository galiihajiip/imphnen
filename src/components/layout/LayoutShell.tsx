"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/products", label: "Produk", icon: "📦" },
    { href: "/dashboard/simulator", label: "Simulasi", icon: "🎯" },
    { href: "/dashboard/learn", label: "Belajar", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6">
            <h1 className="text-xl font-bold text-emerald-400">Teman Laba</h1>
          </div>
          <nav className="mt-8 flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
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
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-emerald-400">Teman Laba</h1>
        </div>
        <nav className="flex overflow-x-auto px-2 pb-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full mr-2 transition-all ${
                  isActive
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-gray-300"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
