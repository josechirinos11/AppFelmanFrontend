import React from "react";
import "../css/ConfirmDialog.css"; // Asegúrate de importar correctamente el archivo de estilos

const ConfirmDialog = ({ onConfirm, onCancel }) => {
  // Esta función detecta si el clic fue en el fondo (y no dentro del modal)
  const handleOverlayClick = (e) => {
    // Verifica si el clic ocurrió en el fondo y no en el contenido del modal
    if (e.target === e.currentTarget) {
      console.log('Clic fuera del modal, cerrando modal');
      onCancel(); // Llama a onCancel para cerrar el modal
    }
  };

  // Evitar que el clic dentro del modal propague el evento hacia el fondo
  const handleModalClick = (e) => {
    e.stopPropagation(); // Evita que el clic se propague al fondo y cierre el modal
    console.log('Clic dentro del modal, no cerrar');
  };

  return (
    <div className="confirm-dialog" onClick={handleOverlayClick}>
      
        <p>¿Está seguro de que desea eliminar este trabajador?</p>
        <div className="button-container">
          <button className="cssbutton" onClick={onConfirm}>
            Aceptar
          </button>
          <button className="cssbutton" onClick={onCancel}>
            Cancelar
          </button>
        </div>
     
    </div>
  );
};

export default ConfirmDialog;
