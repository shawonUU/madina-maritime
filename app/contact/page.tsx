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

    <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] md:grid-cols-4">

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
          Madina Square,64/A Shahid Buddhijibi Monir Chowdhury Sharak (Central road),Dhaka -1205, Bangladesh
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
          Office: 88 (0222) 3363531, 3368840 Ext :385,HP: +8801730-702927 
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Our team is available to assist you.
        </p>

      </div>

      <div className="group p-7 transition hover:bg-blue-50/50">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
          <Mail size={21} />
        </div>

        <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
          Email Us
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#06245a]">
          operation.head@madina.co
        </h3>

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



  <section id="contact-form" className="mx-auto max-w-7xl px-6 py-10 lg:px-8"  >

    <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">


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

      <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
        <div>
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
           Our Location
          </div>
          <div className="relative h-[380px] overflow-hidden rounded-3xl bg-[#06245a] shadow-lg">
            <div className="p-3 absolute inset-0 flex flex-col items-center justify-center text-center">
            <iframe className="w-full h-full border-0 rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1452292133567!2d90.38259497440747!3d23.742199989092896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b9cc54b1df%3A0x6cc23cb4676be16a!2sMadina%20Group!5e0!3m2!1sen!2sbd!4v1786536774398!5m2!1sen!2sbd"  loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section>

</main>

);
}
