import {
    todolistsReducer,
    ChangeTodolistTitleActionType,
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeTodolistTitleAC
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodolistType} from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolist = "New Todolist";

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolist);

});

test("correct todolist should change its name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist title";

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[1].title).toBe(newTodolistTitle)
});
