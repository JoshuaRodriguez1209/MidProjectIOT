import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Tabs from "./components/Tabs";

const firebaseConfig = {
  databaseURL: "https://proyectouber-aa293-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const devicesRef = ref(database, "/devices");

    onValue(
      devicesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const newData = snapshot.val();
          console.log("Nuevo registro detectado:", newData);
          setData(newData);
        } else {
          console.log("No hay datos disponibles");
          setData(null);
        }
      },
      (error) => {
        console.error("Error al obtener datos de Firebase:", error);
      }
    );
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
        📡 Monitoreo de Dispositivos
      </h1>
      {data ? <Tabs data={data} /> : <p className="text-center text-gray-500">Cargando datos...</p>}
    </div>
  );
}

export default App;
