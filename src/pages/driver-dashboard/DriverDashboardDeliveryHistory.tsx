export default function DriverDashboardDeliveryHistory() {
  const orderHistory = [
    {
      id: "ORD-100",
      customer: "Budi",
      items: ["5 Shirts", "2 Pants", "1 Jacket"],
      completedAt: "2026-05-20 14:30",
    },
    {
      id: "ORD-101",
      customer: "Joko",
      items: ["3 Dresses", "4 Towels"],
      completedAt: "2026-05-21 09:15",
    },
    {
      id: "ORD-102",
      customer: "Siti",
      items: ["2 Bedsheets", "6 T-Shirts"],
      completedAt: "2026-05-22 17:45",
    },
  ];

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Order History
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-[#F3F8FE] transition-colors"
              >
                <td className="p-4 font-medium text-claundry-blue">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.items.join(", ")}</td>
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
