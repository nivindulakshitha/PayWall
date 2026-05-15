'use client'

import Image from 'next/image'
import Calculator from '@/components/Calculator'
import LanguageToggle from '@/components/LanguageToggle'

export default function Home() {

  return (
    <main className="min-h-screen relative py-4 px-3 sm:py-6 sm:px-4 md:py-10">

      {/* ─── Fixed background layer ─────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        {/* Ambient colour orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/[0.03] blur-3xl" />

        {/* ── Personal photo — left edge (hidden on very small screens) ── */}
        <div
          className="hidden sm:block absolute bottom-0 -left-[80px] md:-left-[200px] w-[220px] h-[320px] md:w-[560px] md:h-[780px]"
          style={{ opacity: 0.18 }}
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, transparent 40%, var(--bg-primary) 85%), ' +
                'linear-gradient(to top, var(--bg-primary) 0%, transparent 30%)',
            }}
          />
          <Image
            src="/me.png"
            alt="Nivindu Lakshitha"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* ── ICT class logo — right side (hidden on very small screens) ── */}
        <div
          className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-[10px] md:right-0 w-[140px] h-[140px] md:w-[360px] md:h-[360px]"
          style={{ opacity: 0.12 }}
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, var(--bg-primary) 0%, transparent 45%), ' +
                'radial-gradient(ellipse at center, transparent 40%, var(--bg-primary) 100%)',
            }}
          />
          <Image
            src="/the best class for ICT v2.png"
            alt="Best ICT class"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* ────────────────────────────────────────────────────────── */}

      {/* Content — full width on mobile, capped on larger screens */}
      <div className="w-full max-w-xl mx-auto relative z-10">

        {/* Header */}
        <header className="mb-6 md:mb-10">

          {/* Top bar: Logo + Language */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-1 ring-white/10 flex-shrink-0">
                <Image
                  src="/ICTA+.png"
                  alt="ICTA+"
                  fill
                  className="object-contain bg-white/5 p-1"
                  priority
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">ICTA+</p>
                <p className="text-[10px] text-gray-500">by Nivindu Lakshitha</p>
              </div>
            </div>
            <LanguageToggle />
          </div>

        </header>

        {/* Calculator */}
        <Calculator />

        {/* Footer */}
        <footer className="mt-8 pt-5 text-center">
          <div className="divider mb-3" />
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ICTA+ &middot; Nivindu Lakshitha
          </p>
        </footer>
      </div>
    </main>
  )
}
