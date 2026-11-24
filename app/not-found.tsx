import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-primary">Error 404 · Route not found</p>
      <h1 className="mb-6 font-[family-name:var(--font-anton)] text-[28vw] leading-none text-white md:text-[14rem]">
        4<span className="text-outline-strong">0</span>4<span className="text-primary">_</span>
      </h1>
      <p className="mb-10 max-w-md font-mono text-sm text-muted-foreground">
        Even ant colony optimization couldn&apos;t find a path to this page.
      </p>
      <Link
        href="/"
        className="bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-white"
      >
        Return home
      </Link>
    </main>
  )
}
