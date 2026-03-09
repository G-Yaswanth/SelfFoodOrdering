import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import DrinkCard from "../components/DrinkCard";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [payment, setPayment] = useState("cash");

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const chair = params.get("chair") == null ? 1 : params.get("chair");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get("/menu");
        setMenu(res.data);
      } catch (error) {
        console.error("Failed to fetch menu");
      }
    };

    fetchMenu();
  }, []);

  const updateQuantity = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const items = menu
    .filter((drink) => quantities[drink._id] > 0)
    .map((drink) => ({
      name: drink.name,
      price: drink.price,
      qty: quantities[drink._id]
    }));

  const itemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const submitOrder = async () => {
    if (items.length === 0) {
      alert("Please select at least one drink.");
      return;
    }

    try {
      await api.post("/orders", {
        chair,
        items,
        total,
        payment
      });

      navigate("/success");
    } catch (error) {
      console.error("Order failed");
    }
  };

  return (
    <div className="pb-32 px-4 max-w-md mx-auto">

      {/* Header */}
      <div className="py-4">

        <h1 className="text-2xl font-bold">
          Beach Drinks 🍹
        </h1>

        <p className="text-gray-500">
          Chair {chair}
        </p>

      </div>

      {/* Drinks list */}
      <div className="space-y-3">

        {menu.map((drink) => (
          <DrinkCard
            key={drink._id}
            drink={drink}
            quantity={quantities[drink._id] || 0}
            setQuantity={(val) =>
              updateQuantity(drink._id, val)
            }
          />
        ))}

      </div>

      {/* Payment Section */}
      <div className="mt-6">

        <h2 className="font-semibold mb-2">
          Payment Method
        </h2>

        <div className="flex gap-3">
          <button onClick={() => setPayment("cash")}
            className={`flex-1 py-2 rounded-lg border ${
              payment === "cash"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Cash
          </button>

          <button onClick={() => setPayment("card")}
            className={`flex-1 py-2 rounded-lg border ${
              payment === "card"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Card
          </button>

        </div>

      </div>

      {/* Sticky Order Bar */}
      <div className=" bg-white border-t shadow-lg p-4">

        <div className="max-w-md mx-auto">

          <div className="flex justify-between text-sm mb-1">
            <span>Items</span>
            <span>{itemsCount}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-3">
            <span>Total</span>
            <span>€{total}</span>
          </div>

          <button
            onClick={submitOrder}
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Submit Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Menu;