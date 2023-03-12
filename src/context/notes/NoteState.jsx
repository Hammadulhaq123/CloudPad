import React, { useState } from "react";
import NotesContext from "./notesContext";

const NoteState = (props) => {

    return (
        <NotesContext.Provider value={{}}>
            {props.children}
        </NotesContext.Provider>
    )

}

export default NoteState

