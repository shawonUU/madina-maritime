"use client";

import Image from "next/image";
import Link from "next/link";
import {
ArrowRight,
ArrowUpRight,
Clock3,
Mail,
MapPin,
Phone,
Ship,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

export default function Contact() {
return ( 

<main className="bg-white text-slate-900">
  
  <section className="relative min-h-[560px] overflow-hidden bg-[#03172f]">

    <Image
      src="/images/ship3.jpg"
      alt="Contact Madina Maritime Limited"
      fill
      priority
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/30" />

    <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/90 via-transparent to-transparent" />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />

    <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl items-center px-6 lg:px-8">

      <div className="max-w-3xl">

        <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
          <span className="h-px w-12 bg-blue-400" />
          Madina Maritime Limited
        </div>

        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Let&apos;s start a
          <br />
          <span className="text-blue-300">conversation.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
          Whether you need marine services, business information or want
          to explore a partnership, our team is ready to hear from you.
        </p>

        <div className="mt-9">
          <Button
            
            size="lg"
            className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
          >
            <Link href="#contact-form" className="flex items-center gap-2">
              Send an Enquiry
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>

      </div>

    </div>

    <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 lg:left-10">
      <Ship size={15} />
      Connecting Through The Sea
    </div>

  </section>


  <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

    <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] md:grid-cols-3">

      <div className="group p-7 transition hover:bg-blue-50/50">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
          <MapPin size={21} />
        </div>

        <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
          Visit Us
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#06245a]">
          Head Office
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Dhaka, Bangladesh
        </p>

      </div>


      <div className="group border-y border-slate-100 p-7 transition hover:bg-blue-50/50 md:border-x md:border-y-0">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
          <Phone size={21} />
        </div>

        <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
          Call Us
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#06245a]">
          +880-123456789
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Our team is available to assist you.
        </p>

      </div>


      <div className="group p-7 transition hover:bg-blue-50/50">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
          <Clock3 size={21} />
        </div>

        <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
          Working Hours
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#06245a]">
          Sunday – Thursday
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          9:00 AM – 6:00 PM
        </p>

      </div>

    </div>

  </section>



  <section
    id="contact-form"
    className="mx-auto max-w-7xl px-6 py-28 lg:px-8"
  >

    <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">

      <div>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            01 — Get In Touch
          </span>

          <span className="h-px w-12 bg-blue-200" />
        </div>

        <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
          We&apos;d be glad
          <br />
          to hear from you.
        </h2>

        <p className="mt-7 text-lg leading-8 text-slate-600">
          Have a question about our marine services or want to discuss a
          business opportunity? Send us a message and our team will get
          back to you.
        </p>

        <div className="mt-10 space-y-6">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
              <Mail size={20} />
            </div>

            <div>
              <div className="text-sm font-bold text-[#06245a]">
                Email
              </div>

              <p className="mt-1 text-sm text-slate-500">
                info@madinamaritime.com
              </p>
            </div>

          </div>


          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
              <Phone size={20} />
            </div>

            <div>
              <div className="text-sm font-bold text-[#06245a]">
                Phone
              </div>

              <p className="mt-1 text-sm text-slate-500">
                +880-123456789
              </p>
            </div>

          </div>


          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
              <MapPin size={20} />
            </div>

            <div>
              <div className="text-sm font-bold text-[#06245a]">
                Office
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Dhaka, Bangladesh
              </p>
            </div>

          </div>

        </div>


        {/* Small corporate card */}
        <div className="mt-10 rounded-2xl bg-[#06245a] p-7 text-white">

          <Ship size={26} className="text-blue-300" />

          <h3 className="mt-5 text-xl font-bold">
            Your trusted maritime partner.
          </h3>

          <p className="mt-2 text-sm leading-6 text-blue-100/70">
            Reliable service, professional people and long-term
            relationships.
          </p>

        </div>

      </div>


      {/* FORM */}
      <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">

        <div className="mb-8">

          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Send a Message
          </div>

          <h3 className="mt-2 text-2xl font-bold text-[#06245a]">
            Tell us how we can help.
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Fill out the form below and our team will respond as soon as
            possible.
          </p>

        </div>

        <ContactForm />

      </div>

    </div>

  </section>


 
  <section className="bg-[#f5f8fc] py-28">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">

        <div>

          <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            02 — Our Location
          </div>

          <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
            Find us in
            <br />
            Bangladesh.
          </h2>

          <p className="mt-6 leading-7 text-slate-600">
            Our office is located in Dhaka, Bangladesh, providing a
            central point for communication with our customers and
            business partners.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#06245a]">
            <MapPin size={19} className="text-blue-700" />
            Dhaka, Bangladesh
          </div>

        </div>


        <div className="relative h-[380px] overflow-hidden rounded-3xl bg-[#06245a] shadow-lg">

          {/* Replace this block with Google Maps iframe when
              the exact office location is confirmed. */}

          <div className="p-3 absolute inset-0 flex flex-col items-center justify-center text-center">
           <iframe className="w-full h-full border-0 rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1452292133567!2d90.38259497440747!3d23.742199989092896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b9cc54b1df%3A0x6cc23cb4676be16a!2sMadina%20Group!5e0!3m2!1sen!2sbd!4v1786536774398!5m2!1sen!2sbd"  loading="lazy"></iframe>
          </div>

        </div>

      </div>

    </div>

  </section>

  <section className="px-6 py-24 lg:px-8">

    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06245a]">

      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />

      <div className="absolute -bottom-32 right-40 h-96 w-96 rounded-full border border-white/5" />

      <Ship
        size={420}
        strokeWidth={0.8}
        className="absolute -right-10 top-1/2 hidden -translate-y-1/2 text-white opacity-[0.06] lg:block"
      />

    </div>

  </section>

</main>

);
}
