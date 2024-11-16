import React from "react";
import "../css/ConfirmDialog.css"; // Archivo de estilos

const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog">
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
