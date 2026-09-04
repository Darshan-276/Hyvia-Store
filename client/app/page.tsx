import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      
      {/* Small Badge */}
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Under Construction
      </span>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A] max-w-2xl mb-4">
        Something Extraordinary is Coming Soon.
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-neutral-600 max-w-md mb-8 leading-relaxed">
        We are crafting the ultimate shopping experience for HIVYA. Elevate your everyday wardrobe soon.
      </p>

      {/* Button */}
      <div className="flex gap-4">
        <Link
          href="/products"
          className="bg-[#111111] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
        >
          Explore Catalog →
        </Link>
      </div>

    </section>
  );
}
