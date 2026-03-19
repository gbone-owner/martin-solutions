import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Martin Solutions — AI Tools for Business',
    template: '%s | Martin Solutions',
  },
  description:
    'Martin Solutions develops high-quality AI tools that help businesses embrace the future confidently. Quality over speed. Human-AI coexistence.',
  metadataBase: new URL('https://martin.solutions'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://martin.solutions',
    siteName: 'Martin Solutions',
    title: 'Martin Solutions — AI Tools for Business',
    description:
      'Developing high-quality AI tools that help businesses embrace the future confidently.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Solutions — AI Tools for Business',
    description:
      'Developing high-quality AI tools that help businesses embrace the future confidently.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
