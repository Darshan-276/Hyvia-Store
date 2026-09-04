import Link from "next/link";

export function Footer() {   // Notice: "export function Footer"

  return (
    <footer className="bg-[#111111] text-neutral-400 border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-black text-xl tracking-wider">
            <span className="text-emerald-400">✦</span> HIVYA
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            Premium everyday essentials and elevated streetwear. Designed for comfort, styled for presence.
          </p>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} HIVYA Inc. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=men" className="hover:text-white transition-colors">Men&apos;s Collection</Link></li>
            <li><Link href="/products?category=women" className="hover:text-white transition-colors">Women&apos;s Collection</Link></li>
            <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/products?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
            Customer Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
            Stay Connected
          </h4>
          <p className="text-xs text-neutral-400 mb-3">
            Subscribe to receive exclusive drops and early sale access.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 w-full"
            />
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
              Join
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
