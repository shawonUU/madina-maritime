"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogDetailsPage() {
  return (
    <article className="max-w-5xl mx-auto py-20 px-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/blog" className="hover:underline">Blog</Link> / Future of Maritime Logistics
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Future of Maritime Logistics
      </h1>

      {/* Meta Info */}
      <div className="text-sm text-gray-500 mb-6">August 10, 2026</div>

      {/* Hero Image */}
      <Image
        src="https://images.unsplash.com/photo-1505839673365-e3971f8d9184"
        alt="Future of Maritime Logistics"
        width={1000}
        height={500}
        className="rounded-xl shadow-lg mb-8 object-cover"
      />

      {/* Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-12">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt
          facilisis, nunc sapien bibendum nulla, nec volutpat sapien lorem nec erat. Integer
          malesuada, justo nec tristique tincidunt, lorem eros tincidunt lorem, nec varius sapien
          magna nec nulla.
        </p>
        <p>
          Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo. Integer
          consectetur luctus nulla, a tincidunt sapien varius nec. Suspendisse potenti. Sed
          fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa
          ut dolor.
        </p>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Donec vel sapien ultrices, dictum nulla nec, tincidunt sapien. Sed sit amet augue
          nec sapien malesuada fermentum.
        </p>
        <p>
          Fusce nec felis id lacus tincidunt fermentum. Suspendisse potenti. Sed euismod, nunc vel
          tincidunt facilisis, nunc sapien bibendum nulla, nec volutpat sapien lorem nec erat.
          Integer malesuada, justo nec tristique tincidunt.
        </p>
      </div>

      {/* Related Blogs */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Related Blogs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            href="/blog/sustainable-shipping"
            className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105 duration-500"
          >
            <Image
              src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
              alt="Sustainable Shipping"
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900">Sustainable Shipping Practices</h3>
              <p className="text-sm text-gray-600 mt-2">August 8, 2026</p>
            </div>
          </Link>

          <Link
            href="/blog/global-trade"
            className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105 duration-500"
          >
            <Image
              src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31"
              alt="Global Trade Challenges"
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900">Global Trade Challenges</h3>
              <p className="text-sm text-gray-600 mt-2">July 20, 2026</p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
