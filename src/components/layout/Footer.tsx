'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isShowcase = pathname.startsWith('/showcase') || pathname.startsWith('/demo');

  return (
    <footer
      className={`${
        isShowcase ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className={`font-bold text-lg ${isShowcase ? 'text-white' : 'text-primary'}`}>
                Martin Solutions
              </span>
            </div>
            <p className={`max-w-md text-sm leading-relaxed ${isShowcase ? 'text-gray-400' : 'text-gray-500'}`}>
              Developing high-quality AI tools that help businesses embrace the future
              confidently. We believe in coexistence — AI amplifying human capability,
              not replacing human purpose.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={`font-semibold text-sm mb-4 ${isShowcase ? 'text-gray-200' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/projects', label: 'Projects' },
                { href: '/showcase', label: 'AI Showcase' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isShowcase
                        ? 'text-gray-400 hover:text-teal'
                        : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className={`font-semibold text-sm mb-4 ${isShowcase ? 'text-gray-200' : 'text-gray-900'}`}>
              Get in Touch
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:martin@gbone.no"
                  className={`text-sm transition-colors ${
                    isShowcase
                      ? 'text-gray-400 hover:text-teal'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  martin@gbone.no
                </a>
              </li>
              <li>
                <a
                  href="https://martin.solutions"
                  className={`text-sm transition-colors ${
                    isShowcase
                      ? 'text-gray-400 hover:text-teal'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  martin.solutions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
            isShowcase ? 'border-slate-800' : 'border-gray-200'
          }`}
        >
          <p className={`text-xs ${isShowcase ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; {new Date().getFullYear()} Martin Solutions. All rights reserved.
          </p>
          <p className={`text-xs ${isShowcase ? 'text-gray-600' : 'text-gray-300'}`}>
            Built with AI. Powered by purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
