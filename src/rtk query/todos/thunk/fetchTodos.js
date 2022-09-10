import { loaded } from "../actions";
import { apiUrl } from "./apiUrl";

const fetchTodos = async (dispatch) => {
    const response = await fetch(apiUrl);
    const todos = await response.json();

    dispatch(loaded(todos));
};

export default fetchTodos;
