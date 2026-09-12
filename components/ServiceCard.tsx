export default function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
