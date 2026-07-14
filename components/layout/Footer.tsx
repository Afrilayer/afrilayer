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
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Afrilayer
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Discover the APIs powering Africa. The developer-first platform for African API discovery.
            </p>
            <div className="mt-6 flex gap-4" aria-label="Social links">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Platform
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:hello@afrilayer.com"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  hello@afrilayer.com
                </a>
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                ACCRA, GH
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border and copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Afrilayer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}