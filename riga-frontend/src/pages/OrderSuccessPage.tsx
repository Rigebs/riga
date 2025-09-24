import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone } = location.state || {};

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 ¡Pedido confirmado con éxito!
      </h1>

      <p className="text-gray-700 mb-6">
        Hemos registrado tu pedido con el correo <b>{email}</b> y el teléfono{" "}
        <b>{phone}</b>.
        <br />
        Estos datos podrás usarlos más adelante para ingresar y revisar el
        historial de tus pedidos.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
      >
        Crear mi cuenta ahora
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-3 w-full bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-semibold py-3 rounded-xl"
      >
        Volver a la tienda
      </button>
    </div>
  );
}
