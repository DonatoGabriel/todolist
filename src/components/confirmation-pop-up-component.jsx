import React from "react";

export function ConfirmationPopUp({confirmDelete, undoDelete}){
    return(
        <div className='confirmation-pop-up'>
            <button onClick={undoDelete}>UNDO CHANGES</button>
            <button onClick={confirmDelete}>CONFIRM CHANGES</button>
        </div>
    );
}