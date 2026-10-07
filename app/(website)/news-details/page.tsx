"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewsDetailsPage() {
  return (
    <article className="max-w-5xl mx-auto py-20 px-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/news" className="hover:underline">News & Media</Link> / CSR Initiative
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        CMA CGM Foundation and Feed Children Join Forces to Provide Over 1400 Backpacks
      </h1>

      {/* Meta Info */}
      <div className="text-sm text-gray-500 mb-6">
        August 5, 2026 • 09:00 AM • CSR Initiative
      </div>

      {/* Hero Image */}
      <Image
        src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31"
        alt="CSR Initiative"
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

        <Image
          src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
          alt="Children receiving backpacks"
          width={800}
          height={400}
          className="rounded-lg shadow-md my-6 object-cover"
        />

        <p>
          Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo. Integer
          consectetur luctus nulla, a tincidunt sapien varius nec. Suspendisse potenti. Sed
          fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa
          ut dolor.
        </p>

        <Image
          src="https://images.unsplash.com/photo-1505839673365-e3971f8d9184"
          alt="Volunteers distributing supplies"
          width={800}
          height={400}
          className="rounded-lg shadow-md my-6 object-cover"
        />

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Donec vel sapien
          ultrices, dictum nulla nec, tincidunt sapien. Sed sit amet augue nec sapien malesuada
          fermentum.
        </p>

        <p>
          Fusce nec felis id lacus tincidunt fermentum. Suspendisse potenti. Sed euismod, nunc vel
          tincidunt facilisis, nunc sapien bibendum nulla, nec volutpat sapien lorem nec erat.
          Integer malesuada, justo nec tristique tincidunt.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31"
            alt="Gallery 1"
            width={400}
            height={250}
            className="rounded-lg shadow-md object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
            alt="Gallery 2"
            width={400}
            height={250}
            className="rounded-lg shadow-md object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31"
            alt="Gallery 3"
            width={400}
            height={250}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </article>
  );
}
