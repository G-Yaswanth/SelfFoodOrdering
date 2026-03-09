import { useNavigate } from "react-router-dom";


function Success() {
  const navigate  = useNavigate();
  
  function orderMore(){
    navigate("/menu");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        Order Sent!
      </h1>

      <p className="mt-3 text-gray-600">
        Your drinks will arrive shortly.
      </p>
      <button onClick={orderMore}>
        Order More!
      </button>
    </div>
  );
}

export default Success;