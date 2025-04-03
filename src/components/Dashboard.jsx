import React from "react";
import { FaTint, FaTemperatureHigh, FaSun, FaCloudRain, FaClock, FaMicrochip } from "react-icons/fa";

const formatDate = (timestamp) => {
  if (!timestamp) return "Fecha desconocida";
  const date = new Date(timestamp);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const deviceNameMap = {
  Device1: "cilantro",
  Device2: "perejil",
  Device3: "lechuga",
};
const Dashboard = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center text-gray-500 text-lg">No hay datos disponibles.</div>;
  }

  // Obtener la última clave y sus datos
  const lastDataKey = Object.keys(data).pop();
  const lastData = data[lastDataKey];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        📊 Últimos Datos de {deviceNameMap[lastData.device] || "Dispositivo"}
      </h2>
      <div className="text-center mb-6">
        <img 
          src={`/components/${deviceNameMap[lastData.device]}.jpeg`} 
          alt={deviceNameMap[lastData.device]} 
          className="w-48 h-48 mx-auto object-cover rounded-full" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Humedad del aire */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaTint className="text-4xl text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Humedad del Aire</h3>
            <p className="text-gray-600">{lastData.air_humidity}%</p>
          </div>
        </div>

        {/* Temperatura */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaTemperatureHigh className="text-4xl text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Temperatura</h3>
            <p className="text-gray-600">{lastData.air_temperature}°C</p>
          </div>
        </div>

        {/* Luz */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaSun className="text-4xl text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Luz</h3>
            <p className="text-gray-600">{lastData.light} lx</p>
          </div>
        </div>

        {/* Humedad del suelo */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaCloudRain className="text-4xl text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Humedad del Suelo</h3>
            <p className="text-gray-600">{lastData.soil_moisture}</p>
          </div>
        </div>

        {/* Última actualización */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaClock className="text-4xl text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Última Actualización</h3>
            <p className="text-gray-600">{formatDate(lastData.time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
