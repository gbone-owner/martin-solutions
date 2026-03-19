import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-2">
          404
        </p>
        <h1 className="text-4xl font-bold text-primary mb-4">
          Page not found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist yet. Maybe we&apos;re
          still building it — we are a growing company, after all.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
