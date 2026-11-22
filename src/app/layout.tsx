import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Afshin Talebi — Senior Software Developer & Backend Architect',
  description:
    'Portfolio of Afshin Talebi. Over a decade of engineering experience building high-throughput backend services in Go, modular NestJS APIs, modern Next.js/React web apps, and applied AI tools.',
  keywords: [
    'Afshin Talebi',
    'Software Developer',
    'Backend Engineer',
    'Go Developer',
    'Golang',
    'TypeScript',
    'NestJS',
    'Next.js',
    'AI Integration',
    'Full-Stack Developer',
    'Microservices',
    'CQRS',
  ],
  authors: [{ name: 'Afshin Talebi', url: 'https://afshintalebi.com' }],
  creator: 'Afshin Talebi',
  metadataBase: new URL('https://afshintalebi.com'),
  openGraph: {
    title: 'Afshin Talebi — Senior Software Developer & Backend Architect',
    description:
      'High-throughput Go services, modular NestJS architectures, and applied Generative AI systems. 10+ years engineering experience.',
    url: 'https://afshintalebi.com',
    siteName: 'Afshin Talebi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afshin Talebi — Senior Software Developer & Backend Architect',
    description:
      'High-throughput Go services, modular NestJS architectures, and applied Generative AI systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Afshin Talebi',
  jobTitle: 'Senior Software Developer & Backend Architect',
  url: 'https://afshintalebi.com',
  sameAs: ['https://github.com/afshintalebi'],
  knowsAbout: [
    'Go (Golang)',
    'TypeScript',
    'JavaScript',
    'NestJS',
    'Node.js',
    'Next.js',
    'React',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'OpenAI Whisper',
    'Generative AI',
    'Microservices',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'PNU University',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className="antialiased font-sans bg-[#090a0f] text-neutral-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200"
      >
        {children}
      </body>
    </html>
  );
}
