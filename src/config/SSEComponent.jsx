import React, { useEffect, useState } from "react";

const SSEComponent = () => {
  const [events, setEvents] = useState([]);
console.log('registrando un evento desde el servidor')
  useEffect(() => {
    // Crear una nueva instancia de EventSource, conectándose al endpoint /events del servidor
    const eventSource = new EventSource("http://localhost:4000/events");

    // Función para manejar los mensajes recibidos
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);  // Los datos que envía el servidor se están enviando como JSON
      console.log("Nuevo evento recibido:", newData);
      
      // Actualizamos el estado con los datos recibidos
      setEvents((prevEvents) => [...prevEvents, newData]);
    };

    // Manejar posibles errores en la conexión
    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE:", error);
      eventSource.close();  // Cerrar la conexión en caso de error
    };

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      eventSource.close();  // Cerrar la conexión al finalizar el componente
    };
  }, []);

  return (
    <div>
      <h2>Eventos en Tiempo Real</h2>
      {events.length === 0 ? (
        <p>No se han recibido eventos aún.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.timestamp}</strong>: {event.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SSEComponent;
