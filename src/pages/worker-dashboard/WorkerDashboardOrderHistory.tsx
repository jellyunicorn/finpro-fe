export default function WorkerDashboardOrderHistory() {
  const orderHistory = [
    {
      id: "ORD-100",
      customer: "John Doe",
      items: ["5 Shirts", "2 Pants", "1 Jacket"],
      station: "Packing",
      status: "Delivered",
      completedAt: "2026-05-20 14:30",
    },
    {
      id: "ORD-101",
      customer: "Jane Smith",
      items: ["3 Dresses", "4 Towels"],
      station: "Ironing",
      status: "Ready for Delivery",
      completedAt: "2026-05-21 09:15",
    },
    {
      id: "ORD-102",
      customer: "Michael Tan",
      items: ["2 Bedsheets", "6 T-Shirts"],
      station: "Washing",
      status: "Awaiting Payment",
      completedAt: "2026-05-22 17:45",
    },
  ];

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-[#296FDA] mb-6">
        Order History
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-[#296FDA]">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Station</th>
              <th className="p-4">Status</th>
              <th className="p-4">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-[#F3F8FE] transition-colors"
              >
                <td className="p-4 font-medium text-[#296FDA]">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.items.join(", ")}</td>
                <td className="p-4">{order.station}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Ready for Delivery"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {order.completedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
