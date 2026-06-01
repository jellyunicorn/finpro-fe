import { useState } from "react";

export default function WorkerDashboardOrders() {
  const [activeOrders, setActiveOrders] = useState([
    {
      id: "ORD-001",
      customer: "Budi",
      items: [
        { name: "Shirt", count: 5, confirmed: false },
        { name: "Pants", count: 2, confirmed: false },
        { name: "Jacket", count: 1, confirmed: false },
      ],
      status: "Processing",
      station: "Washing",
    },
    {
      id: "ORD-002",
      customer: "Joko",
      items: [
        { name: "Dress", count: 3, confirmed: false },
        { name: "Towel", count: 4, confirmed: false },
      ],
      status: "Awaiting Payment",
      station: "Packing",
    },
  ]);

  const handleConfirmItem = (orderId: string, itemIndex: number) => {
    setActiveOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item, idx) =>
                idx === itemIndex ? { ...item, confirmed: !item.confirmed } : item
              ),
            }
          : order
      )
    );
  };

  const allItemsConfirmed = (order: typeof activeOrders[number]) =>
    order.items.every((item) => item.confirmed);

  const handleMarkComplete = (orderId: string) => {
    setActiveOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "tes" }
          : order
      )
    );
  };

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Active Orders
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Station</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-[#F3F8FE] transition-colors"
              >
                <td className="p-4 font-medium text-claundry-blue">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={item.confirmed}
                          onChange={() => handleConfirmItem(order.id, idx)}
                          className="accent-claundry-blue"
                        />
                        <span>
                          {item.name} ({item.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </td>
                <td className="p-4">{order.station}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Awaiting Payment"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkComplete(order.id)}
                      disabled={!allItemsConfirmed(order)}
                      className={`px-3 py-1 rounded text-sm ${
                        allItemsConfirmed(order)
                          ? "bg-claundry-blue text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Mark Complete
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
                      Request Bypass
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
