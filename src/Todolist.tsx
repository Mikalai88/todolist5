import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType

    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const tasksItems = props.tasks.length
        ? props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.todolistId)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
            }

            const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue, props.todolistId);
            }

            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={onClickHandler} aria-label="delete">
                    <Delete />
                </IconButton>
            </div>
        })
        : <span></span>

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
    const addTask = (title: string) => props.addTask(title, props.todolistId);
    const onChangeTodolistTitleHandler = (newTitle: string) => props.changeTodolistTitle(props.todolistId, newTitle);

    return <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
        <IconButton onClick={removeTodolistHandler} aria-label="delete">
            <Delete />
        </IconButton></h3>
        <AddItemForm addItem={addTask} />
        <div>
            {tasksItems}
        </div>
        <div style={{paddingTop: "5px"}}>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"} color={"primary"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

