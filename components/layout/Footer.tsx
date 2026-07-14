import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  platform: [
    { name: 'Categories', href: '/categories' },
    { name: 'Countries', href: '/countries' },
    { name: 'Providers', href: '/providers' },
    { name: 'Changelog', href: '/changelog' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Submit API', href: '/submit-api' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/afrilayer', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/afrilayer', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/afrilayer', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@afrilayer.com', icon: Mail },
  ],
};

export function Footer() {
  return (
<footer className="border-t border-sand-100 bg-sand-50">
  <div className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* Brand */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal">
          Afrilayer
        </h3>
        <p className="mt-4 text-sm text-charcoal/70 max-w-xs">
          The trusted infrastructure layer connecting developers to Africa's digital ecosystem.
        </p>
        <div className="mt-6 flex gap-4" aria-label="Social links">
          {footerLinks.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/50 hover:text-baobab-600 transition-colors"
              aria-label={`Follow us on ${item.name}`}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <h4 className="text-sm font-semibold text-charcoal">
          Platform
        </h4>
        <ul className="mt-4 space-y-2">
          {footerLinks.platform.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-sm font-semibold text-charcoal">
          Resources
        </h4>
        <ul className="mt-4 space-y-2">
          {footerLinks.resources.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-sm font-semibold text-charcoal">
          Contact
        </h4>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="mailto:hello@afrilayer.com"
              className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
            >
              hello@afrilayer.com
            </a>
          </li>
          <li className="text-sm text-charcoal/70">
            ACCRA, GH
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom border and copyright */}
    <div className="mt-16 border-t border-sand-100 pt-8">
      <p className="text-center text-xs text-charcoal/50">
        © {new Date().getFullYear()} Afrilayer. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
}
