import React from "react";

export function ConfirmationPopUp({confirmDelete, undoDelete}){
    return(
        <div className='confirmation-pop-up'>
            <button onClick={undoDelete}>Deshacer cambios</button>
            <button onClick={confirmDelete}>Confirmar cambios</button>
        </div>
    );
}