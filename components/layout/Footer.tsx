import Link from "next/link";
import { X, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  social: [
    { name: "X", href: "https://x.com/afrilayer", icon: X },
    { name: "GitHub", href: "https://github.com/afrilayer", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/company/afrilayer", icon: Linkedin },
    { name: "Email", href: "mailto:hello@afrilayer.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="mt-10 px-6 md:px-10 py-10 max-w-5xl mx-auto" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs font-mono" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Afrilayer · Crafted with ♥
        </p>
        <div className="flex items-center gap-4" style={{ color: "var(--color-muted)" }}>
          {footerLinks.social.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${item.name}`}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}