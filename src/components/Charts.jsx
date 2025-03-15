import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Función para formatear la fecha en DD/MM/YY HH:MM
const formatDate = (timestamp) => {
  if (!timestamp) return "Desconocido";
  const date = new Date(timestamp);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Charts = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center text-gray-500">No hay datos para graficar.</div>;
  }

  // Convertir datos de objeto a array y formatear la fecha
  const chartData = Object.keys(data).map((key) => ({
    time: formatDate(data[key].time), // Formatear la fecha en el eje X
    humidity: data[key].air_humidity,
    temperature: data[key].air_temperature,
    light: data[key].light,
    soil_moisture: data[key].soil_moisture,
  }));

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        📈 Historial de Datos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Temperatura */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-center mb-2">Temperatura</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" axisLine={true} tick={false} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Humedad */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-center mb-2">Humedad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" axisLine={true} tick={false} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="humidity" stroke="#00aaff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
