import Link from 'next/link'
import Image from 'next/image'
import { meta } from '@/lib/meta'

const features = [
  {
    icon: 'show_chart',
    title: 'Token-Efficient',
    details: 'Achieve 60-70% token reduction through systematic abbreviation of keywords, widgets, and properties.',
  },
  {
    icon: 'sync',
    title: 'Lossless Round-Trip',
    details: 'Full semantic preservation with deterministic compression and decompression.',
  },
  {
    icon: 'track_changes',
    title: 'Multiple Strategies',
    details: 'Six compression strategies optimized for different code patterns and use cases.',
  },
  {
    icon: 'language',
    title: 'Multi-Language SDKs',
    details: 'Official implementations in Python and JavaScript/TypeScript with shared specification.',
  },
  {
    icon: 'terminal',
    title: 'Cross-Platform CLI',
    details: 'Command-line tool for quick conversions, analysis, and validation.',
  },
  {
    icon: 'description',
    title: 'Spec-Driven',
    details: 'Formal specification ensures consistent behavior across all implementations.',
  },
]

export function Hero() {
  return (
    <div className="bg-[#14120B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <Image
              src="/coon-text-icon.svg"
              alt="COON"
              width={400}
              height={100}
              className="mx-auto mb-8"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Code-Oriented Object Notation
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Token-efficient compression format for Dart/Flutter code, optimized for LLM contexts. Achieve 60-70% token reduction with lossless round-trip compression.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/guide/getting-started"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              Get Started
            </Link>
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 rounded-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-white/10 bg-[#14120B] hover:border-white/20 transition-colors"
            >
              <div className="mb-3">
                <span className="material-symbols-outlined text-white/75" style={{ fontSize: '48px' }}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70 text-sm">
                {feature.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
