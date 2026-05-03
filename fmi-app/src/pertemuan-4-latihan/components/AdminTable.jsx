const AdminTable = ({ data }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Admin View</h2>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Kota</th>
              <th className="px-4 py-3 text-left">Harga</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Jam</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.city}</td>
                <td className="px-4 py-3">Rp{item.price.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3">{item.rating}</td>
                <td className="px-4 py-3">
                  {item.schedule.open} - {item.schedule.close}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;