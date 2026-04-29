import type { Metadata } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./globals.css');

export const metadata: Metadata = {
  title: 'Home Notes - AI Property Area Intelligence for England',
  description:
    'Get AI-generated property area reports for any address in England. Check broadband speeds, school ratings, local crime, and flood risks before you buy or rent.',
  keywords:
    'UK property report, area statistics England, school catchment UK, broadband speed by postcode, crime stats England, flood risk property UK',
  openGraph: {
    type: 'website',
    title: 'Home Notes - Intelligent Property Area Reports',
    description:
      'AI-assisted insights for homebuyers and renters in England. Know your area before you move.',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Notes - Property Intelligence',
    description:
      'AI-generated insights on broadband, schools, crime, and flood risks for any address in England.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Home Notes',
              operatingSystem: 'Web',
              applicationCategory: 'RealEstateApplication',
              description:
                'AI-assisted property area reports for England. Insights on local infrastructure, safety, and environment.',
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
