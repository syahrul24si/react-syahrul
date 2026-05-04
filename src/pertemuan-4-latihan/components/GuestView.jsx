import DestinationCard from "./DestinationCard";

const GuestView = ({ data }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Guest View</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <DestinationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GuestView;