"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Ship,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sister Concerns", href: "/sister-concerns" },
  { label: "Services", href: "/services" },
  { label: "Customer", href: "/customer" },
  { label: "Vendor & Partners", href: "/vendor-and-partners" },
  // { label: "News & Media", href: "/news-media" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">

      {/* Main Navbar */}
      {/* <nav className="border-b border-white/10 bg-[#06245a]/95 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center"
          >
            <Image
              src="/images/logo-white.png"
              alt="Madina Maritime Logo"
              width={105}
              height={70}
              priority
              className="h-auto w-[82px] object-contain transition duration-300 group-hover:scale-105 sm:w-[92px] lg:w-[105px]"
            />
          </Link>
          <div className="hidden items-center gap-1 lg:flex">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-blue-50/90 transition duration-300 hover:bg-white/10 hover:text-white xl:px-4"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-blue-300 transition-all duration-300 group-hover:w-5" />
              </Link>
            ))}

          </div>

          <div className="hidden xl:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-[#06245a]"
            >
              <Ship size={16} />
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

        <div
          className={`overflow-hidden border-t border-white/10 bg-[#06245a] transition-all duration-300 lg:hidden ${
            mobileOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >

          <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">

            <div className="space-y-1">

              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-blue-50/90 transition hover:bg-white/10 hover:text-white"
                  style={{
                    transitionDelay: mobileOpen
                      ? `${index * 25}ms`
                      : "0ms",
                  }}
                >
                  <span>{item.label}</span>

                  <ChevronDown
                    size={16}
                    className="-rotate-90 text-blue-300"
                  />
                </Link>
              ))}

            </div>

            <div className="mt-4 border-t border-white/10 pt-4">

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-blue-50"
              >
                <Ship size={17} />
                Get in Touch
              </Link>

            </div>

          </div>

        </div>

      </nav> */}

<nav className="border-b border-slate-200 bg-white text-[#06245a] shadow-sm">
  <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
    <Link
      href="/"
      onClick={closeMobileMenu}
      className="group flex items-center"
    >
      <Image
        src="/images/logo.png"
        alt="Madina Maritime Logo"
        width={105}
        height={70}
        priority
        className="h-auto w-[82px] object-contain transition duration-300 group-hover:scale-105 sm:w-[92px] lg:w-[105px]"
      />
    </Link>

    <div className="hidden items-center gap-1 lg:flex">

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-slate-700 transition duration-300 hover:bg-[#06245a]/5 hover:text-[#06245a] xl:px-4"
        >
          {item.label}

          <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#06245a] transition-all duration-300 group-hover:w-5" />
        </Link>
      ))}

    </div>

    <div className="hidden xl:block">



    </div>

    <button
      type="button"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen(!mobileOpen)}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-[#06245a] transition hover:bg-slate-100 lg:hidden"
    >
      {mobileOpen ? (
        <X size={23} />
      ) : (
        <Menu size={23} />
      )}
    </button>

  </div>

  <div
    className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
      mobileOpen
        ? "max-h-[600px] opacity-100"
        : "max-h-0 opacity-0"
    }`}
  >

    <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">

      <div className="space-y-1">

        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobileMenu}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-[#06245a]/5 hover:text-[#06245a]"
            style={{
              transitionDelay: mobileOpen
                ? `${index * 25}ms`
                : "0ms",
            }}
          >
            <span>{item.label}</span>

            <ChevronDown
              size={16}
              className="-rotate-90 text-[#06245a]"
            />
          </Link>
        ))}

      </div>
      <div className="mt-4 border-t border-slate-200 pt-4">

        <Link
          href="/contact"
          onClick={closeMobileMenu}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#06245a] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#083579]"
        >
          <Ship size={17} />
          Get in Touch
        </Link>
      </div>
    </div>
  </div>
</nav>

    </header>
  );
}