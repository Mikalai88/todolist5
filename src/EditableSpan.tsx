import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");


    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && activateViewMode()

    return (
        editMode === true
            ? <TextField value={title}
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     autoFocus
                     onKeyDown={onKeyDownHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
        )

}