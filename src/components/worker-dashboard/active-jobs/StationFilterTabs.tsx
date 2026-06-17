interface StationFilterTabsProps {
  stations: string[];
  currentStation: string | null;
  onSelectStation: (station: string | null) => void;
}

export default function StationFilterTabs({
  stations,
  currentStation,
  onSelectStation,
}: StationFilterTabsProps) {
  return (
    <div className="flex flex-wrap border-b border-gray-300 mb-6">
      <button
        onClick={() => onSelectStation(null)}
        className={`w-full sm:w-auto px-4 py-2 border-b-2 transition ${
          currentStation === null
            ? "border-claundry-blue text-claundry-blue font-semibold"
            : "border-transparent text-gray-600 hover:text-claundry-blue"
        }`}
      >
        ALL
      </button>
      {stations.map((station) => (
        <button
          key={station}
          onClick={() => onSelectStation(station)}
          className={`w-full sm:w-auto px-4 py-2 border-b-2 transition ${
            currentStation === station
              ? "border-claundry-blue text-claundry-blue font-semibold"
              : "border-transparent text-gray-600 hover:text-claundry-blue"
          }`}
        >
          {station}
        </button>
      ))}
    </div>
  );
}