const DestinationCard = ({ item }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {item.category}
          </span>
        </div>

        <p className="text-sm text-gray-500">{item.city}, {item.location.province}</p>
        <p className="text-sm text-gray-600">{item.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <p><span className="font-semibold">Harga:</span> Rp{item.price.toLocaleString("id-ID")}</p>
          <p><span className="font-semibold">Rating:</span> {item.rating}</p>
          <p><span className="font-semibold">Buka:</span> {item.schedule.open}</p>
          <p><span className="font-semibold">Tutup:</span> {item.schedule.close}</p>
        </div>
      </div>
    </div>
  );
};
export default DestinationCard;