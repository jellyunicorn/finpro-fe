import type { DriverJob } from "../../types/driverJob";

type TabOption = DriverJob["type"];

interface JobFilterTabsProps {
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
}

export default function JobFilterTabs({ activeTab, setActiveTab }: JobFilterTabsProps) {
  const tabs: { label: string; value: TabOption }[] = [
    { label: "PICKUPS", value: "pickup" },
    { label: "DELIVERIES", value: "delivery" },
  ];

  return (
    <div className="flex flex-wrap border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`w-full sm:w-auto px-4 py-2 border-b-2 transition ${
            activeTab === tab.value
              ? "border-claundry-blue text-claundry-blue font-semibold"
              : "border-transparent text-gray-600 hover:text-claundry-blue"
          }`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
