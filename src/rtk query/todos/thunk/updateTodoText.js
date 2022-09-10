import { updateTodoText } from "../actions";
import { apiUrl } from "./apiUrl";

const updateText = (todoId,todoText) => {
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/${todoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                text: todoText,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json(); 


        dispatch(updateTodoText(todo.id,todo.text));
    };
};

export default updateText;