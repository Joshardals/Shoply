import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Men's Clothing", href: "/products/mens" },
    { name: "Women's Clothing", href: "/products/womens" },
    { name: "Accessories", href: "/products/accessories" },
    { name: "New Arrivals", href: "/new" },
    { name: "Sale", href: "/sale" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Store Locations", href: "/stores" },
    { name: "Our Blog", href: "/blog" },
    { name: "Reviews", href: "/reviews" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Newsletter Section */}
        <div className="flex flex-col items-center text-center mb-12 px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            Get the latest updates, deals, and exclusive offers directly to your
            inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
              transition-colors flex items-center group"
                    >
                      <ChevronRight
                        className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 
              group-hover:ml-0 transition-all duration-200"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Social Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Phone className="h-5 w-5" />
              <span>+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:support@shoply.com"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Mail className="h-5 w-5" />
              <span>support@shoply.com</span>
            </a>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5" />
              <span>123 Fashion St, NY, USA</span>
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 
        dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {currentYear} Shoply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
