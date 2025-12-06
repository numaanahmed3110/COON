import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#14120B]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/80 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
