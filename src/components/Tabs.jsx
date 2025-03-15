import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Charts from "./Charts";

const deviceNames = ["Device1", "Device2", "Device3"]; // Dispositivos esperados

const Tabs = ({ data }) => {
  const [selectedDevice, setSelectedDevice] = useState(deviceNames[0]); // Iniciar con Device1

  // Filtrar los datos para cada dispositivo
  const filteredData = {};
  Object.keys(data || {}).forEach((key) => {
    const deviceName = data[key].device; // Obtener el nombre del dispositivo
    if (!filteredData[deviceName]) {
      filteredData[deviceName] = {};
    }
    filteredData[deviceName][key] = data[key]; // Guardar los datos por dispositivo
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tabs para seleccionar el dispositivo */}
      <div className="flex justify-center space-x-4 mb-6">
        {deviceNames.map((device) => (
          <button
            key={device}
            onClick={() => setSelectedDevice(device)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedDevice === device
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {device}
          </button>
        ))}
      </div>

      {/* Contenido de cada tab */}
      {filteredData[selectedDevice] ? (
        <>
          <Dashboard data={filteredData[selectedDevice]} />
          <Charts data={filteredData[selectedDevice]} />
        </>
      ) : (
        <p className="text-center text-gray-500">No hay datos para {selectedDevice}.</p>
      )}
    </div>
  );
};

export default Tabs;
