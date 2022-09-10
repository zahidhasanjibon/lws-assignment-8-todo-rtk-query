import { useState } from "react";

import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoStatusMutation } from "../rtk query/features/api/apiSlice";


export default function Header() {

    const [addTodo, { isLoading,  isError }] = useAddTodoMutation()
    const[updateTodoStatus,{isLoading:updateStatusIsLoading}] = useUpdateTodoStatusMutation()
    const[deleteTodo,{isLoading:deleteIsLoading}] = useDeleteTodoMutation()
    const {data:todos} = useGetTodosQuery({status:'',colors:[]})

    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!input)return 
            addTodo({
                text: input,
                completed: false,
            })
        setInput("");
    };

    const completeHandler = async () => {
            const filterIncompleteTodo = todos.filter((todo) => !todo.completed)
            for (let i = 0; i < filterIncompleteTodo.length; i++) {
                  await  updateTodoStatus({id:filterIncompleteTodo[i].id,data:{
                        completed:true
                    }})

            }

    };

    const clearHeandler = async () => {
        const filterCompleteTodo = todos.filter((todo) => todo.completed)
        for (let i = 0; i < filterCompleteTodo.length; i++) {
              await deleteTodo(filterCompleteTodo[i].id)
        }
    
    };

    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={submitHandler}
            >
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={handleInput}
                    required
                />
                <button disabled={isLoading}
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

                {
                        isError && <p>Error Occured</p>
                }

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    className="flex space-x-1 cursor-pointer"
                    onClick={completeHandler}
                >
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    {updateStatusIsLoading && <span>updating....</span>}
                    {!updateStatusIsLoading && <span>Complete All Tasks</span>}
                </li>
                <li className="cursor-pointer" onClick={clearHeandler}>
                    {deleteIsLoading && <span>Processing..... </span>}
                    {!deleteIsLoading && <span>Clear Completed</span>}
                </li>
            </ul>
        </div>
    );
}
