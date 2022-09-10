

import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../rtk query/features/api/apiSlice";
import { colorChange, statusChnage } from "../rtk query/features/filter/filterSlice";

const numberOfTodos = (no_of_todos) => {
    switch (no_of_todos) {
        case 0:
            return "No task";
        case 1:
            return "1 task";
        default:
            return `${no_of_todos} tasks`;
    }
};
export default function Footer() {

const {status,colors} = useSelector((state) => state.filter)
const {data:todos} = useGetTodosQuery({status:'',colors:[]})

    const dispatch = useDispatch()
    const todosRemaining = todos?.filter((todo) => !todo.completed).length;
    
    const handleStatusChange = (status) => {
        dispatch(statusChnage(status))
    };

    const handleColorChange = (color) => {
        if (colors.includes(color)) {
            dispatch(colorChange({color, changeType:"remove"}));
        } else {
            dispatch(colorChange({color, changeType:"add"}));
        }
    };

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            {<p>{numberOfTodos(todosRemaining)} left</p> }
            <ul className="flex space-x-1 items-center text-xs">
                <li
                    className={`cursor-pointer ${
                        status === "" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("")}
                >
                    All
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "false" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("false")}
                >
                    Incomplete
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "true" && "font-bold"
                    }`}
                    onClick={() => handleStatusChange("true")}
                >
                    Complete
                </li>
                <li></li>
                <li></li>
                <li
                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
                        colors.includes("green") && "bg-green-500"
                    }`}
                    onClick={() => handleColorChange("green")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        colors.includes("red") && "bg-red-500"
                    }`}
                    onClick={() => handleColorChange("red")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        colors.includes("yellow") && "bg-yellow-500"
                    }`}
                    onClick={() => handleColorChange("yellow")}
                ></li>
            </ul>
        </div>
    );
}
