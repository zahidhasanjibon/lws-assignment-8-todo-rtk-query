import { added } from "../actions";
import { apiUrl } from "./apiUrl";

const addTodo = (todoText) => {
    return async (dispatch) => {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({
                text: todoText,
                completed: false,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();

        dispatch(added(todo.text));
    };
};

export default addTodo;
