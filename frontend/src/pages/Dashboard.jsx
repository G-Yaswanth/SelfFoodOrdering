import { useEffect, useState } from "react";
import api from "../api/api";
import OrderCard from "../components/OrderCard";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders");
    }
  };

  const markDelivered = async (id) => {
    try {
      await api.patch(`/orders/${id}`, {
        status: "completed"
      });

      fetchOrders();
    } catch (error) {
      console.error("Failed to update order");
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Bar Orders
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            markDelivered={markDelivered}
          />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;