import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <form className="mt-6 space-y-4 max-w-lg">
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Phone" />
      <Input placeholder="Company" />
      <textarea placeholder="Message" className="w-full border rounded-lg p-3" />
      <Button className="bg-blue-900 text-white">Send Message</Button>
    </form>
  );
}
