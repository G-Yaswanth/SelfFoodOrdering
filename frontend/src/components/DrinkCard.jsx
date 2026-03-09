function DrinkCard({ drink, quantity, setQuantity }) {
  return (
    <div className="flex items-center gap-4 bg-white shadow rounded-xl p-3">

      <img
        // src={drink.image}
        src = {`${drink.image}?w=400&q=80&auto=format`}
        alt={drink.name}
        // loading="lazy"
        className="w-16 h-16 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{drink.name}</h3>
        <p className="text-gray-500">€{drink.price}</p>
      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() => setQuantity(Math.max(0, quantity - 1))}
          className="w-8 h-8 bg-gray-200 rounded-full hover:text-white hover:bg-blue-500 flex items-center justify-center"
        >
          -
        </button>

        <span className="w-6 text-center">{quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-8 h-8 bg-gray-200 rounded-full hover:text-white hover:bg-blue-500 flex items-center justify-center"
        >
          +
        </button>

      </div>

    </div>
  );
}

export default DrinkCard;