export default function JobTable() {
  return (
    <table className="w-full border mt-6">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="p-3">Position</th>
          <th className="p-3">Location</th>
          <th className="p-3">Apply</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-3">Marine Engineer</td>
          <td className="p-3">Dhaka</td>
          <td className="p-3"><button className="bg-blue-900 text-white px-4 py-2 rounded">Apply</button></td>
        </tr>
      </tbody>
    </table>
  );
}
