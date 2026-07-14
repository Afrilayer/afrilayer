import { formatDate } from '@/lib/utils';

const updates = [
  {
    id: '1',
    title: 'Added Flutterwave API Documentation',
    published_at: '2026-07-10',
    content:
      'Complete API documentation, endpoints, and pricing information for Flutterwave payment APIs.',
  },
  {
    id: '2',
    title: 'New: API Confidence Indicators',
    published_at: '2026-07-01',
    content:
      'Every API now shows a confidence indicator based on verification date and status.',
  },
  {
    id: '3',
    title: 'Added 15 New Mobile Money APIs',
    published_at: '2026-06-25',
    content:
      'Expanded coverage for mobile money APIs across West and East Africa.',
  },
  {
    id: '4',
    title: 'Site Redesign Launched',
    published_at: '2026-06-15',
    content:
      'New design system with improved accessibility and performance optimizations.',
  },
];

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-charcoal">
        Changelog
      </h1>
      <p className="mt-2 text-charcoal/70 max-w-2xl">
        Latest updates to the Afrilayer platform and API listings.
      </p>

      <div className="mt-10">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-sand-200" />
          <div className="space-y-8">
            {updates.map((update) => (
              <div key={update.id} className="relative pl-12">
                <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-baobab-600" />
                <div>
                  <time className="text-sm text-charcoal/60">
                    {formatDate(update.published_at)}
                  </time>
                  <h2 className="mt-1 text-xl font-semibold text-charcoal">
                    {update.title}
                  </h2>
                  <p className="mt-2 text-charcoal/80">
                    {update.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
