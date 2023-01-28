import {TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch(action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST":
            return [...state, {
                id: v1(),
                title: action.title
            }]
        case "CHANGE-TODOLIST-TITLE":
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        default:
            throw new Error("I don't understand this action type.")
    }

}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
