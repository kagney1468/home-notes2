import type { Metadata } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./globals.css');

export const metadata: Metadata = {
  title: 'NestCheck UK - Property Reports & Area Intelligence for England',
  description:
    'Get comprehensive AI property reports for any address in England. Check broadband speeds, school ratings, local crime, and flood risks before you buy or rent.',
  keywords:
    'UK property report, area statistics England, school catchment UK, broadband speed by postcode, crime stats England, flood risk property UK',
  openGraph: {
    type: 'website',
    title: 'NestCheck UK - Intelligent Property Area Reports',
    description:
      'AI-powered insights for homebuyers and renters in England. Know your area before you move.',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NestCheck UK - Property Intelligence',
    description:
      'Get AI-driven insights on broadband, schools, crime, and flood risks for any address in England.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'NestCheck UK',
              operatingSystem: 'Web',
              applicationCategory: 'RealEstateApplication',
              description:
                'Comprehensive property area reports for England. AI-driven insights on local infrastructure, safety, and environment.',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
              areaServed: { '@type': 'Country', name: 'England, United Kingdom' },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
