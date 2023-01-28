import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValueType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
}

type TaskValueType = {
    data: Array<TaskType>
    filter: FilterValueType
}

type TaskStateType = {
    [todolistId: string]: TaskValueType
}

function App() {
    const todolistId_1: string = v1();
    const todolistId_2: string = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>> (
        [
            {id: todolistId_1, title: 'What to learn'},
            {id: todolistId_2, title: 'What to buy'}
        ]
    )

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
            filter: 'all'
        } ,
        [todolistId_2]: {
            data: [
                {id: v1(), title: "Apple", isDone: true},
                {id: v1(), title: "Banane", isDone: true},
                {id: v1(), title: "Mango", isDone: false},
                {id: v1(), title: "Cherry", isDone: false},
                {id: v1(), title: "Beer", isDone: false}
            ],
            filter: 'all'
        }
    })

    function removeTask(id: string, todolistId: string) {
                        // let filteredTasks = tasks[todolistId].filter(t => t.id != id)
                        // const copyTasks = {...tasks}
                        // copyTasks[todolistId] = filteredTasks
                        // setTasks(copyTasks)

        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(t => t.id != id)}})
    }

    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

                        // const tasksForUpdate = tasks[todolistId]
                        // const tasksUpdated = [newTask, ...tasksForUpdate]
                        // const copyTasks = {...tasks}
                        // copyTasks[todolistId] = tasksUpdated
                        // setTasks(copyTasks)
                        // let task = {id: v1(), title: title, isDone: false};
                        // let newTasks = [task, ...tasks];

        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone}: t)})
        setTasks({...tasks,
            [todolistId]: {...tasks[todolistId],
                data: tasks[todolistId].data.map(t => t.id === taskId
                    ? {...t, isDone: isDone}
                    : t)}})
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {

        setTasks({...tasks,
            [todolistId]: {...tasks[todolistId],
                data: tasks[todolistId].data.map(t => t.id === taskId
                    ? {...t, title: newValue}
                    : t)}})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }

    const todolistItems =
        todolists.map(todolist =>{
            const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[todolist.id].data, tasks[todolist.id].filter)
            return <Grid item>
                <Paper style={{padding: "10px"}}>
            <Todolist key={todolist.id}
                             todolistId={todolist.id}
                             title={todolist.title}
                             tasks={filteredTasksForRender}
                             removeTask={removeTask}
                             changeFilter={changeFilter}
                             addTask={addTask}
                             changeTaskStatus={changeStatus}
                             changeTaskTitle={changeTaskTitle}
                             filter={tasks[todolist.id].filter}
                             removeTodolist={removeTodolist}
                             changeTodolistTitle={changeTodolistTitle}
            />
                </Paper>
            </Grid>
        })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title
        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasks, [todolist.id]: {data: [], filter: 'all'}
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todolistItems}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
