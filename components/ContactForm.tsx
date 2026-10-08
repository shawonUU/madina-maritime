"use client";

import { FormEvent, useState } from "react";
import api from "@/services/api";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("CONTACT FORM SUBMIT:", form);

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post(
        "/website/contact-enquiries",
        form
      );

      console.log("CONTACT FORM RESPONSE:", response.data);

      setSuccess(
        response.data?.message ||
          "Your enquiry has been submitted successfully."
      );

      setForm(initialForm);
    } catch (err: any) {
      console.error("CONTACT FORM ERROR:", err);

      if (err?.response?.status === 422) {
        const errors = err.response.data?.errors;

        if (errors) {
          const firstError = Object.values(errors)[0];

          if (Array.isArray(firstError)) {
            setError(String(firstError[0]));
          } else {
            setError("Please check the form information.");
          }
        } else {
          setError(
            err.response.data?.message ||
              "Please check the form information."
          );
        }
      } else if (err?.response?.status === 429) {
        setError(
          "Too many requests. Please wait a moment and try again."
        );
      } else if (err?.response?.status === 401) {
        setError("Unauthorized request.");
      } else {
        setError(
          err?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Your Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className=" block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className=" block text-sm font-semibold text-slate-700">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className=" block text-sm font-semibold text-slate-700">
          Subject
        </label>

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="Enter subject"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className=" block text-sm font-semibold text-slate-700">
          Message
        </label>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Write your message"
          className="w-full  rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#06245a] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#03172f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}