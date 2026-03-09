function OrderCard({ order, markDelivered }) {
  const isCompleted = order.status === "completed";

  return (
    <div
      className={`p-4 rounded-xl shadow-md ${
        isCompleted ? "bg-green-200" : "bg-red-200"
      }`}
    >
      <h2 className="font-bold text-lg mb-2">
        Chair {order.chair}
      </h2>

      <ul className="mb-2">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.qty} × {item.name}
          </li>
        ))}
      </ul>

      <p className="font-semibold">€{order.total}</p>

      {!isCompleted && (
        <button
          onClick={() => markDelivered(order._id)}
          className="mt-3 bg-white text-grey-800 hover:bg-blue-500 hover:text-white px-3 py-2 rounded"
        >
          Mark Delivered
        </button>
      )}
    </div>
  );
}

export default OrderCard;