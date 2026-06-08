export default function WorkerDashboardOrders() {
  const stations = ["Washing", "Drying", "Packing"];

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Active Orders
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {stations.map((station) => (
          <button
            key={station}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {station}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg border border-[#BAD6F5]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
              <td className="p-4 font-medium text-claundry-blue">ORD-001</td>
              <td className="p-4">Budi</td>
              <td className="p-4">
                <div className="flex flex-col gap-2">
                  <span>Shirt (5)</span>
                  <span>Pants (2)</span>
                  <span>Jacket (1)</span>
                </div>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  Processing
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700">
                    Mark Complete
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
                    Request Bypass
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
              <td className="p-4 font-medium text-claundry-blue">ORD-002</td>
              <td className="p-4">Joko</td>
              <td className="p-4">
                <div className="flex flex-col gap-2">
                  <span>Dress (3)</span>
                  <span>Towel (4)</span>
                </div>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                  Awaiting Payment
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700">
                    Mark Complete
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
                    Request Bypass
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
