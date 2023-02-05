export const sum = (salary: number, n: number) => salary + n;
export const sub = (salary: number, n: number) => salary - n;
export const div = (salary: number, n: number) => salary / n;
export const mult = (salary: number, n: number) => salary * n;


export type ActionType = {
    type: "SUM" | "SUB" | "DIV" | "MULT"
    n: number
}

export type StateType = number
export const salaryReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SUM":
            return state + action.n;
            break;
        case "SUB":
            return state - action.n;
            break;
        case "DIV":
            return state / action.n;
            break;
        case "MULT":
            return state * action.n;
            break;
        default:
            return state;
    }
}