import {ActionType, salaryReducer, StateType, sub, sum} from "./task";

test("salary should growth", () => {
    //data
    const salary: number = 80000;
    const n: number = 20000;
    //fn
    const result = sum(salary, n);
    //test
    expect(result).toBe(100000);
});

test("salary should be corrected", () => {
    const salary: number = 150000;
    const n: number = 25000;
    const result = sub(salary, n);
    expect(result).toBe(125000);
});

test("case SUM of salary reducer", () => {
    const salary: StateType = 100000
    const action: ActionType = {
        type: "SUM",
        n: 20000
    }
    const result = salaryReducer(salary, action);
    expect(result).toBe(120000);
})