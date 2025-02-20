const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded shadow">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
